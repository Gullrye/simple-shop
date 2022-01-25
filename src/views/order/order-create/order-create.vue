<template>
  <div class="order-create">
    <SHeader :name="'生成订单'" @callback="deleteLocal" />
    <div class="address-wrap" @click="goTo">
      <div class="name">
        <span>{{ address.userName }}</span>
        <span>{{ address.userPhone }}</span>
      </div>
      <div class="address">
        {{ address.provinceName }} {{ address.cityName }}
        {{ address.regionName }} {{ address.detailAddress }}
      </div>
      <i class="iconfont icon-arrow"></i>
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in cartList" :key="index">
        <div class="good-img">
          <img :src="getRealImg(item.goodsCoverImg)" />
        </div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goodsName }}</span>
            <span>x{{ item.goodsCount }}</span>
          </div>
          <div class="good-btn">
            <div class="price">¥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ total }}</span>
      </div>
      <van-button
        @click="createOrderFn"
        class="pay-btn"
        color="#1baeae"
        type="primary"
        block
        >生成订单</van-button
      >
    </div>
    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '30%' }"
      @close="close"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button
          :style="{ marginBottom: '10px' }"
          color="#1989fa"
          block
          @click="payOrderFn(1)"
          >支付宝支付</van-button
        >
        <van-button color="#4fc08d" block @click="payOrderFn(2)"
          >微信支付</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import SHeader from '@/components/simple-header.vue'
import { Toast } from 'vant'
import { getByCartItemIds } from '@/api/cart'
import { getAddressDetail, getDefaultAddress } from '@/api/address'
import { createOrder, payOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import router from '@/router'
import cache from '@/utils/cache'
import { getRealImg } from '@/utils/util'

const cartList = ref<any>([])
const address = ref<any>({})
const showPay = ref(false)
const orderNo = ref<any>('')
const cartItemIds = ref<any>([])
const total = computed(() => {
  let sum = 0
  cartList.value.forEach((item: any) => {
    sum += item.goodsCount * item.sellingPrice
  })
  return sum
})
const route = useRoute()

const init = async () => {
  const { addressId, cartItemIds: cartItemIdsQuery } = route.query
  // id 会本地存储，查询字符串 id 优先获取，若没有则获取本地存储的 ids
  const _cartItemIds = cartItemIdsQuery
    ? JSON.parse(cartItemIdsQuery as string)
    : JSON.parse(cache.getCache('cartItemIds'))
  // 记得赋值
  cartItemIds.value = _cartItemIds
  cache.setCache('cartItemIds', JSON.stringify(_cartItemIds))
  const { data: list } = await getByCartItemIds({
    cartItemIds: _cartItemIds.join(',')
  })
  // addressId 存在的情况下，优先获取 addressId，否则获取默认地址接口
  const { data: addressRequest } = addressId
    ? await getAddressDetail(addressId)
    : await getDefaultAddress()
  if (!addressRequest) {
    router.push({ path: '/address-list' })
    return
  }
  cartList.value = list
  address.value = addressRequest
}
const goTo = () => {
  router.push({
    path: '/address-list',
    query: { cartItemIds: JSON.stringify(cartItemIds.value) }
  })
}
const deleteLocal = () => {
  cache.deleteCache('cartItemIds')
}
const createOrderFn = async () => {
  const params = {
    addressId: address.value.addressId,
    cartItemIds: cartList.value.map((item: any) => item.cartItemId)
  }
  const { data } = await createOrder(params)
  cache.setCache('cartItemIds', '')
  orderNo.value = data
  showPay.value = true
}
const close = () => {
  router.push({ path: '/order-list' })
}
const payOrderFn = async (type: any) => {
  Toast.loading('正在支付...')
  await payOrder({ orderNo: orderNo.value, payType: type })
  router.push({ path: '/order-list' })
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.order-create {
  background: #f9f9f9;
  .address-wrap {
    position: relative;
    margin-top: 44px;
    margin-bottom: 20px;
    padding: 15px;
    background: #fff;
    font-size: 14px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
    }
    .icon-arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      font-size: 20px;
      transform: translateY(-50%);
    }
    &::before {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: '';
    }
  }
  .good {
    padding-bottom: 120px;
  }
  .good-item {
    display: flex;
    padding: 10px;
    background: #fff;
    .good-img {
      img {
        .wh(100px, 100px);
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          line-height: 28px;
          font-size: 16px;
          color: red;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    width: 100%;
    background: #fff;
    > div {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 0 5%;
      font-size: 14px;
      span:nth-child(2) {
        font-size: 18px;
        color: red;
      }
    }
    .pay-btn {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 7px;
      margin: 0 auto;
      width: 90%;
    }
  }
}
</style>
