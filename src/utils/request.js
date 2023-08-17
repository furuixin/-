import axios from 'axios'
import store  from '@/store'
import { Message } from 'element-ui'
import router from '@/router'



const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL:"https://heimahr.itheima.net/api",
 
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    if(store.getters.token){
      config.headers.Authorization ='Bearer '+ store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if(response.data instanceof Blob) return response.data
    const {data,message,success} =response.data
    if(success){
      return data
    }else{
      Message({type:"error",message})
      return Promise.reject(new Error(message))
    }
     
  },
  error => {
    if(error.response.status ===401){
      Message({type:"warning",message:'token超时了'})
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default service