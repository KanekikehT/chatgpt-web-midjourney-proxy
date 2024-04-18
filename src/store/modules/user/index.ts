import { defineStore } from 'pinia'
import type { UserInfo, UserState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'
import { findPackagePurchases, updatePackagePurchase } from '@/api'

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  actions: {
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.recordState()
    },

    resetUserInfo() {
      this.userInfo = { ...defaultSetting().userInfo }
      this.recordState()
    },

    recordState() {
      setLocalState(this.$state)
    },

    setLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn
      this.recordState()
    },

    // 获取用户套餐数据
    async loadPackagePurchases() {
      if (!this.userInfo.token)
        throw new Error('用户未登录，无法加载套餐信息')

      try {
        const response = await findPackagePurchases(this.userInfo.token)
        console.log('Package purchases response:', response.data)
        if (response && response.data) {
          this.userInfo.packages = response.data.data.map(item => ({
            id: item.id,
            name: item.attributes.name,
            points: item.attributes.points,
            price: `${item.attributes.price}￥`,
            validity: item.attributes.validity,
            usedPoints: item.attributes.usedPoints, // 这里假设用于显示的usedPoints初始值为0，可以根据实际需要进行调整
          }))
        }
      }
      catch (error) {
        console.error('加载套餐信息失败:', error)
      }
    },
    async updatePackageInfo(packageId, updatedData) {
      if (!this.userInfo.token)
        throw new Error('用户未登录，无法更新套餐信息')

      try {
        const response = await updatePackagePurchase(packageId, updatedData, this.userInfo.token)
        // 更新本地状态，假设响应返回的是完整的套餐信息
        const updatedPackageIndex = this.userInfo.packages.findIndex(pkg => pkg.id === packageId)
        if (updatedPackageIndex !== -1) {
          this.userInfo.packages[updatedPackageIndex] = {
            ...this.userInfo.packages[updatedPackageIndex],
            ...response.data,
          }
        }
      }
      catch (error) {
        console.error('更新套餐信息失败:', error)
      }
    },
  },
})
