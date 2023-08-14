import request from '@/utils/request'
// 组织架构
export function getDepartment() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

// 获取部门负责人
export function getManagerList() {
  return request({
    url: '/sys/user/simple',
    method:'GET'
  })
}

//新增部门 /company/department
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 部门详情
export function getDepartmentDetail(id){
  return request({
    url:`/company/department/${id}`,
    method:'GET'
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

// 删除部门
export function delDepartment(id){
  return request({
    url:`/company/department/${id}`,
    method:'DELETE'
  })
}