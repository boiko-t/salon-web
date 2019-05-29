import { Module } from 'vuex';
import { Category } from '@/entities/index';
import * as firebase from 'firebase/app';
import RootState from '../../types';
import FirebaseDatabaseService from '@/services/FirebaseDatabaseService';

import DataSnapshot = firebase.database.DataSnapshot;

class State {
  categories: Category[] = [];
}

export const actions = {
  initCollection({ state, commit }: { state: State, commit: any }) {
    const service = new FirebaseDatabaseService();
    service.setDataListener('categories', (data: DataSnapshot) => {
      commit('SET_COLLECTIONS', data.val());
    });
  },

  delete({ state }: { state: State }, id: string) {
    const service = new FirebaseDatabaseService();
    service.deleteData(`categories/${id}`);
  },
};

export const mutations = {
  SET_COLLECTIONS(state: State, data: any) {
    const dataKeys = Object.keys(data);
    dataKeys.forEach((key) => {
      const updatedItem = state.categories.find(item => item.getId() === key);
      if (updatedItem) {
        updatedItem.setName(data[key].name);
        updatedItem.setDescription(data[key].description);
      } else {
        state.categories.push(new Category(key, data[key].name, data[key].description));
      }
    });
    if (dataKeys.length !== state.categories.length) {
      state.categories = state.categories.filter(item => dataKeys.includes(item.getId()));
    }
  },
};

const namespaced: boolean = true;

export const categories: Module<State, RootState> = {
  namespaced,
  state: new State(),
  mutations,
  actions,
};
