import Vue from 'vue';
import './plugins/vuetify';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store/index';
import i18n from './i18n';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyAPc01f7w2y5Ez7c1xq6jk3rgo8buM1Ueo',
  authDomain: 'test-app-59413.firebaseapp.com',
  databaseURL: 'https://test-app-59413.firebaseio.com',
  projectId: 'test-app-59413',
  storageBucket: 'test-app-59413.appspot.com',
  messagingSenderId: '622914864864',
  appId: '1:622914864864:web:e48a7daa1c08c93c',
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
