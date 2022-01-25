<template>
  <div class="product-detail">
    <SHeader :name="'商品详情'" />
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item v-for="(item, index) in detailSlideImgs" :key="index">
            <img :src="getRealImg(item)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">{{ detailData.goodsName }}</div>
        <div class="product-desc">包邮 随机快递</div>
        <div class="product-price">
          <span>¥{{ detailData.sellingPrice }}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div
          class="product-content"
          v-html="detailData.goodsDetailContent"
        ></div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="shop-o" text="店铺" />
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        :icon-class="isAddingCart ? 'shake-icon' : ''"
        icon="bag-o"
        :badge="!count ? '' : count"
        @click="goTo()"
        text="购物袋"
      />
      <van-action-bar-button
        type="warning"
        @click="addToCart"
        text="加入购物袋"
      />
      <van-action-bar-button type="danger" @click="goToCart" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SHeader from '@/components/simple-header.vue'
import { Toast } from 'vant'
import { getRealImg } from '@/utils/util'
import { addCart, getCart, modifyCart } from '@/api/cart'
import { getDetail } from '@/api/good'
import { useCommonStore } from '@/store/common'
import router from '@/router'
import { useRoute } from 'vue-router'

const detailData = ref<any>({})
const detailSlideImgs = ref<any>([])
const isAddingCart = ref(false)
const cartItemId = ref(0)
const commonStore = useCommonStore()
const count = computed(() => {
  return commonStore.cartCount
})

const goTo = () => {
  router.push({ path: '/cart' })
}
const addToCart = async () => {
  isAddingCart.value = true
  const goodsId = detailData.value.goodsId
  // 购物车数据
  const { data: cartList } = await getCart()
  // 获取当前详情页的商品，看是否在购物车内
  const nowGoodObj = cartList.filter((item: any) => item.goodsId === goodsId)[0]
  // 若购物车无此商品，请求 addCart 这个只能添加同一个商品一次的接口
  if (!nowGoodObj) {
    const { resultCode } = await addCart({
      goodsCount: 1,
      goodsId: detailData.value.goodsId
    })
    if (resultCode === 200) Toast.success('添加成功')
  } else {
    // 购物车已经有此商品时，商品数量 + 1
    const params = {
      cartItemId: nowGoodObj.cartItemId,
      goodsCount: ++nowGoodObj.goodsCount
    }
    const { resultCode } = await modifyCart(params)
    if (resultCode === 200) Toast.success('本商品数量+1')
  }
  commonStore.updateCart()
  setTimeout(() => {
    isAddingCart.value = false
  }, 400)
}
const goToCart = async () => {
  await addToCart()
  commonStore.updateCart()
  router.push({ path: '/cart' })
}

const route = useRoute()
onMounted(async () => {
  const { id } = route.params
  const { data } = await getDetail(id)
  detailData.value = data
  detailSlideImgs.value = data.goodsCarouselList
})
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.product-detail {
  .detail-content {
    margin-top: 44px;
    padding-bottom: 80px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        text-align: left;
        font-size: 18px;
        color: #333;
      }
      .product-desc {
        padding: 5px 0;
        text-align: left;
        font-size: 14px;
        color: #999;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          font-size: 22px;
          color: #f63515;
        }
        span:nth-child(2) {
          font-size: 16px;
          color: #999;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        margin: 10px 0;
        width: 100%;
        li {
          flex: 1;
          box-sizing: border-box;
          padding: 5px 0;
          border-right: 1px solid #999;
          text-align: center;
          font-size: 15px;
          &:last-child {
            border-right: none;
          }
        }
      }
      :deep(.product-content) {
        padding: 0 20px;
        img {
          width: 100% !important;
        }
      }
    }
  }
  .van-action-bar-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-action-bar-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
  :deep(.shake-icon) {
    transition: all .4s;
    animation: shake .4s ease-in-out 1;
  }
  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}
</style>
