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
          <v-layout
            justify-center
          >
            <img
              class="upload-image"
              src="../assets/icons/upload-image.png"
              height="300px"
            />
          </v-layout>
          <div>
            <v-text-field
              v-model="category.name"
              :label="$t('categoryNameLabel')"
              required></v-text-field>
            <v-text-field
              v-model="category.description"
              :label="$t('categoryDescriptionLabel')"
              required></v-text-field>
          </div>
          <v-layout
            justify-end
          >
            <v-btn
              @click="onEditSave"
              flat
              outline
              color="success">{{$t('actionSaveEdit')}}</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Category } from '@/entities/index';

@Component({
  computed: {
    imageUrl() {
      return this.category.imageUrl || '';
    },
  },
})
export default class CategoryCrete extends Vue {
  public category: Category = new Category('1', 'jdj', 'ddd', '');
  id!: string;

  onEditSave() {
    this.$store.dispatch('categories/create', this.category);
  }
}
</script>
<style lang="scss">
  .upload-image {
    padding: 0 30px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      @include shadow-2dp-color(#212121);
    }
  }
</style>
