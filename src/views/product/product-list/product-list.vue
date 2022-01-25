<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header">
        <i class="iconfont icon-back" @click="goBack"></i>
        <div class="header-search">
          <i class="iconfont icon-search"></i>
          <input
            type="text"
            class="search-title"
            v-model="keyword"
            @keyup.enter="getSearch"
          />
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#1baeae" @click-tab="changeTab">
        <van-tab title="推荐" name="" />
        <van-tab title="新品" name="new" />
        <van-tab title="价格" name="price" />
      </van-tabs>
    </div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      class="product-list-refresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <div
          class="product-item"
          v-for="(item, index) in productList"
          :key="index"
          @click="productDetail(item)"
        >
          <img :src="getRealImg(item.goodsCoverImg)" />
          <div class="product-info">
            <p class="name">{{ item.goodsName }}</p>
            <p class="subtitle">{{ item.goodsIntro }}</p>
            <span class="price">￥ {{ item.sellingPrice }}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRealImg } from '@/utils/util'
import { search } from '@/api/good'
import { useRoute } from 'vue-router'
import { useCommonStore } from '@/store/common'
import router from '@/router'
import { Toast } from 'vant'

const route = useRoute()
const commonStore = useCommonStore()

const keyword = ref('')
const orderBy = ref('')

const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)

const productList = ref<any>([])
const totalPage = ref(0)
const page = ref(1)

const init = async () => {
  const { categoryId } = route.query
  if (!categoryId && !keyword.value) {
    finished.value = true
    loading.value = false
    return
  }
  // data: { list } 获取 data 中的 list
  const {
    data,
    data: { list }
  } = await search({
    pageNumber: page.value,
    goodsCategoryId: categoryId,
    keyword: keyword.value,
    orderBy: orderBy.value
  })
  productList.value = productList.value.concat(list)
  totalPage.value = data.totalPage
  loading.value = false
  if (page.value >= data.totalPage) finished.value = true
}
const goBack = () => {
  commonStore.updateKeyword('')
  router.go(-1)
}
const productDetail = (item: any) => {
  router.push({ path: `/product-detail/${item.goodsId}` })
}
const onLoad = () => {
  if (!refreshing.value && page.value < totalPage.value) {
    page.value = page.value + 1
  }
  if (refreshing.value) {
    productList.value = []
    refreshing.value = false
  }
  init()
}
const onRefresh = () => {
  refreshing.value = true
  finished.value = false
  loading.value = true
  page.value = 1
  onLoad()
}
const getSearch = () => {
  if (!keyword.value) {
    Toast.fail('请输入关键词')
  } else {
    // 将 keyword 存进 Pinia
    let xx = keyword.value
    commonStore.updateKeyword(xx)
  }
  onRefresh()
}
const changeTab = (name: string) => {
  orderBy.value = name
  onRefresh()
}

onMounted(() => {
  if (commonStore.keyword) {
    keyword.value = commonStore.keyword
    getSearch()
  }
})
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: #fff;
  .category-header {
    .fj();
    z-index: 10000;
    padding: 0 15px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #656771;
    .boxSizing();
    &.active {
      background: @primary;
    }
    .header-search {
      display: flex;
      margin: 10px 0;
      padding: 5px 0;
      width: 76%;
      height: 20px;
      background: #f7f7f7;
      line-height: 20px;
      color: #232326;
      .borderRadius(20px);
      .icon-search {
        padding: 0 5px 0 15px;
        font-size: 20px;
      }
      .search-title {
        background: #f7f7f7;
        font-size: 12px;
        color: #666;
      }
    }
    .search-btn {
      margin: 8px 0;
      margin-top: 10px;
      padding: 0 5px;
      height: 28px;
      background: @primary;
      line-height: 28px;
      color: #fff;
      .borderRadius(5px);
    }
  }
}
.product-list-refresh {
  margin-top: 78px;
  .product-item {
    .fj();
    padding: 10px 0;
    border-bottom: 1px solid #dcdcdc;
    width: 100%;
    height: 120px;
    img {
      padding: 0 10px;
      width: 140px;
      height: 120px;
      .boxSizing();
    }
    .product-info {
      padding: 5px;
      width: 56%;
      height: 120px;
      text-align: left;
      .boxSizing();
      p {
        margin: 0;
      }
      .name {
        overflow: hidden;
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        text-overflow: ellipsis;
        font-size: 15px;
        color: #333;
        white-space: nowrap;
      }
      .subtitle {
        overflow: hidden;
        padding: 10px 0;
        width: 100%;
        max-height: 20px;
        line-height: 25px;
        font-size: 13px;
        color: #999;
      }
      .price {
        font-size: 16px;
        color: @primary;
      }
    }
  }
}
</style>
