<template>
  <div class="home-header" :class="{ active: headerScroll }">
    <router-link to="/category">
      <i class="iconfont icon-caidan"></i>
    </router-link>
    <div class="header-search">
      <span class="app-name">OH 商城</span>
      <i class="iconfont icon-search"></i>
      <router-link to="./product-list?from=home">
        <span class="search-title">拂堤杨柳醉春烟</span>
      </router-link>
    </div>
    <router-link to="/login" class="login" v-if="!isLogin">
      <span>登录</span>
    </router-link>
    <router-link to="/user" class="login" v-else>
      <i class="iconfont icon-wo"></i>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import cache from '@/utils/cache'

// 根据有无 token 进行不同显示
const isLogin = ref(false)
const token = cache.getCache('token')
if (token) {
  isLogin.value = true
}
// header 滚动固定
const headerScroll = ref(false)
const pageScroll = () => {
  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  scrollTop > 130 ? (headerScroll.value = true) : (headerScroll.value = false)
}
onMounted(() => {
  window.addEventListener('scroll', pageScroll)
})
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.home-header {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10000;
  padding: 0 15px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  background-color: #fff;
  line-height: 50px;
  text-overflow: ellipsis;
  font-size: 15px;
  white-space: nowrap;
  .fj();
  .wh(100%, 50px);
  .boxSizing();
  .icon-caidan {
    font-size: 22px;
    color: @primary;
  }
  &.active {
    position: fixed;
    border-bottom: 0;
    background-color: @primary;
    animation: slide-down .3s ease-in-out;
    @keyframes slide-down {
      0% {
        height: 0;
      }
      100% {
        height: 50px;
      }
    }
    .icon-caidan {
      color: #fff;
    }
    .login {
      color: #fff;
    }
    .header-search {
      border: 0;
      background-color: hsla(0deg, 0%, 100%, .7);
    }
  }
  .header-search {
    display: flex;
    margin: 10px 0;
    padding: 5px 0;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 20px;
    line-height: 20px;
    color: #232326;
    .wh(76%, 20px);
    .app-name {
      padding: 0 10px;
      border-right: 1px solid #666;
      font-weight: bold;
      font-size: 20px;
      color: @primary;
    }
    .icon-search {
      padding: 0 4px;
      font-size: 18px;
    }
    .search-title {
      overflow: hidden;
      line-height: 21px;
      text-overflow: ellipsis;
      font-size: 12px;
      color: #666;
      white-space: nowrap;
    }
  }
  .login {
    line-height: 52px;
    color: @primary;
    i {
      vertical-align: -3px;
      font-size: 22px;
    }
  }
}
</style>
