import Layout from '@/layout'
export default {
    path:'/employee',
    component:Layout,
    children:[
      {
        path:"",
        name:"employee",
        component: () => import('@/views/employee/index'),
        meta:{
          icon:"",
          title:'员工管理'
        }
      }
    ]
}