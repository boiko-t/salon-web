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
              color="success">{{$t('actionSaveEdit')}}</v-btn>
            <v-btn
              v-show="editMode"
              @click="onEditCancel"
              flat
              outline
              color="orange">{{$t('actionCancelEdit')}}</v-btn>
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
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            height="300px"
          ></v-img>
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
            <div>{{category.description}}</div>
          </div>
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
    // ...mapState('categories', { category: 'categoryDetails' }),
    category: {
      get() {
        return this.$store.state.categories.categoryDetails || {};
      },
      set(value) {
        this.category = value;
      },
    },
    id() {
      return this.$route.params.id;
    },
    buffer() {
      const result = new Category('', '', '');
      result.setName(this.category.getName());
      result.setDescription(this.category.getDescription());
      return result;
    },
  },
  mounted() {
    this.editMode = !!this.$route.params.edit;
    this.$store.dispatch('categories/getCategoryById', this.id);
  },
})
export default class CategoryDetailed extends Vue {
  public editMode: boolean = false;
  public category!: Category;
  public buffer!: Category;
  id!: string;

  onDeleteCategory() {
    this.$store.dispatch('categories/delete', this.id);
    this.$router.back();
  }

  onEditSave() {
    this.editMode = false;
    this.category.setName(this.buffer.getName());
    this.category.setDescription(this.buffer.getDescription());
    this.$store.dispatch('categories/updateCategoryDetailed');
  }

  onEdit() {
    this.editMode = true;
  }

  onEditCancel() {
    this.editMode = false;
  }
}
</script>
<style lang="scss">
</style>
