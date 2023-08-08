import request from '@/utils/request'

// 组织架构
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}
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