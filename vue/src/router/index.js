import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateUser from '@/components/CreateUser'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/create-user',
      name: 'CreateUser',
      component: CreateUser
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
