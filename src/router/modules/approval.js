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
          icon:"tree-table",
          title:'审批'
        }
      }
    ]
}