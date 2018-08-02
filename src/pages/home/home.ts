import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { FormPage } from '../form/form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public viewCtrl: ViewController) {

  }

  startAssessment(){
     this.navCtrl.setRoot(FormPage);
    //  this.navCtrl.push(FormPage, {});
  }

  dismiss() {
    // let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss();
    
  }
  

}
