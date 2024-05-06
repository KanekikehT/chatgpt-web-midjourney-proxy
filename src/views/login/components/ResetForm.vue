<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { getVerificationCode, resetPassword } from '@/api' // 引入API方法
import { handleBlur } from '@/views/login/utils/validators.js';
import { useAuthStore } from '@/store/authStore';

const isCountingDown = ref(false)
const countdown = ref(0)
const ms = useMessage()
const router = useRouter()
const store = useAuthStore();
const removeAnimate = ref(false)

const form = ref({
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  code: ''
});
const errors = ref({
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  code: ''
});


const startCountdown = async () => {
  if (isCountingDown.value || !form.value.phoneNumber)
    return handleBlur('phoneNumber');

  try {
    await getVerificationCode(form.value.phoneNumber) // 调用获取验证码的API
    // //('验证码发送成功') // 可以在这里添加成功提示
    ms.success('验证码发送成功')
    // 开始倒计时
    isCountingDown.value = true
    countdown.value = 120
    const interval = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(interval)
        isCountingDown.value = false
      }
    }, 1000)
  }
  catch (error) {
    console.error('获取验证码失败', error)
    // 这里可以处理获取验证码失败的情况，例如显示错误消息
  }
}

async function validateForm() {
  // 简化验证逻辑
  const fields = ['phoneNumber', 'password', 'confirmPassword', 'code'];
  const str = `${form.value.password};${form.value.confirmPassword}`;
  fields.forEach(field => {
    const value = field === 'confirmPassword' ? str : form.value[field];
    errors.value[field] = handleBlur(field, value);
  });

  // 检查所有错误是否为空
  if (Object.values(errors.value).every(error => !error)) {
    try {
      const { phoneNumber, password, code } = form.value;
      await resetPassword(phoneNumber, password, code);
      ms.success('密码重置成功');
      router.push({ name: 'login' });
    } catch (error) {
      console.error('密码重置失败', error);
      handleError(error);
    }
  }
}

function handleError(error) {
  if (error instanceof Error) {
    ms.error(`密码重置失败：${error.message}`);
  } else {
    ms.error('密码重置失败：未知错误');
  }
}

/** 切换成 登录 面板 */
const toLogin = (() => {
  removeAnimate.value = true
  setTimeout(() => {
    store.setLogin(true);
    errors.value.phoneNumber = ''
    errors.value.password = ''
    errors.value.confirmPassword = ''
    errors.value.code = ''
  }, 1000);
})
</script>

<template>
  <!---------------------- 重置密码界面 ------------------------------->
  <form :class="[removeAnimate ? 'remove-RP-form' : null, 'sign-in-form', 'RPForm']">
    <!-- 表单内容 -->
    <h2 class="title">Reset Password</h2>
    <div class="input-field">
      <img src="https://kanekikeh.online/calvin/ruisenAI/loginResource/phone.png">
      <input type="text" placeholder="请输入手机号" v-model="form.phoneNumber" @blur="() => handleBlur('phoneNumber')">
      <span v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</span>
    </div>
    <div class="input-field">
      <img src="https://kanekikeh.online/calvin/ruisenAI/loginResource/password.png">
      <input type="password" placeholder="请输入密码" v-model="form.password" @blur="() => handleBlur('password')">
      <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
    </div>
    <div class="input-field">
      <img src="https://kanekikeh.online/calvin/ruisenAI/loginResource/password.png">
      <input type="password" placeholder="再次输入密码" v-model="form.confirmPassword"
        @blur="() => handleBlur('confirmPassword')">
      <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
    </div>
    <div class="input-field">
      <img src="https://kanekikeh.online/calvin/ruisenAI/loginResource/encryption.png">
      <input type="code" placeholder="请输入验证码" v-model="form.code" @blur="() => handleBlur('code')">
      <span v-if="errors.code" class="error-message">{{ errors.code }}</span>
    </div>
    <div style="display: flex; flex-direction: row;">
      <button class="btn solid" style="margin-right: 15px;" @click="startCountdown">
        {{ isCountingDown ? `${countdown}秒` : '获取验证码' }}
      </button>
      <button class="btn solid" @click="validateForm">重置密码</button>
    </div>
    <p class="text-gray-500 text-center" style="margin-top: 10px;">记起密码了！ 返回
      <text style=" color: #639761; cursor: pointer;" @click="toLogin">登录界面</text>
    </p>
    <div class="text-xs text-gray-500 mt-1 text-center">
      登录或注册视为您已同意<span class="text-sky-400">用户协议</span>和<span class="text-sky-400">隐私协议</span>
    </div>
  </form>
</template>

<style scoped>
/* Tailwind CSS 已足够，无需额外添加 */
@import '/src/views/login/style/login.css';
</style>
