<template>
  <v-flex
    md12
  >
    <material-card
      color="green"
      flat
      full-width
      :title="title"
      text=""
    >
      <v-data-table
        :headers="headers"
        :items="products"
        hide-actions
      >
        <template
          slot="headerCell"
          slot-scope="{ header }"
        >
          <span
            class="subheading font-weight-light text--darken-3"
            v-text="header.text"
          ></span>
        </template>
        <template
          slot="items"
          slot-scope="{ item }"
        >
          <router-link :to="`/${routerPath}/${item.id}`">
            <td>{{ item.name }}</td>
          </router-link>
          <td>{{ item.description }}</td>
          <td class="">{{ item.price }}</td>
        </template>
      </v-data-table>
    </material-card>
  </v-flex>
</template>

<script>
import MaterialCard from './MaterialCard.vue';

export default {
  name: 'ProductList',
  components: {
    MaterialCard,
  },
  data() {
    return {
      items: [],
      headers: [
        {
          sortable: true,
          text: this.$t('productName'),
          value: 'name',
        },
        {
          sortable: false,
          text: this.$t('productDescription'),
          value: 'description',
        },
        {
          sortable: true,
          text: this.$t('productPrice'),
          value: 'price',
        },
      ],
    };
  },
  props: {
    products: {
      type: Array,
      required: true,
      default: () => [],
    },
    routerPath: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
