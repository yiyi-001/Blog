import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import("../views/Main.vue"),
    children:[
      {
        path: '/',
        name: 'home',
        component: () => import( '../views/Home.vue')
      },
    ],

  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/Login.vue"),
  },
  {
    path: '/regiest',
    name: 'regiest',
    component: () => import("../views/Regiest.vue"),
  },
  {
    path:'/tool',
    name:'tool',
    component:() => import('../views/Tool.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue')
  },
 
  {
    path: '/classify',
    name: 'classify',
    component: () => import( '../views/Classify.vue')
  },
  {
    path: '/link',
    name: 'link',
    component: () => import( '../views/Link.vue')
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import( '../views/Tag.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import( '../views/Message.vue')
  },
  {
    path: '/soft',
    name: 'soft',
    component: () => import( '../views/Soft.vue')
  },
 

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
