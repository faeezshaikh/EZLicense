import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { FormPage } from '../form/form';
import { HelperProvider } from '../../providers/helper/helper';

// @IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  project:any
  isPlatformMobile:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private helper:HelperProvider) {
    this.project = navParams.get('item');
    console.log("project->", this.project);

    if(this.helper.getPlatform()) this.isPlatformMobile = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  edit() {
    this.dismiss();
    // console.log("project id:",this.project.id);
    this.navCtrl.setRoot(FormPage,{'project':this.project,'edit':true});
  }
}
