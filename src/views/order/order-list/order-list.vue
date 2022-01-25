<template>
  <div class="order-list">
    <SHeader :name="'我的订单'" :back="from" />
    <van-tabs @change="onChangeTab" class="order-tab" v-model:active="status">
      <van-tab title="全部" name="''" />
      <van-tab title="待付款" name="0" />
      <van-tab title="待确认" name="1" />
      <van-tab title="待发货" name="2" />
      <van-tab title="已发货" name="3" />
      <van-tab title="交易完成" name="4" />
    </van-tabs>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      class="order-list-refresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @offset="30"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          class="order-item-box"
          @click="goTo(item.orderNo)"
        >
          <div class="order-item-header" v-if="item.createTime">
            <span>订单时间：{{ item.createTime }}</span>
            <span>{{ item.orderStatusString }}</span>
          </div>
          <van-card
            v-for="one in item.newBeeMallOrderItemVOS"
            :key="one.orderId"
            :num="one.goodsCount"
            :price="one.sellingPrice"
            desc="全场包邮"
            :title="one.goodsName"
            :thumb="getRealImg(one.goodsCoverImg)"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHeader from '@/components/simple-header.vue'
import { getRealImg } from '@/utils/util'
import { useRoute } from 'vue-router'
import { getOrderList } from '@/api/order'
import router from '@/router'

const route = useRoute()
const from = ref('')
from.value = route.query.from ? `/${route.query.from}` : '/cart'
const status = ref('')
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const list = ref<any>([])
const page = ref(1)
const totalPage = ref(0)

const loadData = async () => {
  const {
    data,
    data: { list: listRequest }
  } = await getOrderList({ pageNumber: page.value, status: status.value })

  list.value = listRequest.concat(list)
  totalPage.value = data.totalPage
  loading.value = false
  if (page.value >= data.totalPage) finished.value = true
}
const onChangeTab = (name: string) => {
  status.value = name
  onRefresh()
}
const goTo = (id: string) => {
  router.push({ path: `/order-detail`, query: { id: id } })
}

const onLoad = () => {
  if (!refreshing.value && page.value < totalPage.value) {
    page.value = page.value + 1
  }
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }
  loadData()
}
const onRefresh = () => {
  refreshing.value = true
  finished.value = false
  loading.value = true
  page.value = 1
  onLoad()
}
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.order-list {
  .order-tab {
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
    .order-name {
      font-size: 14px;
    }
  }
  :deep(.van-tabs) {
    position: fixed;
    left: 0;
    z-index: 1000;
    margin-top: 44px;
    width: 100%;
    .van-tabs__line {
      background-color: @primary;
    }
  }
  .order-list-refresh {
    margin-top: 68px;
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .van-list {
      margin-top: 20px;
      min-height: calc(100vh - 88px);
      background: #f9f9f9;
    }
    .order-item-box {
      margin: 20px 10px;
      background-color: #fff;
      .order-item-header {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px 0;
      }
      .van-card {
        margin-top: 0;
        background-color: #fff;
      }
    }
  }
}
</style>
