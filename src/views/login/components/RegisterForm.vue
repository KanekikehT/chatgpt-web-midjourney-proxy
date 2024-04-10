<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NForm, NFormItem, NInput, NInputGroup, useMessage } from 'naive-ui'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { getVerificationCode, register } from '@/api' // 引入获取验证码的API函数
// variable
const formRef = ref(null)
const formValue = ref({
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  code: '',
})
// 获取是否为移动设备的状态
const { isMobile } = useBasicLayout()
// State for countdown
const isCountingDown = ref(false)
const countdown = ref(0)
const ms = useMessage()
const router = useRouter()

// Vuelidate can be used for more complex validations, here we use simple validation for demonstration
const rules = {
  phoneNumber: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: ['blur', 'input'] },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { validator: (rule, value) => value === formValue.value.password, message: '两次输入的密码不一致', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
  ],
}

// func
const handleSubmit = async () => {
  formRef.value.validate(async (errors) => {
    if (!errors) {
      try {
        const { phoneNumber, password, code } = formValue.value
        // 调用注册API
        const response = await register(phoneNumber, password, code)
        ms.success('注册成功')
        console.log('注册成功', response)
        router.push({ name: 'login' })
        // 根据业务需求处理注册成功后的逻辑，例如跳转到登录页面或首页
      }
      catch (error) {
        console.error('注册失败', error)
        ms.error(`注册失败：${error.message}`)
        // 处理注册失败的逻辑，例如显示错误消息
      }
    }
    else {
      console.log('验证失败', errors)
      // 处理表单验证失败的情况
    }
  })
}

const startCountdown = async () => {
  if (isCountingDown.value || !formValue.value.phoneNumber)
    return // Prevent multiple clicks or trigger without phoneNumber

  try {
    await getVerificationCode(formValue.value.phoneNumber) // 调用获取验证码的API
    console.log('验证码发送成功') // 可以在这里添加成功提示
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

// computed
const containerStyle = computed(() => {
  return isMobile.value ? ' position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%); width: 340px;' : 'width: 340px;'
})
const containerClass = computed(() => {
  return isMobile.value ? 'border shadow rounded  flex flex-col items-center p-4 bg-white' : 'border shadow rounded relative top-32 left-28  flex flex-col items-center p-4 bg-white'
})
</script>

<template>
  <div :class="containerClass" :style="containerStyle">
    <div class="text-2xl font-bold mt-6" style="font-family: 'Microsoft YaHei';">
      注册账号
    </div>
    <div class="text-gray-500 text-xs mt-1">
      创建新账户
    </div>
    <NForm
      ref="formRef"
      :model="formValue"
      :rules="rules"
      class="flex flex-col items-center mt-4"
    >
      <NFormItem label="账号" path="phoneNumber" label-placement="left" size="small">
        <NInput v-model:value="formValue.phoneNumber" placeholder="输入手机号" class="" />
      </NFormItem>
      <NFormItem label="密码" path="password" label-placement="left" size="small">
        <NInput v-model:value="formValue.password" type="password" placeholder="输入密码" class="" />
      </NFormItem>
      <NFormItem class="mr-6" label="确认密码" path="confirmPassword" label-placement="left" size="small">
        <NInput v-model:value="formValue.confirmPassword" type="password" placeholder="再次输入密码" class="" />
      </NFormItem>
      <NFormItem label="验证码" path="verificationCode" label-placement="left" size="small" class="">
        <NInputGroup class="flex items-center">
          <NInput v-model:value="formValue.code" placeholder="输入验证码" class="mr-2" style="width: 100px;" />
          <div v-if="isCountingDown" class="text-white flex items-center justify-center bg-gray-300 px-5 py-1 rounded cursor-not-allowed" style="min-width: 54px; height: 24px; line-height: 24px; font-size: 0.75rem;">
            {{ countdown }}秒
          </div>
          <NButton v-else size="tiny" class="ml-2 bg-blue-600 text-white" @click="startCountdown">
            获取验证码
          </NButton>
        </NInputGroup>
      </NFormItem>
      <NFormItem>
        <NButton native-type="submit" type="primary" @click="handleSubmit">
          注册
        </NButton>
      </NFormItem>
    </NForm>
    <div class="text-xs text-gray-500">
      注册即表示您同意<span class="text-sky-500">用户协议</span>和<span class="text-sky-500">隐私政策</span>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind CSS 已足够，无需额外添加 */
</style>
