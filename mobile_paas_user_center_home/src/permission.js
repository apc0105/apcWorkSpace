//public
import Vue from 'vue'
import notification from 'ant-design-vue/es/notification'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import tempData from "permission-setting"

//private
import {getPermissionInfos} from '@/api/login'
import config from '@/config/defaultSettings'
import {getToken, setToken} from '@/utils/auth' // 验权
import router from './router'
import {asyncRouterMap} from '@/config/router.config'
const whiteList = ['/user/login'] // 不重定向白名单


async function getInfo() {
  const param = {
    serverId: config.appCode
  }
  const res = await getPermissionInfos(param)
  const accessedRouters = tempData.setPermissions(res.data, asyncRouterMap)

  Vue.use(tempData.getPermissionComponent())

  // 动态添加可访问路由表
  router.addRoutes(accessedRouters)

}

function judgeRoute(to, from, next) {
  if (tempData.hasRoute(to.path)) {
    next()
    NProgress.done()
  } else {
    notification.error({
      message: '错误',
      description: '当前地址无权限'
    })
    NProgress.done()
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start()// 登录进度条
  const tempToken = to.query.token || to.params.token
  if (tempToken) {
    setToken(tempToken)
  }
  if (getToken()) {
    if (tempData.hasRouteData()) {
      getInfo().then(() => {
        judgeRoute(to, from, next)
      })
    } else {
      judgeRoute(to, from, next)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/user/login'})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
