import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { Observable } from 'rxjs';
import { RequestDetailsPage } from '../request-details/request-details';

@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {

  // resources: Array<{ no: number, icon:string,symbol:string,title: string, note: string,link:string}>;
  loading:boolean= true;
  resources: Observable<any[]>;
  detailsModal: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public helper:HelperProvider,public modalCtrl:ModalController) {
    this.loading=true;
    this.resources = this.helper.getLicenseRequests(); 
    this.resources.subscribe(list => {
      this.loading=false;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
  }

  openLink(e,link) {
    window.open(link, '_system', 'location=yes');
    return false;
}

itemTapped(event, item) {
  console.log('Item clicked :',item);
  
  this.detailsModal = this.modalCtrl.create(RequestDetailsPage, { item: item });
  this.detailsModal.present();
}

accept(item){
  item.accepted = 'true';
    this.helper.updateLicenseRequest(item.key,item);

}


decline(item){
  item.accepted = 'false';
    this.helper.updateLicenseRequest(item.key,item);

}
}
