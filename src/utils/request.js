import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data

  },
  async error => {
    if (error.response.status === 401) {
      // 提示错误信息
      Message({ type: "warning", message: 'token超时了' })
      // 调用退出的action
      console.log(store);
      await store.dispatch('user/logout')
      // 跳转到登录
      router.push('/login')
      return Promise.reject(error)
    }
    Message.error(error.message);
    return Promise.reject(error)
  }
)

export default service