import ItemList from './ItemList.vue'

export default function createListView () {
  return {
    name: 'list-view',
    render (h) {
      return h(ItemList, { props: { title }})
    }
  }
}
