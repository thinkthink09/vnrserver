<template>
  <v-jumbotron>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <h1 class="text-xs-center mt-5">VNR Server</h1>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">Very Nice Reusable Server!</div>

          <router-link to="create-user" class="mt-3 btn btn--large">
            <div class="btn__content">Create User</div>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
export default {
  name: 'Home',
  data () {
  },
  methods: {
  }
}
</script>
