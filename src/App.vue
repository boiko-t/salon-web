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

@Component({
  components: {
    CoreMenu,
  },

  mounted() {
    const notificationService = new FirebaseNotificationService();
    notificationService.subscribe(this.handleForegroundNotification);
  },
})
export default class App extends Vue {
  handleForegroundNotification(notification: Notification) {
    this.$toast.info(notification.getBody());
  }
}
</script>
