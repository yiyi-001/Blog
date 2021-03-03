import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routers'
import store from 'src/store'
Vue.use(VueRouter)

// push
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
// replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router

router.beforeEach(async (to, from, next) => {
  store.commit('SET_CRUMB', [])
  next()
})
