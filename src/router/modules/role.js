import Layout from '@/layout'
export default {
    path:'/role',
    component:Layout,
    children:[
      {
        path:"",
        name:"role",
        component: () => import('@/views/role/index'),
        meta:{
          icon:"",
          title:'角色管理'
        }
      }
    ]
}