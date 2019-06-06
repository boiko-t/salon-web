/* eslint-disable class-methods-use-this */
import * as firebase from 'firebase/app';
import 'firebase/storage';

export default class FirebaseStorageService {
  storage = firebase.storage();

  uploadFile(name: string, imageData: string) {
    return this.storage.ref(name)
      .putString(imageData, 'data_url')
      .then((snapshot) => {
        const { fullPath } = snapshot.metadata;
        return this.storage.ref(fullPath).getDownloadURL();
      });
  }
}
