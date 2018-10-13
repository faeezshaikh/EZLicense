import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})
export class RequestDetailsPage {

  request:any;
  sliderColor:string;
  isPlatformMobile:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private helper:HelperProvider) {
    if(this.helper.getPlatform()) this.isPlatformMobile = true;
    this.request = navParams.get('item');
    this.updateSliderColor();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDetailsPage');
  }

  updateSliderColor(){
    if (this.request.score > 50 && this.request.score < 85) this.sliderColor = '#FFA500';
    if (this.request.score <= 50) this.sliderColor = '#f53d3d';
    if (this.request.score >= 85) this.sliderColor = '#32db64';
  }
  dismiss() {

  
    this.viewCtrl.dismiss();
    
  }

  foo(status){
    console.log('Status is:',status);
    
    this.request.accepted = (status == 'accept') ? 'true' : 'false';
    console.log('Res is:',this.request.accepted);
    this.helper.updateLicenseRequest(this.request.key,this.request);
    this.dismiss();
  }
}
