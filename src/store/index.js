import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keyword: '',
    itemsPerPage: 20,
    items: [],
    maxpage: '5',
    currentItem: {}
  },
  actions,
  mutations,
  getters
})
