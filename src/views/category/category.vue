<template>
  <div class="category">
    <div class="category-header">
      <i class="iconfont icon-back" @click="goHome"></i>
      <div class="header-search">
        <i class="iconfont icon-search"></i>
        <router-link to="./product-list?from=category">
          <span class="search-title">忙趁东风放纸鸢</span>
        </router-link>
      </div>
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="category-content">
      <!-- 使用 vant tabs 中的标签栏滚动、切换动画、滑动切换 -->
      <van-tabs v-model="active" swipeable animated>
        <van-tab
          v-for="item in categoryData"
          :key="item.categoryId"
          :title="item.categoryName"
        >
          <div
            class="product-item"
            v-for="it in item.secondList"
            :key="it.categoryId"
            @click="selectProduct(it)"
          >
            <div class="product-img">
              <img
                src="//s.weituibao.com/1583585285461/cs.png"
                alt="category"
              />
            </div>
            <span class="product-title">{{ it.categoryName }}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '@/router'
import { getCategory } from '@/api/good'
import TabBar from '@/components/tab-bar.vue'

const active = ref(0)
const categoryData = ref<any>([])

const dealCategoryData = (data: any[]) => {
  const newData: any[] = []
  let n = 0
  data.forEach(i => {
    i.secondLevelCategoryVOS.forEach(
      (item: Record<string, string | number>) => {
        newData[n] = {}
        newData[n].categoryName = item.categoryName
        newData[n].categoryId = item.categoryId
        newData[n].categoryLevel = 2
        newData[n].secondList = item.thirdLevelCategoryVOS
        n++
      }
    )
  })
  return newData
}

const selectProduct = (it: Record<string, number>) => {
  router.push({ path: `product-list?categoryId=${it.categoryId}` })
}
const goHome = () => {
  router.push('/home')
}

onMounted(async () => {
  const { data } = await getCategory()
  categoryData.value = dealCategoryData(data)
})
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.category {
  .category-header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    box-sizing: border-box;
    padding: 0 15px;
    border-bottom: 1px solid #dcdcdc;
    background: #fff;
    line-height: 50px;
    font-size: 15px;
    color: #656771;
    .fj();
    .wh(100%, 50px);
    &.active {
      background: @primary;
    }
    .header-search {
      display: flex;
      margin: 10px 0;
      padding: 5px 0;
      border-radius: 20px;
      width: 80%;
      height: 20px;
      background: #f7f7f7;
      line-height: 20px;
      color: #232326;
      .icon-search {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
      }
    }
  }
  .category-content {
    margin-top: 50px;
    :deep(.van-tabs) {
      .van-tab {
        width: 20%;
      }
      .van-tabs__line {
        background-color: @primary;
      }
      .van-tabs__wrap {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 999;
      }
      .van-tab__panel-wrapper {
        margin-top: 50px;
        padding-bottom: 50px;
        min-height: 90vh;
      }
      .van-tab__panel {
        display: flex;
        flex-wrap: wrap;
        .product-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 33%;
          height: 90px;
          font-size: 14px;
          .product-img img {
            padding: 5px 0;
            width: 50px;
            color: @primary;
          }
          .product-title {
            text-align: center;
            color: @primary;
          }
        }
      }
    }
  }
}
</style>
