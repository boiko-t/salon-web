<template>
    <v-app>
        <core-menu/>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
import CoreMenu from '@/components/CoreMenu.vue';

export default {
  name: 'App',
  components: {
    CoreMenu,
  },
};
</script>
