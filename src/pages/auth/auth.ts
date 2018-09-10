import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  id: string;
  password:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private helper:HelperProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }
  signMeIn(){
    console.log("Id:",this.id);
    console.log("password:",this.password);
    this.helper.callAuthService(this.id,this.password);

  }

}
