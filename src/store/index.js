import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getters = {
  crumb: state => state.crumb
}

export default new Vuex.Store({
  state: {
    crumb: []
  },
  mutations: {
    SET_CRUMB (state, crumb) {
      state.crumb = crumb
    }
  },
  actions: { },
  getters
})
