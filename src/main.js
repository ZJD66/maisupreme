import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/statics/site/css/style.css'
import index from './components/index.vue'


//路由中间件
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/index',
      component: index
    },
  ]
})


Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  render: h => h(App)
  //挂载路由规则
  
})