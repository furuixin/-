import Layout from '@/layout'
export default {
    path:'/approval',
    component:Layout,
    children:[
      {
        path:"",
        name:"approval",
        component: () => import('@/views/approval/index'),
        meta:{
          icon:"",
          title:'审批管理'
        }
      }
    ]
}