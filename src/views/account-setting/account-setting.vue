<template>
  <div class="account-setting">
    <SHeader :name="'账号管理'" />
    <div class="input-item">
      <van-field v-model="nickName" type="number" label="昵称" />
      <van-field v-model="introduceSign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
    </div>
    <van-button
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="save"
      block
      >保存</van-button
    >
    <van-button
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="logoutFn"
      block
      >退出登录</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SHeader from '@/components/simple-header.vue'
import { Toast } from 'vant'
import { Md5 } from 'ts-md5/dist/md5'
import { getUserInfo, editUserInfo, logout } from '@/api/user'
import cache from '@/utils/cache'

const nickName = ref('')
const introduceSign = ref('')
const password = ref('')

const save = async () => {
  const params = {
    introduceSign: introduceSign.value,
    nickName: nickName.value,
    passwordMd5: Md5.hashStr(password.value)
  }
  await editUserInfo(params)
  Toast('保存成功')
}
const logoutFn = async () => {
  const { resultCode } = await logout()
  if (resultCode === 200) {
    cache.setCache('token', '')
    window.location.href = '/'
  }
}

onMounted(async () => {
  const { data } = await getUserInfo()
  nickName.value = data.nickName
  introduceSign.value = data.introduceSign
})
</script>

<style lang="less" scoped>
.account-setting {
  .input-item {
    margin-top: 70px;
  }
  .save-btn {
    margin: 20px auto;
    width: 80%;
  }
}
</style>
