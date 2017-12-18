import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import AppList from '@/components/AppList'

Vue.use(Router)

// const ItemView = () => import('../views/ItemList.vue')
// const createListView = keyword => () => import('../views/CreateListView').then(m => m.default(keyword))
const ItemList = () => import('../views/ItemList')
const ItemView = () => import('../views/ItemView')

export default new Router({
  mode: 'history',
  fallback: 'false',
  routes: [
    {
      name: 'detail', path: '/item', component: ItemView, props: true
    },
    {
      path: '/:keyword/:page(\\d+)?', component: ItemList, props: true
    },
    {
      path: '/', redirect: '/%e8%a7%86%e9%a2%91'
    }
  ]
})
