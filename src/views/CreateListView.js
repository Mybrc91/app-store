import ItemList from './ItemList.vue'

export default function createListView () {
  return {
    name: 'list-view',
    asyncData ({ store }) {
      const { keyword } = store.state
      return store.dispatch('FETCH_LIST_DATA', { keyword })
    },
    render (h) {
      return h(ItemList, { props: { title }})
    }
  }
}
