import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams,Content,AlertController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  data: any = {};
  questions: any[];
  question: string;
  showReview: boolean = false;
  mode: string = 'quiz';
  questionNumber: number;   // this is to support shuffling of array. the question.id is no longer used to display 'Question 1 of 10' ..
  confirmAbortAlert: any;
  confirmSubmitAlert: any;
  activeMenu: string;
  somedata:string;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,public helper: HelperProvider,
    public menu: MenuController,public alertCtrl:AlertController) {

    helper.getData().then(theResult => {
      this.data = theResult;
      this.questions = theResult.questions;
      this.questions = this.shuffle(this.questions);   /// TODO: Make shuffling of question order user configurable
      this.question = this.questions[0];
      console.log("Data is this => ", this.data);
      console.log("Questions => ", theResult.questions);
    });

    this.questionNumber = 1;  // wil always start at 1.
  }


  ///// [Shuffling of Questions ] //////////
  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }


  ///// [ Navigation code] ///////
  shift(increment: number) {
    let ix = increment + this.questions.findIndex(c => c === this.question);
    ix = Math.min(this.questions.length - 1, Math.max(0, ix));
    this.question = this.questions[ix];
    this.scrollToTop();
  }

  scrollToTop() {
    if (this.content)
      this.content.scrollToTop();
  }

  left() {
    this.shift(-1);
    if (this.questionNumber == 1) {

    } else {
      this.questionNumber--;
    }
  }
  right() {
    this.shift(1);
    if (this.questionNumber == this.questions.length) {

    } else {
      this.questionNumber++;
    }
  }

  goTo(index: number) {
    if (index > 0 && index <= this.questions.length) {
      this.question = this.questions[index - 1];
      this.questionNumber = index;
    }
    this.mode = 'quiz';
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

    //////// [ Confirm Alert ] //////
    presentAbortConfirm() {
      this.confirmAbortAlert = this.alertCtrl.create({
        title: 'Confirm Abort',
        message: 'This will end the test and take you back to the home menu. Do you want to proceed?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Abort clicked');
              this.navCtrl.pop();
  
  
            }
          }
        ]
      });
      this.confirmAbortAlert.present();
    }
  
      presentSubmitConfirm() {
      this.confirmSubmitAlert = this.alertCtrl.create({
        title: 'Confirm Submit',
        message: 'This will submit your test and show you the final score. Do you want to proceed?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Submit clicked');
              // Submit the exam.
              // this.calculateAndUpdateScore();
              this.navCtrl.pop();
            }
          }
        ]
      });
      this.confirmSubmitAlert.present();
    }
  

    openHelp(){
        this.activeMenu = 'menu2';
    console.log('Menu2');
    
    this.menu.enable(false, 'menu1');
    this.menu.enable(true, 'menu2');
    this.menu.open();
    this.somedata = "<pre>balalalalalal<h2>sdsf</h2></pre>";
    }
}
