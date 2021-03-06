import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {Events} from "ionic-angular/index";

export const _USER_LOGOUT_EVENT = 'user:logout';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  
  logout() {
    console.log("Publishing logout event");
    localStorage.removeItem('user'); 
    this.events.publish(_USER_LOGOUT_EVENT);
  }


}
