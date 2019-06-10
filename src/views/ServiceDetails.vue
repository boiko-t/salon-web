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
        <material-card
          color="green"
          flat
          full-width
          :title="product.name"
          :text="product.description"
        >
          <v-layout>
            <v-flex md4>
              {{$t('priceLabel')}}
            </v-flex>
            <v-flex md8>
              <v-text-field
                v-if="editMode"
                v-model="buffer.price"
                :label="$t('priceLabel')"
                required></v-text-field>
              <div v-else>
                {{product.price + $t('currency')}}
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>
              {{$t('unitLabel')}}
            </v-flex>
            <v-flex md8>
              <v-text-field
                v-if="editMode"
                v-model="buffer.unit"
                :label="$t('unitLabel')"
                required></v-text-field>
              <div v-else>
                {{product.unit}}
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex md4>
              {{$t('categoryLabel')}}
            </v-flex>
            <v-flex md8>
              <v-overflow-btn
                v-if="editMode"
                ref="categoryListDropdown"
                :items="categoryList"
                :label="$t('categoryLabel')"
                editable
                item-value="id"
                item-text="name"
              ></v-overflow-btn>
              <div v-else>
                {{categoryCaption}}
              </div>
            </v-flex>
          </v-layout>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import { Product, Unit } from '@/entities/index';
import MaterialCard from '@/components/MaterialCard.vue';

  @Component({
    components: {
      MaterialCard,
    },
    computed: {
      ...mapState('products', ['categoryList']),
      product: {
        get() {
          return this.$store.state.products.product;
        },
        set(value) {
          this.product = value;
        },
      },
      id() {
        return this.$route.params.id;
      },
      buffer() {
        const result = {};
        Object.assign(result, this.product);
        return result;
      },
      categoryCaption() {
        if (this.categoryList.length) {
          return this.categoryList.find(item => item.id === this.product.categoryId).name;
        }
        return '';
      },
    },
    mounted() {
      this.$store.dispatch('service/getProductById', this.id);
      this.$store.dispatch('service/getCategories');
    },
  })
export default class ServiceDetails extends Vue {
    public editMode: boolean = false;
    public product!: Product;
    public buffer!: Product;
    id!: string;

    onDeleteCategory() {
      this.$store.dispatch('products/delete', this.id);
      this.$router.back();
    }

    onEditSave() {
      this.editMode = false;
      Object.assign(this.product, this.buffer);
      this.product.categoryId = this.$refs.categoryListDropdown.selectedItems[0].id;
      this.$store.dispatch('products/updateProduct');
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
