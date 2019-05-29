<template>
    <v-container
            fill-height
            fluid
            grid-list-xl
    >
        <v-layout
                space-between
                wrap
        >
            <v-flex v-for="category in categories"
                    :key="category.id"
                    lg4
                    md6
                    xs9
            >
                <v-card>
                    <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline ma-0">{{category.name}}</h3>
                            <div>{{category.description}}</div>
                        </div>
                    </v-card-title>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                            :to="`/categories/${category.id}`"
                            flat
                            outline
                            color="success">{{$t('actionDetails')}}</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            :to="`/categories/${category.id}/edit`"
                            class="grey--text"
                            icon>
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn
                            @click="deleteCategory(category.id)"
                            class="grey--text"
                            icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
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
    ...mapState('categories', ['categories']),
  },
  mounted() {
    this.init();
  },
})
export default class Categories extends Vue {
    categories!: Category[];

    init() {
      this.$store.dispatch('categories/initCollection');
    }

    deleteCategory(id) {
      this.$store.dispatch('categories/delete', id);
    }
}
</script>
<style lang="scss">
</style>
