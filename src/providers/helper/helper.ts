import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  projects:any;
  projects$:AngularFireList<Object>;
  data: any = null;
  constructor(public http: HttpClient,private af: AngularFireDatabase) {
    console.log('Hello HelperProvider Provider');

    this.projects$ = this.af.list('/projects');
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

  addData(obj) {
    console.log('adding data');
    
    this.projects$.push(obj);
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
