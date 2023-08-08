import Layout from '@/layout'
export default {
    path:'/social',
    component:Layout,
    children:[
      {
        path:"",
        name:"social",
        component: () => import('@/views/social/index'),
        meta:{
          icon:"",
          title:'社保管理'
        }
      }
    ]
}