<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { NTooltip } from 'naive-ui'
import { SvgIcon } from '@/components/common'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { homeStore, useChatStore, useUserStore } from '@/store'
import { router } from '@/router'
const { isMobile } = useBasicLayout()
const chatStore = useChatStore()

// import gallery from '@/views/gallery/index.vue'

const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))
const userStore = useUserStore()

const st = ref({ show: false, showImg: false, menu: [], active: 'chat' })

const userInfo = computed(() => userStore.userInfo)

const goHome = computed(() => {
  // router.push('/')
  return router.currentRoute.value.name
})
// const go=(n:string)=>{
//   if('chat'==n){
//         router.push('/chat/'+ chatStore.active??'1002')
//     }
//     if('draw'==n){
//         router.push('/draw/'+ chatStore.active??'1002')
//         st.value.show=true;
//     }
// }
// mlog('g', goHome() );
const chatId = computed(() => chatStore.active ?? '1002')
</script>

<template>
  <div v-if="!isMobile" class="flex-shrink-0 w-[60px] z-[1000]  h-full">
    <div class="flex h-full select-none flex-col items-center justify-between bg-[#e8eaf1] px-2 pt-4 pb-8 dark:bg-[#25272d]">
      <div class="flex flex-col space-y-4 flex-1">
        <a :href="`#/chat/${chatId}`" class="router-link-active router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]" @click="st.active = 'chat'">
          <NTooltip placement="right" trigger="hover">
            <template #trigger>
              <div class="flex h-full justify-center items-center py-1 flex-col " :class="[goHome == 'Chat' ? 'active' : '']">
                <SvgIcon icon="ri:wechat-line" class="text-3xl  flex-1" />
                <span class="text-[10px]">{{ $t('mjtab.chat') }}</span>
              </div>
            </template>
            AI Chat
          </NTooltip>
        </a>
        <a class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]" @click="homeStore.setMyData({ act: 'showgpts' }) ">
          <NTooltip placement="right" trigger="hover">
            <template #trigger>
              <div class="flex h-full justify-center items-center   py-1 flex-col">
                <SvgIcon icon="ri:apps-fill" class="text-3xl flex-1" />
                <span class="text-[10px]">GPTs</span>
              </div>
            </template>
            ChatGPT Store
          </NTooltip>
        </a>

        <a :href="`#/draw/${chatId}`" class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]" @click="st.active = 'draw'">
          <NTooltip placement="right" trigger="hover">
            <template #trigger>
              <div class="flex h-full justify-center items-center   py-1 flex-col" :class="[goHome == 'draw' ? 'active' : '']">
                <SvgIcon icon="ic:outline-palette" class="text-3xl flex-1" />
                <span class="text-[10px]">{{ $t('mjtab.draw') }}</span>
              </div>
            </template>
            {{ $t('mjtab.drawinfo') }}
          </NTooltip>
        </a>

        <a class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]" @click="homeStore.setMyData({ act: 'gallery' }) ">
          <NTooltip placement="right" trigger="hover">
            <template #trigger>
              <div class="flex h-full justify-center items-center   py-1 flex-col">
                <SvgIcon icon="material-symbols:imagesmode-outline" class="text-3xl flex-1" />
                <span class="text-[10px]">{{ $t('mjtab.gallery') }}</span>
              </div>
            </template>
            {{ $t('mjtab.galleryInfo') }}
          </NTooltip>
        </a>

        <!-- 我的 -->
        <a class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]" @click="homeStore.setMyData({ act: 'userprofile' }) ">
          <NTooltip placement="right" trigger="hover">
            <template #trigger>
              <div class="flex h-full justify-center items-center   py-1 flex-col">
                <SvgIcon icon="material-symbols:account-circle-outline" class="text-3xl flex-1" />
                <span class="text-[10px]">{{ $t('mjtab.userprofile') }}</span>
              </div>
            </template>
            {{ $t('mjtab.userprofileInfo') }}
          </NTooltip>
        </a>

        <!-- <section  class=" router-link-exact-active h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c] hover:bg-[#bbb] dark:hover:bg-[#555]"
             >
                <n-tooltip placement="right" trigger="hover">
                  <template #trigger>
                    <div  class="flex  h-full justify-center items-center py-1 flex-col ">
                      <SvgIcon icon="mingcute:grid-2-line" class="text-3xl flex-1"></SvgIcon>
                      <span class="text-[10px]">画廊</span>
                    </div>
                  </template>
                    画廊:看看别人是如何画的
                </n-tooltip>
            </section> -->
      </div>
    </div>
  </div>
  <Setting v-if="st.show" v-model:visible="st.show" />

  <!-- <n-drawer v-model:show="st.showImg" :placement="isMobile?'bottom':'right'"  :class="isMobile?['!h-[90vh]']: ['!w-[80vw]']" style="--n-body-padding:0">
    <n-drawer-content title="GPT store" closable>
      sdsd
    </n-drawer-content>
</n-drawer> -->
</template>
