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
        <div>
          <v-text-field
            v-model="item.name"
            :rules="[validateName]"
            :label="$t('productName')"
            required></v-text-field>
          <v-textarea
            v-model="item.description"
            :auto-grow="true"
            :rows="2"
            :label="$t('productDescription')"
            required></v-textarea>
          <v-text-field
            v-model="item.price"
            :label="$t('productPrice')"
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
import { Service } from '@/entities';

@Component({
})
export default class ServiceCrete extends Vue {
    public item: Service = new Service();
    id!: string;

    onEditSave() {
      this.$store.dispatch('services/create', this.item)
        .then((id) => {
          this.$router.push(`services/${id}`);
          this.$toast.info(this.$t('serviceCreatedNotification').toString());
        });
    }

    validateName(input: string) {
      if (!input.length) {
        return this.$t('nameRequired');
      }
      if (input.length > 30) {
        return this.$t('nameLength');
      }
      return true;
    }
}

</script>
<style lang="scss">
</style>
