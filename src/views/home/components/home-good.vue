<template>
  <div class="home-good">
    <div class="good">
      <div class="good-header">新品上线</div>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in newGoodses"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <div class="img-wrapper">
            <img v-lazy="getRealImg(item.goodsCoverImg)" alt="goods" />
          </div>
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">￥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <div class="good-header">热门商品</div>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in hots"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <div class="img-wrapper">
            <img v-lazy="getRealImg(item.goodsCoverImg)" alt="goods" />
          </div>
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">￥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <div class="good-header">最新推荐</div>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in recommends"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <div class="img-wrapper">
            <img v-lazy="getRealImg(item.goodsCoverImg)" alt="goods" />
          </div>
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">￥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRealImg } from '@/utils/util'
import router from '@/router'

defineProps<{
  newGoodses: any[]
  hots: any[]
  recommends: any[]
}>()

const goToDetail = (item: any) => {
  router.push({ path: `/product-detail/${item.goodsId}` })
}
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.good {
  .good-header {
    height: 50px;
    background: #f9f9f9;
    line-height: 50px;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    color: @primary;
  }
  .good-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background: #fff;
    .good-item {
      display: flex;
      position: relative;
      justify-content: center;
      box-sizing: border-box;
      padding: 10px;
      border-bottom: 1px solid #e9e9e9;
      width: 50%;
      height: 220px;
      .img-wrapper {
        display: flex;
        align-items: center;
        height: 150px;
        img {
          display: block;
          margin: 0 auto;
          width: 120px;
        }
      }
      .good-desc {
        display: flex;
        position: absolute;
        bottom: 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;
        font-size: 14px;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
  &:last-child {
    padding-bottom: 100px;
  }
}
</style>
