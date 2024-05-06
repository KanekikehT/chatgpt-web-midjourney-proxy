import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: true,
    LorR: true, // Login or Register 控制登录或注册表单切换
  }),
  actions: {
    /** 切换 登录 & 重置密码 表单状态 */
    setLogin(status: boolean) {
      this.isLogin = status;
    },

    /** 切换 登录 & 注册 表单状态 */
    changeFormStatus(status: boolean) {
      this.LorR = status
    }
  }
});
