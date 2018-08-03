import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  project:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.project = navParams.get('item');
    console.log("project->", this.project);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
