<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-layout row wrap>
            <v-flex>
              <h1 class="text-xs-center mt-5">Login</h1>
            </v-flex>
          </v-layout>
          <v-card class="elevation-12 mt-5 pa-3">
            <v-layout row wrap align-center>
              <v-flex xs2 text-lg-right>
                <h3 class="pr-3">Account</h3>
              </v-flex>
              <v-flex xs12 sm10>
                <v-text-field
                  v-model="credentials.id"
                  label="Name or Email"
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
          </v-card>
          <v-layout row wrap>
            <v-flex>
              <h3 class="text-xs-center mt-4">{{response}}</h3>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        id: 'testuser@vnr.com',
        password: 'testuser1'
      },
      response: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await UserService.login(this.credentials)
        this.response = response.data
      } catch (error) {
        this.response = error.response.data
      }
    }
  }
}
</script>
