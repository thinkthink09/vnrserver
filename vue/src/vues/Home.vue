<template>
  <v-container fluid grid-list-xl>
    <v-layout row justify-center>
      <v-flex xs10 sm8 md6 lg4>
        <img src="@/assets/vnr-blacknwhite.svg">
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <h1 class="text-xs-center">VNR Server</h1>
        <v-divider class="my-3"></v-divider>
        <div class="title mb-3">Very Nice Reusable Server!</div>

        <router-link
          v-if="$store.state.user === null"
          to="/register"
          class="mt-1 btn btn--large"
        >
          <div class="btn__content test-sign-up-button">sign up</div>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>
