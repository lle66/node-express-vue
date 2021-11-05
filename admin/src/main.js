/*
 * @Author: zhoule
 * @Date: 2021-11-02 10:46:50
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import './style.css'
Vue.prototype.$http=http

Vue.config.productionTip = false
// 全局minxin
Vue.mixin({
  methods: {
    // computed:{
    //   uploadUrl:
    // },
    // getAuthHeaders最好使用方法 因为如果用data定义 会导致token发生变化后 不能实时获取token
    getAuthHeaders(){
      return {
        Authorization:localStorage.token?`Bearer ${localStorage.token}`:''
      }
    }
  },
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
