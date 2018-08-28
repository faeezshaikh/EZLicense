import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { ListPage } from '../list/list';


@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  feedback:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public helper: HelperProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  clazz:string = 'fas fa-poo fa-3x';
  btnText:string = 'Poo !';
  
  changeStyle($event){
    this.clazz = $event.type == 'mouseover' ? 'far fa-kiss-wink-heart fa-3x' : 'fas fa-poo fa-3x';
    this.btnText = $event.type == 'mouseover' ? 'Luv it!' : 'Poo !';
  }

  sendfeedback(){
    this.navCtrl.setRoot(ListPage);
    this.helper.presentToast("Your feedback was successfully emailed to the ARB.", "middle", "toastClass", false, '', 1500);
    let msg = 'https://limitless-coast-79622.herokuapp.com/sendfeedback/' + this.feedback;
    this.helper.callEmailService(msg);
  }

  enterText(val){
    if(val == 'yes')
    this.feedback = 'Its awesome!';

    if(val == 'meh')
    this.feedback = 'Its just ok!';

    if(val == 'bad')
    this.feedback = 'It sucks.';

    if(val == 'luv')
    this.feedback = 'I want to say something, but i\'d rather not';
  }

}
