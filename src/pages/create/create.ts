import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { FormPage } from '../form/form';

@Component({
  selector: 'page-home',
  templateUrl: 'create.html'
})
export class CreatePage {

  pname: string;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController) {

  }

  startAssessment(){
    console.log('user entered->:', this.pname);
    

     this.navCtrl.setRoot(FormPage,{title:this.pname});
    //  this.navCtrl.push(FormPage, {});
  }

  dismiss() {
    // let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss();
    
  }
  

}
