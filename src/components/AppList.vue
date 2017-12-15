<template>
  <div class="app-list">
    <input type="text" v-model="keyWord" placeholder="please input keyword">
    <ul v-if="items.length">
        <li v-for="item in items" :key="item.id">
          {{ item.title_zh }}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppList',
  data () {
    return {
      msg: 'app list',
      keyWord: '',
      items: $state.store.itmes
    }
  }
}
</script>