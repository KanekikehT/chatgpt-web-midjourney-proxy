<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()
const router = useRouter()
const rt = useRoute()

// 使用 computed 来根据 isMobile 状态返回相应的 Tailwind CSS 类
const bgClass = computed(() => {
  return isMobile.value ? '' : 'bg-[url("/src/assets/test.png")] bg-no-repeat bg-contain'
})
</script>

<template>
  <div :class="[bgClass]" class="w-screen h-screen">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </RouterView>
  </div>
</template>

<style scoped>
/* Tailwind CSS 提供了所需的样式，此处无需额外添加 */
</style>
