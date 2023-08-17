import request from '@/utils/request'

// 获取组织架构
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}


// 获取部门负责人
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}


// 新增部门  /company/department
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method:'POST',
    data
  })
}

// 获取部门详情  /company/department/{id}
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`

  })
}

// 编辑部门
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method:'PUT',
    data
  })
}