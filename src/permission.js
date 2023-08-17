import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { MyRoutes } from '@/router/index'


NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        let result = await store.dispatch('user/getUserInfo')
        console.log(result.roles.menus, MyRoutes, "用户标识")
        let filterRouter = MyRoutes.filter(item => {
          console.log(item.name, 0)
          return result.roles.menus.includes(item.name)
        })
        store.commit('routersMol/setRoutes', filterRouter)
        router.addRoutes([...filterRouter, { path: '*', redirect: '/404', hidden: true }])

      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }


})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})