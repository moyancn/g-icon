import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import GIcon from './gicon'
import vuex from 'vuex'

Vue.use(GIcon, {
  /* 'arrow-left': require('!svg-inline-loader!~/assets/icons/arrow-left.svg'),
  'arrow-right': [
    require('!svg-inline-loader!~/assets/icons/arrow-right.svg'),
    { 'stroke-width': 1, keepAttrs: ['viewBox'] }
  ],
  'chevron-left': require('!svg-inline-loader!~/assets/icons/chevron-left.svg'),
  'chevron-right': require('!svg-inline-loader!~/assets/icons/chevron-right.svg'),
  'trending-down': require('!svg-inline-loader!~/assets/icons/trending-down.svg'),
  'trending-up': require('!svg-inline-loader!~/assets/icons/trending-up.svg'),
  user: require('!svg-inline-loader!~/assets/icons/user.svg'),
  users: require('!svg-inline-loader!~/assets/icons/users.svg'),
  clock: require('!svg-inline-loader!~/assets/icons/clock.svg'),
  close: require('!svg-inline-loader!~/assets/icons/close.svg'),
  code: require('!svg-inline-loader!~/assets/icons/code.svg'),
  users: require('!svg-inline-loader!~/assets/icons/camera.svg'),
  amazon: require('!svg-inline-loader!~/assets/icons/amazon.svg'),
  alipay: [require('!svg-inline-loader!~/assets/icons/alipay.svg'),
    { keepAttrs: ['viewBox'] }
  ] */
})
Vue.use(ElementUI)
import store from './store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
