<template>
  <div class="home-swiper">
    <van-swipe :autoplay="3000" class="my-swipe" indicator-color="#1baeae">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <img :src="item.carouselUrl" alt="banner" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  list: any[]
}>()
</script>

<style lang="less" scoped>
.my-swipe {
  margin-top: 50px;
  .van-swipe-item {
    aspect-ratio: 20 / 9;
    img {
      width: 100%;
      aspect-ratio: 20 / 9;
    }
  }
}
</style>
