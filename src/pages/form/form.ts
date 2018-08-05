import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Content, AlertController, ToastController } from 'ionic-angular';
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
  somedata: string;
  projectTitle: string;
  showSpinner = false;
  attempted:number = 0;
  // odo:any;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public helper: HelperProvider,
    public menu: MenuController, public alertCtrl: AlertController, private toastCtrl: ToastController) {

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
    console.log("Project is ", this.projectTitle);




  }

  ngAfterViewInit() {
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

    // setTimeout(function () {
    //   document.getElementById('odometer').innerHTML = '200';
    // }, 1000);

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
            // this.navCtrl.setRoot(ListPage);

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
            this.calculateAndUpdateScore();
            this.showSpinner = true;
            let that = this;
            setTimeout(function () {
              that.showSpinner = false;
              that.setMode('result');
              console.log('Spinner = ',that.showSpinner);
              

            }, 3000);

          }
        }
      ]
    });
    this.confirmSubmitAlert.present();
  }

  calculateAndUpdateScore() {
    
    
        let that = this;
        // $scope.$broadcast('timer-stop');
        this.questions.forEach(function (q, index) {
          if (q.answer) {
            that.attempted++;
          } else {

          }
    
        });
        this.helper.addData({
          'title':this.projectTitle,
          'description':'lorem ipspum',
          'assessor':'Tim O\'neal',
          'sponsor': 'John Doe',
          'lastUpdated': new Date().toLocaleString(),
          'questions':this.questions,
          'score':80
        });
    
        // this.correct = this.questions.length - wrong;
        // this.score = Math.round((Number(this.correct) / this.questions.length) * 100);
        // this.verdict = (this.score > 65) ? 'Pass' : 'Fail';
        // this.setMode('result');
        // this.storage.saveScore(this.selectedTopic.no, this.score);
      }
    

  openHelp() {
    this.activeMenu = 'menu2';
    console.log('Menu2');

    this.menu.enable(false, 'menu1');
    this.menu.enable(true, 'menu2');
    this.menu.open();

    this.somedata = "<h3>What is Lorem Ipsum?</h3><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p> Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>"

  }


  setMode(mode) {
    this.mode = mode;
    console.log('Mode set to:', mode);
    this.scrollToTop();

  }

  isAnswered(question: any) {
    var answered = 'Not Answered';
    // question.Options.forEach(function (element, index, array) {
    //   if (element.Selected == true) {
    //     answered = 'Answered';
    //     return false;
    //   }
    // });
    // console.log('Questions answer',question.answer);

    if (question.answer) answered = 'Answered';
    return answered;
  }
  closeResults() {
    this.navCtrl.pop();
    this.presentToast("Thank you for taking the assessment. Your assessment has been added to this list. Cheers!");
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      cssClass: "toastClass"
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
