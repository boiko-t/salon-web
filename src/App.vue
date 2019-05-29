<template>
    <v-app>
        <core-menu/>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import CoreMenu from '@/components/CoreMenu.vue';
import FirebaseNotificationService from '@/services/FirebaseNotificationService';
import { Notification } from '@/services/types/Notification';
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component({
  components: {
    CoreMenu,
  },

  mounted() {
    const notificationService = new FirebaseNotificationService();
    notificationService.subscribe(this.handleForegroundNotification);

    const database = firebase.database();
    database.ref('products/products2').set({
      name: 'Loreal Paris',
      description: 'Lorem',
    });
    // database.ref('/categories').on('value', snapshot => console.log(snapshot.val()));
  },
})
export default class App extends Vue {
  handleForegroundNotification(notification: Notification) {
    this.$toast.info(notification.getBody());
  }
}
</script>
