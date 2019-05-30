/* eslint-disable class-methods-use-this */
import * as firebase from 'firebase/app';
import 'firebase/storage';

export default class FirebaseStorageService {
  storage = firebase.storage();

  getFile(path: string) {
    console.log(this.storage.ref().child('categories/category1.png'));
  }
}
