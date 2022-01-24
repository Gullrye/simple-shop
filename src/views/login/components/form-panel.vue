<template>
  <div class="form-panel">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="btn-wrapper">
        <div class="toggle-link" @click="toggle">
          {{ formType === 'login' ? '立即注册' : '已有登录账号' }}
        </div>
        <van-button
          round
          block
          type="default"
          color="#7a88fe"
          native-type="submit"
          >{{ formType === 'login' ? '登录' : '注册' }}</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Toast } from 'vant'
import { Md5 } from 'ts-md5/dist/md5'
import { login, register } from '@/api/user'
import cache from '@/utils/cache'

const username = ref('13600000009')
const password = ref('111111')
const formType = ref('login')
const emit = defineEmits(['toggleType'])

// 切换登录、注册
const toggle = () => {
  if (formType.value === 'login') {
    username.value = ''
    password.value = ''
  } else {
    username.value = '13600000009'
    password.value = '111111'
  }
  formType.value = formType.value === 'login' ? 'register' : 'login'
  emit('toggleType', formType.value)
}

// 提交
interface formDataType {
  username: string
  password: string
}
const onSubmit = async (values: formDataType) => {
  if (formType.value === 'login') {
    const { data } = await login({
      loginName: values.username,
      passwordMd5: Md5.hashStr(values.password)
    })
    cache.setCache('token', data)
    window.location.href = './'
    Toast.success('登录成功')
  } else {
    await register({
      loginName: values.username,
      password: values.password
    })
    Toast.success('注册成功')
    formType.value = 'login'
  }
}
</script>

<style lang="less" scoped>
.btn-wrapper {
  .toggle-link {
    display: inline-block;
    margin-bottom: 20px;
    font-size: 14px;
    color: #1989fa;
  }
  margin: 16px;
}
</style>
