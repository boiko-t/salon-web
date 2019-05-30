<template>
    <v-container
            fill-height
            fluid
            grid-list-xl
    >
      <v-layout
        justify-center
      >
        <v-flex md10
                xs12
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            height="300px"
          ></v-img>
            <h3 class="headline ma-0">{{1}}</h3>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import { Category } from '@/entities/index';

@Component({
  computed: {
    id() {
      return this.$route.params.id;
    },
    isEditMode() {
      return !!this.$route.params.edit;
    },
  },
  mounted() {
    this.init();
  },
})
export default class Categories extends Vue {
  category!: Category;
  id!: number;

  init() {
    this.$store.dispatch('categories/delete', this.id);
  }
}
</script>
<style lang="scss">
</style>
