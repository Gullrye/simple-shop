<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <router-view />
</template>

<style lang="less">
// 页面顶部进度条
#nprogress {
  .bar {
    background: #7a88fe !important; //自定义颜色
    .peg {
      box-shadow: 0 0 10px #7a88fe, 0 0 5px #7a88fe;
    }
  }
  .spinner {
    display: none !important;
  }
}
</style>
