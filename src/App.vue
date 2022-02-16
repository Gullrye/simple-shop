<template>
  <!-- vue2 写法 -->
  <!-- <keep-alive v-if="$route.meta.keepAlive">
    <router-view />
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive" />-->

  <!-- vue3 写法 -->
  <router-view v-slot="{ Component }">
    <!-- 记得加 key，不然可能报错 `parentComponent.ctx.deactivate is not a function` -->
    <keep-alive>
      <component
        :is="Component"
        v-if="$route.meta.keepAlive"
        :key="$route.path"
      />
    </keep-alive>
    <component
      :is="Component"
      v-if="!$route.meta.keepAlive"
      :key="$route.path"
    />
  </router-view>
</template>

<script setup lang="ts"></script>

<style lang="less">
// 页面顶部进度条
#nprogress {
  position: fixed;
  top: 0;
  z-index: 100000;
  .bar {
    background: #747bff !important; //自定义颜色
    .peg {
      box-shadow: 0 0 10px #747bff, 0 0 5px #747bff;
    }
  }
  .spinner {
    display: none !important;
  }
}
</style>
