import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  projects: any;
  // afDatabase:any;
  activeMenu: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase,public helper:HelperProvider,public menu: MenuController) {
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
   

  }

  getProjects() {
    this.afDatabase.list('/projects').valueChanges().subscribe((data) => { 
      console.log("datas", data);
      this.projects = data;
      this.helper.setProjectList(data);
  },(err)=>{
     console.log("probleme : ", err)
  });
 
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }


  filterItems(ev: any) {
    // this.getProjects();
    this.projects = this.helper.getProjectList();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.projects = this.projects.filter(function(item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
    }
  }


  menu2Active() {
    this.activeMenu = 'menu2';
    console.log('Menu2');
    
    this.menu.enable(false, 'menu1');
    this.menu.enable(true, 'menu2');
    this.menu.open();
  }

}
