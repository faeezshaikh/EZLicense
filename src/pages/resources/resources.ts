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
    {no:3,icon:"assets/imgs/pdf-icon.ico",title:"Fault Tolerant Apps in the cloud",note:"sdfsdfsd",link:"https://d0.awsstatic.com/whitepapers/aws-building-fault-tolerant-applications.pdf"},
    {no:4,icon:"assets/imgs/pdf-icon.ico",title:"Overview of AWS",note:"sdfsdfsd",link:"https://d0.awsstatic.com/whitepapers/aws-overview.pdf"},
    {no:5,icon:"assets/imgs/pdf-icon.ico",title:"Compliance Whitepaper",note:"sdfsdfsd",link:"https://d0.awsstatic.com/whitepapers/compliance/AWS_Risk_and_Compliance_Whitepaper.pdf"},
    {no:6,icon:"assets/imgs/pdf-icon.ico",title:"Architecting for the AWS Cloud",note:"sdfsdfsd",link:"https://d0.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf"}];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
  }

  openLink(e,link) {
    window.open(link, '_system', 'location=yes');
    return false;
}

}
