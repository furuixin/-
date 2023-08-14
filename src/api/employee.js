import request from '@/utils/request'
/** *
 * 获取员工数据
 * **/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params // 查询参数
  })
}
// 新增员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
//根据id查找员工详情
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
//获取可用角色   /sys/role/list/enabled
export function getEnabledRoles(id) {
  return request({
    url: `/sys/role/list/enabled`
  })
}

// 分配角色
export function assignRole(data) {
  return request({
    url: `/sys/user/assignRoles`,
    method: "PUT",
    data
  })
}

// 导入员工的excel sys/user/import
export function importEmployee(data) {
  return request({
    url: `sys/user/import`,
    method: 'POST',
    data   //formData类型  因为要上传文件
  })
}

// 导出excel文件
export function downloadExcel() {
  return request({
    url: '/sys/user/export',
    method: 'GET',
    responseType: 'blob'
  })
}