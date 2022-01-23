<template>
  <div>login</div>
</template>

<script setup lang="ts">
import service from '@/utils/request'
import { ref, Ref } from 'vue'
import { Md5 } from 'ts-md5/dist/md5'
defineProps<{ msg: string }>()

const data: Ref<any> = ref([])
const getData = async () => {
  data.value = await service.get('/index-infos')
  console.log(data.value)
  const xx = await service.post('/user/login', {
    loginName: '13600000009',
    passwordMd5: Md5.hashStr('111111')
  })
  console.log(xx)
}
getData()
</script>

<style lang="less" scoped></style>
