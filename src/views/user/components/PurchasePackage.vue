<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { NButton, NModal, NQrCode, useMessage } from 'naive-ui'
import { convertPrice, generateOut_trade_no, queryOrderStatus, startCountdown } from '../utils/packageService'
import { closeOrder, createPackagePurchase, createPaymentOrder, getPackages } from '@/api'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useUserStore } from '@/store'

const { isMobile } = useBasicLayout()
const packages = ref([])
const showModal = ref(false)
const qrCodeUrl = ref('')
const orderPaid = ref(false)
const orderNumber = ref('')
const countdown = ref(120)
const countdownInterval = ref(null)
const queryInterval = ref(null)
const pollingActive = ref(false)
const userStore = useUserStore()
const { token } = userStore.userInfo
const ms = useMessage()
// //('---', token)

// 在组件挂载时调用API获取套餐列表
onMounted(async () => {
  try {
    const response = await getPackages()
    packages.value = response.data.data.map(pkg => pkg.attributes)
  }
  catch (error) {
    console.error('获取套餐数据失败：', error)
  }
})

onUnmounted(() => {
  clearInterval(countdownInterval.value)
  pollingActive.value = false
})

const closeModalAndOrder = async () => {
  showModal.value = false
  clearInterval(countdownInterval.value)
  pollingActive.value = false
  // 停止轮询查询订单状态
  if (queryInterval.value)
    clearInterval(queryInterval.value)
  // 调用API尝试关闭订单，仅当订单号存在且订单未支付时执行
  if (orderNumber.value && !orderPaid.value) {
    try {
      const response = await closeOrder(orderNumber.value, token)
    }
    catch (error) {
      console.error('关闭订单失败:', error.response ? error.response.data : error)
      // 这里可以处理错误，比如通知用户订单关闭失败
    }
  }
}

watch(showModal, (newVal) => {
  if (newVal) {
    countdown.value = 120
    countdownInterval.value = startCountdown(countdown.value, (currentCountdown) => {
      countdown.value = currentCountdown
    }, () => {
      closeModalAndOrder()
    })
  }
})

const purchasePackage = async (packageDetail) => {
  if (!isMobile.value) {
    try {
      orderNumber.value = generateOut_trade_no() // 生成唯一订单号
      const orderInfo = {
        description: packageDetail.name,
        out_trade_no: orderNumber.value,
        notify_url: 'https://api.noword.tech/api/payments/callback',
        amount: {
          total: convertPrice(packageDetail.price), // 注意单位是分
          currency: 'CNY',
        },
      }

      const response = await createPaymentOrder(orderInfo, token)
      if (response.data && response.data.data.code_url) {
        qrCodeUrl.value = response.data.data.code_url // 获取支付二维码URL
        showModal.value = true // 显示二维码模态框
        pollingActive.value = true
        let purchaseRecordCreated = false // 新增状态标志

        queryInterval.value = setInterval(async () => {
          if (!pollingActive.value) {
            clearInterval(queryInterval.value)
            return
          }
          const { data } = await queryOrderStatus(orderNumber.value, token)
          if (data.data.trade_state === 'SUCCESS' && !purchaseRecordCreated) {
            orderPaid.value = true
            const packagePurchaseData = {
              name: packageDetail.name,
              points: packageDetail.points,
              price: packageDetail.price,
              validity: packageDetail.validity,
            }
            await createPackagePurchase(packagePurchaseData, token)
            purchaseRecordCreated = true // 标记购买记录已创建
          }
          if (orderPaid.value || countdown.value <= 0) {
            closeModalAndOrder()
            ms.success('支付成功')
          }
        }, 3000)
      }
      else {
        console.error('无法获取支付信息')
      }
    }
    catch (error) {
      console.error('购买套餐过程中发生错误：', error)
    }
  }
  else {
    // 此功能在移动设备上不可用
    ms.info('请使用电脑浏览器打开此页面')
  }
}
</script>

<template>
  <NModal
    v-model:show="showModal" :mask-closable="false" class="custom-card" preset="card" style="width: 300px" title="扫码支付" size="huge"
    @update:show="closeModalAndOrder"
  >
    <NQrCode :value="qrCodeUrl" size="200" />
    <template #footer>
      <div style="display: flex; justify-content: center; width: 100%;">
        请在{{ countdown }}秒内完成支付
      </div>
    </template>
  </NModal>
  <div class="flex justify-center items-center gap-8 flex-wrap">
    <div
      v-for="(pkg, index) in packages"
      :key="index"
      class="flex flex-col items-center p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div class="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-2">
        {{ pkg.name }}
      </div>
      <div class="text-gray-800 dark:text-gray-200 mb-1">
        价格: ¥{{ pkg.price }}
      </div>
      <div class="text-gray-800 dark:text-gray-200 mb-1">
        积分: {{ pkg.points }}
      </div>
      <div class="text-gray-800 dark:text-gray-200 mb-4">
        有效期: {{ pkg.validity }}天
      </div>
      <NButton class="mt-auto" type="primary" size="small" @click="() => purchasePackage(pkg)">
        购买
      </NButton>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind CSS 已提供样式，这里不需要额外添加 */
</style>
