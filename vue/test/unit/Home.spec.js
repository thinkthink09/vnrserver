import { shallowMount } from 'test-utils'
import Router from 'vue-router'
import Vuex from 'vuex'
import Home from '@/vues/Home.vue'

let state = {
  user: null
}

const router = new Router()
const store = new Vuex.Store({
  state: state
})

describe('Home.vue', () => {
  it('should show register button when user not logged in', () => {
    state.user = null

    const wrapper = shallowMount(Home, {store, router, localVue})
    expect(wrapper.find('.test-sign-up-button').exists()).toBe(true)
  })

  it('should not show register button when user is logged in', () => {
    state.user = {
      id: 1,
      name: 'test'
    }

    const wrapper = shallowMount(Home, {store, router, localVue})
    expect(wrapper.find('.test-sign-up-button').exists()).toBe(false)
  })
})
