import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase, {User} from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'


/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

public userProfile:firebase.database.Reference;
  public currentUser:User;
  //constructor(public http: HttpClient) {
  constructor() {
    console.log('Hello ProfileProvider Provider');
    //cek firebase
    firebase.auth()
    .onAuthStateChanged(user=> {
      if(user){
        this.currentUser=user;
        this.userProfile=firebase.database()
        .ref(`/userProfile/${user.uid}`);
      } 
    });
  }


  getUserProfile(): firebase.database.Reference{
    return this.userProfile;
  }
}
