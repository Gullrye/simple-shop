<template>
  <div class="about">
    <SHeader :name="'关于我们'" />
    <div class="msg-wrapper">
      <h2 class="title">关于我们</h2>
      <div class="intro">
        1......
        <br />2...... <br />3...... <br />4...... <br />5...... <br />6......
        <br />7......
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SHeader from '@/components/simple-header.vue'
</script>

<style lang="less" scoped>
.about {
  text-align: center;
  color: #1baeae;
  .title {
    display: inline-block;
    margin-top: 50px;
    padding: 10px 0;
    border-bottom: 1px dashed #1baeae;
    width: 50%;
    text-align: center;
  }
  .intro {
    padding-bottom: 100px;
    font-size: 20px;
  }
}
</style>
