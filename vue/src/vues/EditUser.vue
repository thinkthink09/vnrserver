<template>
  <card title="Edit User">
    <v-layout row wrap align-center>
      <v-flex xs2 text-lg-right>
        <h3 class="pr-3">Name</h3>
      </v-flex>
      <v-flex xs12 sm10>
        <v-text-field
          v-model="user.name"
          label="Your User Name Here"
          required
          :rules="[rules.name]"
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
          label="Your Email"
          required
          :rules="[rules.email]"
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
          label="Your Password"
          required
          :rules="[rules.password]"
          single-line
          prepend-icon="lock"
          type="password"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <div class="mt-5">
      <v-layout row wrap>
        <v-flex xs12>
          <v-btn large color="indigo" @click="update">
            save
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
  name: 'EditUser',
  data () {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        password: ''
      },
      alert: '',
      rules: {
        name: (val) => {
          return /[a-z0-9]{3,30}/.test(val) ||
          'User Name must consist of 3 - 30 alphanumeric characters'
        },
        email: (val) => {
          return /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/.test(val) ||
          'Email format incorrect'
        },
        password: (val) => {
          return /.{3,30}/.test(val) || 'Password mush be 3 to 30 characters long'
        }
      }
    }
  },
  async mounted () {
    this.user = (await UserService.getUser(this.$store.state.route.params.userId)).data
    this.user.password = this.user.name
  },
  methods: {
    async update () {
      try {
        const response = await UserService.updateUser(this.user)
        this.user = response.data.user
        this.user.password = this.user.name
        this.alert = 'user successfully updated'
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
