import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, NavParams, Content, AlertController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import _ from "lodash";
import { Observable } from 'rxjs/Observable';

import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

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
  showFilingSpinner = false;
  attempted: number = 0;
  recommendations: string;
  score: any;
  verdict: any;
  odo: any;
  sliderScore = 0;
  project: any; // used in Edit mode.
  disabled: boolean = true;
  buttonText = "Edit"
  diagram: Observable<string>;
  reasons: any;
  sliderColor: string;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  uploading:boolean=false;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public helper: HelperProvider,
    public menu: MenuController, public alertCtrl: AlertController,private storage: AngularFireStorage) {

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
      if (navParams.get('diagram')) {
        navParams.get('diagram').subscribe(res => { console.log(res); this.diagram = res; })
        console.log("diagram was uploaded", this.diagram);
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
          cssClass: 'yesButtonClass',
          handler: () => {
            console.log('Submit clicked');
            // Submit the exam.
            this.calculateAndUpdateScore();

            if (this.project) {
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

    this.recommendations = "Based on the reasons for losing points above, try addressing the issues to improve your score. Hit 'Edit' to update your assessment below";
    this.attempted = 0;
    // this.score = this.getRandomInt(100);
    this.score = this.foo();
    if (this.score == 100 && !this.areAllQuestionsAnswered()) this.score = 0;
    if(this.score < 0 ) this.score = 0;
    this.odo = this.score;
    console.log('Odometer val:', this.odo);

    let that1 = this;
    setTimeout(function () {
      that1.sliderScore = that1.odo;
      if(that1.odo == 0) that.sliderScore = 1;
      if (that1.sliderScore > 50 && that1.sliderScore < 85) that1.sliderColor = '#FFA500';
      if (that1.sliderScore <= 50) that1.sliderColor = '#f53d3d';
      if (that1.sliderScore >= 85) that1.sliderColor = '#32db64';

      console.log('setting sliderscore to :', that1.sliderScore);

    }, 2000);




    if (this.score >= 0 && this.score <= 50) this.verdict = 'Not Aligned';
    if (this.score > 50 && this.score < 85) this.verdict = 'Marginally Aligned';
    if (this.score >= 85) this.verdict = 'Aligned';
    let that = this;
    this.questions.forEach(function (q, index) {
      if (q.answer) {
        that.attempted++;
      } else {

      }

    });


    // For Updating an Existing Assessment.
    if (this.project) {
      this.project.score = this.score;
      this.project.verdict = this.verdict;
    }


  }

  areAllQuestionsAnswered() {
    // console.log('checking if all qs answered...');
    let unanswered = _.find(this.questions, function (o) { return o.answer == undefined; });
    if (unanswered) {
      return false;
    }
    return true;
  }
  foo() {
    let startScore = 100;
    let seriousness = this.determineSeriousness();
    let reasons = [];


    if (this.getFavorableOrNotFavorable_4() == 'No') {
      if (seriousness == 'High') { startScore -= 15; reasons.push({"expl":"Lost 15 points since sensitive data is accessed by non Ameren personnel.","remedy":"Restrict access to sensitive data to Ameren personnel.","points":15}); }
      if (seriousness == 'Medium') { startScore -= 10; reasons.push({"expl":"Lost 10 points since data is accessed by non Ameren personnel.","remedy":"Restrict access to sensitive data to Ameren personnel.","points":10}); }
      if (seriousness == 'Low') { startScore -= 5; reasons.push({"expl":"Lost 5 points since data is accessed by non Ameren personnel.","remedy":"Restrict access to sensitive data to Ameren personnel.","points":5}); }
    }


    if (this.getFavorableOrNotFavorable_5() == 'No') {
      if (seriousness == 'High') { startScore -= 15; reasons.push({"expl":"Lost 15 points since sensitive data is accessed through non Ameren managed devices.","remedy":"Restrict access to sensitive data through managed devices.","points":15}); }
      if (seriousness == 'Medium') { startScore -= 10; reasons.push({"expl":"Lost 10 points since data is accessed through non Ameren managed devices.","remedy":"Restrict access to sensitive data through managed devices.","points":10}); }
      if (seriousness == 'Low') { startScore -= 5; reasons.push({"expl":"Lost 5 points since data is accessed through non Ameren managed devices.","remedy":"Restrict access to sensitive data through managed devices.","points":5}); }
    }

    if (this.getFavorableOrNotFavorable_6() == 'No') {
      if (seriousness == 'High') { startScore -= 15; reasons.push({"expl":"Lost 15 points since data not encrypted at rest.","remedy":"Encrypt data at rest.","points":15}); }
      if (seriousness == 'Medium') { startScore -= 10; reasons.push({"expl":"Lost 10 points since data not encrypted at rest.","remedy":"Encrypt data at rest.","points":10}); }
      if (seriousness == 'Low') { startScore -= 5; reasons.push({"expl":"Lost 5 points since data not encrypted at rest.","remedy":"Encrypt data at rest.","points":5}); }
    }

    if (this.getFavorableOrNotFavorable_7() == 'No') {
      if (seriousness == 'High') { startScore -= 15; reasons.push({"expl":"Lost 15 points since data not encrypted in transit.","remedy":"Encrypt data in transit.","points":15}); }
      if (seriousness == 'Medium') { startScore -= 10; reasons.push({"expl":"Lost 10 points since data not encrypted in transit.","remedy":"Encrypt data in transit.","points":10}); }
      if (seriousness == 'Low') { startScore -= 5; reasons.push({"expl":"Lost 5 points since data not encrypted in transit.","remedy":"Encrypt data in transit.","points":5}); }
    }

    if (this.getFavorableOrNotFavorable_8() == 'No') {
      startScore -= 5;
      reasons.push({"expl":"Lost 5 points since its not in Preferred Tech List.","remedy":"Update solution to use Ameren preferred technology","points":5});
    }
    if (this.getFavorableOrNotFavorable_9() == 'No') {
      startScore -= 5;
      reasons.push({"expl":"Lost 5 points due to low Netskope rating.","remedy":"Explore the use of an alternative (reputable) solution","points":5});
    }

    if (this.getFavorableOrNotFavorable_10() == 'No') {
      startScore -= 5;
      reasons.push({"expl":"Lost 5 points due to not using an approved integration pattern.","remedy":"Use an approved integration pattern.","points":5});
    }

    if (this.getFavorableOrNotFavorable_11() == 'No') {
      startScore -= 5;
      reasons.push({"expl":"Lost 5 points for not implementing Role Based Access Controls.","remedy":"Implement RBAC.","points":5});
    }

    if (this.getFavorableOrNotFavorable_12() == 'No') {
      startScore -= 10;
      reasons.push({"expl":"Lost 10 points for implementing a secondary user identity store that cannot be disabled.","remedy":"Do not use a secondary identity store to do IAM.","points":10});
    }

    if (this.getFavorableOrNotFavorable_13() == 'No') {
      startScore -= 10;
      reasons.push({"expl":"Lost 10 points for not being able to support MFA for admin access.","remedy":"Implement / Enable MFA for admin role.","points":10});
    }


    if (this.getFavorableOrNotFavorable_15() == 'No') {
      startScore -= 15;
      reasons.push({"expl":"Lost 15 points for not adhering to NERC, FERC standards.","remedy":"Make adjustments to comply with NERC, FERC standards.","points":15});
    }

    if (this.getFavorableOrNotFavorable_16() == 'No') {
      if (seriousness == 'High') { startScore -= 15; reasons.push({"expl":"Lost 15 points for not readily being able to download data from vendor","remedy":"Implement / enable feature to download data from vendor.","points":15}); }
      if (seriousness == 'Low') { startScore -= 10; reasons.push({"expl":"Lost 10 points for not readily being able to download data from vendor","remedy":"Implement / enable feature to download data from vendor.","points":10}); }
    }

    if (this.getFavorableOrNotFavorable_17() == 'No') {
      if (seriousness == 'High') { startScore -= 10; reasons.push({"expl":"Lost 10 points since data is backed up outside of Ameren","remedy":"Restrict backing up of data outside Ameren.","points":10}); }
      if (seriousness == 'Low') { startScore -= 5; reasons.push({"expl":"Lost 5 points since non-sensitive data is backed up outside of Ameren","remedy":"Restrict backing up of data outside Ameren.","points":5}); }
    }

    if (this.getFavorableOrNotFavorable_18() == 'No') {
      if (seriousness == 'High') { startScore -= 10; reasons.push({"expl":"Lost 10 points since data is outside USA","remedy":"Restrict backing up of data outside USA.","points":10}); }
      if (seriousness == 'Low') { startScore -= 5; reasons.push({"expl":"Lost 5 points since non-sensitive data is outside USA","remedy":"Restrict backing up of data outside USA.","points":5}); }
    }

    if (this.getFavorableOrNotFavorable_19() == 'No') {
      startScore -= 5;
      reasons.push({"expl":"Lost 5 points since vendor has had a security breach in the past.","remedy":"Explore other vendors since this vendor had a security breach.","points":5});
    }

    if (this.getFavorableOrNotFavorable_21() == 'No') {
      startScore -= 5;
      reasons.push({"expl":"Lost 5 points since vendor has no Cyber Insurance.","remedy":"Explore if vendor can procure cyber insurance.","points":5});
    }

    if (this.getFavorableOrNotFavorable_22() == 'No') {
      startScore -= 5;
      reasons.push({"expl":"Lost 5 points since no data retention or destruction policy exists.","remedy":"Implement data retention or destruction policy.","points":5});
    }

    if (this.getFavorableOrNotFavorable_23() == 'No') {
      startScore -= 5;
      reasons.push({"expl":"Lost 5 points since there is no Information Rights Management.","remedy":"Implement Information Rights Management.","points":5});
    }

    if (this.getFavorableOrNotFavorable_24() == 'No') {
      startScore -= 10;
      reasons.push({"expl":"Lost 10 points since solution does not support SSO or AD integration.","remedy":"Implement SSO or AD integration.","points":10});
    }

    console.log('Final score:', startScore);
    console.log('Reasons:', reasons);
    this.reasons = reasons;
    return startScore;

  }

  getFavorableOrNotFavorable_4() {  // who accesses data
    if (this.find(4).answer && this.find(4).answer != 'Ameren Personnel (Employees / Consultant)') {
      return 'No';
    }
    return 'Yes';
  }


  getFavorableOrNotFavorable_5() {  // How is data accessed?
    if (this.find(5).answer && this.find(5).answer != 'Through managed devices only') {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_6() {  // Encryption at rest
    if (this.find(6).answer && this.find(6).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_7() {  // Encryption in motion
    if (this.find(7).answer && this.find(7).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }
  getFavorableOrNotFavorable_8() {  // Preferred Tech List
    if (this.find(8).answer && this.find(8).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_9() {  // Netskope
    if (this.find(9).answer && (this.find(9).answer == 'No' || this.find(9).answer == 'Applicable, but I am not aware of the score')) {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_10() {  // Integration Pattern
    if (this.find(10).answer && this.find(10).answer == 'Other') {
      return 'No';
    }
    return 'Yes';
  }
  getFavorableOrNotFavorable_11() {  // RBAC
    if (this.find(11).answer && this.find(11).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }
  getFavorableOrNotFavorable_12() {  // Secondary user store
    if (this.find(12).answer && this.find(12).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }
  getFavorableOrNotFavorable_13() {  // MFA for admins
    if (this.find(13).answer && this.find(13).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }
  getFavorableOrNotFavorable_15() {  // NERC, FERC
    if (this.find(15).answer && this.find(15).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_16() {  // Vendor owns data
    if (this.find(16).answer && this.find(16).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_17() {  // Data backup
    if (this.find(17).answer && this.find(17).answer == 'Yes') {
      return 'No';
    }
    return 'Yes';
  }
  getFavorableOrNotFavorable_18() {  // Data location
    if (this.find(18).answer && this.find(18).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_19() {  // Vendor breach
    if (this.find(19).answer && this.find(19).answer == 'Yes') {
      return 'No';
    }
    return 'Yes';
  }
  getFavorableOrNotFavorable_21() {  // Cyber insurance
    if (this.find(21).answer && this.find(21).answer == 'None') {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_22() {  // Data retention policy
    if (this.find(22).answer && this.find(22).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }

  getFavorableOrNotFavorable_23() {  // Info rights
    if (this.find(23).answer && this.find(23).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }


  getFavorableOrNotFavorable_24() {  // SSO or AD
    if (this.find(24).answer && this.find(24).answer == 'No') {
      return 'No';
    }
    return 'Yes';
  }

  determineSeriousness() {
    if (this.find(1).answer && this.find(1).answer != 'Public') {
      if (this.find(2).answer && (this.find(2).answer == 'Public Cloud' || this.find(2).answer == 'External Data Provider')) {
        // if(this.find(3).answer && this.find(3).answer == 'Yes') {
        return 'High'
        // }
      }
    }

    if (this.find(1).answer && this.find(1).answer != 'Public') {
      if (this.find(2).answer && (this.find(2).answer == 'Ameren Data Center' || this.find(2).answer == 'Ameren VPC in AWS')) {
        if (this.find(3).answer && this.find(3).answer == 'Yes') {
          return 'High'
        }
      }
    }

    if (this.find(1).answer && this.find(1).answer != 'Public') {
      if (this.find(2).answer && (this.find(2).answer == 'Ameren Data Center' || this.find(2).answer == 'Ameren VPC in AWS')) {
        if (this.find(3).answer && this.find(3).answer != 'Yes') {
          return 'Low'
        }
      }
    }



    return 'Other';
  }

  find(id) {
    return _.find(this.questions, function (o) { return o.Id == id; });
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
  submit(isFiling: boolean) {
    this.resetMenus();

    if (isFiling) {
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
            cssClass: 'yesFileAssessment',
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


  updateInFb(isFiling: boolean) {

    this.navCtrl.pop();
    let status, msg;
    if (isFiling) {
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
      this.project.explanation = this.reasons;

      this.project.title = this.projectTitle;
      this.project.description = this.projectDescription;
      this.project.assessor = this.assessor;

      console.log("getting downloadURL...");

      if(this.downloadURL) {
        console.log("got downloadURL...");
        
        this.downloadURL.subscribe(res => { 
          console.log('Updated diagram..',res); 
          this.project.diagram = res; 
          // Bug: If the project was never created..this update of the diag will not help. Rare case when the user doesnt upload pic on create page but does it on update page
          this.helper.updateItem(this.project.key, this.project);
        })
      }
      this.helper.updateItem(this.project.key, this.project);
      console.log('Updated project...', this.project);

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
        'verdict': this.verdict || "",
        'explanation': this.reasons,
        'recommendations': this.recommendations,
        'diagram': this.diagram || ""
      });
    }
  }

  edit(isScrollingReqd) {
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
   if(isScrollingReqd) this.content.scrollToTop();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  
  uploadFile(event) {
    const file = event.target.files[0];
    let pth = Math.floor(Date.now() / 1000);
    const filePath = 'turboarb/'+pth;
    console.log('Path is:',filePath);
    
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploading = true;
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();

    if(this.uploadPercent) {
      let that = this;
      this.uploadPercent.subscribe(number => {
        if(number == 100) that.uploading=false;
      })
    }
   
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {  this.downloadURL = fileRef.getDownloadURL() ;})
     )
    .subscribe()
  }
}
