import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormPage } from '../form/form';

@Component({
  selector: 'page-home',
  templateUrl: 'create.html'
})
export class CreatePage {

  pname: string;
  pdesc: string;
  assessor: string;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

  }

  startAssessment() {
    console.log('user entered->:', this.pname);
    this.navCtrl.setRoot(FormPage, { title: this.pname, desc: this.pdesc, assessor: this.assessor });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
