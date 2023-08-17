
import Layout from '@/layout'
export default {
    path:'/permission',
    name:"permission",
    component:Layout,
    children:[
      {
        path:"",
        name:"permission",
        component: () => import('@/views/permission/index'),
        meta:{
          icon:"",
          title:'权限'
        }
      }
    ]
}