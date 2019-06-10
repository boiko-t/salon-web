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
            <label>
              <input
                type="file"
                accept="image/*"
                ref="imageUploadInput"
                @change="onFileUpload"
                id="fileUpload"/>
              <img
                class="upload-image"
                :src="imageUrl"
                :class="{'invalid': !imageValid}"
                height="300px"
              />
            </label>
          </v-layout>
          <div>
            <v-text-field
              v-model="category.name"
              :rules="[validateName]"
              :label="$t('categoryNameLabel')"
              required></v-text-field>
            <v-textarea
              v-model="category.description"
              :auto-grow="true"
              :rows="2"
              :label="$t('categoryDescriptionLabel')"
              required></v-textarea>
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
import { Category } from '@/entities';
import PLACEHOLDER_IMAGE from '@/assets/icons/upload-image.png';

@Component({
  computed: {
    imageUrl() {
      return this.category.imageUrl || PLACEHOLDER_IMAGE;
    },
  },
})
export default class CategoryCrete extends Vue {
  public category: Category = new Category('1', 'jdj', 'ddd', '');
  id!: string;
  imageValid = true;

  onFileUpload() {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.$refs.imageUploadInput['files'][0]);
    fileReader.addEventListener('load', (e) => {
      this.category.setImageUrl(e.target['result']);
      this.imageValid = true;
    });
  }

  onEditSave() {
    const validationFailed = this.isImageEmpty();
    if (validationFailed) {
      this.$toast.error(validationFailed.toString());
      return;
    }
    this.$store.dispatch('categories/create', this.category)
      .then((id) => {
        this.$router.push(`categories/${id}`);
        this.$toast.info(this.$t('categoryCreatedNotification').toString());
      });
  }

  isImageEmpty() {
    if (!this.category.getImageUrl()) {
      this.imageValid = false;
      return this.$t('categoryImageRequired');
    }
    return false;
  }


  validateName(input: string) {
    if (!input.length) {
      return this.$t('categoryNameRequired');
    }
    if (input.length > 30) {
      return this.$t('categoryNameLength');
    }
    return true;
  }
}

</script>
<style lang="scss">
  .upload-image {
    border-radius: 2px;
    cursor: pointer;
    transition: box-shadow .1s linear;

    &.invalid {
      @include shadow-4dp-color($red-800);
    }

    &:hover {
      @include shadow-2dp-color(#212121);
    }
  }

  #fileUpload {
    display: none;
  }
</style>
