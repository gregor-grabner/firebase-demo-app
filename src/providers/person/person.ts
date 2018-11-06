import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

/*
  Generated class for the PersonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PersonProvider {
  public personListRef: firebase.database.Reference;
  user: any;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.personListRef = firebase
          .database()
          .ref(`/user/${user.uid}/personList`);
      }
    });
  }
  /*
  createPerson(
    personName: string,
    birthday: string,
    amount: number,
    picture: string
  ): firebase.database.ThenableReference {
    return this.personListRef.push({
      name: personName,
      birthday: birthday,
      amount: amount
    });
  }
  */

  createPerson(personName: string, birthday: string, amount: number, personPic: string,): PromiseLike<any> {
    return this.personListRef.push({
      name: personName,
      birthday: birthday,
      amount: amount,
      pictureUrl: ''
    }).then(
      newPerson => {
        if (personPic !== null){
          firebase.storage()
            .ref(`${newPerson.key}/personPic.png`)
            .putString(personPic, 'base64', {contentType: 'image/png'})
            .then(savedPic => {
              let picUrl = savedPic.ref.getDownloadURL();
              firebase.database()
                .ref(`/user/${this.user.uid}/personList/${newPerson.key}`)
                .update({pictureUrl: picUrl}).then(val => {
                console.log(val);
              });
            })
        }
      }
    );
  }

  getPersonList(): firebase.database.Reference {
    return this.personListRef;
  }
}
