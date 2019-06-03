import { Module } from 'vuex';
import * as firebase from 'firebase/app';
import FirebaseAuthService from '@/services/FirebaseAuthService';
import { reject, resolve } from 'q';
import RootState from '../../types';

import User = firebase.User;

class State {
  public name: string = '';
  public email: string = '';
  public password: string = '';
}

export const actions = {
  isUserAuth({ commit }: { commit: any }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('SET_USER_DATA', user);
      }
    });
  },

  async signIn({ state, commit }: {state: State, commit: any}) {
    const service = new FirebaseAuthService();
    try {
      const { user } = await service.signIn(state.email, state.password);
      commit('SET_USER_DATA', user);
    } catch (error) {
      Promise.reject(error);
    }
  },

  async signInGoogle({ commit }: {commit: any}) {
    const service = new FirebaseAuthService();
    return service.signInGoogle()
      .then(({ user }) => commit('SET_USER_DATA', user))
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
