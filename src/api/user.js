import request from '@/utils/request'

export function login(data) {
  
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}


// 获取用户资料  get
export function getUserInfo() {
  return request({
    url: '/sys/profile'
  })
}

