<template>
    <v-app>
        <core-menu/>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
import * as firebase from 'firebase';
import CoreMenu from '@/components/CoreMenu.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    CoreMenu,
  },

  mounted() {
    const messaging = firebase.messaging();

    messaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        messaging.getToken()
          .then(e => console.log(`token ${e}`));
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });

    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
    });
  },
})
export default class App extends Vue {
}
</script>
