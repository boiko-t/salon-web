import { Module } from 'vuex';
import { Visit } from '@/entities/index';
import RootState from '../../types';
import FirebaseDatabaseService from '@/services/FirebaseDatabaseService';

import DataSnapshot = firebase.database.DataSnapshot;

const CATEGORY_NODE_NAME = 'visits';

class State {
  visits: Visit[] = [];
}

export const actions = {
  initCollection({ commit }: { commit: any }) {
    const dbService = new FirebaseDatabaseService();
    dbService.setDataListener(CATEGORY_NODE_NAME, (data: DataSnapshot) => {
      commit('SET_COLLECTIONS', data.val());
    });
  },
};

export const mutations = {
  SET_COLLECTIONS(state: State, data: any) {
    const dataKeys = Object.keys(data) || [];
    dataKeys.forEach((key) => {
      state.visits
        .push(new Visit(key, data[key].clientName, data[key].masterName, data[key].date,
          data[key].price, data[key].service, data[key].products));
    });
  },
};

const namespaced: boolean = true;

export const visits: Module<State, RootState> = {
  namespaced,
  state: new State(),
  mutations,
  actions,
};
