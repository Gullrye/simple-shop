<template>
  <div class="address-list">
    <SHeader :name="'地址管理'" :back="from" />
    <div class="address-item">
      <van-address-list
        v-model="chosenAddressId"
        :list="addressInfolist"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SHeader from '@/components/simple-header.vue'
import { getAddressList } from '@/api/address'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const from = ref(route.query.from ? `/${route.query.from}` : '')
const chosenAddressId = ref('1')
const addressInfolist = ref<any>([])

const onAdd = () => {
  router.push({ path: '/address-edit', query: { type: 'add' } })
}
const onEdit = (item: any) => {
  router.push({
    path: `/address-edit`,
    query: { type: 'edit', addressId: item.id }
  })
}
// 切换选中的地址时触发。item: 地址对象，index: 索引
const select = (item: any) => {
  if (from.value === '/user') {
    return
  }
  router.push({ path: `/order-create`, query: { addressId: item.id } })
}

onMounted(async () => {
  const { data } = await getAddressList()
  addressInfolist.value = data.map((item: any) => {
    return {
      id: item.addressId,
      name: item.userName,
      tel: item.userPhone,
      address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
      isDefault: !!item.defaultFlag
    }
  })
})
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.address-item {
  margin-top: 50px;
  :deep(.van-radio__icon--checked .van-icon-success) {
    border-color: @primary;
    background-color: @primary;
  }
  :deep(.van-radio__icon) {
    display: none;
  }
  :deep(.van-button--danger),
  :deep(.van-tag--danger) {
    border: none;
    outline: none;
    background-color: @primary;
  }
}
</style>
