import { queryOrder } from '@/api'
export function generateOut_trade_no() {
  // 获取当前日期和时间
  const now = new Date()

  // 格式化日期时间
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const hour = now.getHours().toString().padStart(2, '0')
  const minute = now.getMinutes().toString().padStart(2, '0')
  const second = now.getSeconds().toString().padStart(2, '0')

  // 生成随机数
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')

  // 组合成订单号
  const orderNumber = `${year}${month}${day}${hour}${minute}${second}${random}`

  return orderNumber
}

export function convertPrice(price) {
  // 确保价格是数值类型，然后乘以100并四舍五入到最近的整数
  return Math.round(Number(price) * 100)
}
// 实现省略，已提供\

export function startCountdown(initialCountdown, onTick, onComplete) {
  let countdown = initialCountdown
  const intervalId = setInterval(() => {
    countdown -= 1
    onTick(countdown)

    if (countdown <= 0) {
      clearInterval(intervalId)
      onComplete()
    }
  }, 1000)
  return intervalId
}

export async function queryOrderStatus(orderNumber, token, onSuccess, onError) {
  try {
    // 假设`queryOrder`是一个API调用函数，需要你根据自己的后端实现
    const result = await queryOrder({ out_trade_no: orderNumber }, token)
    // console.log(result)
    return result
  }
  catch (error) {
    console.error('查询订单状态失败：', error)
  }
}
