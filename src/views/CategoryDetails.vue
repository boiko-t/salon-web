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
          justify-end
        >
          <v-btn
            v-show="editMode"
            @click="onEditSave"
            flat
            outline
            color="success">{{$t('actionSaveEdit')}}
          </v-btn>
          <v-btn
            v-show="editMode"
            @click="onEditCancel"
            flat
            outline
            color="orange">{{$t('actionCancelEdit')}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click="onEdit"
            class="grey--text"
            icon>
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            @click="onDeleteCategory"
            class="grey--text"
            icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-layout>
        <label>
          <v-img
            :class="[editMode ? 'upload-image' : '']"
            class="mx-auto"
            :src="category.imageUrl"
            height="300px"
            width="300px"
            contain
          ><input v-if="editMode"
                  type="file"
                  accept="image/*"
                  ref="imageUploadInput"
                  @change="onFileUpload"
                  id="fileUpload"/>
          </v-img>
        </label>
        <div
          v-if="editMode"
        >
          <v-text-field
            v-model="buffer.name"
            :label="$t('categoryNameLabel')"
            required></v-text-field>
          <v-text-field
            v-model="buffer.description"
            :label="$t('categoryDescriptionLabel')"
            required></v-text-field>
        </div>
        <div
          v-else>
          <h3 class="headline ma-0">{{category.name}}</h3>
          <div class="white-space">{{category.description}}</div>
        </div>
        <product-list :products="productList" routerPath="products"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Category } from '@/entities/index';
import ProductList from '@/components/ProductList.vue';

  @Component({
    components: {
      ProductList,
    },
    computed: {
      productList() {
        return this.$store.state.categories.productList;
      },
      category: {
        get() {
          return this.$store.state.categories.categoryDetails;
        },
        set(value) {
          this.category = value;
        },
      },
      id() {
        return this.$route.params.id;
      },
      buffer() {
        const result = new Category();
        result.setName(this.category.getName());
        result.setDescription(this.category.getDescription());
        return result;
      },
    },
    beforeMount() {
      this.editMode = !!this.$route.params.edit;
      this.$store.dispatch('categories/getCategoryById', this.id);
    },
  })
export default class CategoryDetailed extends Vue {
    public editMode: boolean = false;
    public category!: Category;
    public buffer!: Category;
    public initCategoryImgPath: string = '';
    id!: string;

    onDeleteCategory() {
      this.$store.dispatch('categories/delete', this.id);
      this.$router.back();
    }

    onFileUpload() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.$refs.imageUploadInput['files'][0]);
      fileReader.addEventListener('load', (e) => {
        this.category.setImageUrl(e.target['result']);
      });
    }

    onEditSave() {
      this.editMode = false;
      this.category.setName(this.buffer.getName());
      this.category.setDescription(this.buffer.getDescription());
      this.$store.dispatch('categories/updateCategoryDetailed');
    }

    onEdit() {
      this.initCategoryImgPath = this.category.getImageUrl();
      this.editMode = true;
    }

    onEditCancel() {
      this.category.setImageUrl(this.initCategoryImgPath);
      this.editMode = false;
    }
}
</script>
<style lang="scss">
  .upload-image {
    border-radius: 2px;
    cursor: pointer;
    transition: box-shadow .1s linear;

    &:hover {
      @include shadow-2dp-color(#212121);
    }
  }
</style>
