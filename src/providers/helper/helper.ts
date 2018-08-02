import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  projects:any;
  constructor(public http: HttpClientModule) {
    console.log('Hello HelperProvider Provider');
  }

  setProjectList(p) {
    this.projects = p;
  }

  getProjectList(){
    return this.projects;
  }

}
