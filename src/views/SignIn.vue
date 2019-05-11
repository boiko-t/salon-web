<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout justify-center>
        <v-flex
          md6
          sm8
          xs12
        >
          <v-text-field
            v-model="name"
            :rules="[validateName]"
            :label="$t('nameLabel')"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex
          md6
          sm8
          xs12
        >
          <v-text-field
            v-model="password"
            :rules="[validatePassword]"
            :label="$t('passwordLabel')"
            type="password"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex
          md6
          sm8
          xs12
          class="buttons-wrapper">
          <v-btn
            :disabled="!valid"
            color="success"
            @click="signIn"
          >
            {{$t('signInLabel')}}
          </v-btn>
          <v-btn
            color="#fff"
            @click="signInGoogle"
          >
            <img src="../assets/icons/google.svg" alt="Google logo">
            {{$t('signInGoogleLabel')}}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})

export default class SignIn extends Vue {
  valid: boolean = true;
  name: string = '123456';
  password: string = '1';

  validateName(input: string) {
    if (input.length === 0) {
      return this.$t('nameRequiredErrorMessage');
    }
    if (input.length >= 10) {
      return this.$t('nameLengthErrorMessage');
    }
    return true;
  }

  validatePassword(input: string) {
    if (input.length < 6) {
      return this.$t('passwordLengthErrorMessage');
    }
    return true;
  }

  signIn() {
    if (!this.valid) {
      console.warn('not valid');
    }
  }

  signInGoogle() {
    if (!this.valid) {
      console.warn('not valid');
    }
  }
}
</script>

<style lang="scss">
  .buttons-wrapper {
    text-align: center;
  }
</style>
