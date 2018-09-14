import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,Events} from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { ContactusPage } from '../pages/contactus/contactus';
import { ResourcesPage } from '../pages/resources/resources';

// TS pluging didnt work..so added <script> tag in index.html for googgle analytics
// import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { FeedbackPage } from '../pages/feedback/feedback';
import { AuthService } from '../providers/helper/AuthService';
import { AuthPage } from '../pages/auth/auth';
import {SettingsPage} from '../pages/settings/settings';
import { HelperProvider } from '../providers/helper/helper';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  // rootPage: any = AuthPage;
  user:any;
  accountDetail:any;
  username; name; title; department;
  loggedIn:boolean = false;
  
  pages: Array<{title: string, component: any,icon: string}>;

  constructor(public platform: Platform,public auth: AuthService, public events:Events,private helper: HelperProvider) {
  //  this.initializeApp();

  //  this.ga.startTrackerWithId('UA-123713684-1')
  //  .then(() => {
  //    console.log('Google analytics is ready now');
  //       this.ga.trackView('App.component.ts');
  //    // Tracker is ready./ You can now track pages or set additional information such as AppVersion or UserId
  //  })
  //  .catch(e => console.log('Error starting GoogleAnalytics', e));

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Projects', component: ListPage, icon: 'list' },
      { title: 'Reference Resources', component: ResourcesPage, icon: 'folder' },
      { title: 'Contact Us', component: ContactusPage, icon: 'people' },
      { title: 'Feedback', component: FeedbackPage, icon: 'mail' },
      { title: 'Logout', component: SettingsPage, icon: 'log-out' }
    ];

    
    this.auth.anonymousLogin().then(() => console.log('Anonymous auth login successful'));
    this.listenToLoginEvents();
    
    
    this.helper.getShowLogin().subscribe(obj => {
      console.log('Checking whether to show login:..TurboARB Config:',obj);
      let config:any = obj;
      if(config.showLogin){ //config says yes..check if session exists..if it exists dont show
        console.log('config.showLogin',config.showLogin);
        if(this.checkLoginExpiry()){ // if session expired
          this.rootPage = AuthPage;
          this.loggedIn = false;
        } else {
          console.log('session exists so dont show again...');
          this.rootPage = ListPage;
          this.loggedIn = true;
        }
      } else {
        console.log('config says dont show login page, hence skipping..');
        this.rootPage = ListPage;
        this.loggedIn = true;
      }
      // this.rootPage = config.showLogin ? AuthPage : ListPage;
    });
    
    this.checkLoginExpiry();
  }

  // Not called
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  checkLoginExpiry(){
    let storedToken:any = localStorage.getItem('user');
    if(!storedToken) { // not logged in.
      this.loggedIn = false; //important to hide the sidemenu if session is expired.
      return true; // yes session is expired
    } else {
      let token = JSON.parse(storedToken);
      if(new Date().getTime() > token.time) { // see if expired
        console.log('Login expired');
        this.loggedIn = false;
        this.logout();
      } else {
        // this.rootPage =  ListPage ;
        this.loggedIn = true;
        console.log('StoredToken found. Calling GetAcctDetail for:',token.username);
        this.username = token.username;
        this.name = token.name;
        this.title = token.title;
        this.department = token.department;
        // this.accountDetail = this.helper.getAccountDetail(token.username);
        return false;
      }

    }
  }

   
  logout() {
    console.log("Publishing logout event");
    localStorage.removeItem('user'); 
    this.events.publish('user:logout');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log('Page title..',page.title);
    
    if(page.title == 'Logout') {
      this.logout();
      return;
    }
    this.nav.setRoot(page.component);
  }

  

  listenToLoginEvents() {
    this.events.subscribe('user:login', (userId) => {
      console.log('Heard Login !!');
      this.checkLoginExpiry();
      this.loggedIn = true;
      this.rootPage =  ListPage ;
    });
    


    this.events.subscribe('user:logout', () => {
      console.log('Heard Logout !!');
      this.loggedIn = false;
      this.checkLoginExpiry();
      this.rootPage =  AuthPage;
    });
  }
}
