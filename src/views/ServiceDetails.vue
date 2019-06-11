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
            @click="onDelete"
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
          <v-layout v-if="editMode">
            <v-flex md4>
              {{$t('productName')}}
            </v-flex>
            <v-flex md8>
              <v-text-field
                v-model="buffer.name"
                :label="$t('productName')"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout v-if="editMode">
            <v-flex md4>
              {{$t('productDescription')}}
            </v-flex>
            <v-flex md8>
              <v-text-field
                v-model="buffer.description"
                :label="$t('productDescription')"></v-text-field>
            </v-flex>
          </v-layout>
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
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import { Product, Service, Unit } from '@/entities/index';
import MaterialCard from '@/components/MaterialCard.vue';

  @Component({
    components: {
      MaterialCard,
    },
    computed: {
      ...mapState('services', ['service']),
      product: {
        get() {
          return this.$store.state.services.service;
        },
        set(value) {
          this.service = value;
        },
      },
      id() {
        return this.$route.params.id;
      },
      buffer() {
        return Object.assign({}, this.product);
      },
    },
    mounted() {
      this.$store.dispatch('services/getServicesById', this.id);
    },
  })
export default class ProductDetails extends Vue {
    public editMode: boolean = false;
    public product!: Service;
    public buffer!: Service;
    id!: string;

    onDelete() {
      this.$store.dispatch('services/delete', this.id);
      this.$router.push('/services');
    }

    onEditSave() {
      this.editMode = false;
      Object.assign(this.product, this.buffer);
      this.$store.dispatch('services/updateService');
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
