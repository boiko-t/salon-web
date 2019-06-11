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

const SIGN_IN_PAGE = '/sign-in';

@Component({
  components: {
    CoreMenu,
  },

  async beforeMount() {
    const user = await this.$store.dispatch('auth/isUserAuth');
    if (!user) this.$router.push(SIGN_IN_PAGE);
  },

  mounted() {
    const service = new FirebaseNotificationService();

    if (this.isAuth()) {
      service.subscribe(this.handleForegroundNotification)
        .catch(e => this.$toast.error(this.$t('notificationAccessError')));
      this.$router.beforeEach((to, from, next) => {
        if (!this.isAuth() && to.fullPath !== SIGN_IN_PAGE) {
          next(SIGN_IN_PAGE);
        } else {
          next();
        }
      });
    }
  },
})
export default class App extends Vue {
  handleForegroundNotification(notification: Notification) {
    this.$toast.info(notification.getBody());
  }

  isAuth() {
    return !!this.$store.state.auth.name;
  }
}
</script>
