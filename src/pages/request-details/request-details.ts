import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})
export class RequestDetailsPage {

  request:any;
  isPlatformMobile:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private helper:HelperProvider) {
    if(this.helper.getPlatform()) this.isPlatformMobile = true;
    this.request = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDetailsPage');
  }
  dismiss() {

    this.viewCtrl.dismiss();
    
  }

}
