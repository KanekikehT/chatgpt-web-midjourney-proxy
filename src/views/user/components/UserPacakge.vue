<script setup lang="ts">
import { computed, ref } from 'vue'
import { NPagination } from 'naive-ui'

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
const pageCount = computed(() => Math.ceil(packages.value.length / pageSize))

const paginatedPackages = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return packages.value.slice(start, start + pageSize)
})

const updatePage = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div class="flex flex-col dark:bg-gray-800">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 dark:border-gray-600 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
                  套餐
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
                  积分
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
                  价格
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-600">
                  有效期
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider last:border-r-0">
                  已消耗
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
              <tr v-for="(pkg, index) in paginatedPackages" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">
                  {{ pkg.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">
                  {{ pkg.points }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">
                  {{ pkg.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600">
                  {{ pkg.validity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200 last:border-r-0">
                  {{ pkg.usedPoints }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <NPagination :page="currentPage" :page-count="pageCount" @update:page="updatePage" />
  </div>
</template>

<style scoped>
/* Tailwind CSS已足够，这里不需要额外的样式 */
</style>
