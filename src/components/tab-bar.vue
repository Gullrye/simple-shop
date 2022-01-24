<template>
  <div class="tab-bar">
    <ul class="nav-list">
      <router-link
        v-slot="{ isActive, navigate }"
        class="nav-list-item active"
        to="home"
      >
        <li :class="isActive && 'router-link-active'" @click="navigate">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </li>
      </router-link>
      <router-link
        v-slot="{ isActive, navigate }"
        class="nav-list-item"
        to="category"
      >
        <li :class="isActive && 'router-link-active'" @click="navigate">
          <i class="iconfont icon-fenlei"></i>
          <span>分类</span>
        </li>
      </router-link>
      <router-link
        v-slot="{ isActive, navigate }"
        class="nav-list-item"
        to="cart"
      >
        <li :class="isActive && 'router-link-active'" @click="navigate">
          <i class="iconfont icon-cart-bag">
            <van-badge :content="count" />
          </i>
          <span>购物袋</span>
        </li>
      </router-link>
      <router-link
        v-slot="{ isActive, navigate }"
        class="nav-list-item"
        to="user"
      >
        <li :class="isActive && 'router-link-active'" @click="navigate">
          <i class="iconfont icon-wo"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(1)
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  align-items: center;
  padding: 5px 0;
  border-top: 1px solid rgba(226, 226, 226, .2);
  width: 100%;
  height: 50px;
  background-color: #fff;
  .boxSizing();
  .nav-list {
    flex-direction: row;
    padding: 0;
    width: 100%;
    .fj();
    .nav-list-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      text-align: center;
      color: #666;
      &.router-link-active {
        color: @primary;
      }
      > li {
        display: flex;
        flex-direction: column;
        i {
          text-align: center;
          font-size: 22px;
        }
        span {
          font-size: 12px;
        }
        .icon-cart-bag {
          position: relative;
          margin: 0 auto;
          .van-badge {
            position: absolute;
            right: -50%;
            top: -20%;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
