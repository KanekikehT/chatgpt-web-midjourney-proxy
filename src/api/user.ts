import axios from 'axios'

// const API_BASE_URL = 'http://localhost:1337/api'
const API_BASE_URL = 'https://api.noword.tech/api'

// 用户登录
export const login = (phoneNumber: string, password: string) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { phoneNumber, password })
}

// 用户注册
export const register = (phoneNumber: string, password: string, code: string) => {
  return axios.post(`${API_BASE_URL}/auth/register`, { phoneNumber, password, code })
}

// 重置密码
export const resetPassword = (phoneNumber: string, password: string, code: string) => {
  return axios.post(`${API_BASE_URL}/auth/reset-password`, { phoneNumber, password, code })
}

// 获取验证码
export const getVerificationCode = (phoneNumber: string) => {
  return axios.post(`${API_BASE_URL}/auth/sendsms`, { phoneNumber })
}

// 获取所有可购买的套餐信息
export const getPackages = () => {
  return axios.get(`${API_BASE_URL}/packages`)
}

// 获取用户购买的套餐记录，需要用户JWT令牌
export const getPackagePurchases = (token) => {
  return axios.get(`${API_BASE_URL}/package-purchases`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// 创建支付订单
export const createPaymentOrder = (orderInfo, token) => {
  return axios.post(`${API_BASE_URL}/payments/native`, orderInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const queryOrder = (queryInfo, token) => {
  return axios.post(`${API_BASE_URL}/payments/query-order`, queryInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// 关闭订单
export const closeOrder = (orderNumber, token) => {
  return axios.post(`${API_BASE_URL}/payments/close-order`, { out_trade_no: orderNumber }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
