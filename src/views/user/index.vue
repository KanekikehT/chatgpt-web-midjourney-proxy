<script setup lang="ts">
// pacakge
import UserProfile from './components/UserProfile.vue'
import { useUserStore } from '@/store'
// page

// toolfuc

// store
const userStore = useUserStore()

// variable
const { userInfo } = userStore
const { isLoggedIn } = userStore
</script>

<template>
  <div class="m-4 md:m-8 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-lg">
    <UserProfile :user-info="userInfo" :is-logged-in="isLoggedIn" />
  </div>
</template>

<style scoped>
</style>
