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
          <h3 class="headline ma-0">{{category.name}}</h3>
          <div>{{category.description}}</div>
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
    ...mapState('categories', { category: 'categoryDetailed' }),
    id() {
      return this.$route.params.id;
    },
    isEditMode() {
      return !!this.$route.params.edit;
    },
  },
  mounted() {
    this.$store.dispatch('categories/getCategoryById', this.id);
  },
})
export default class CategoryDetailed extends Vue {
  category!: Category;
  id!: string;
  editMode!: boolean;
}
</script>
<style lang="scss">
</style>
