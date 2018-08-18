import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Content, AlertController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import _ from "lodash";


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
  questionNumber: number = 1;   // this is to support shuffling of array. the question.id is no longer used to display 'Question 1 of 10' ..
  confirmAbortAlert: any;
  confirmSubmitAlert: any;
  activeMenu: string;
  somedata: string;
  projectTitle: string;
  projectDescription: string;
  assessor: string;
  thanked = false;
  showSpinner = false;
  attempted: number = 0;
  explanation: string;
  recommendations: string;
  score: any;
  verdict: any;
  // odo:any=90;
  project: any; // used in Edit mode.
  disabled: boolean = true;
  buttonText = "Edit"

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public helper: HelperProvider,
    public menu: MenuController, public alertCtrl: AlertController) {

    let p = navParams.get('project');
    if (p) {
      this.project = p;
      console.log('In EDIT mode..Project is:', this.project);
      let quiz = {
        "name": "ARB Self Assessment",
        "logo": "https://vignette.wikia.nocookie.net/mysims/images/2/22/EA_logo.png/revision/latest?cb=20090801182220",
        "score": 50,
        "sponsor": ""
      }
      this.data.quiz = quiz;
      this.questions = this.project.questions;
      this.question = this.questions[0];

      this.projectTitle = p.title;
      this.projectDescription = p.description;
      this.assessor = p.assessor;
      


    } else {

      // Newly created mode.
      helper.getData('assets/data/questions.js').then(theResult => {
        this.data = theResult;
        this.questions = theResult.questions;
        this.question = this.questions[0];
        console.log("Data is this => ", this.data);
        console.log("Questions => ", theResult.questions);
      });

      this.projectTitle = navParams.get('title');
      this.projectDescription = navParams.get('desc');
      this.assessor = navParams.get('assessor');
      console.log("Project is ", this.projectTitle);
    }
  }

  ngAfterViewInit() {
  }

  thankyou() {
    this.thanked = true;
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
      message: 'This will end the assessment and take you back to the home menu. Do you want to proceed?',
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
            this.resetMenus();
            this.navCtrl.pop();
            // this.navCtrl.pop();
            // this.navCtrl.setRoot(ListPage);

          }
        }
      ]
    });
    this.confirmAbortAlert.present();
  }

  presentSubmitConfirm() {
    this.confirmSubmitAlert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'This will finish your assessment and show you the final score. Do you want to proceed?',
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

            if(this.project) {
              // In Edit mode, dont want to show spinner. Just good user experience
              this.setMode('result');
            } else {
              this.showSpinner = true;
              let that = this;
              setTimeout(function () {
                that.showSpinner = false;
                that.setMode('result');
                console.log('Spinner = ', that.showSpinner);
  
  
              }, 1000);
            }

          }
        }
      ]
    });

   
    this.confirmSubmitAlert.present();
  }

  calculateAndUpdateScore() {

    this.explanation = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet et ipsum sagittis feugiat.";
    this.recommendations = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet et ipsum sagittis feugiat.";
    this.attempted=0;
    this.score = this.getRandomInt(100);
    if(this.score>0&& this.score<36) this.verdict = 'Not Aligned';
    if(this.score>36&& this.score<66) this.verdict = 'Marginally Aligned';
    if(this.score>65) this.verdict = 'Aligned';
    let that = this;
    // $scope.$broadcast('timer-stop');
    this.questions.forEach(function (q, index) {
      if (q.answer) {
        that.attempted++;
      } else {

      }

    });

    if(this.project) {
      this.project.score = this.score;
      this.project.verdict = this.verdict;
    }

    // this.correct = this.questions.length - wrong;
    // this.score = Math.round((Number(this.correct) / this.questions.length) * 100);
    // this.verdict = (this.score > 65) ? 'Pass' : 'Fail';
    // this.setMode('result');
    // this.storage.saveScore(this.selectedTopic.no, this.score);
  }

  resetMenus() {
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');
  }

  openHelp(questionId) {
    this.activeMenu = 'menu2';
    console.log('Menu2');
    this.thanked = false;

    this.menu.enable(false, 'menu1');
    this.menu.enable(true, 'menu2');
    this.menu.open();

    this.helper.getData('assets/data/q1Help.js').then(theResult => {

      console.log("Help content array => ", theResult);
      console.log('Question id :', questionId);

      let item = _.find(theResult, { 'id': questionId });
      if (item) {
        console.log("Help content  found ", item);
        this.somedata = item.help;
      }
    });

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
  submit() {
    this.resetMenus();

    this.navCtrl.pop();
    this.helper.presentToast("Thank you for taking the assessment. Cheers!", "middle", "toastClass", false, "", 2000);

    if (this.project && this.project.title) { // Edit mode
      this.helper.updateItem(this.project.key, this.project);
      console.log('Updated project...',this.project);
      
    } else {
      this.helper.addData({
        'title': this.projectTitle,
        'description': this.projectDescription,
        'assessor': this.assessor,
        'sponsor': 'John Doe',
        'status': 'Submitted',
        'lastUpdated': new Date().toLocaleString(),
        'questions': this.questions,
        'score': this.score,
        'verdict': this.verdict,
        'explanation': this.explanation,
        'recommendations': this.recommendations
      });
    }
  }

  edit() {
    console.log('Enabled!');
    if (this.buttonText == 'Edit') {
      this.disabled = false;
      this.buttonText = "Save";
    } else {
      // Saving changes
  this.calculateAndUpdateScore();    
      this.disabled = true;
      this.buttonText = "Edit";
    }

  }

   getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
