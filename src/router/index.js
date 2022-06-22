import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    redirect: '/weHome',
    component: () => import("../views/Home.vue"),
    children:[
      {path: '/weHome', component: () => import('../views/Wehome.vue')},
      {path: '/shop', component: () => import('../views/Shop/Shop.vue')}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 已登录
  if(window.sessionStorage.getItem('token')){
    if(to.path == '/login'){
      next('/home')
    }
    next()
  }else{
    if(to.path == '/home'){
      next('/login')
    }
    next()
  }
})

export default router
