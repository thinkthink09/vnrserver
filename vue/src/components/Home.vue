<template>
  <v-container fluid grid-list-xl>
    <v-layout row justify-center>
      <v-flex xs10 sm8 md6 lg4>
        <img src="@/assets/vnr-blacknwhite.svg" alt="" height="100%" width="100%">
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <h1 class="text-xs-center">VNR Server</h1>
        <v-divider class="my-3"></v-divider>
        <div class="title mb-3">Very Nice Reusable Server!</div>

        <router-link to="create-user" class="mt-1 btn btn--large">
          <div class="btn__content">Create User</div>
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
