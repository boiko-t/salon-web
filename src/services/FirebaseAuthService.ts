/* eslint-disable class-methods-use-this */
import AuthService from '@/services/types/Auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import UserCredential = firebase.auth.UserCredential;

export default class FirebaseAuthService implements AuthService<UserCredential> {
  async signIn(login: string, password: string): Promise<UserCredential> {
    try {
      return firebase.auth().signInWithEmailAndPassword(login, password);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  signInGoogle(): Promise<UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
      .catch(e => Promise.reject(e));
  }

  signOut() {
    return firebase.auth().signOut();
  }

  signUpPassword(login: string, password: string): Promise<UserCredential> {
    return Promise.reject();
  }
}
