<script setup lang="ts">
defineProps<{ msg: string }>()

console.log(import.meta.env.VITE_APP_BASE_URL)
</script>

<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <div class="box"></div>
  </div>
</template>

<style lang="less" scoped>
.box {
  width: 200px;
  height: 200px;
  background: red;
}
</style>
