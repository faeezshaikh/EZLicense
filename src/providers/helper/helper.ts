import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  projects:any;
  data: any = null;
  constructor(public http: HttpClient) {
    console.log('Hello HelperProvider Provider');
  }

  setProjectList(p) {
    this.projects = p;
  }

  getProjectList(){
    return this.projects;
  }



  getData() {
    return this.load().then(res => {
      this.data = res;
      console.log('data received->', res);
      return this.data;
    });
  }

  load() {
    
        console.log("Loading file..");
        
        // if (this.data) {
        //   return Promise.resolve(this.data);
        // }
        // if (!this.data) {
          return new Promise(resolve => {
            this.http.get('assets/data/questions.js')
              // .map(res => res.json())
              .subscribe(data => {
                this.data = data;
                resolve(this.data);
              });
          });
      // }
      }
}
