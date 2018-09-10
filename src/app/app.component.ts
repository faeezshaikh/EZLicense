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
import {AuthPage} from '../pages/auth/auth';
import {SettingsPage} from '../pages/settings/settings';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = ListPage;
  rootPage: any = AuthPage;
  user:any;
  
  pages: Array<{title: string, component: any,icon: string}>;

  constructor(public platform: Platform,public auth: AuthService, public events:Events) {
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
      // { title: 'Video Resources', component: ListPage, icon: 'logo-youtube' },
      { title: 'Reference Resources', component: ResourcesPage, icon: 'folder' },
      { title: 'Contact Us', component: ContactusPage, icon: 'people' },
      { title: 'Feedback', component: FeedbackPage, icon: 'mail' },
      { title: 'Logout', component: SettingsPage, icon: 'log-out' }
    ];

    
    this.auth.anonymousLogin().then(() => console.log('Anonymous auth login successful'));
    this.listenToLoginEvents();
    this.checkLoginStatus();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  checkLoginStatus(){
    let storedToken:string = localStorage.getItem('user');
    if(!storedToken) { // not logged in.
      this.user = null;  // necessary to hide the side menu items
    } else {
      let token = JSON.parse(storedToken);
      console.log('token:.time',token.time);
      console.log('current time:',new Date().getTime());
      
      if(new Date().getTime() > token.time) { // see if expired
        console.log('Login expired');
        this.logout();
      } else {
        this.rootPage =  ListPage ;
        this.user = storedToken;
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
    this.nav.setRoot(page.component);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      console.log('Heard Login !!');
      this.checkLoginStatus();
      this.rootPage =  ListPage ;
    });


    this.events.subscribe('user:logout', () => {
      console.log('Heard Logout !!');
      this.checkLoginStatus();
      this.rootPage =  AuthPage;
    });
  }
}
