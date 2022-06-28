
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 解决element-ui 导航栏中 vue-router3.0版本以上重复点击菜单报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/weHome',
    component: () => import("../views/Home.vue"),
    children: [
      { path: 'weHome', component: () => import('../views/Wehome.vue') },
      { path: 'shop', component: () => import('../views/Shop/Shop.vue') },
      { path: 'user', component: () => import('../views/User/User.vue') },
      { path: 'userdata', component: () => import('../views/User/Userdata.vue') },
      { path: 'view', component: () => import('../views/View/View.vue') },
      { path: 'delect', component: () => import('../views/Delect.vue') }
    ]
  },
]

// 动态添加权限
export const addRouter = { path: 'jurisdiction', component: () => import('../views/Jurisdiction/Jurisdiction') }
export const noFround = {
  path: '*',
  component: () => import("../views/noFround.vue")
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 已登录
  if (window.sessionStorage.getItem('token')) {
    if (to.path == '/login') {
      next('/home')
    }
    next()
  } else {
    if (to.path !== '/login') {
      next('/login')
    }
    next()
  }
})
if (window.sessionStorage.getItem("type") == 1) {
  router.addRoute("home", addRouter);
  router.addRoute(noFround)
}
export default router
