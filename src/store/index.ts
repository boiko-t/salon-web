import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { auth } from './modules/auth/index';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '0.0.1',
  },
  modules: {
    auth,
  },
};
export default new Vuex.Store(store);
