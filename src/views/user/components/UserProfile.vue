<script setup lang="ts">
// pacakge
import { defineProps,computed } from 'vue'
import { NAlert, NTabPane, NTabs } from 'naive-ui'
import { useRouter } from 'vue-router'

// page
import UserPacakge from './UserPacakge.vue'
import PurchasePackage from './PurchasePackage.vue'

// props
interface UserInfo {
  avatar: string
  name: string
}

const props = defineProps<{
  userInfo: UserInfo
  isLoggedIn: boolean
}>()

// variables
const router = useRouter()

// 计算属性来检查用户是否需要登录
const needsLogin = computed(() => props.userInfo.name === '请登陆')

// 直接创建一个方法来处理点击事件
function handleLoginClick() {
  if (needsLogin.value) {
    router.push({ name: 'login' }).catch(err => {
      console.error('Router push error:', err);
    });
  }
}

</script>

<template>
  <!-- 用户信息 -->
  <div class="p-4 md:p-8 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-lg">
    <div class="flex flex-col items-center">
      <img :src="userInfo.avatar" alt="用户头像" class="w-24 h-24 rounded-full border-2 border-gray-400 dark:border-gray-600">
<h2 class="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
          @click="handleLoginClick">
        {{ userInfo.name }}
      </h2>
    </div>


    <!-- 选项卡 -->
    <NTabs
      v-if="isLoggedIn"
      class="mt-4"
      default-value="我的套餐"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <!-- 购买记录 -->
      <NTabPane name="我的套餐" tab="我的套餐">
        <UserPacakge />
      </NTabPane>
      <NTabPane name="购买套餐" tab="购买套餐">
        <PurchasePackage />
      </NTabPane>
      <NTabPane name="邀请好友" tab="邀请好友" />
    </NTabs>
  </div>
</template>

<style scoped>
</style>
