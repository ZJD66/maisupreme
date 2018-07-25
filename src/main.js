import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/statics/site/css/style.css'


//路由中间件
// Vue.use(VueRouter)

// const router = new VueRouter({
//   routes: [{
//       path: '/news',
//       component: news
//     },
//     {
//       path: '/stars',
//       component: stars
//     }
//   ]
// })


Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App)
  //挂载路由规则
  // router
})