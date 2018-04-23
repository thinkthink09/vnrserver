<template>
  <v-app id="app" dark>
    <v-toolbar>
      <router-link to="/">
        <img src="./assets/V-small.png" height="38px" width="38px">
      </router-link>
      <v-toolbar-title>VNR Server</v-toolbar-title>
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
</style>
