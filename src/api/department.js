import request from '@/utils/request'

export function transListToTreeData(list, rootValue) {
  //  1.定义一个空数组
  const arr = []
  //  遍历数组
  list.forEach(item => {
    if (item.pid === rootValue) {
      // 拿到当前节点的id  和当前节点的子节点的pid是相等的
      let children = transListToTreeData(list, item.id)
      item.children = children
      arr.push(item)
    }
  })
  return arr
}

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