import Layout from '@/layout'
export default {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name:"dashboard",
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }
  ]
  }