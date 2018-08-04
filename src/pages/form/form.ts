import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams,Content,AlertController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { ListPage } from '../list/list';


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
  projectTitle:string;
  odometer:any = "0";

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,public helper: HelperProvider,
    public menu: MenuController,public alertCtrl:AlertController) {

    helper.getData().then(theResult => {
      this.data = theResult;
      this.questions = theResult.questions;
    //  this.questions = this.shuffle(this.questions);   /// TODO: Make shuffling of question order user configurable
      this.question = this.questions[0];
      console.log("Data is this => ", this.data);
      console.log("Questions => ", theResult.questions);
    });

    this.questionNumber = 1;  // wil always start at 1.
    this.projectTitle = navParams.get('title');
    console.log("Project is ",this.projectTitle);
    

   
    
  }

  ngAfterViewInit(){
  //   setTimeout(function(){
  //     document.getElementById('odometer').innerHTML = '123344';
  //     console.log("odo -> ");
      
  // }, 1000);
  }
  

  ///// [Shuffling of Questions ] //////////
  // shuffle(a) {
  //   for (let i = a.length; i; i--) {
  //     let j = Math.floor(Math.random() * i);
  //     [a[i - 1], a[j]] = [a[j], a[i - 1]];
  //   }
  //   return a;
  // }


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
              // this.navCtrl.pop();
              this.navCtrl.setRoot(ListPage);
  
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
              // this.navCtrl.pop();
              this.navCtrl.setRoot(ListPage);
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

    this.somedata ="<h3>What is Lorem Ipsum?</h3><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p> Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>"
    
    }


  setMode(mode) {
    this.mode = mode;
    console.log('Mode set to:', mode);
    this.scrollToTop();

  }

  isAnswered(question: any) {
    var answered = 'Not Answered';
    question.Options.forEach(function (element, index, array) {
      if (element.Selected == true) {
        answered = 'Answered';
        return false;
      }
    });
    return answered;
  }

}
