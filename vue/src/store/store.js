import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
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
    },
    editAccount ({commit}, user) {
      commit('setUser', user)
    }
  }
})

export default store
