import { Module } from 'vuex';
import * as firebase from 'firebase/app';
import FirebaseAuthService from '@/services/FirebaseAuthService';
import RootState from '../../types';

import User = firebase.User;

class State {
  public name: string = '';
  public email: string = '';
  public password: string = '';
}

export const actions = {
  isUserAuth({ commit }: { commit: any }) {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe();
        if (user) {
          commit('SET_USER_DATA', user);
        }
        resolve(user);
      }, reject);
    });
  },

  async signIn({ state, commit }: {state: State, commit: any}) {
    const service = new FirebaseAuthService();
    return service.signIn(state.email, state.password)
      .then(({ user }) => commit('SET_USER_DATA', user))
      .catch(e => Promise.reject(e));
  },

  async signInGoogle({ commit }: {commit: any}) {
    const service = new FirebaseAuthService();
    return service.signInGoogle()
      .then(({ user }) => commit('SET_USER_DATA', user))
      .catch(e => Promise.reject(e));
  },

  async signOut({ commit }: {commit: any}) {
    const service = new FirebaseAuthService();
    return service.signOut()
      .then(() => commit('SET_USER_DATA', {}))
      .catch(e => Promise.reject(e));
  },
};

export const mutations = {
  UPDATE_EMAIL(state: State, value: string) {
    state.email = value;
  },
  UPDATE_PASSWORD(state: State, value: string) {
    state.password = value;
  },
  SET_USER_DATA(state: State, user: User) {
    state.name = user.displayName || user.email || '';
    state.email = user.email || '';
  },
};

const namespaced: boolean = true;

export const auth: Module<State, RootState> = {
  namespaced,
  state: new State(),
  mutations,
  actions,
};
