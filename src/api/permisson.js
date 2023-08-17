
import request from '@/utils/request'

/** *
 * 获取员工数据
 * **/
export function getPermission() {
    return request({
      url: '/sys/permission'
    })
  }

