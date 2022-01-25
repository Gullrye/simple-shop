<template>
  <div class="address-edit">
    <SHeader :name="`${type == 'add' ? '新增地址' : '编辑地址'}`" />
    <van-address-edit
      :area-list="areaListData"
      :show-postal="false"
      :show-delete="type == 'edit'"
      :address-info="addressInfo"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SHeader from '@/components/simple-header.vue'
import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddressDetail
} from '@/api/address'
import router from '@/router'
import { Toast } from 'vant'
import { useRoute } from 'vue-router'
import { areaList } from '@vant/area-data'

const route = useRoute()
const areaListData = ref<any>(areaList)
const searchResult = ref<any>([])
const type = ref<any>('add')
const addressId = ref<any>('')
const addressInfo = ref<any>({})

const onSave = async (content: any) => {
  const params: any = {
    userName: content.name,
    userPhone: content.tel,
    provinceName: content.province,
    cityName: content.city,
    regionName: content.county,
    detailAddress: content.addressDetail,
    defaultFlag: content.isDefault ? 1 : 0
  }
  if (type.value === 'edit') {
    params.addressId = addressId.value
  }
  if (type.value === 'add') await addAddress(params)
  else await editAddress(params)
  Toast('保存成功')
  setTimeout(() => {
    router.push({ path: '/address-list' })
  }, 1000)
}
const onDelete = async () => {
  await deleteAddress(addressId.value)
  Toast('删除成功')
  setTimeout(() => {
    router.push({ path: '/address-list' })
  }, 1000)
}

onMounted(async () => {
  const { addressId: addressIdQuery, type: typeQuery } = route.query
  addressId.value = addressIdQuery
  type.value = typeQuery
  if (typeQuery === 'edit') {
    let _areaCode = ''
    const province = Object.entries(areaListData.value.province_list)
    const { data: addressDetail } = await getAddressDetail(addressIdQuery)
    // Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组
    Object.entries(areaListData.value.county_list).forEach(([id, text]) => {
      // 遍历区，找到和地址详情接口的 regionName 相同的区。然后找到该区对应的省和市，然后判断：区对应的省和市 === 地址详情接口的省和市？是就将该区的 id 赋值给 _areaCode
      // xx 区
      if (text === addressDetail.regionName) {
        // 区对应的多个省份
        const provinceIndex = province.findIndex(item => {
          return item[0].slice(0, 2) === id.slice(0, 2)
        })
        // 区对应的多个市
        const cityItem = Object.entries(areaListData.value.city_list).filter(
          item => item[0].slice(0, 4) === id.slice(0, 4)
        )[0]
        // 对比找到的省份和接口返回的省份是否相等，因为有些区可能重名
        if (
          province[provinceIndex][1] === addressDetail.provinceName &&
          cityItem[1] === addressDetail.cityName
        ) {
          _areaCode = id
        }
      }
    })
    addressInfo.value = {
      id: addressDetail.addressId,
      name: addressDetail.userName,
      tel: addressDetail.userPhone,
      province: addressDetail.provinceName,
      city: addressDetail.cityName,
      county: addressDetail.regionName,
      addressDetail: addressDetail.detailAddress,
      areaCode: _areaCode,
      isDefault: !!addressDetail.defaultFlag
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/assets/css/mixin';
.address-edit {
  margin-top: 50px;
  :deep(.van-button--danger),
  :deep(.van-switch--on) {
    border-color: @primary;
    background-color: @primary;
  }
}
</style>
