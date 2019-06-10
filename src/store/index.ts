import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import RootState from './types';
import { auth } from './modules/auth/index';
import { categories } from './modules/categories/index';
import { products } from './modules/products/index';
import { services } from './modules/services/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '0.0.1',
  },
  modules: {
    auth,
    categories,
    products,
    services,
  },
};
export default new Vuex.Store(store);
