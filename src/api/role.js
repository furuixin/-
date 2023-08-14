import request from '@/utils/request'
//  更新角色信息
export function updateRole(data) {
    return request({
        url: `/sys/role/${data.id}`,
        method: 'PUT',
        data // 查询参数
    })
}

// 获取角色列表
export function getRoleList(params) {
    return request({
        url: '/sys/role',
        method:'GET',
        params // 查询参数
    })

}

//获取可用角色   /sys/role/list/enabled
export function getEnabledRoles(id) {
    return request({
      url: `/sys/role/assignPrem`
    })
  }
  
  // 分配角色
  export function assignRole(data) {
    return request({
      url: ` /sys/role/assignPrem`,
      method:"PUT",
      data
    })
  }