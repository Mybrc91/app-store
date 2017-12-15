<template>
  <div class="app-info-list-view">
    <div class="list-nav">
      <router-link v-if="currentPage > 1" :to="'/' + keyword + '/' + (currentPage - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ currentPage }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + keyword + '/' + (currentPage + 1)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>
    <div class="list">
      <item v-for="item in items" :key="item.id" :item="item"></item>
    </div>
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  name: 'app-info-item-list',

  components: {
    Item
  },

  props: {
    keyword: String,
    page: String
  },

  data () {
    return {
      items: this.$store.getters.allItems
    }
  },

  computed: {
    currentPage () {
      if (!this.page) {
        return Number('1')
      }
      return Number(this.page)
    },
    maxPage () {
      const { maxpage } = this.$store.state
      return maxpage
    },
    hasMore () {
      return this.currentPage < this.maxPage
    }
  },
  watch: {
    currentPage (to, from) {
      // console.log('to:' + to)
      // console.log('from:' + from)
      this.loadItems(this.keyword, to)
    }
  },
  methods: {
    loadItems (keyword, page) {
      // console.log('loadItems:' + page)
      this.$store.dispatch('FETCH_LIST_DATA', {
        keyword,
        page
      }).then((res) => {
        // console.log('res')
        this.items = this.$store.getters.allItems
        console.log(this.$store.getters.allItems)
      })
    }
  },

  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems(this.keyword, this.currentPage)
    }
  }
}
</script>
<style lang="stylus">
.list-nav
  position fixed
  top 0
  left 0
  right 0
  padding 15px 30px
  text-align center
  background-color #fff
  z-index 998
.disabled
  color #ccc
.list
  position absolute
  margin 20px 0
  width 100%
@media (max-width 600px)
  .app-info-list-view
    .list
      margin 10px 0
      width 300px
</style>