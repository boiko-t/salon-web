import Vue from 'vue';
import './plugins/vuetify';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyAPc01f7w2y5Ez7c1xq6jk3rgo8buM1Ueo',
  authDomain: 'test-app-59413.firebaseapp.com',
  databaseURL: 'https://test-app-59413.firebaseio.com',
  projectId: 'test-app-59413',
  storageBucket: 'test-app-59413.appspot.com',
  messagingSenderId: '622914864864',
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
