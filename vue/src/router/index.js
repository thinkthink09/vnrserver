import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/vues/Home'
import Register from '@/vues/Register'
import Login from '@/vues/Login'
import Admin from '@/vues/Admin'
import EditUser from '@/vues/EditUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }, {
      path: '/edit-user/:userId',
      name: 'EditUser',
      component: EditUser
    }
  ]
})
