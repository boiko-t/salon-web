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

  create(path: string, data: object) {
    const newItemKey = firebase.database().ref().child(path).push().key;
    const updates = {};
    updates[`${path}/${newItemKey}`] = data;
    return this.database.ref()
      .update(updates);
  }

  deleteData(path: string) {
    this.database.ref(path).remove();
  }
}
