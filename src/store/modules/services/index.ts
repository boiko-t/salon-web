import { Module } from 'vuex';
import { Service } from '@/entities/index';
import RootState from '../../types';
import FirebaseDatabaseService from '@/services/FirebaseDatabaseService';

import DataSnapshot = firebase.database.DataSnapshot;

const SERVICES_NODE_NAME = 'services';

class State {
  services: Service[] = [];
  serviceDetails: Service = new Service();
}

export const actions = {
  initCollection({ commit }: { commit: any }) {
    const dbService = new FirebaseDatabaseService();
    dbService.setDataListener(SERVICES_NODE_NAME, (data: DataSnapshot) => {
      commit('SET_COLLECTIONS', data.val());
    });
  },
};

export const mutations = {
  SET_COLLECTIONS(state: State, data: any) {
    const dataKeys = Object.keys(data) || [];
    dataKeys.forEach((key) => {
      const updatedItem = state.services.find(item => item.getId() === key);
      if (updatedItem) {
        updatedItem.setName(data[key].name);
        updatedItem.setDescription(data[key].description);
        updatedItem.setPrice(data[key].price);
      } else {
        state.services
          .push(new Service(key, data[key].name, data[key].description, data[key].price));
      }
    });
    if (dataKeys.length !== state.services.length) {
      state.services = state.services.filter(item => dataKeys.includes(item.getId()));
    }
  },
};

const namespaced: boolean = true;

export const services: Module<State, RootState> = {
  namespaced,
  state: new State(),
  mutations,
  actions,
};
