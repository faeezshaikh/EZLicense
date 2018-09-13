import {Events} from "ionic-angular/index";
import {Injectable} from "@angular/core";

// export const _USER_LOGOUT_EVENT = 'user:logout';
export const _USER_LOGIN_EVENT = 'user:login';
export const _LOGIN_ERROR_EVENT = 'login:error';

@Injectable()
export class EventsService {

  constructor(public events:Events) {

  }

  sendLoggedInEvent() {
    console.log("Publishing login event");
    this.events.publish(_USER_LOGIN_EVENT);
  }

  sendLogInErrorEvent() {
    console.log("Publishing login error event");
    this.events.publish(_LOGIN_ERROR_EVENT);
  }


}