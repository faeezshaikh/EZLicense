import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 


@Injectable()
export class HelperProvider {

  projects:any;
  projects$:AngularFireList<Object>;
  data: any = null;
  constructor(public http: HttpClient,private af: AngularFireDatabase,private toastCtrl: ToastController) {
    console.log('Hello HelperProvider Provider');

    this.projects$ = this.af.list('/projects');
  }

  setProjectList(p) {
    this.projects = p;
  }

  getProjectList(){
    return this.projects;
  }



  getData(url) {
    return this.load(url).then(res => {
      this.data = res;
      console.log('data received->', res);
      return this.data;
    });


  // this.af.list('projects').map( (arr) => { return arr.reverse(); } );
  }

  addData(obj) {
    console.log('adding data');
    
    this.projects$.push(obj);
  }
  load(url) {
    
        console.log("Loading file..");
        
        // if (this.data) {
        //   return Promise.resolve(this.data);
        // }
        // if (!this.data) {
          return new Promise(resolve => {
            this.http.get(url)
              // .map(res => res.json())
              .subscribe(data => {
                this.data = data;
                resolve(this.data);
              });
          });
      // }
      }


  presentToast(msg: string,position:string,clazz:string,showCloseButton:boolean,closeButtonText:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: position,
      cssClass: clazz,
      showCloseButton:showCloseButton,
      closeButtonText:closeButtonText
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  getIP() {
    var json = 'http://ipv4.myexternalip.com/json';
    return this.http.get(json).subscribe(result => {
      console.log("Result for my ip1:",result);
      // return result.ip;
      
    });
  }

}
