<template>
  <div>
    <h1>Create User</h1>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" v-model="user.name"/>

    <label for="email">Email</label>
    <input type="text" id="email" name="email" v-model="user.email"/>

    <button @click="createUser">create</button>
    <h3>{{response}}</h3>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  name: 'CreateUser',
  data () {
    return {
      user: {
        name: '',
        email: ''
      },
      response: ''
    }
  },
  methods: {
    async createUser () {
      const response = await UserService.create(this.user)
      this.response = response.data
    }
  }
}
</script>
