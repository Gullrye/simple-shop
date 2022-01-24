<template>
  <div class="simple-header">
    <i @click="goBack" class="iconfont icon-back"></i>
    <div class="simple-header-name">{{ name }}</div>
    <i class="iconfont icon-menu"></i>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  back: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['callback'])
// 点击头部组件右侧返回按钮，让路由往回切一页
const goBack = () => {
  if (!props.back) {
    router.go(-1)
  } else {
    router.push({ path: props.back })
  }
  emit('callback')
}
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.simple-header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  padding: 0 10px;
  border-bottom: 1px solid #dcdcdc;
  background: #fff;
  line-height: 44px;
  color: #252525;
  .fj();
  .wh(100%, 44px);
  .boxSizing();
  .simple-header-name {
    font-size: 14px;
  }
}
</style>
