/*
 * @Author: zhoule
 * @Date: 2021-11-02 10:37:04
 * @Description: file content
 */
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './style.less'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false


new Vue({
 router,
 render: h => h(App)
}).$mount('#app')
