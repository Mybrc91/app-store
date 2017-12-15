import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keyword: '%e6%97%b6%e6%97%b6%e5%bd%a9',
    itemsPerPage: 20,
    items: [],
    maxpage: '5',
    currentItem: {}
  },
  actions,
  mutations,
  getters
})
