import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormPage } from '../form/form';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-home',
  templateUrl: 'create.html'
})
export class CreatePage {

  pname: string;
  pdesc: string;
  assessor: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  uploading:boolean=false;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,private storage: AngularFireStorage,private helper:HelperProvider) {

    let user = this.helper.getUserFromLocalStorage();
    if(user!=null)  this.assessor = user.email;
  }

  startAssessment() {
    console.log('user entered->:', this.pname);
    this.navCtrl.setRoot(FormPage, { title: this.pname, desc: this.pdesc, assessor: this.assessor, diagram:this.downloadURL});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    let pth = Math.floor(Date.now() / 1000);
    const filePath = 'turboarb/'+pth;
    console.log('Path is:',filePath);
    
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploading = true;
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();

    if(this.uploadPercent) {
      let that = this;
      this.uploadPercent.subscribe(number => {
        if(number == 100) that.uploading=false;
      })
    }
   
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }

}
