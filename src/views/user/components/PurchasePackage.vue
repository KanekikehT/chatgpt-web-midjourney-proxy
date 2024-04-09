<script setup>
import { ref } from 'vue'
import { NButton } from 'naive-ui'

// 示例套餐列表
const packages = ref([
  { name: '套餐 A', points: 100, price: '¥99.00', validity: '30 天' },
  { name: '套餐 B', points: 200, price: '¥199.00', validity: '60 天' },
  { name: '套餐 C', points: 300, price: '¥299.00', validity: '90 天' },
  // 添加更多套餐详情
])

const purchasePackage = (packageDetail) => {
  // 实际应用中，这里应替换为触发购买逻辑
  alert(`购买成功! 套餐名称: ${packageDetail.name}`)
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(packageDetail, index) in packages"
      :key="index"
      class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div class="md:flex">
        <div class="p-6">
          <div class="uppercase tracking-wide text-lg text-indigo-500 dark:text-indigo-300 font-semibold">
            套餐名称: {{ packageDetail.name }}
          </div>
          <p class="block text-base leading-tight font-medium text-black dark:text-white">
            价格: {{ packageDetail.price }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            积分: {{ packageDetail.points }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
            有效期: {{ packageDetail.validity }}
          </p>
          <NButton class="" type="primary" size="small" @click="() => purchasePackage(packageDetail)">
            购买
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind CSS 已提供样式，这里不需要额外添加 */
</style>
