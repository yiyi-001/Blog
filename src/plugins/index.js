import Vue from 'vue'
import { Message } from 'element-ui'

export const $success = Message.success
export const $warn = Message.warning
export const $error = Message.error
// 工具类插件
const utilsPlugin = {
  install (Vue, options) {
    // 提示方法
    Vue.prototype.$success = $success
    Vue.prototype.$warn = $warn
    Vue.prototype.$error = $error
  }
}

Vue.use(utilsPlugin)
