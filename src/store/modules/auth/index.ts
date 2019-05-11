import { Module } from 'vuex';
import { RootState, AuthState } from '../../types';

export const state: AuthState = {
  name: '12444544',
};

const namespaced: boolean = true;

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
};
