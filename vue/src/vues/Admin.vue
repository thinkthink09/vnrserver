<template>
  <card title="Administration">
    <v-data-table
      dark
      :headers="headers"
      :items="users"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.password }}</td>
      </template>
    </v-data-table>
  </card>
</template>

<script>
import UserService from '@/services/UserService'
import Card from './components/Card'

export default {
  name: 'Admin',
  data () {
    return {
      headers: [
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'Email', align: 'left', sortable: true, value: 'email' },
        { text: 'Password (Hashed)', align: 'left', sortable: true, value: 'password' }
      ],
      users: []
    }
  },
  async mounted () {
    this.users = (await UserService.getUsers()).data
  },
  components: {
    Card
  }
}
</script>
