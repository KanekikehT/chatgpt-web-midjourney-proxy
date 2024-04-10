<script setup lang='ts'>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginModal } from '@/utils/functions/useLoginModal'

// 使用 defineProps 来声明 Props
const props = defineProps<Props>()

const router = useRouter()

interface Props {
  visible: boolean
}

onMounted(() => {
  const { showLoginModal } = useLoginModal(props.visible.value, router)
  showLoginModal()
})
</script>

<template>
</template>
