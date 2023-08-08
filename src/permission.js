import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单
const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 1.判断是否有token
  if (store.getters.token) {
    // 登录状态   判断是否是登录页  是---  免登录   否   next(
    if (to.path === '/login') {
      next('/')
      // next(地址) 不会执行后置守卫
      NProgress.done()
    } else {
      // 获取用户资料
      // 判断是否有用户资料
      if (!store.getters.userInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()  //放行
    }

  } else {
    // 非登录状态  是否在白名单中 在就放行   不在就跳转到登录页
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

