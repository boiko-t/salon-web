<template>
  <v-app>
    <core-toolbar/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import CoreToolbar from './components/core/Toolbar.vue';

export default {
  name: 'App',
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
    };
  },
  components: {
    CoreToolbar,
  },
};
</script>

<style lang="scss">
  @import 'assets/styles/imports';
</style>
