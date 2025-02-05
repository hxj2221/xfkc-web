import router from './routers'
import store from '@/store'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { buildMenus } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'
import { Message } from 'element-ui'
// import { stringify } from 'qs'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/activity/index', '/activity/vote']// no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (to.query.appId && to.query.code) {
      store.dispatch('LogOut').then(() => {
        next()
      })
      return
    }
  }

  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          // 添加用户权限判断
          if (res.username === 'admin445' && 
              (to.path === '/bigData/bigData' || to.path === '/bigData/grbigData' || to.path === '/grbigData/grbigData')) {
            Message.error('您没有权限访问该页面')
            next({ path: '/403', replace: true })
            return
          }
          // 动态路由，拉取菜单
          if (res.role.id === 5) {
            this.$router.push({ path: '/login' })
          }
          loadMenus(next, to)
        }).catch((err) => {
          console.log(err)
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus').then(res => {})
        loadMenus(next, to)
      } else {
        // 已加载用户信息的情况下也要判断
        const username = store.getters.user.username
        if (username === 'admin445' && 
            (to.path === '/bigData/bigData' || to.path === '/bigData/grbigData' || to.path === '/grbigData/grbigData')) {
          Message.error('您没有权限访问该页面')
          next({ path: '/403', replace: true })
          return
        }
        next()
      }
    }
  } else {
    /* has no token - 游客访问 */
    if (whiteList.indexOf(to.path) !== -1) { 
      // 检查是否是 admin445 游客访问大数据页面
      const touristUsername = localStorage.getItem('touristUsername')
      if (touristUsername === 'admin445' && 
          (to.path === '/bigData/bigData' || to.path === '/bigData/grbigData' || to.path === '/grbigData/grbigData')) {
        Message.error('您没有权限访问该页面')
        next({ path: '/403', replace: true })
        return
      }
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus({ en: 1 }).then(res => {
    const asyncRouter = filterAsyncRouter(res)
    asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
