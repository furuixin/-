import Layout from '@/layout'
export default {
    path:'/role',
    name:'role',
    component:Layout,
    children:[
      {
        path:"",
        name:"role",
        component: () => import('@/views/role/index'),
        meta:{
          icon:"example",
          title:'角色'
        }
      }
    ]
}