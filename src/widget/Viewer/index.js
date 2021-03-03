import Vue from 'vue'
import Viewer from './viewer.vue'

export default props => {
  const Te = Vue.extend({
    render: h => h(Viewer, {
      props
    })
  })
  new Te().$mount()
}
