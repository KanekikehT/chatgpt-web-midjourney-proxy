<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { NPagination, NTable } from 'naive-ui'
import { useUserStore } from '@/store'

const userStore = useUserStore()

// 确保packages始终是一个已定义的数组
const packages = computed(() => userStore.userInfo.packages || [])

const pageSize = 5
const currentPage = ref(1)

// 使用计算属性安全地计算页面数
const pageCount = computed(() => {
  return packages.value.length ? Math.ceil(packages.value.length / pageSize) : 0
})

// 分页逻辑也应确保packages.value是一个数组
const paginatedPackages = computed(() => {
  if (packages.value.length) {
    const start = (currentPage.value - 1) * pageSize
    return packages.value.slice(start, start + pageSize)
  }
  return [] // 当packages为空时返回空数组
})

onMounted(() => {
  userStore.loadPackagePurchases()
})

const updatePage = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div class="flex flex-col">
    <NTable :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>套餐</th>
          <th>积分</th>
          <th>价格</th>
          <th>有效期</th>
          <th>已消耗</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pkg, index) in paginatedPackages" :key="index">
          <td>{{ pkg.name }}</td>
          <td>{{ pkg.points }}</td>
          <td>{{ pkg.price }}</td>
          <td>{{ pkg.validity }}</td>
          <td>{{ pkg.usedPoints }}</td>
        </tr>
      </tbody>
    </NTable>
    <NPagination :page="currentPage" :page-count="pageCount" class="mt-2" @update:page="updatePage" />
  </div>
</template>
