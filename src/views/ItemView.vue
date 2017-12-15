<template>
  <div class="item-view" v-if="current">
    <template v-if="current">
      <div class="item-view-header">
        <a  target="_blank">
          <h1>{{ current.title }}</h1><span>v{{ current.version }}</span>
        </a>
        <div class="header-info"><span>{{ current.uploadTime}}&nbsp; {{ formateMb(current.size) }} &nbsp;
          <start-rating v-model="current.score" v-bind="startRatingProps"></start-rating></span></div>
        <h3>Introduce</h3>
        <div v-html="current.introduction"></div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(screen, index) in current.screens" :key="index"><img :src="screen"></swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </template>
  </div>
</template>

<script>
import numeral from 'numeral'
import startRating from 'vue-star-rating'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'

export default {
  name: 'item-view',
  props: ['item'],
  components: {
    startRating,
    swiper,
    swiperSlide
  },
  data () {
    return {
      startRatingProps: {
        increment: 0.1,
        showRating: false,
        starSize: 16,
        readOnly: true,
        inline: true
      },
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    current: function () {
      if (this.item) {
        return this.item
      } else {
        return JSON.parse(sessionStorage.item)
      }
    }
  },
  methods: {
    formateMb (size) {
      return numeral(Number(size) / 1024).format('0.00') + 'MB'
    },
    loadItem (id) {
      // console.log('loadItem:' + id)
      this.$store.dispatch('FETCH_ITEM_BY_ID', {
        id
      }).then((res) => {
        // console.log('FETCH_ITEM_BY_ID res' + this.current.id)
        const {uploadTime, size, score, introduction, screens} = res
        if (this.item) {
          this.$set(this.item, 'introduction', introduction)
          this.$set(this.item, 'size', size)
          this.$set(this.item, 'uploadTime', uploadTime)
          this.$set(this.item, 'screens', screens)
          this.$set(this.item, 'score', Number(score))
          sessionStorage.item = JSON.stringify(this.item)
        }
        // console.log(this.current)
      })
    }
  },
  beforeMount () {
    if (this.$root._isMounted) {
      if (this.current) {
        sessionStorage.item = JSON.stringify(this.current)
        this.loadItem(this.current.id)
      } else {
        this.loadItem(this.current.id)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.item-view-header
  background-color #fff
  padding 1.8em 2em 1em
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  .swiper-container
    margin 20px 0 0 0
    .swiper-slide
      width auto
  .header-info
    margin 10px 0 0 0
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
  .host, .meta, .meta a
    color #828282
  .meta a
    text-decoration underline
@media (max-width 600px)
  .item-view-header
    h1
      font-size 1.25em
</style>