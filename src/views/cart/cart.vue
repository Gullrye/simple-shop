<template>
  <div class="cart-box">
    <SHeader :name="'购物袋'" />

    <div class="cart-body">
      <van-checkbox-group
        v-model="checkedGoodsIdArr"
        ref="checkboxGroup"
        @change="groupChange"
      >
        <div class="good-item" v-for="item in cartGoodsList" :key="item">
          <!-- 滑动单元格 -->
          <van-swipe-cell>
            <van-checkbox :name="item.cartItemId" />
            <div class="good-img">
              <img :src="getRealImg(item.goodsCoverImg)" alt="goods" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>x{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.sellingPrice }}</div>
                <!-- 步进器 -->
                <van-stepper
                  integer
                  :min="1"
                  :model-value="item.goodsCount"
                  :name="item.cartItemId"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
            <!-- 商品删除按钮 -->
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="deleteGood(item.cartItemId)"
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-checkbox-group>
    </div>

    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
      v-if="cartGoodsList.length"
    >
      <van-checkbox v-model="checkAll" @click="allCheck">全选</van-checkbox>
    </van-submit-bar>

    <div class="empty" v-if="!cartGoodsList.length">
      <emptyCart />
    </div>
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SHeader from '@/components/simple-header.vue'
import TabBar from '@/components/tab-bar.vue'
import emptyCart from './components/empty-cart.vue'
import { Toast, CheckboxGroupInstance } from 'vant'
import router from '@/router'
import { deleteCartItem, getCart, modifyCart } from '@/api/cart'
import { getRealImg } from '@/utils/util'
import { useCommonStore } from '@/store/common'

// 购物袋商品列表
const cartGoodsList = ref<any>([])
// 选择的购物袋商品 id 数组
const checkedGoodsIdArr = ref<any>([])
const checkAll = ref(true)

const totalPrice = computed(() => {
  let totalPrice = 0
  const _cartGoodsList = cartGoodsList.value.filter((item: any) =>
    checkedGoodsIdArr.value.includes(item.cartItemId)
  )
  _cartGoodsList.forEach((item: any) => {
    totalPrice += item.goodsCount * item.sellingPrice
  })
  return totalPrice * 100
})

const init = async () => {
  const { data } = await getCart()
  cartGoodsList.value = data
  checkedGoodsIdArr.value = data.map(
    (item: Record<string, number | string>) => item.cartItemId
  )
}
// 单项购买数量变化回调，value, detail 为 vant Stepper 组件 change 事件的回调参数
const onChange = async (value: string, detail: { name: string }) => {
  if (
    cartGoodsList.value.filter(
      (item: any) => item.cartItemId === detail.name
    )[0].goodsCount === value
  ) {
    return
  }
  const params = {
    cartItemId: detail.name,
    goodsCount: value
  }
  await modifyCart(params)
  cartGoodsList.value.forEach((item: any) => {
    if (item.cartItemId === detail.name) {
      item.goodsCount = value
    }
  })
}
// 多选变化，是整组的回调
const groupChange = (checkedGoodsIdArrArg: number[]) => {
  if (checkedGoodsIdArrArg.length === cartGoodsList.value.length) {
    checkAll.value = true
  } else {
    checkAll.value = false
  }
  checkedGoodsIdArr.value = checkedGoodsIdArrArg
}

// 判断 checkAll，如果已是全选状态，checkAll 将变为 false，所以清空 checkedGoodsIdArr 内的变量，价格变为 0
// 如果是非全选状态，checkAll 将变为 true，直接将 cartGoodsList 下的 id 塞进 checkedGoodsIdArr 变量里，total 会自动变为相应的价格
const checkboxGroup = ref<CheckboxGroupInstance>()
const allCheck = () => {
  if (!checkAll.value) {
    checkedGoodsIdArr.value = cartGoodsList.value.map(
      (item: any) => item.cartItemId
    )
  } else {
    checkedGoodsIdArr.value = []
  }
  checkboxGroup.value!.toggleAll()
}

const commonStore = useCommonStore()
const deleteGood = async (id: number) => {
  await deleteCartItem(id)
  commonStore.updateCart()
  init()
}

const onSubmit = () => {
  if (checkedGoodsIdArr.value.length === 0) {
    Toast.fail('请选择商品进行结算')
    return
  }
  console.log(checkedGoodsIdArr.value)
  const params = JSON.stringify(checkedGoodsIdArr.value)
  router.push({ path: '/order-create', query: { cartItemIds: params } })
}

init()
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.cart-body {
  margin-top: 50px;
}
.cart-box {
  .cart-body {
    margin-top: 60px;
    padding-left: 10px;
    // chrome 和 edge 浏览器上，此处的 margin-bottom 显示无效
    // margin-bottom: 100px;
    padding-bottom: 100px;
    .good-item {
      :deep(.van-swipe-cell__wrapper) {
        display: flex;
        flex-direction: row;
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
    }
    .delete-button {
      width: 60px;
      height: 100%;
      white-space: nowrap;
    }
  }
  .empty {
    margin: 20px auto;
    width: 50%;
    text-align: center;
  }
  :deep(.van-submit-bar) {
    bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
  :deep(.van-checkbox__icon--checked .van-icon) {
    border-color: @primary;
    background-color: @primary;
  }
}
</style>
