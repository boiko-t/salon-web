import { Module } from 'vuex';
import { Product, Service } from '@/entities/index';
import RootState from '../../types';
import FirebaseDatabaseService from '@/services/FirebaseDatabaseService';

import DataSnapshot = firebase.database.DataSnapshot;

const SERVICES_NODE_NAME = 'services';

class State {
  services: Service[] = [];
  service: Service = new Service();
}

export const actions = {
  initCollection({ commit }: { commit: any }) {
    const dbService = new FirebaseDatabaseService();
    dbService.setDataListener(SERVICES_NODE_NAME, (data: DataSnapshot) => {
      commit('SET_COLLECTIONS', data.val());
    });
  },
  getServicesById({ state, commit }: { state: State, commit: any }, id: string) {
    const service = new FirebaseDatabaseService();
    service.setDataListener(`${SERVICES_NODE_NAME}/${id}`, (data: DataSnapshot) => {
      commit('SET_SERVICE', { data: data.val(), id });
    });
  },
  updateService({ state, commit }: { state: State, commit: any }) {
    const service = new FirebaseDatabaseService();
    service.updateData(`${SERVICES_NODE_NAME}/${state.service.getId()}`, state.service.toJson());
  },
  delete({ state }: { state: State }, id: string) {
    const service = new FirebaseDatabaseService();
    service.deleteData(`${SERVICES_NODE_NAME}/${id}`);
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
  SET_SERVICE(state: State, { data, id }: { data: any, id: string}) {
    state.service = new Service(id, data.name,
      data.description, data.price);
  },
};

const namespaced: boolean = true;

export const services: Module<State, RootState> = {
  namespaced,
  state: new State(),
  mutations,
  actions,
};
