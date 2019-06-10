<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    class="pr-45"
  >
    <v-fab-transition>
      <v-btn
        color="success"
        dark
        fixed
        bottom
        right
        fab
        to="new-service"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-layout
      space-between
      wrap
    >
      <product-list :products="services" routerPath="services"/>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import { Service } from '@/entities/index';
import ProductList from '@/components/ProductList.vue';

@Component({
  components: { ProductList },
  computed: {
    ...mapState('services', ['services']),
  },
  mounted() {
    this.init();
  },
})
export default class Services extends Vue {
    services!: Service[];

    init() {
      this.$store.dispatch('services/initCollection');
    }

  // deleteCategory(id) {
  //   this.$store.dispatch('services/delete', id);
  // }
}
</script>
<style lang="scss">
</style>
