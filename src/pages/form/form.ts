import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Content, AlertController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import _ from "lodash";
import { Observable } from 'rxjs/Observable';


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
  showFilingSpinner=false;
  attempted: number = 0;
  recommendations: string;
  score: any;
  verdict: any;
  // odo:any=90;
  project: any; // used in Edit mode.
  disabled: boolean = true;
  buttonText = "Edit"
  diagram: Observable<string>;
  reasons:any;

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
      if(navParams.get('diagram')) {
        navParams.get('diagram').subscribe(res=> {console.log(res); this.diagram=res;})
        console.log("diagram was uploaded",this.diagram);
      }
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
      message: 'Based on the questions answered so far this will show you the current score. You can update later. Proceed?',
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

    // this.explanation = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet et ipsum sagittis feugiat.";
    this.recommendations = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet et ipsum sagittis feugiat.";
    this.attempted=0;
    // this.score = this.getRandomInt(100);
    this.score = this.foo();

    

    if(this.score>0&& this.score<36) this.verdict = 'Not Aligned';
    if(this.score>36&& this.score<66) this.verdict = 'Marginally Aligned';
    if(this.score>65) this.verdict = 'Aligned';
    let that = this;
    this.questions.forEach(function (q, index) {
      if (q.answer) {
        that.attempted++;
      } else {

      }

    });

    // For Updating an Existing Assessment.
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

  foo(){
    let startScore = 100;
    let seriousness = this.determineSeriousness();
    let reasons=[];


    if(this.getFavorableOrNotFavorable_4() == 'No') {
      if(seriousness == 'High') {startScore -=15;  reasons.push("Lost 15 points since sensitive data is accessed by non Ameren personnel.");}
      if(seriousness == 'Medium') {startScore -=10; reasons.push("Lost 10 points since sensitive data is accessed by non Ameren personnel.");}
      if(seriousness == 'Low') {startScore -=5; reasons.push("Lost 5 points since sensitive data is accessed by non Ameren personnel.");}
    }


    if(this.getFavorableOrNotFavorable_5() == 'No') {
      if(seriousness == 'High') {startScore -=15;  reasons.push("Lost 15 points since sensitive data is accessed through non Ameren managed devices.");}
      if(seriousness == 'Medium') {startScore -=10; reasons.push("Lost 15 points since sensitive data is accessed through non Ameren managed devices.");}
      if(seriousness == 'Low') {startScore -=5; reasons.push("Lost 15 points since sensitive data is accessed through non Ameren managed devices.");}
    }

    if(this.getFavorableOrNotFavorable_6() == 'No') {
      if(seriousness == 'High') {startScore -=15; reasons.push("Lost 15 points since data not encrypted at rest.");}
      if(seriousness == 'Medium') {startScore -=10; reasons.push("Lost 10 points since data not encrypted at rest.");}
      if(seriousness == 'Low') {startScore -=5; reasons.push("Lost 5 points since data not encrypted at rest.");}
    }

    if(this.getFavorableOrNotFavorable_7() == 'No') {
      if(seriousness == 'High') {startScore -=15; reasons.push("Lost 15 points since data not encrypted in transit."); }
      if(seriousness == 'Medium') { startScore -=10; reasons.push("Lost 10 points since data not encrypted in transit.");}
      if(seriousness == 'Low') {startScore -=5; reasons.push("Lost 5 points since data not encrypted in transit.");}
    }

    if(this.getFavorableOrNotFavorable_8() == 'No') {
        startScore -=5;
        reasons.push("Lost 5 points since its not in Preferred Tech List.");
    }
    if(this.getFavorableOrNotFavorable_9() == 'No') {
      startScore -=5;
      reasons.push("Lost 5 points due to low Netskope rating.");
  }

  console.log('Final score:',startScore);
  console.log('Reasons:',reasons);
  this.reasons = reasons;
  return startScore;

  }

  getFavorableOrNotFavorable_4(){  // who accesses data
    if(this.find(4).answer && this.find(4).answer != 'Ameren Personnel (Employees / Consultant)') {
      return 'No';
    }
    return 'Yes';
  }


  getFavorableOrNotFavorable_5(){  // How is data accessed?
    if(this.find(5).answer && this.find(5).answer != 'Through managed devices only') { 
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_6(){  // Encryption at rest
    if(this.find(6).answer && this.find(6).answer == 'No') { 
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_7(){  // Encryption in motion
    if(this.find(7).answer && this.find(7).answer == 'No') { 
      return 'No';
    }
    return 'Yes';
  }
  getFavorableOrNotFavorable_8(){  // Preferred Tech List
    if(this.find(8).answer && this.find(8).answer == 'No') { 
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_9(){  // Netskope
    if(this.find(9).answer && (this.find(9).answer == 'No' || this.find(9).answer == 'Applicable, but I am not aware of the score')) { 
      return 'No';
    }
    return 'Yes';
  }
  

  determineSeriousness(){
      if(this.find(1).answer && this.find(1).answer != 'Public') {
        if(this.find(2).answer && ( this.find(2).answer == 'Public Cloud' || this.find(2).answer == 'External Data Provider')  ) {
          // if(this.find(3).answer && this.find(3).answer == 'Yes') {
            return 'High'
          // }
        }
      }

      if(this.find(1).answer && this.find(1).answer != 'Public') {
        if(this.find(2).answer && ( this.find(2).answer == 'Ameren Data Center' || this.find(2).answer == 'Ameren VPC in AWS')  ) {
          if(this.find(3).answer && this.find(3).answer == 'Yes') {
            return 'High'
          }
        }
      }

      if(this.find(1).answer && this.find(1).answer != 'Public') {
        if(this.find(2).answer && ( this.find(2).answer == 'Ameren Data Center' || this.find(2).answer == 'Ameren VPC in AWS')  ) {
          if(this.find(3).answer && this.find(3).answer != 'Yes') {
            return 'Low'
          }
        }
      }

   
      
      return 'Other';
  }

  find(id){
    return _.find(this.questions, function(o) { return o.Id == id; });
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
  submit(isFiling:boolean) {
    this.resetMenus();

    if(isFiling) {
      //  show confirmation box and then spinner for sending application
      let alertbox = this.alertCtrl.create({
        title: 'Confirm',
        message: 'This will send your assessment to the ARB for review. Are you sure?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Submit clicked');
              this.showFilingSpinner = true;
              let that = this;
              setTimeout(function () {
                that.showFilingSpinner = true;
                that.updateInFb(isFiling);
              }, 2000);
            
  
            }
          }
        ]
      });
      alertbox.present();
    } else {
      // Dont show confirmation box.
      this.updateInFb(isFiling);
    }
 
  }


  updateInFb(isFiling:boolean){

    this.navCtrl.pop();
    let status, msg;
    if(isFiling) {
      // update status to : 'Submitted
      status = 'Submitted';
      msg = "Your assessment was successfuly submitted for review. Cheers!"
    } else {
      // update status to save for later.
      status = "In Progress";
      msg = "Your assessment was successfuly saved for later."
    }
    this.helper.presentToast(msg, "middle", "toastClass", false, "", 2000);     
       
    if (this.project && this.project.title) { // Edit mode
      this.project.status = status;
      this.project.lastUpdated = new Date().toLocaleString();
      this.helper.updateItem(this.project.key, this.project);
      console.log('Updated project...',this.project);
      
    } else {
      this.helper.addData({
        'title': this.projectTitle,
        'description': this.projectDescription,
        'assessor': this.assessor,
        'sponsor': 'John Doe',
        'status': status,
        'lastUpdated': new Date().toLocaleString(),
        'questions': this.questions,
        'score': this.score,
        'verdict': this.verdict,
        'explanation': this.reasons,
        'recommendations': this.recommendations,
        'diagram':this.diagram || ""
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
