<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-layout row wrap>
            <v-flex>
              <h1 class="text-xs-center mt-5">Create User</h1>
            </v-flex>
          </v-layout>
          <v-card class="elevation-12 mt-5 pa-3">
            <v-layout row wrap align-center>
              <v-flex xs2 text-lg-right>
                <h3 class="pr-3">Name</h3>
              </v-flex>
              <v-flex xs12 sm10>
                <v-text-field
                  v-model="user.name"
                  label="Your User Name Here"
                  single-line
                  prepend-icon="person"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap align-center>
              <v-flex xs2 text-lg-right>
                <h3 class="pr-3">Email</h3>
              </v-flex>
              <v-flex xs12 sm10>
                <v-text-field
                  v-model="user.email"
                  label="Your User Name Here"
                  single-line
                  prepend-icon="mail"
                  type="email"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap align-center>
              <v-flex xs2 text-lg-right>
                <h3 class="pr-3">Password</h3>
              </v-flex>
              <v-flex xs12 sm10>
                <v-text-field
                  v-model="user.password"
                  label="Your User Name Here"
                  single-line
                  prepend-icon="lock"
                  type="password"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <div class="mt-5">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-btn large color="indigo" @click="createUser">
                    create
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
    let name = (+new Date()).toString(36)
    return {
      user: {
        name: name,
        email: name + '@vnr.com',
        password: name
      },
      response: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await UserService.create(this.user)
        this.response = response.data
      } catch (error) {
        this.response = error.response.data
      }
    }
  }
}
</script>
