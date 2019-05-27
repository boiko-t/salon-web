import { Module } from 'vuex';
import { RootState } from '../../types';
import * as firebase from 'firebase/app';
import FirebaseAuthService from '@/services/FirebaseAuthService';

class State {
  public name: string = '';
  public email: string = '';
  public password: string = '';
}

export const actions = {
  async signIn({ state, commit }: {state: State, commit: any}) {
    const service = new FirebaseAuthService();
    const user = await service.signIn(state.email, state.password);
    commit('SET_USER_DATA', user.user);
  },
  async signInGoogle({ commit }: {commit: any}) {
    const service = new FirebaseAuthService();
    const user = await service.signInGoogle();
    commit('SET_USER_DATA', user.user);
  },
};

export const mutations = {
  UPDATE_EMAIL(state: State, value: string) {
    state.email = value;
  },
  UPDATE_PASSWORD(state: State, value: string) {
    state.password = value;
  },
  SET_USER_DATA(state: State, user: firebase.User) {
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
