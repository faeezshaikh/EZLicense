import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
arb:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.arb = [
      { name: 'Joe Solari', title:'Sr. IT Director', pic:'http://uai.socious.com/higherlogic/s/media/lcfbkctq.gif',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Paul Straughn', title:'Sr. Tech Arch', pic:'https://media.licdn.com/dms/image/C5603AQGGrPvY29YajA/profile-displayphoto-shrink_200_200/0?e=1537401600&v=beta&t=e4G-PJ6ZYYNY0_oyrz9MG9G-FnRYgi18zS7AwFWoh-o',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Robin Walsh', title:'Sr. Tech Arch', pic:'https://res-1.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco/bxsblpxnluybdfdl89dn',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Faeez Shaikh', title:'Sr. Tech Arch', pic:'https://avatars3.githubusercontent.com/u/3466845?s=460&v=4',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Faeez Shaikh', title:'Sr. Tech Arch', pic:'https://avatars3.githubusercontent.com/u/3466845?s=460&v=4',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Faeez Shaikh', title:'Sr. Tech Arch', pic:'https://avatars3.githubusercontent.com/u/3466845?s=460&v=4',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Faeez Shaikh', title:'Sr. Tech Arch', pic:'https://avatars3.githubusercontent.com/u/3466845?s=460&v=4',phone:'314-814-6195',email:'fshaikh@ameren.com'},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

}
