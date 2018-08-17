import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController, Platform, AlertController, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
import { HelperProvider } from '../../providers/helper/helper';
import { CreatePage } from '../create/create';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  projects: any;
  // afDatabase:any;
  activeMenu: string;
  odo:any;
  isMobile = false;
  showDelete:number=0;
  detailsModal:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase,
    public modalCtrl: ModalController, public helper: HelperProvider, public menu: MenuController,public plt: Platform,private alertCtrl: AlertController) {

      if (this.plt.is('mobile') || this.plt.is('mobileweb')) {
        console.log('Running on a mobile device');
        this.isMobile = true;
      } else {
        console.log('Not Running on a mobile device');
      }


      

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.activeMenu = 'menu1'

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    this.getProjects();
    // let myIp = this.helper.getIP();
    // console.log("Got my ip:", myIp);
    


  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.helper.presentToast("Successfully refreshed.","middle","toastClass",false,'');
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
      this.helper.presentToast("Successfully refreshed.","middle","toastClass",false,'')
    }, 2000);
    
  }

  getProjects() {
    this.afDatabase.list('/projects').valueChanges().subscribe((data) => {
      this.projects = data;
      this.updateOdometer(data);
      this.helper.setProjectList(data);
    }, (err) => {
      console.log("probleme : ", err)
    });
  }

  updateOdometer(data) {
    console.log('updating odometer');
    this.odo = data.length.toString();
  }

  animateOdometer(data) {
    console.log('animating odometer');
    this.odo = 0;
    setTimeout(()=>{
      this.odo = data.length.toString();
    },500)
    
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });

    this.detailsModal = this.modalCtrl.create(DetailsPage, { item: item });
    this.detailsModal.present();

  }


  filterItems(ev: any) {
    // this.getProjects();
    this.projects = this.helper.getProjectList();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.projects = this.projects.filter(function (item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
    }
  }


  menu2Active() {

    // this.navCtrl.setRoot(HomePage);

    let profileModal = this.modalCtrl.create(CreatePage, { userId: 8675309 });
    profileModal.present();


    // this.activeMenu = 'menu2';
    // console.log('Menu2');

    // this.menu.enable(false, 'menu1');
    // this.menu.enable(true, 'menu2');
    // this.menu.open();
  }
  ionViewDidLoad(){
    console.log("ionViewDidLoad called...");

  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter called...");
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter called...");
    if(this.projects) {
      console.log('Calling update odometer');
      
      this.updateOdometer(this.projects);
    }

  }
  increment(){
    this.showDelete++
  }
  hideDelete(){
    this.showDelete = 0;
  }

  deleteProject(project){
    // this.ViewController.dismiss();
    this.confirmDelete(project);
  }

  confirmDelete(p) {
    let confirmAbortAlert = this.alertCtrl.create({
      title: 'Confirm Abort',
      message: 'This will delete: \'' + p.title + '\'. Are you sure?',
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
            console.log('Delete confirmed');
            this.helper.deleteData(p);
          }
        }
      ]
    });
    confirmAbortAlert.present();
  }

}
