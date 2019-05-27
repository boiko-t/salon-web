import Vue from 'vue';
import Vuetify, { VIcon, VSnackbar } from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar';
import 'vuetify/src/stylus/app.styl';
import theme from './theme';


Vue.use(VuetifyToast, {
  icon: 'error',
});

Vue.use(Vuetify, {
  components: {
    VIcon,
    VSnackbar,
  },
  iconfont: 'md',
  theme,
});
