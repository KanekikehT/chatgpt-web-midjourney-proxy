<script setup lang="ts">
import { ref } from 'vue'
import { NPagination, NTable } from 'naive-ui'

const packages = ref([
  { name: 'Package A', points: 100, price: '10$', validity: '30 Days', usedPoints: 20 },
  { name: 'Package B', points: 200, price: '20$', validity: '60 Days', usedPoints: 50 },
  { name: 'Package C', points: 300, price: '30$', validity: '90 Days', usedPoints: 80 },
  { name: 'Package D', points: 400, price: '40$', validity: '120 Days', usedPoints: 100 },
  { name: 'Package E', points: 500, price: '50$', validity: '150 Days', usedPoints: 150 },
  { name: 'Package F', points: 600, price: '60$', validity: '180 Days', usedPoints: 200 },
])

const pageSize = 5
const currentPage = ref(1)
const pageCount = ref(Math.ceil(packages.value.length / pageSize))

const paginatedPackages = () => {
  const start = (currentPage.value - 1) * pageSize
  return packages.value.slice(start, start + pageSize)
}

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
        <tr v-for="(pkg, index) in paginatedPackages()" :key="index">
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
