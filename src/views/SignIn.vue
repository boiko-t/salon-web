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
            v-model="email"
            :rules="[validateEmail]"
            :label="$t('emailLabel')"
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
            @click="onSignIn"
          >
            {{$t('signInLabel')}}
          </v-btn>
          <v-btn
            color="#fff"
            @click="onSignInGoogle"
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
  computed: {
    email: {
      get() { return this.$store.state.auth.email; },
      set(value) { this.$store.commit('auth/UPDATE_EMAIL', value); },
    },
    password: {
      get() { return this.$store.state.auth.password; },
      set(value) { this.$store.commit('auth/UPDATE_PASSWORD', value); },
    },
  },
})

export default class SignIn extends Vue {
  valid: boolean = true;
  email!: string;
  password!: string;

  validateEmail(input: string) {
    if (input.length === 0) {
      return this.$t('emailRequiredErrorMessage');
    }
    if (input.length >= 20) {
      return this.$t('emailLengthErrorMessage');
    }
    return true;
  }

  validatePassword(input: string) {
    if (input.length < 6) {
      return this.$t('passwordLengthErrorMessage');
    }
    return true;
  }

  onSignIn() {
    if (this.valid) {
      this.$store.dispatch('auth/signIn');
    }
  }

  onSignInGoogle() {
    this.$store.dispatch('auth/signInGoogle');
  }
}
</script>

<style lang="scss">
  .buttons-wrapper {
    text-align: center;
  }
</style>
