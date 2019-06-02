import { Module } from 'vuex';
import { CategoryPreview, Product } from '@/entities/index';
import RootState from '../../types';
import FirebaseDatabaseService from '@/services/FirebaseDatabaseService';

import DataSnapshot = firebase.database.DataSnapshot;

class State {
  product: Product = new Product('', '', '', '', '', '');
  categoryList: CategoryPreview[] = [];
}

export const actions = {
  getProductById({ state, commit }: { state: State, commit: any }, id: string) {
    const service = new FirebaseDatabaseService();
    service.setDataListener(`products/${id}`, (data: DataSnapshot) => {
      commit('SET_PRODUCT', { data: data.val(), id });
    });
  },
  getCategories({ commit }: { state: State, commit: any }) {
    const service = new FirebaseDatabaseService();
    service.setDataListener('categories', (data: DataSnapshot) => {
      commit('SET_CATEGORIES', { data: data.val() });
    });
  },

  updateProduct({ state, commit }: { state: State, commit: any }) {
    const service = new FirebaseDatabaseService();
    service.updateData(`products/${state.product.id}`, state.product.toJson());
  },

  delete({ state }: { state: State }, id: string) {
    const service = new FirebaseDatabaseService();
    service.deleteData(`products/${id}`);
  },
};

export const mutations = {
  SET_PRODUCT(state: State, { data, id }: { data: any, id: string}) {
    state.product = new Product(id, data.category, data.name,
      data.description, data.price, data.unit);
  },
  SET_CATEGORIES(state: State, { data }: { data: any}) {
    const dataKeys = Object.keys(data) || [];
    const categories = [];
    dataKeys.forEach((key) => {
      categories.push(new CategoryPreview(key, data[key].name));
    });
    state.categoryList = [...categories];
  },
};

const namespaced: boolean = true;

export const products: Module<State, RootState> = {
  namespaced,
  state: new State(),
  mutations,
  actions,
};
