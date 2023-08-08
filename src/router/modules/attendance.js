import Layout from '@/layout'
export default {
    path:'/attendance',
    component:Layout,
    children:[
      {
        path:"",
        name:"attendance",
        component: () => import('@/views/attendance/index'),
        meta:{
          icon:"",
          title:'考勤管理'
        }
      }
    ]
}