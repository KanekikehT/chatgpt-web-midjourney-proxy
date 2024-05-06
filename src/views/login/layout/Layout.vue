<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAuthStore } from '@/store/authStore';

const { isMobile } = useBasicLayout()
const router = useRouter()
const isSignUpMode = ref(false)
const route = useRoute()
const store = useAuthStore();

const switchToSignUp = (() => {
  store.changeFormStatus(false) // 切换表单状态 切换成注册表单
  router.push({ name: 'register' });
})

const switchToSignIn = (() => {
  store.setLogin(true);
  store.changeFormStatus(true) // 切换表单状态 切换成登录表单
  router.push({ name: 'login' });
})

</script>

<template>
  <!-- Logo -->
  <div class="logo " @click="router.push({ name: 'Chat' })" />

  <div class="containera" :class="{ 'sign-up-mode': !store.LorR }">

    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </RouterView>

    <!-- 插画区域 -->
    <div class="panels-containera">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here?</h3>
          <p>Success is not final, failure is not fatal: it is the courage to continue that counts.</p>
          <button class="btn transparent" id="sign-up-btn" @click="switchToSignUp">Sign up</button>
        </div>
        <img src="https://kanekikeh.online/calvin/ruisenAI/loginResource/login.png" class="image">

      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>One of us?</h3>
          <p>Believe you can and you're halfway there.</p>
          <button class="btn transparent" id="sign-in-btn" @click="switchToSignIn">Sign in</button>

        </div>
        <img src="https://kanekikeh.online/calvin/ruisenAI/loginResource/register.png" class="image" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '/src/views/login/style/login.css';
/* Tailwind CSS 提供了所需的样式，此处无需额外添加 */
</style>
