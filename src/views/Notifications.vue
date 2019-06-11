<template>
    <v-container
            fill-height
            fluid
            grid-list-xl
    >
        <v-layout
                justify-center
                wrap
        >
            <v-flex
                    md12
            >
                <material-card
                        color="green"
                        title="Simple Table"
                        text="Here is a subtitle for this table"
                >
                    <v-data-table
                            :headers="headers"
                            :items="visits"
                            hide-actions
                    >
                        <template
                                slot="headerCell"
                                slot-scope="{ header }"
                        >
                          <span
                                  class="subheading font-weight-light text-success text--darken-3"
                                  v-text="header.text"
                          />
                        </template>
                        <template
                                slot="items"
                                slot-scope="{ item }"
                        >
                            <td>{{ item.clientName }}</td>
                            <td>{{ item.masterName }}</td>
                            <td>{{ item.date }}</td>
                            <td>{{ item.price }}</td>
                        </template>
                    </v-data-table>
                </material-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MaterialCard from '@/components/MaterialCard.vue';
import { mapState } from 'vuex';
import { Visit } from '@/entities';

class TableColumn {
  public sortable: boolean;
  public text!: string;
  public value!: string;

  constructor(text: string, value: string, sortable = true) {
    this.text = text;
    this.value = value;
    this.sortable = sortable;
  }
}

@Component({
  components: {
    MaterialCard,
  },
  computed: {
    ...mapState('visits', ['visits']),
  },
  mounted() {
    this.init();
  },
})
export default class Notifications extends Vue {
  headers = [
    new TableColumn('Client', 'clientName', false),
    new TableColumn('Master', 'masterName', false),
    new TableColumn('Date', 'date', true),
    new TableColumn('Price', 'price', true),
  ];
  visits!: Visit[];

  init() {
    this.$store.dispatch('visits/initCollection');
  }
}
</script>
<style lang="scss">
</style>
