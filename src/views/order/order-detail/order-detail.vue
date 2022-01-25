<template>
  <div class="order-detail">
    <SHeader :name="'订单详情'" @callback="close" />
    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ detail.orderStatusString }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ detail.orderNo }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ detail.createTime }}</span>
      </div>
      <van-button
        v-if="detail.orderStatus == 0"
        style="margin-bottom: 10px;"
        color="#1baeae"
        block
        @click="showPayFn"
        >去支付</van-button
      >
      <van-button
        v-if="!(detail.orderStatus < 0 || detail.orderStatus == 4)"
        block
        @click="cancelOrderFn(detail.orderNo)"
        >取消订单</van-button
      >
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ detail.totalPrice }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>
    <van-card
      v-for="item in detail.newBeeMallOrderItemVOS"
      :key="item.goodsId"
      style="background: #fff;"
      :num="item.goodsCount"
      :price="item.sellingPrice"
      desc="全场包邮"
      :title="item.goodsName"
      :thumb="getRealImg(item.goodsCoverImg)"
    />
    <van-popup
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '24%' }"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
        <van-button
          :style="{ marginBottom: '10px' }"
          color="#1989fa"
          block
          @click="payOrderFn(detail.orderNo, 1)"
          >支付宝支付</van-button
        >
        <van-button color="#4fc08d" block @click="payOrderFn(detail.orderNo, 2)"
          >微信支付</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SHeader from '@/components/simple-header.vue'
import { getRealImg } from '@/utils/util'
import {
  getOrderDetail,
  cancelOrder,
  confirmOrder,
  payOrder
} from '@/api/order'
import { Dialog, Toast } from 'vant'
import { useRoute } from 'vue-router'

const detail = ref<any>({})
const showPay = ref(false)
const route = useRoute()

const init = async () => {
  const { id } = route.query
  const { data } = await getOrderDetail(id)
  detail.value = data
}

// 取消订单
const cancelOrderFn = (id: number) => {
  Dialog.confirm({
    title: '确认取消订单？'
  })
    .then(() => {
      cancelOrder(id).then(res => {
        if (res.resultCode === 200) {
          Toast('删除成功')
          init()
        }
      })
    })
    .catch(() => {
      // on cancel
    })
}

// 确认订单
const confirmOrderFn = (id: number) => {
  Dialog.confirm({
    title: '是否确认订单？'
  })
    .then(() => {
      confirmOrder(id).then(res => {
        if (res.resultCode === 200) {
          Toast('确认成功')
          init()
        }
      })
    })
    .catch(() => {
      // on cancel
    })
}

// 展示支付
const showPayFn = () => {
  showPay.value = true
}
const payOrderFn = async (id: number, type: number) => {
  await payOrder({ orderNo: id, payType: type })
  showPay.value = false
  init()
}
const close = () => {
  Dialog.close()
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.order-detail {
  background: #f7f7f7;
  .order-status {
    margin-top: 44px;
    padding: 20px;
    background: #fff;
    font-size: 15px;
    .status-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
    }
  }
  .order-price {
    margin: 20px 0;
    padding: 20px;
    background: #fff;
    font-size: 15px;
    .price-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
    }
  }
  .van-card {
    margin-top: 0;
  }
  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
