<script setup>
import { onMounted, ref } from 'vue'
import { NButton } from 'naive-ui'
import { getPackages } from '@/api' // 确保这里的路径是正确的

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

// 在组件挂载时调用API
onMounted(async () => {
  try {
    const response = await getPackages()
    // 适应Strapi API返回的数据结构
    packages.value = response.data.data.map(pkg => pkg.attributes)
  }
  catch (error) {
    console.error('获取套餐数据失败：', error)
    packages.value = fallbackPackages // 如果API调用失败，使用备用数据
  }
})
</script>

<template>
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
