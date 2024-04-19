<!-- aiUserProfile.vue -->

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NDrawer, NDrawerContent } from 'naive-ui'
import userprofile from '@/views/user/index.vue'
import { homeStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
// import { copyText3 } from "@/utils/format";
const { isMobile } = useBasicLayout()
const st = ref({ show: false })

watch(() => homeStore.myData.act, (act) => {
  if (act == 'userprofile') { // 监听个人中心状态变化
    st.value.show = true
  }
})
</script>

<template>
  <NDrawer v-model:show="st.show" :placement="isMobile ? 'bottom' : 'right'" :class="isMobile ? ['!h-[90vh]'] : ['!w-[50vw]']" style="--n-body-padding:0">
    <NDrawerContent :title="$t('mjtab.userprofileInfo')" closable>
      <userprofile v-if="st.show" @close="st.show = false" />
    </NDrawerContent>
  </NDrawer>
</template>
