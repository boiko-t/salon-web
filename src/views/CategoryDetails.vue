<template>
    <v-container
            fill-height
            fluid
            grid-list-xl
    >
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
    }
  },
  mounted() {
    this.init();
  },
})
export default class Categories extends Vue {
  category!: Category;

  init() {
  }
}
</script>
<style lang="scss">
</style>
