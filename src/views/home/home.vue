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

// 轮播图
const swiperList = ref<any>([])
// 首页商品
const newGoodses = ref<any>([])
const hots = ref<any>([])
const recommends = ref<any>([])

onMounted(async () => {
  const { data: homeData } = await getHome()
  if (homeData) {
    swiperList.value = homeData.carousels.reverse()
    newGoodses.value = homeData.newGoodses
    hots.value = homeData.hotGoodses
    recommends.value = homeData.recommendGoodses
  }
})
</script>

<style lang="less" scoped></style>
