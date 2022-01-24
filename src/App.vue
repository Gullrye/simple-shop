<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style lang="less">
// 页面顶部进度条
#nprogress {
  position: fixed;
  top: 0;
  z-index: 100000;
  .bar {
    background: #1baeae !important; //自定义颜色
    .peg {
      box-shadow: 0 0 10px #1baeae, 0 0 5px #1baeae;
    }
  }
  .spinner {
    display: none !important;
  }
}
</style>
