<template>
  <div class="login">
    <SHeader :name="type == 'login' ? '登录' : '注册'" :back="'/home'" />
    <div class="logo">
      <i
        :class="[
          { register: type === 'register' },
          'iconfont',
          'icon-erhaohaiou'
        ]"
      ></i>
      <h1>OH商城</h1>
    </div>
    <div class="login-body login">
      <FormPanel @toggleType="handleTypeToggle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHeader from '@/components/simple-header.vue'
import FormPanel from './components/form-panel.vue'

const type = ref('login')

const handleTypeToggle = (currentType: string) => {
  type.value = currentType
}
</script>

<style lang="less" scoped>
.login {
  .logo {
    margin: 80px auto 0;
    width: 150px;
    height: 150px;
    text-align: center;
    color: #1baeae;
    i {
      display: block;
      font-size: 80px;
      transition: all .3s;
      &.register {
        transform: rotateY(180deg);
      }
    }
  }
  .login-body {
    padding: 0 20px;
  }
}
</style>
