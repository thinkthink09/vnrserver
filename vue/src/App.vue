<template>
  <v-app id="app" dark>
    <v-toolbar light>
      <router-link to="/">
        <v-avatar
          :tile="true"
          class="grey lighten-4"
        >
          <img src="@/assets/vnr-black.svg">
        </v-avatar>
      </router-link>
      <v-toolbar-title pointer @click="routeTo('/')">VNR Server</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title
        pointer
        class="mr-3 test-register-button"
        v-if="$store.state.user === null"
        @click="routeTo('/register')"
      >
        Register
      </v-toolbar-title>

      <v-toolbar-title
        pointer
        class="mr-3 test-login-button"
        v-if="$store.state.user === null"
        @click="routeTo('/login')"
      >
        Login
      </v-toolbar-title>

      <v-toolbar-title
        pointer
        class="mr-3 test-login-message"
        v-if="$store.state.user !== null"
      >
        Welcome, {{$store.state.user.name}}!
      </v-toolbar-title>

      <v-toolbar-title
        pointer
        class="mr-3 test-logout-button"
        v-if="$store.state.user !== null"
        @click="logout"
      >
        Logout
      </v-toolbar-title>

      <v-toolbar-side-icon
        @click="routeTo('/admin')"
        v-if="$store.state.user !== null"
      ></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    routeTo (path) {
      this.$router.push({path: path})
    },
    logout () {
      this.$store.dispatch('logout')
      this.routeTo('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.toolbar__title {
  cursor: pointer;
}

.application.theme--dark {
  background: #1D1C18;
}

.theme--dark .btn:not(.btn--icon):not(.btn--flat) {
  background-color: #f5f5f5;
}

.theme--dark .btn {
  color: rgba(0,0,0,.87);
}
</style>
