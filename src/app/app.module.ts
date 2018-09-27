import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CreatePage } from '../pages/create/create';
import { ListPage } from '../pages/list/list';

// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http'; 

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HelperProvider } from '../providers/helper/helper';
import { FormPage } from '../pages/form/form';
import { DetailsPage } from '../pages/details/details';
import { ContactusPage } from '../pages/contactus/contactus';
import { ResourcesPage } from '../pages/resources/resources';
import { Ng2OdometerModule } from 'ng2-odometer'; 
// import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {RoundProgressModule} from 'angular-svg-round-progressbar'
import { FeedbackPage } from '../pages/feedback/feedback';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ReversePipe } from '../providers/helper/reversePipe';
import { AuthService } from '../providers/helper/AuthService';

import { AngularFireAuthModule } from 'angularfire2/auth';
import {AuthPage} from '../pages/auth/auth';
import {EventsService} from '../providers/helper/events';
import {SettingsPage} from '../pages/settings/settings';
// import { CONFIG } from '../assets/env';

 
// AF-QA
export const CONFIG: any = {
  "firebaseConfig": {
    apiKey: "AIzaSyD_frq7MRtc3w6jnB7q8uNGcsRLdsmSY3I",
    authDomain: "ameren-arb-qa.firebaseapp.com",
    databaseURL: "https://ameren-arb-qa.firebaseio.com",
    projectId: "ameren-arb-qa",
    storageBucket: "ameren-arb-qa.appspot.com",
    messagingSenderId: "793569975472"
  }
};

export const firebaseConfig = CONFIG.firebaseConfig;

@NgModule({
  declarations: [
    MyApp,
    CreatePage,
    ListPage,
    FormPage,
    DetailsPage,
    ContactusPage,
    ResourcesPage,
    FeedbackPage,
    ReversePipe,
    AuthPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    Ng2OdometerModule.forRoot(),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireStorageModule,
    RoundProgressModule,
    IonicImageViewerModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreatePage,
    ListPage,
    FormPage,
    DetailsPage,
    ContactusPage,
    ResourcesPage,
    FeedbackPage,
    AuthPage,
    SettingsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HelperProvider,
    AuthService,
    EventsService
  ]
})
export class AppModule {}
