import type { GlobalThemeOverrides } from 'naive-ui'
import { computed, watch } from 'vue'
import { darkTheme, useOsTheme } from 'naive-ui'
import { useAppStore } from '@/store'

export function useTheme() {
  const appStore = useAppStore()

  const OsTheme = useOsTheme()

  const isDark = computed(() => {
    if (appStore.theme === 'auto')
      return OsTheme.value === 'dark'
    else
      return appStore.theme === 'dark'
  })

  const theme = computed(() => {
    return isDark.value ? darkTheme : undefined
  })

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    if (!isDark.value) {
      // 白天模式样式
      return {
        common: {
          primaryColor: '#000000', // 主题色为黑色
          primaryColorHover: '#000000', // 鼠标悬浮时为浅灰色，提供微妙的反馈
          primaryColorPressed: '#cccccc', // 鼠标按下时为中等灰色，增加交互性
          textColor: '#000000', // 文字颜色为黑色，确保在白色背景上的可读性
          borderColor: '#d9d9d9', // 边框颜色为浅灰色，维持整体的黑白风格同时确保边框可见性
          bodyColor: '#ffffff', // 页面背景色为白色，清晰明亮
        },
        // 自定义其他组件样式...
      }
    }
    else {
      // 黑夜模式样式
      return {
        common: {
        },
        // 自定义其他组件样式...
      }
    }
  })

  watch(
    () => isDark.value,
    (dark) => {
      if (dark)
        document.documentElement.classList.add('dark')
      else
        document.documentElement.classList.remove('dark')
    },
    { immediate: true },
  )

  return { theme, themeOverrides }
}
