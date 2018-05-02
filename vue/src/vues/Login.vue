<template>
  <card title="Login">
    <v-layout row wrap align-center>
      <v-flex xs2 text-lg-right>
        <h3 class="pr-3">Email</h3>
      </v-flex>
      <v-flex xs12 sm10>
        <v-text-field
          v-model="credentials.email"
          label="Your Email"
          single-line
          prepend-icon="person"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap align-center>
      <v-flex xs2 text-lg-right>
        <h3 class="pr-3">Password</h3>
      </v-flex>
      <v-flex xs12 sm10>
        <v-text-field
          v-model="credentials.password"
          label="Password"
          single-line
          prepend-icon="lock"
          type="password"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <div class="mt-5">
      <v-layout row wrap>
        <v-flex xs12>
          <v-btn large color="indigo" @click="login">
            login
          </v-btn>
        </v-flex>
      </v-layout>
    </div>

    <v-layout row wrap slot="footer">
      <v-flex>
        <h3 class="text-xs-center mt-4">{{alert}}</h3>
      </v-flex>
    </v-layout>
  </card>
</template>

<script>
import UserService from '@/services/UserService'
import Card from './components/Card'

export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        email: 'testuser@vnr.com',
        password: 'testuser1'
      },
      alert: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await UserService.login(this.credentials)
        this.alert = 'login successful'
        this.$store.dispatch('login', response.data)
        this.$router.push({path: 'admin'})
      } catch (error) {
        this.alert = error.response.data
      }
    }
  },
  components: {
    Card
  }
}
</script>
