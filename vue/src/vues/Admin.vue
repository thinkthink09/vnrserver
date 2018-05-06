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
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal darken-3">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="blue-grey darken-3">delete</v-icon>
          </v-btn>
        </td>
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
        { text: 'Actions', align: 'center', value: 'name', sortable: false }
      ],
      users: []
    }
  },
  async mounted () {
    this.users = (await UserService.getUsers()).data
  },
  methods: {
    editItem (user) {
      this.$router.push({path: '/edit-user/' + user.id})
    },
    async deleteItem (user) {
      await UserService.deleteUser(user.id)
    }
  },
  components: {
    Card
  }
}
</script>
