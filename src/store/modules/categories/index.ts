import { Module } from 'vuex';
import { Category, Product } from '@/entities/index';
import RootState from '../../types';
import FirebaseDatabaseService from '@/services/FirebaseDatabaseService';
import FirebaseStorageService from '@/services/FirebaseStorageService';

import DataSnapshot = firebase.database.DataSnapshot;

const CATEGORY_NODE_NAME = 'categories';
const PRODUCT_NODE_NAME = 'products';

class State {
  categories: Category[] = [];
  categoryDetails: Category = new Category('', '', '', '');
  productList: Product[] = [];
}

export const actions = {
  initCollection({ commit }: { commit: any }) {
    const dbService = new FirebaseDatabaseService();
    dbService.setDataListener(CATEGORY_NODE_NAME, (data: DataSnapshot) => {
      commit('SET_COLLECTIONS', data.val());
    });
  },

  getCategoryById({ state, commit }: { state: State, commit: any }, id: string) {
    const dbService = new FirebaseDatabaseService();
    dbService.setDataListener(`${CATEGORY_NODE_NAME}/${id}`, (data: DataSnapshot) => {
      commit('SET_CATEGORY_DETAILED', { data: data.val(), id });
    });
    dbService.setDataListener(PRODUCT_NODE_NAME, (data: DataSnapshot) => {
      commit('SET_CATEGORY_DETAILED_PRODUCTS', { data: data.val(), id });
    });
  },

  updateCategoryDetailed({ state }: { state: State }) {
    const dbService = new FirebaseDatabaseService();
    const storageService = new FirebaseStorageService();
    dbService.updateData(`${CATEGORY_NODE_NAME}/${state.categoryDetails.getId()}`, state.categoryDetails.toJsonUrl());
    storageService.uploadFile(
      `${CATEGORY_NODE_NAME}/${state.categoryDetails.getId()}`,
      state.categoryDetails.getImageUrl(),
    );
  },

  create({ state }: { state: State }, category: Category) {
    const dbService = new FirebaseDatabaseService();
    const storageService = new FirebaseStorageService();
    return dbService.create(CATEGORY_NODE_NAME, 'category', category.toJson())
      .then((id) => {
        storageService.uploadFile(`${CATEGORY_NODE_NAME}/${id}`, category.getImageUrl())
          .then((url) => {
            category.setImageUrl(url);
            dbService.updateData(`${CATEGORY_NODE_NAME}/${id}`, category.toJsonUrl());
          });
        return Promise.resolve(id);
      });
  },

  delete({ state }: { state: State }, id: string) {
    const dbService = new FirebaseDatabaseService();
    const storageService = new FirebaseStorageService();
    const itemId = `${CATEGORY_NODE_NAME}/${id}`;
    dbService.deleteData(itemId);
    storageService.removeFile(itemId);
  },
};

export const mutations = {
  SET_CATEGORY_DETAILED(state: State, { data, id }: { data: any, id: string }) {
    if (data) {
      state.categoryDetails = new Category(id, data.name, data.description, data.imageUrl);
    }
  },

  SET_CATEGORY_DETAILED_PRODUCTS(state: State, { data, id }: { data: any, id: string }) {
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
        state.categories
          .push(new Category(key, data[key].name, data[key].description, data[key].imageUrl));
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
