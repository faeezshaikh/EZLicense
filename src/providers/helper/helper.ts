import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class HelperProvider {

  projects: any;
  projects$: AngularFireList<Object>;
  data: any = null; // USed to read local files
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  isPlatformMobile:boolean;

  constructor(public http: HttpClient, private af: AngularFireDatabase, private toastCtrl: ToastController) {
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
