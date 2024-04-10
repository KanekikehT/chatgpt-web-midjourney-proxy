// useLoginModal.ts
import { useMessage, useModal } from 'naive-ui'

// variables
// 获取路由实例

// 将 isLoggedIn 作为参数传入函数
export function useLoginModal(isLoggedIn: boolean, router: Router) {
  const modal = useModal()
  const message = useMessage()

  const showLoginModal = () => {
    if (!isLoggedIn) {
      const modalInst = modal.create({
        title: '登录提示',
        content: '您尚未登录，请登录后继续操作。',
        preset: 'dialog',
        positiveText: '登录',
        negativeText: '取消',
        onPositiveClick: () => {
          // 这里可以放置登录操作，比如打开一个登录表单的模态框
          router.push({ name: 'login' })
          message.success('跳转登陆')
        },
        onNegativeClick: () => {
          message.info('取消登陆')
        },
      })
    }
    else {
      // 用户已登录时的其他操作
      message.success('您已登录')
    }
  }

  return { showLoginModal }
}
