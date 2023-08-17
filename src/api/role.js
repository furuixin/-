import request from '@/utils/request'

/** *
 * 获取角色列表
 * **/
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}

//  更新角色信息
export function updateRole(data) {
    return request({
      url: `/sys/role/${data.id}`,
      method:'PUT',
      data // 查询参数
    })
  }

// 获取所有的角色
//获取可用角色   /sys/role/list/enabled
export function getEnabledRoles() {
  return request({
    url: `/sys/role/list/enabled`
  })
}

// 给员工分配角色
export function assignRole(data) {
  return request({
    url: `/sys/user/assignRoles`,
    method:"PUT",
    data
  })
}