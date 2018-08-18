import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController, Platform, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
import { HelperProvider } from '../../providers/helper/helper';
import { CreatePage } from '../create/create';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs';
import { FormPage } from '../form/form';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  projects: Observable<any[]>;;
  activeMenu: string;
  odo: any;
  isMobile = false;
  showDelete: number = 0;
  detailsModal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase,
    public modalCtrl: ModalController, public helper: HelperProvider, public menu: MenuController, public plt: Platform, private alertCtrl: AlertController) {

    if (this.plt.is('mobile') || this.plt.is('mobileweb')) {
      console.log('Running on a mobile device');
      this.isMobile = true;
      this.helper.setPlatform(true);
    } else {
      console.log('Not Running on a mobile device');
    }

    this.selectedItem = navParams.get('item');
    this.activeMenu = 'menu1'
    this.getProjects();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
      this.helper.presentToast("Successfully refreshed.", "middle", "toastClass", false, '', 1500)
    }, 2000);

  }

  getProjects() {
    this.projects = this.helper.getItems();  // Returns an Observable
    this.projects.subscribe(list => {
      console.log('Lenght of list is:', list.length)
      this.updateOdometer(list);
      // this.helper.setProjectList(list);
    });
  }

  updateOdometer(data) {
    console.log('updating odometer');
    this.odo = data.length.toString();
  }

  animateOdometer(data) {
    console.log('animating odometer');
    this.odo = 0;
    setTimeout(() => {
      // this.odo = data.length.toString();
      this.getProjects();
    }, 1000)

  }
  itemTapped(event, item) {
    this.detailsModal = this.modalCtrl.create(DetailsPage, { item: item });
    this.detailsModal.present();
  }

  filterItems(ev: any) {
    // this.getProjects();
    // this.projects = this.helper.getProjectList();
    this.getProjects();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      // this.projects = this.projects.filter(function (item) {
      //   return item.title.toLowerCase().includes(val.toLowerCase());
      // });

      // Filter the Observable. First map the Observale to List then Filter the List
      this.projects = this.projects.map(list => list.filter(function (item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      }))
    }
  }




  menu2Active() {
    let profileModal = this.modalCtrl.create(CreatePage, { userId: 8675309 });
    profileModal.present();
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad called...");
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter called...");
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter called...");
    if (this.projects) {
      console.log('Calling update odometer');
      this.getProjects(); // animating odometer
    }

  }
  increment() {
    this.showDelete++
  }
  hideDelete() {
    this.showDelete = 0;
  }

  deleteProject(project) {
    let _msg = 'This will delete: \'' + project.title + '\'. Are you sure?';
    this.confirmDelete(project,"Confirm Delete",_msg,"delete");
  }

  confirmDelete(p,_title,_msg,_action) {
    let confirmAbortAlert = this.alertCtrl.create({
      title: _title,
      message: _msg,
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
            if(_action == 'delete')
              this.helper.deleteItem(p.key);
            if(_action == 'approve') {
              p.status = "Approved";
              this.helper.updateItem(p.key,p);
            }
          }
        }
      ]
    });
    confirmAbortAlert.present();
  }

  edit(project) {
    this.navCtrl.push(FormPage,{'project':project,'edit':true});
  }

  approve(project){
    // let _msg = 'This will approve: \'' + project.title + '\'. Are you sure?'
    // this.confirmDelete(project,"Confirm Approval",_msg,"approve");
    this.doRadio(project);
  }




  doRadio(project) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Update Status');

    alert.addInput({
      type: 'radio',
      label: 'Under Review',
      value: 'Under Review',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Needs inputs',
      value: 'Needs inputs'
    });

    alert.addInput({
      type: 'radio',
      label: 'Approved',
      value: 'Approved',
      
    });

    alert.addInput({
      type: 'radio',
      label: 'Rejected',
      value: 'Rejected'
    });

   
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        console.log("Submitted:",data);
        project.status = data;
        this.helper.updateItem(project.key,project);
        
      }
    });

    alert.present();
  }


}
