<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hello-i18n/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloI18n from '@/components/HelloI18n.vue';

@Component({
  components: {
    HelloI18n,
  },
})
export default class Home extends Vue {}
</script>
