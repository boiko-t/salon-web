import { Module } from 'vuex';
import { RootState, AuthState } from '../../types';

export const state: AuthState = {
  name: '',
};

const namespaced: boolean = true;

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
};
