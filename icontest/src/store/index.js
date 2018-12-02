import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import settings from './settings'
import iconset from './iconset'
Vue.use(Vuex)

// global states
const state = {
}

const getters = {}

const mutations = {}

const actions = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    settings,
    iconset
  },
  plugins: [
    createPersistedState({
      key: 'iconset',
      path: ['iconset']
    }),
    createPersistedState({
      key: 'settings',
      path: ['settings']
    })]
})

export default store
