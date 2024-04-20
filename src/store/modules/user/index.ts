import { defineStore } from 'pinia'
import moment from 'moment'
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
        if (response && response.data) {
          const today = moment()
          this.userInfo.packages = response.data.data.map((item) => {
            const endDate = moment(item.attributes.validity.split(' - ')[1], 'YYYY-MM-DD')
            const isExpired = today.isAfter(endDate)

            // 如果套餐已过期，自动更新其有效性
            if (isExpired)
              this.updatePackageInfo(item.id, { validity: '已过期' })

            return {
              id: item.id,
              name: item.attributes.name,
              points: item.attributes.points,
              price: `${item.attributes.price}￥`,
              validity: isExpired ? '已过期' : item.attributes.validity,
              usedPoints: item.attributes.usedPoints,
            }
          })
        }
        this.recordState()
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
