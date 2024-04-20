<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NDrawer, NDrawerContent } from 'naive-ui'
import { homeStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()
const st = ref({ show: false })

// 监听活动状态，对应于公告弹窗
watch(() => homeStore.myData.act, (act) => {
  if (act === 'announcement')
    st.value.show = true
})

function closeDrawer() {
  st.value.show = false
}
</script>

<template>
  <NDrawer
    v-model:show="st.show" :placement="isMobile ? 'bottom' : 'right'"
    :class="isMobile ? ['!h-[90vh]'] : ['!w-[50vw]']" style="--n-body-padding:0"
  >
    <NDrawerContent title="文无便利店公告" closable @close="closeDrawer">
      <img src="../../assets/wenwu.svg" alt="文无便利店公告" class="mx-auto">
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
/* Tailwind CSS 已经充分利用 */
</style>
