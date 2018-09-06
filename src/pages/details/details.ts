import { Component, ViewChild, ElementRef } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { FormPage } from '../form/form';
import { HelperProvider } from '../../providers/helper/helper';

import * as jsPDF from 'jspdf';


// @IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  project:any
  isPlatformMobile:boolean = false;
  sliderColor:string;
  semicircle: boolean = false;
  radius: number = 125;
  hideComments:boolean=true;
  arbcomments:string;

  @ViewChild('content') content: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private helper:HelperProvider) {
    this.project = navParams.get('item');
    console.log("project->", this.project);

    if(this.helper.getPlatform()) this.isPlatformMobile = true;


    if (this.project.score > 35 && this.project.score < 66) this.sliderColor = '#FFA500';
    if (this.project.score < 36) this.sliderColor = '#f53d3d';
    if (this.project.score > 65) this.sliderColor = '#32db64';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  showComments(){
    this.hideComments=!this.hideComments;
  }
 
  saveArbComments(){
    console.log(this.arbcomments);
    // this.project.arbComments.push(this.arbcomments);
    this.project.lastUpdated = new Date().toLocaleString();
    this.helper.updateItem(this.project.key,this.project);
    this.hideComments = true;
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  edit() {
    this.dismiss();
    // console.log("project id:",this.project.id);
    this.navCtrl.setRoot(FormPage,{'project':this.project,'edit':true});
  }


  export() {
    console.log('Exporting..');

    let doc = new jsPDF();

    let name = this.project.title + '.pdf';

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;
    console.log('Content:', content);


    // let img = new Image();
    // img.src = this.project.diagram;
    // img.crossOrigin = "Anonymous";
    // doc.addImage(this.getBase64Image(img), 'PNG', 15, 40, 200, 114);

    doc.fromHTML(content.innerHTML, 20, 20, {
      'width': 140, // max width of content on PDF
      'elementHandlers': specialElementHandlers
    },
      function (bla) {
        console.log('File name:', name);
        doc.save(name);
      });
  }

   getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}



 
}
