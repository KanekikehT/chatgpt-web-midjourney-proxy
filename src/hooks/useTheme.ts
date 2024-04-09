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
    if (!isDark.value) { // 当主题为明亮模式时
      return {
        common: {
          primaryColor: '#000000', // 主题色为黑色
          primaryColorHover: '#000000', // 鼠标悬浮时为黑色
          primaryColorPressed: '#000000', // 鼠标按下时为黑色
          textColor: '#000000', // 文字颜色也设置为黑色，确保一致性

        },
        // 根据需要，可以继续覆盖其他组件的主题变量
      }
    }
    else { // 暗色主题时使用默认或自定义的暗色主题配置
      return {
        common: {},
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
