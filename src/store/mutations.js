import Vue from 'vue'

export default {
  SET_ITEM: (state, { item }) => {
    // console.log('SET_ITEM')
    Vue.set(state, 'currentItem', item)
    // console.log(state.currentItem)
  },
  SET_ITEMS: (state, { items, maxpage }) => {
    // console.log(items)
    // console.log(maxpage)
    items.forEach((item, index) => {
      if (item) {
        // console.log('SET_ITEMS')
        Vue.set(state.items, index, item)
      }
    })
    if (maxpage) {
      Vue.set(state, 'maxpage', maxpage)
    }
    // console.log(state.items.length)
  }
}
