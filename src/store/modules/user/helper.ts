import { ss } from '@/utils/storage'
import { t } from '@/locales'
const LOCAL_NAME = 'userStorage'

export interface Package {
  id: number
  name: string
  points: number
  price: string
  validity: string
  usedPoints: number
}

export interface UserInfo {
  avatar: string
  name: string
  description: string
  points: number
  token: string
  packages: Package[] // 用户的套餐列表
}

export interface UserState {
  userInfo: UserInfo
  isLoggedIn: boolean // 新增登录状态字段
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://raw.githubusercontent.com/Dooy/chatgpt-web-midjourney-proxy/main/src/assets/avatar.jpg',
      name: t('mjset.sysname'), // 'AI绘图',
      description: '文无AI©2024.',
      points: 0,
      token: '',
      packages: [], // 初始化套餐数组

    },
    isLoggedIn: false, // 默认未登录状态
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
