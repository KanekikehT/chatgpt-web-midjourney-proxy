<script setup lang="ts">
// pacakge
import { defineProps } from 'vue'
import { NAlert, NTabPane, NTabs } from 'naive-ui'

// page
import UserPacakge from './UserPacakge.vue'
import PurchasePackage from './PurchasePackage.vue'

// props
interface UserInfo {
  avatar: string
  name: string
  points: number
}

const props = defineProps<{
  userInfo: UserInfo
  isLoggedIn: boolean
}>()
</script>

<template>
  <!-- 用户信息 -->
  <div class="p-4 md:p-8 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-lg">
    <div class="flex flex-col items-center">
      <img :src="userInfo.avatar" alt="用户头像" class="w-24 h-24 rounded-full border-2 border-gray-400 dark:border-gray-600">
      <h2 class="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
        {{ userInfo.name }}
      </h2>
    </div>

    <!-- 提示 -->
    <NAlert type="warning" closable class="mt-4">
      <span>提醒：</span>当您的积分消耗完或套餐过期之后，再重新购买套餐。
    </NAlert>

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
      <NTabPane name="系统公告" tab="系统公告" />
    </NTabs>
  </div>
</template>

<style scoped>
</style>
