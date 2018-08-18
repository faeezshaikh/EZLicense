import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormPage } from '../form/form';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,private storage: AngularFireStorage) {

  }

  startAssessment() {
    console.log('user entered->:', this.pname);
    this.navCtrl.setRoot(FormPage, { title: this.pname, desc: this.pdesc, assessor: this.assessor });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = '/projects';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }

}
