import { Component } from '@angular/core';
import { NavController, NavParams ,Events,AlertController} from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  id: string;
  password:any;
  loginError:any;
  isIEOrEdge:boolean;
  version:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private helper:HelperProvider,private events:Events,public alertCtrl: AlertController) {

    this.isIEOrEdge = this.helper.isBrowserIE();
    this.version = this.helper.getVersion();
    console.log('Version:',this.version);
    

    this.events.subscribe('login:error', () => {
      console.log('Heard Login Error');
      this.loginError = this.helper.getLoginError();
      console.log('Login Error',this.loginError);
      let msg;
      if(this.loginError.error && this.loginError.error.response) {
        if(this.loginError.error.response.includes("unknown user name or bad password")) {
           msg = "Invalid credentials. Please try again.";
        }
      } else if(this.loginError.message.includes('Http failure response for')) {
        msg = 'Great Scott! The 1.21 Gigawatts flux capacitor just exploded on the Login server. Try again later.';
      }
      this.showAlert(msg);
    });
  }

  showAlert(message) {
 
    const alert = this.alertCtrl.create({
      title: 'Login Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  signMeIn(){

    this.helper.getTurboConfig().subscribe(obj => {
      let config:any = obj;
      if(config.testuser == this.id){ 
        if(config.testpwd == this.password) {
          this.helper.addToLocalStorage(this.helper.getMockObj());
        }
      } else {
        this.helper.callAuthService(this.id,this.password);
      }
    });
  }

}
