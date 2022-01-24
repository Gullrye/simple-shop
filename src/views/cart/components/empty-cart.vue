<template>
  <div class="empty-cart">
    <i class="iconfont icon-smile"></i>
    <div class="title">购物袋空空空如也</div>
    <van-button color="#1baeae" type="primary" @click="goTo" block
      >前往首页</van-button
    >
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'

const goTo = () => {
  router.push('/home')
}
</script>

<style lang="less" scoped>
.empty-cart {
  .icon-smile {
    display: block;
    font-size: 50px;
    transform: rotate(-45deg);
  }
  .title {
    margin: 20px auto;
    font-size: 16px;
  }
}
</style>
