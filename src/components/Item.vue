<template>
  <li class="app-info-item">
    <img @load="loadImg(item.icon, $event)" src='../assets/logo.png' class="logo">
    <span><router-link :to="{ name:'detail', params:{ item }}" >{{ item.title }}  v{{ item.version }}</router-link></span>
    <br>
    <span>{{ item.id }}  {{ item.name }}</span>
    <br>
    <span>{{ item.package }}</span>
    <span><a :href="item.downloadUrl"><img src="../assets/ic_download.png" class="ic_download"></a>{{ formateDownload }}</span>
  </li>
</template>

<script>
export default {
  name: 'app-info-item',
  props: ['item'],
  methods: {
    loadImg: function (src, event) {
      if (src) {
        event.target.src = src
      }
      // console.log(src)
    }
  },
  computed: {
    formateDownload: function () {
      var num = (this.item.downloadCount || 0).toString()
      var result = ''
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num) {
        result = num + result
      }
      return result
    }
  }
}
</script>
<style lang="stylus">
.app-info-item
  background-color #fff
  list-style none
  padding 20px 30px 20px 80px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  .logo
    width 60px
    height 60px
    position absolute
    left 0
    margin 0 10px
  .ic_download
    vertical-align bottom
</style>