import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';


// @IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  project:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.project = navParams.get('item');
    console.log("project->", this.project);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
