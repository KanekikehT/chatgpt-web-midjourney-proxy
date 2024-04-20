<script setup lang='ts'>
import { computed, onMounted } from 'vue'
import { NLayout, NLayoutContent, NModalProvider, useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import Sider from './sider/index.vue'
import Permission from './Permission.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { gptConfigStore, homeStore, useAppStore, useChatStore, useUserStore } from '@/store'
import { aiFooter, aiSider } from '@/views/mj'
import aiMobileMenu from '@/views/mj/aiMobileMenu.vue'
import { t } from '@/locales'
import { createPackagePurchase, openaiSetting, updateUser } from '@/api'
import { isObject } from '@/utils/is'

const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()
const userStore = useUserStore()

const { isLoggedIn } = userStore
const rt = useRoute()
const ms = useMessage()
openaiSetting(rt.query)
if (rt.name == 'GPTs') {
  const model = `gpt-4-gizmo-${rt.params.gid.toString()}`
  gptConfigStore.setMyData({ model })
  ms.success(`GPTs ${t('mj.modleSuccess')}`)
}
else if (rt.name == 'Setting') {
  openaiSetting(rt.query)
  if (isObject(rt.query))
    ms.success(t('mj.setingSuccess'))
}
else if (rt.name == 'Model') {
  const model = `${rt.params.gid.toString()}`
  gptConfigStore.setMyData({ model })
  ms.success(t('mj.modleSuccess'))
}

router.replace({ name: 'Chat', params: { uuid: chatStore.active } })
homeStore.setMyData({ local: 'Chat' })
const { isMobile } = useBasicLayout()

const collapsed = computed(() => appStore.siderCollapsed)

const getMobileClass = computed(() => {
  if (isMobile.value)
    return ['rounded-none', 'shadow-none']
  return ['shadow-md', 'dark:border-neutral-800'] // 'border', 'rounded-md',
})

const getContainerClass = computed(() => {
  return [
    'h-full',
    { abc: !isMobile.value && !collapsed.value },
  ]
})

onMounted(() => {
  if (isLoggedIn)
    userStore.loadPackagePurchases()
  const userInfo = userStore.userInfo
  const token = userInfo.token
  if ((userInfo.newuser === true || userInfo.newuser === null) && token) {
    // 使用立即执行的异步函数处理购买逻辑
    (async () => {
      const newUserPackageDetail = {
        name: '新用户注册礼包',
        price: '50', // 价格是50分
        points: 1000, // 赠送1000积分
        validity: '30', // 有效期30天
      }
      try {
        await createPackagePurchase(newUserPackageDetail, token)
        await updateUser(userInfo.id, { newuser: false }, token)
        await userStore.updateUserInfo({ newuser: false })
      }
      catch (error) {
      }
    })()
  }
})
</script>

<template>
  <div class="  dark:bg-[#24272e] transition-all p-0" :class="[isMobile ? 'h55' : 'h-full']">
    <div class="h-full overflow-hidden" :class="getMobileClass">
      <NLayout class="z-40 transition" :class="getContainerClass" has-sider>
        <aiSider v-if="!isMobile" />
        <Sider />
        <NLayoutContent class="h-full">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </div>
    <NModalProvider>
      <Permission v-if="!isLoggedIn" :visible="!isLoggedIn" />
    </NModalProvider>
  </div>
  <aiMobileMenu v-if="isMobile" />

  <aiFooter />
</template>

<style>
.h55{
  height: calc(100% - 55px);
}
</style>
