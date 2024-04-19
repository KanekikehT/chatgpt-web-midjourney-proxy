<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NDrawer, NDrawerContent } from 'naive-ui'
import { homeStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()
const st = ref({ show: false })

// 监听活动状态，对应于公告弹窗
watch(() => homeStore.myData.act, (act) => {
  if (act === 'announcement') {
    st.value.show = true;
  }
});

function closeDrawer() {
  st.value.show = false;
}
</script>

<template>
  <NDrawer v-model:show="st.show" :placement="isMobile ? 'bottom' : 'right'"
           :class="isMobile ? ['!h-[90vh]'] : ['!w-[50vw]']" style="--n-body-padding:0">
    <NDrawerContent title="公告" closable @close="closeDrawer">
      <!-- 公告内容 -->
      <div class="p-4">
        <h2 class="text-lg font-semibold">欢迎使用文无AI</h2>
        <p class="mt-2 text-sm text-gray-600">这是我们网站的最新公告。请仔细阅读，以了解重要信息和更新。</p>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
/* 这里可以添加你需要的 Tailwind CSS 样式 */
</style>
