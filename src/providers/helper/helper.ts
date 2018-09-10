import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as xml2js from 'xml2js';
import {EventsService} from './events';


@Injectable()
export class HelperProvider {

  projects: any;
  projects$: AngularFireList<Object>;
  data: any = null; // USed to read local files
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  isPlatformMobile:boolean;

  constructor(public http: HttpClient, private af: AngularFireDatabase, private toastCtrl: ToastController,private events:EventsService) {
    console.log('Hello HelperProvider Provider');

    this.projects$ = this.af.list('/projects');
    this.itemsRef = this.af.list('projects');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
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

  foo(xmlResp){
    let that = this;
    xml2js.parseString(xmlResp, function (err, result) {
      console.log('Parsed response:',result);
      // let resObj =  JSON.stringify(result);
      // console.log('Result:',resObj);
      // let abj = {'name':'sdfsdfds','age:num':45}
      // let x = Object.values(result)[0];

      // console.log('RES.x:',Object.keys(x));
      // console.log('RES [0]',Object.keys(result)[0]);

      var expirationMS = 10 * 60 * 60 * 1000; // 10 hours expiration
      let obj = {'username':'Faeez Shaikh','time': new Date().getTime() + expirationMS};
      localStorage.setItem('user', JSON.stringify(obj));
      that.events.sendLoggedInEvent();
  });
}

  callAuthService(usr:string,pwd:string){
    let xml = "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><authenticateResponse xmlns=\"http://www.ameren.com/Architecture\">" +
    "<response>Logon failure: unknown user name or bad password.</response>"+
    "</authenticateResponse>" +
    "</soap:Body>"+
    "</soap:Envelope>";
    this.foo(xml);

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
