import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import * as xml2js from 'xml2js';
import {EventsService} from './events';
// import { log } from 'util';





@Injectable()
export class HelperProvider {

  projects: any;
  projects$: AngularFireList<Object>;
  objs$: AngularFireList<Object>;
  data: any = null; // USed to read local files
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  isPlatformMobile:boolean;
  auth_url_base = 'https://goblxdvesb12.ameren.com:8443/svc/build/auth/v1/account/';
  showLogin:boolean = true;
  version:string = "1.0.97";


  accountDetail:any;
  loginError:string;
  constructor(public http: HttpClient, private af: AngularFireDatabase, private toastCtrl: ToastController,private events:EventsService) {
    console.log('Hello HelperProvider Provider');

    this.projects$ = this.af.list('/projects');
    // this.objs$ = this.af.list('/objs');
    this.itemsRef = this.af.list('projects');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    // const config: AngularFireObject<any> = 
    this.af.object('turboarbconfig').valueChanges().subscribe(obj => {
      // console.log('TurboARB Config:',obj);
      let config:any = obj;
      this.auth_url_base = config.authUrl;
      // this.showLogin = config.showLogin;
      // console.log('auth_url_base',this.auth_url_base);
      // console.log('showLogin',config.showLogin);
    });
    
    

  }

  getVersion(){
    return this.version;
  }
  isBrowserIE(){
   let isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    // console.log('Is Browser IE?:',isIEOrEdge);
    return isIEOrEdge;
    // return true;
  }

  getTurboConfig(){
    return  this.af.object('turboarbconfig').valueChanges();
  }
  setPlatform(val: boolean){
    this.isPlatformMobile = val;
  }
  getPlatform(){
    return this.isPlatformMobile ;
  }
  /////// [CRUD] //////
  getItems() {  // Returns Observable
    return this.items;
  }
  addData(obj) {
    console.log('adding data');
    this.projects$.push(obj);
  }
  updateItem(key: string, obj: any) {
    this.itemsRef.update(key, obj);
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
  /////// [CRUD] //////

  ////// [ Used to read local files] ////////
  getData(url) {
    return this.load(url).then(res => {
      this.data = res;
      console.log('data received->', res);
      return this.data;
    });
  }
  load(url) {

    console.log("Loading file..");
    return new Promise(resolve => {
      this.http.get(url)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  ////// [ Used to read local files] ////////



  callEmailService(url) {
    console.log('calling email service',url);
    this.getData(url);
  }

  callAuthService(usr:string,pwd:string){

    let that = this;

    // that.getAcctInfo(usr).subscribe(respObj => {
    //   console.log('Retrieved account info:',respObj);
    // }, err => {console.log('Error occured in retrieving account info..',err);
    // });


    this.authenticate(usr,pwd).subscribe(resp => {  
      console.log('Auth resp:',resp);
      if(resp && resp.response == null) {
        // console.log('Login successful');  // Successful login

        ///////// [ Start Block] /////////
     
        ///////// [End Block] /////////
    
        this.getAccountDetail(usr); // retreive acct detail and add to localstorage.
        
      }
      if(resp && resp.response != null) {
        // Login failure. // todo: display on ui
        console.log('Login failure occured..',resp.response);
      }
    },
    error => { // error path
      console.log('something went wrong in authentication..',error);
      that.loginError = error;
      that.events.sendLogInErrorEvent();
    });
  }



  getMockObj(){
    let acctDetail:any = {};
    let account:any = {};
    let attributes:any = {};
    attributes.accountID = 'arb_bot';
    attributes.givenName = 'ARB';
    attributes.lastName = 'Bot';
    attributes.title = 'The Terminator Bot';
    attributes.departmentDescription = 'EA';
    attributes.email = 'arb_bot@ameren.com';
    account.attributes = attributes;
    acctDetail.account = account;
    return acctDetail;
  }
  addToLocalStorage(acctDetail:any){
        var expirationMS = 10 * 60 * 60 * 1000; // 10 hours expiration
        let obj = {'username':acctDetail.account.attributes.accountID,
                  'name':acctDetail.account.attributes.givenName + ' ' + acctDetail.account.attributes.lastName,
                  'title':acctDetail.account.attributes.title,
                  'department':acctDetail.account.attributes.departmentDescription,
                  'email': acctDetail.account.attributes.email,
                  'time': new Date().getTime() + expirationMS};
        localStorage.setItem('user', JSON.stringify(obj));
        this.events.sendLoggedInEvent(acctDetail.account.attributes.accountID);
  }

  getUserFromLocalStorage(){
    let storedToken:any = localStorage.getItem('user');
    if(storedToken) { // not logged in.
      let token = JSON.parse(storedToken);
      return token;
    }
    return null;
  }

  getAdminUsers():Observable<any> {
    return this.af.list('/users/admins').valueChanges();
  }

  getLoginError(){
    console.log('Returning Login error from Helper: ',this.loginError);    
    return this.loginError;
  }

  getAccountDetail(userId:string){
    console.log('Returning accountDetail from Helper: ',userId);
    this.getAcctInfo(userId).subscribe(respObj => {
      // console.log('Retrieved account info:',respObj);
      this.accountDetail = respObj;
      this.addToLocalStorage(respObj);
    }, err => {
      console.log('Error occured in retrieving account info..',err);
      this.accountDetail = null;
    });
    return this.accountDetail;
  }

  authenticate (usr:string,pwd:string): Observable<any> {
    let url = this.auth_url_base + usr + '/authenticate';
    let obj = {"password":pwd};
    // console.log('object is...',obj);
    return this.http.post(url, obj, {});
  }

  getAcctInfo(usr:string) {
    let url = this.auth_url_base + usr;
    return this.http.get(url);
  }
 

  presentToast(msg: string, position: string, clazz: string, showCloseButton: boolean, closeButtonText: string, duration: number) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: position,
      cssClass: clazz,
      showCloseButton: showCloseButton,
      closeButtonText: closeButtonText
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  

}
