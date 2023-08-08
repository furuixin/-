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
          icon:"people",
          title:'员工'
        }
      }
    ]
}