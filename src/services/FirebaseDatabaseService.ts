/* eslint-disable class-methods-use-this */
import * as firebase from 'firebase/app';
import 'firebase/database';

import DataSnapshot = firebase.database.DataSnapshot;

export default class FirebaseDatabaseService {
  database = firebase.database();

  setDataListener(path: string, updateHandler: (data: DataSnapshot) => void) {
    this.database.ref(path)
      .on('value', updateHandler);
  }

  updateData(path: string, newData: object) {
    this.database.ref(path)
      .set(newData);
  }

  deleteData(path: string) {
    this.database.ref(path).remove();
  }
}
