<template>
  <div class="user-box">
    <SHeader :name="'我的'" />
    <div class="user-info">
      <div class="info">
        <img src="~@/assets/avatar.png" />
        <div class="user-desc">
          <span>昵称：{{ user.nickName }}</span>
          <span>登录名：{{ user.loginName }}</span>
          <span class="name">个性签名：{{ user.introduceSign }}</span>
        </div>
      </div>
    </div>
    <ul class="user-list">
      <li @click="goTo('order-list?from=user')">
        <span>我的订单</span>
        <i class="iconfont icon-arrow"></i>
      </li>
      <li @click="goTo('account-setting')">
        <span>账号管理</span>
        <i class="iconfont icon-arrow"></i>
      </li>
      <li @click="goTo('address-list?from=user')">
        <span>地址管理</span>
        <i class="iconfont icon-arrow"></i>
      </li>
      <li @click="goTo('about')">
        <span>关于我们</span>
        <i class="iconfont icon-arrow"></i>
      </li>
    </ul>
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SHeader from '@/components/simple-header.vue'
import TabBar from '@/components/tab-bar.vue'
import router from '@/router'
import { getUserInfo } from '@/api/user'

const user = ref<any>({})
const goTo = (r: string) => {
  router.push({ path: r })
}

onMounted(async () => {
  const { data } = await getUserInfo()
  user.value = data
})
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.user-box {
  .user-header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    padding: 0 10px;
    border-bottom: 1px solid #dcdcdc;
    background: #fff;
    line-height: 44px;
    color: #252525;
    .fj();
    .wh(100%, 44px);
    .boxSizing();
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    margin: 10px;
    margin-top: 50px;
    border-radius: 6px;
    width: 94%;
    height: 115px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    .info {
      display: flex;
      position: relative;
      padding: 25px 20px;
      width: 100%;
      height: 100%;
      .boxSizing();
      img {
        .wh(60px, 60px);
        margin-top: 4px;
        border-radius: 50%;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          padding: 2px 0;
          font-size: 14px;
          color: #fff;
        }
      }
      .account-setting {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          margin-right: 4px;
          vertical-align: -3px;
          font-size: 16px;
        }
      }
    }
  }
  .user-list {
    margin-top: 20px;
    padding: 0 20px;
    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e9e9e9;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
  }
}
</style>
