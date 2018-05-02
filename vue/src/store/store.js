import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    login ({commit}, res) {
      commit('setToken', res.token)
      commit('setUser', res.user)
    },
    logout ({commit}) {
      commit('setToken', null)
      commit('setUser', null)
    }
  }
})

export default store
