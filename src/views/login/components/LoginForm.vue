<script setup>
// pacakge
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NForm, NFormItem, NInput, useMessage } from 'naive-ui'
import { useBasicLayout, useLargeLayout, useMediumLayout, useTVLayout, useXLScreenLayout } from '@/hooks/useBasicLayout'
import { login } from '@/api'
import { useUserStore } from '@/store'

// variable
const formRef = ref(null)
const formValue = ref({
  phoneNumber: '',
  password: '',
})
// 获取是否为移动设备的状态
const { isMobile } = useBasicLayout()
const { isMedium } = useMediumLayout()
const { isLarge } = useLargeLayout()
const { isXL } = useXLScreenLayout()
const { isTV } = useTVLayout()

const router = useRouter()
const ms = useMessage()
const userStore = useUserStore()

const rules = {
  phoneNumber: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: ['blur', 'input'] },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
}

// func
const handleSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (!errors) {
      try {
        // 调用API并等待结果
        const response = await login(formValue.value.phoneNumber, formValue.value.password)
        // console.log('登录成功', response)
        await userStore.updateUserInfo({ token: response.data.jwt, name: response.data.user.username, isLoggedIn: true })
        // console.log('---', userStore.userInfo)
        ms.success('登录成功')
        router.push({ name: 'Chat' })
        // 根据业务需求处理响应，例如保存jwt或跳转到首页
        // 示例：假设jwt保存在localStorage，跳转到首页
      }
      catch (error) {
        console.error('登录失败', error)
        ms.error(`登录失败：${error.message}`)
        // 这里可以处理错误，例如显示一个错误消息
        // 例如：this.$message.error('登录失败');
      }
    }
    else {
      // console.log('验证失败', errors)
      // 处理表单验证失败的情况
    }
  })
}

// computed
// flex flex-col items-center
// top-14 left-28
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
    <div class="flex flex-col items-center bg-white">
      <!-- title -->
      <div class="text-2xl font-bold mt-8" style="font-family: 'Microsoft YaHei';">
        登录/注册
      </div>
      <!-- desc -->
      <div class="text-gray-500 text-xs mt-1">
        使用手机号及密码登录网站
      </div>
      <!-- 表单 -->
      <NForm
        ref="formRef"
        :model="formValue"
        :rules="rules"
        class="flex flex-col items-center mt-4"
      >
        <!-- 邮箱 -->
        <NFormItem label="账号" path="phoneNumber" label-placement="left">
          <NInput v-model:value="formValue.phoneNumber" class=" " placeholder="输入手机号" />
        </NFormItem>
        <!-- 密码 -->
        <NFormItem label="密码" path="password" label-placement="left">
          <NInput
            v-model:value="formValue.password"
            type="password"
            placeholder="输入密码"
            class=""
          />
        </NFormItem>
        <!-- 登录按钮  -->
        <NFormItem class="">
          <NButton type="primary" @click="handleSubmit">
            登录
          </NButton>
        </NFormItem>
      </NForm>
      <div class="">
        <!-- 忘记密码入口 -->
        <router-link :to="{ name: 'register' }" class="text-xs text-gray-500 hover:text-gray-700 mr-2">
          注册账号
        </router-link>
        <router-link :to="{ name: 'reset' }" class="text-xs text-gray-500 hover:text-gray-700">
          忘记密码?
        </router-link>
      </div>
    </div>
    <!-- desc -->
    <div class="bg-zinc-100 w-full h-52 border ">
      <div class="flex flex-col">
        <div class="text-xl font-bold mt-6 ml-6" style="font-family: 'Microsoft YaHei';">
          100万人使用的ChatGPT工作站
        </div>
        <div class="text-xs text-gray-500 mt-4 ml-10">
          <p class="mt-2">
            金融级中转服务器，大模型使用更省力
          </p>
          <p class="mt-2">
            无需下载客户端，网页就能在线生成内容
          </p>
          <p class="mt-2">
            OpenAI官方API数据接口，体验AIGC前沿技术
          </p>
        </div>
        <div class="flex justify-center mt-4">
          <NButton round size="tiny">
            了解更多
          </NButton>
        </div>
      </div>
    </div>
    <div class="text-xs text-gray-500 mt-1">
      登录或注册视为您已同意<span class="text-sky-400">用户协议</span>和<span class="text-sky-400">隐私协议</span>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind CSS 提供了所需的样式，此处无需额外添加 */
</style>
