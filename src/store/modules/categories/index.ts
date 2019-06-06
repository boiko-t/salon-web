import { Module, Action } from 'vuex';
import { Category, Product } from '@/entities/index';
import * as firebase from 'firebase/app';
import RootState from '../../types';
import FirebaseDatabaseService from '@/services/FirebaseDatabaseService';

import DataSnapshot = firebase.database.DataSnapshot;
import FirebaseStorageService from '@/services/FirebaseStorageService';

class State {
  categories: Category[] = [];
  categoryDetails: Category = new Category('', '', '', '');
  productList: Product[] = [];
}

export const actions = {
  initCollection({ commit }: { commit: any }) {
    const service = new FirebaseDatabaseService();
    service.setDataListener('categories', (data: DataSnapshot) => {
      commit('SET_COLLECTIONS', data.val());
    });
  },

  getCategoryById({ state, commit }: { state: State, commit: any }, id: string) {
    const service = new FirebaseDatabaseService();
    service.setDataListener(`categories/${id}`, (data: DataSnapshot) => {
      commit('SET_CATEGORY_DETAILED', { data: data.val(), id });
    });
    service.setDataListener('products', (data: DataSnapshot) => {
      commit('SET_CATEGORY_DETAILED_PRODUCTS', { data: data.val(), id });
    });
  },

  updateCategoryDetailed({ state, commit }: { state: State, commit: any }) {
    const service = new FirebaseDatabaseService();
    service.updateData(`categories/${state.categoryDetails.getId()}`, state.categoryDetails.toJson());
  },

  create({ state }: { state: State }, category: Category) {
    const dbService = new FirebaseDatabaseService();
    const storageService = new FirebaseStorageService();
    return dbService.create('categories', 'category', category.toJson())
      .then((id) => {
        storageService.uploadFile(`categories/${id}`, category.getImageUrl())
          .then((url) => {
            category.setImageUrl(url);
            dbService.updateData(`categories/${id}`, category.toJsonUrl())
          });
        return Promise.resolve(id)
      });
  },

  delete({ state }: { state: State }, id: string) {
    const dbService = new FirebaseDatabaseService();
    const storageService = new FirebaseStorageService();
    const itemId = `categories/${id}`;
    dbService.deleteData(itemId);
    storageService.removeFile(itemId);
  },
};

export const mutations = {
  SET_CATEGORY_DETAILED(state: State, { data, id }: { data: any, id: string}) {
    if (data) {
      state.categoryDetails = new Category(id, data.name, data.description, data.imageUrl);
    }
  },

  SET_CATEGORY_DETAILED_PRODUCTS(state: State, { data, id }: { data: any, id: string}) {
    const dataKeys = Object.keys(data) || [];
    const products = [];
    dataKeys.forEach((key) => {
      if (data[key].category === id) {
        products.push(new Product(key, id, data[key].name,
          data[key].description, data[key].price, data[key].unit));
      }
    });
    state.productList = [...products];
  },

  SET_COLLECTIONS(state: State, data: any) {
    const dataKeys = Object.keys(data) || [];
    dataKeys.forEach((key) => {
      const updatedItem = state.categories.find(item => item.getId() === key);
      if (updatedItem) {
        updatedItem.setImageUrl(data[key].imageUrl);
        updatedItem.setName(data[key].name);
        updatedItem.setDescription(data[key].description);
      } else {
        state.categories.push(new Category(key, data[key].name, data[key].description, data[key].imageUrl));
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
