<template>
  <div class="home-swiper">
    <van-swipe :autoplay="3000" class="my-swipe" indicator-color="#7a88fe">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <img :src="item.carouselUrl" />
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
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: auto;
  }
  margin-top: 50px;
}
</style>
