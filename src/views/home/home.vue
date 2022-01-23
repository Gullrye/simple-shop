<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <div class="box"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<style lang="less" scoped>
.box {
  width: 200px;
  height: 200px;
  background: red;
}
</style>
