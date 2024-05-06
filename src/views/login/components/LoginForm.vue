<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { login } from '@/api'
import { useUserStore } from '@/store'
import { handleBlur } from '@/views/login/utils/validators.js';
import ResetForm from '@/views/login/components/ResetForm.vue'
import { useAuthStore } from '@/store/authStore';

const router = useRouter()
const ms = useMessage()
const userStore = useUserStore()
const isLogin = ref(true)
const endAnimate = ref(true)
const store = useAuthStore();

const form = ref({
  phoneNumber: '',
  password: ''
});
const errors = ref({
  phoneNumber: '',
  password: ''
});


/** 校验登录 */
async function validateForm() {
  errors.value.phoneNumber = handleBlur('phoneNumber', form.value.phoneNumber);
  errors.value.password = handleBlur('password', form.value.password)
  if (!errors.value.phoneNumber && !errors.value.password) {
    console.log('表单验证通过，这里可以进行提交');
    try {
      // 调用API并等待结果
      const response = await login(form.value.phoneNumber, form.value.password)
      await userStore.updateUserInfo({ id: response.data.user.id, token: response.data.jwt, name: response.data.user.username, newuser: response.data.user.newuser })
      await userStore.setLoggedIn(true)
      // //('---', userStore.userInfo)
      ms.success('登录成功')
      router.push({ name: 'Chat' })
      // 根据业务需求处理响应，例如保存jwt或跳转到首页
      // 示例：假设jwt保存在localStorage，跳转到首页
    }
    catch (error) {
      console.error('登录失败', error)
      if (error instanceof Error) {
        ms.error(`登录失败：${error.message}`);
      } else {
        ms.error('登录失败：未知错误');
      }
    }
  }
}

/** 切换 重置密码 面板 */
const resetForm = (() => {
  endAnimate.value = false
  setTimeout(() => {
    store.setLogin(false);
    endAnimate.value = true
    errors.value.phoneNumber = ''
    errors.value.password = ''
  }, 1000);
})

onMounted(() => {
  store.changeFormStatus(true) // 切换表单状态 切换成登录表单
})
</script>

<template>
  <div class="forms-containera">
    <div class="signin-signup">
      <!---------------------- 登录表单 & 忘记密码界面 ------------------------------->
      <form v-if="store.isLogin" :class="[endAnimate ? 'enter-login-form' : 'form-animate', 'sign-in-form']">
        <!-- 表单内容 -->
        <h2 class="title">Sign in</h2>

        <!-- 手机号输入框 -->
        <div class="input-field">
          <img src="https://kanekikeh.online/calvin/ruisenAI/loginResource/phone.png" alt="Phone Icon">
          <input type="text" placeholder="请输入手机号" v-model="form.phoneNumber" @blur="() => handleBlur('phoneNumber')">
          <span v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</span>

        </div>

        <!-- 密码输入框 -->
        <div class="input-field">
          <img src="https://kanekikeh.online/calvin/ruisenAI/loginResource/password.png" alt="Password Icon">
          <input type="password" placeholder="请输入密码" v-model="form.password" @blur="() => handleBlur('password')">
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="btn solid" @click="validateForm">登 陆</button>
        <p class="text-gray-500 text-center" style="margin-top: 10px;">忘记密码了？ 快 <text
            style="color: #639761; cursor: pointer;" @click="resetForm">点击这里</text>
          进行找回吧！</p>
        <div class="text-xs text-gray-500  text-center" style="margin-top: 5px;">
          登录或注册视为您已同意<span class="text-sky-400">用户协议</span>和<span class="text-sky-400">隐私协议</span>
        </div>
      </form>

      <template v-else>
        <ResetForm></ResetForm>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import '/src/views/login/style/login.css';
/* Tailwind CSS 提供了所需的样式，此处无需额外添加 */
</style>
