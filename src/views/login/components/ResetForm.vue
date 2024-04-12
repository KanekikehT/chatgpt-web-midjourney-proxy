<script setup>
import { computed, ref } from 'vue'
import { NButton, NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useBasicLayout, useLargeLayout, useMediumLayout, useTVLayout, useXLScreenLayout } from '@/hooks/useBasicLayout'

import { getVerificationCode, resetPassword } from '@/api' // 引入API方法
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
const { isMedium } = useMediumLayout()
const { isLarge } = useLargeLayout()
const { isXL } = useXLScreenLayout()
const { isTV } = useTVLayout()
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
      const { phoneNumber, password, code } = formValue.value
      try {
        await resetPassword(phoneNumber, password, code)
        // console.log('密码重置成功')
        // 密码重置成功后的逻辑...
        ms.success('密码重置成功')
        router.push({ name: 'login' })
      }
      catch (error) {
        console.error('密码重置失败', error)
        ms.error(`码重置失败：${error.message}`)
      }
    }
    else {
      // console.log('验证失败', errors)
    }
  })
}

const startCountdown = async () => {
  if (isCountingDown.value || !formValue.value.phoneNumber)
    return
  isCountingDown.value = true
  countdown.value = 60
  try {
    await getVerificationCode(formValue.value.phoneNumber)
    // console.log('验证码发送成功')
    // 省略倒计时逻辑...
  }
  catch (error) {
    console.error('获取验证码失败', error)
  }
}

// computed
const containerClass = computed(() => {
  return isMobile.value
    ? 'border shadow rounded flex flex-col absolute'
    : 'border shadow rounded flex flex-col items-center absolute left-24 top-14'
})
const containerStyle = computed(() => {
  if (isMobile.value)
    return 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 340px;'
  else if (isMedium.value)
    return 'position: absolute; left: 8vw; width: 340px; top: 15vh;'

  else if (isLarge.value)
    return 'position: absolute; width: 25vw; left: 6vw;'
  else if (isXL.value)
    return 'position: absolute; left: 10vw; width: 35vw; top: 10vh;'
  else if (isTV.value)
    return 'position: absolute; left: 15vw; width: 45vw; top: 5vh;'

  return 'position: absolute; width: 340px; left: 24vw; top: 14vh;' // 默认样式
})
</script>

<template>
  <div :class="containerClass" :style="containerStyle">
    <div class="text-2xl font-bold mt-6" style="font-family: 'Microsoft YaHei'; text-align: center">
      重置密码
    </div>
    <div class="text-gray-500 text-xs mt-1" style="text-align: center">
      请输入您需要重置的账号密码
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
          重置密码
        </NButton>
      </NFormItem>
    </NForm>
  </div>
</template>

<style scoped>
/* Tailwind CSS 已足够，无需额外添加 */
</style>
