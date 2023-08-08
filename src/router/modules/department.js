import Layout from '@/layout'
export default {
    path:'/department',
    component:Layout,
    children:[
      {
        path:"",
        name:"department",
        component: () => import('@/views/department/index'),
        meta:{
          icon:"tree",
          title:'组织'
        }
      }
    ]
}