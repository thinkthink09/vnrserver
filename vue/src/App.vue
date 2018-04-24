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
      <v-toolbar-title>Hello World</v-toolbar-title>
      <v-toolbar-side-icon @click="routeTo('login')"></v-toolbar-side-icon>
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
