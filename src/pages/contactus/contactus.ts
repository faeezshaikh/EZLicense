import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
arb:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private helper: HelperProvider) {

    this.arb = [
      { name: 'Joe Solari', title:'Sr. IT Director', pic:'http://uai.socious.com/higherlogic/s/media/lcfbkctq.gif',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Paul Straughn', title:'Director EAII', pic:'https://media.licdn.com/dms/image/C5603AQGGrPvY29YajA/profile-displayphoto-shrink_200_200/0?e=1537401600&v=beta&t=e4G-PJ6ZYYNY0_oyrz9MG9G-FnRYgi18zS7AwFWoh-o',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Randy Allen', title:'Supervisor EA', pic:'assets/imgs/randy.jpg',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Robin Walsh', title:'Sr. Tech Arch', pic:'https://res-1.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco/bxsblpxnluybdfdl89dn',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'James Harris Jr.', title:'Mr. Arb', pic:'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/11695505_869386263136883_420367730057423456_n.jpg?_nc_cat=0&oh=7fcf6304160307d02495cc44e7f931a6&oe=5BC62671',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Faeez Shaikh', title:'Sr. Tech Arch', pic:'https://avatars3.githubusercontent.com/u/3466845?s=460&v=4',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Greg Chrisco', title:'Cyber Sec', pic:'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/35473282_10211045854814614_8067327768901189632_n.jpg?_nc_cat=0&oh=14f447d8d3382d5d2dfbaef6c5e8860c&oe=5BED9178',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Allen Cavedine', title:'Cyber Sec', pic:'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/39249570_10101781467037904_2256411113912532992_o.jpg?_nc_cat=0&oh=5d61f57c99f690240c9cb7e0f19c55c3&oe=5C36F00F',phone:'314-814-6195',email:'fshaikh@ameren.com'}
      
      

    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

  itemTapped() {
    this.helper.presentToast("Slide the name left or right to see options for contacting.","middle","toastClass2",true,"OK",4000);
  }

  tbd() {
    this.helper.presentToast("Feature will be implemented in the next iteration","bottom","toastClass2",true,"OK",4000);
  }
}
