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
      { name: 'Jon Shadduck', title:'Dir Critical Infra Sec', pic:'https://scontent-ort2-2.xx.fbcdn.net/v/t31.0-8/11114152_10153232412107311_3554491912280360329_o.jpg?_nc_cat=0&oh=2f9cef2a5c2257843fbf3ee8f0f610f1&oe=5BED65E4',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Randy Allen', title:'Supervisor EA', pic:'assets/imgs/randy.jpg',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Robin Walsh', title:'Sr. Tech Arch', pic:'https://res-1.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco/bxsblpxnluybdfdl89dn',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'James Harris Jr.', title:'Mr. Arb', pic:'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/11695505_869386263136883_420367730057423456_n.jpg?_nc_cat=0&oh=7fcf6304160307d02495cc44e7f931a6&oe=5BC62671',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Jothi Iyer', title:'Sr. Tech Arch', pic:'http://languages.ju.edu.jo/PublishingImages/faculty%20Staff/Academic%20Staff/unknown%20male.jpg?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3Dbd7e4fa7%2De7e1%2D4655%2D903b%2D728d61c413f8%26View%3Ddde5d092%2D04fc%2D4893%2D9a8e%2Dba6c69b19e1c%26RootFolder%3D%252FPublishingImages%252Ffaculty%2520Staff%252FAcademic%2520Staff%26ID%3D394%26CurrentPage%3D1',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Faeez Shaikh', title:'Sr. Tech Arch', pic:'https://avatars3.githubusercontent.com/u/3466845?s=460&v=4',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      { name: 'Deepak Suresh', title:'Sr. Tech Arch', pic:'https://cdn4.vectorstock.com/i/1000x1000/80/18/gangster-skull-tattoo-vector-10078018.jpg',phone:'314-814-6195',email:'fshaikh@ameren.com'},
      
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
