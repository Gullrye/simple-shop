<template>
  <div>
    <HomeHeader />
    <HomeSwiper :list="swiperList" />
    <HomeCategory />
    <HomeGood :newGoodses="newGoodses" :hots="hots" :recommends="recommends" />
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HomeHeader from './components/home-header.vue'
import HomeSwiper from './components/swiper.vue'
import HomeCategory from './components/home-category.vue'
import HomeGood from './components/home-good.vue'
import TabBar from '@/components/tab-bar.vue'
import { getHome } from '@/api/home'
import cache from '@/utils/cache'

// 轮播图
const swiperList = ref<any>([])
// 首页商品
const newGoodses = ref<any>([])
const hots = ref<any>([])
const recommends = ref<any>([])

onMounted(async () => {
  // 缓存首页数据，有缓存时取缓存，无缓存时重新请求数据
  const homeData = cache.getCache('homeData')
  if (homeData) {
    swiperList.value = homeData.carousels.reverse()
    newGoodses.value = homeData.newGoodses
    hots.value = homeData.hotGoodses
    recommends.value = homeData.recommendGoodses
    console.log('use home cache')
  } else {
    const { data } = await getHome()
    cache.setCache('homeData', data)
    console.log('no home cache, re request')
  }
})
</script>

<style lang="less" scoped></style>
