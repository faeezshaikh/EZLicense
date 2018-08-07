import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {

  resources: Array<{ no: number, icon:string,title: string, note: string,link:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.resources = [{no:1,icon:"assets/imgs/pdf-icon.ico",title:"Overview of Security Processes",note:"sdfsdfsd",link:"https://d0.awsstatic.com/whitepapers/Security/AWS_Security_Best_Practices.pdf"},
    {no:2,icon:"assets/imgs/pdf-icon.ico",title:"Storage Options in the Cloud",note:"sdfsdfsd",link:"https://d0.awsstatic.com/whitepapers/Storage/AWS%20Storage%20Services%20Whitepaper-v9.pdf"},
    {no:3,icon:"assets/imgs/html.png",title:"FERC Compliance Program",note:"sdfsdfsd",link:"http://scholar/NERCCompliance/Pages/FERC.aspx"},
    {no:4,icon:"assets/imgs/html.png",title:"NERC Compliance Program",note:"sdfsdfsd",link:"http://scholar/NERCCompliance/Pages/Homepage.aspx"},
    {no:5,icon:"assets/imgs/pdf-icon.ico",title:"Data and Information Encryption Policy",note:"sdfsdfsd",link:"http://scholar/ITPolicies/Documents/Data_Classification_Encryption/Data%20and%20Information%20Encryption%20Policy.pdf#search=Data%20and%20Information%20Encryption%20Policy"},
    {no:6,icon:"assets/imgs/pdf-icon.ico",title:"Data and Information Classification Policy FAQs",note:"sdfsdfsd",link:"http://scholar/ITPolicies/Documents/Data_Classification_Encryption/Data%20and%20Information%20Classification%20Policy%20FAQs.pdf#search=Data%20and%20Information%20Encryption%20Policy"}];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
  }

  openLink(e,link) {
    window.open(link, '_system', 'location=yes');
    return false;
}

}
