import Layout from '@/layout'
export default {
  path: '/employee',
  component: Layout,
  children: [
    {
      path: "",
      name: "employee",
      component: () => import('@/views/employee/index'),
      meta: {
        icon: "people",
        title: '员工'
      }
    },
    {
      path: '/employee/detail/:id?',
      component: () => import('@/views/employee/detail.vue'),
      hidden: true,
      meta: {
        title: '员工详情'
      }
    }
  ]
}