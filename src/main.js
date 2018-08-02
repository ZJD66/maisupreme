import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/statics/site/css/style.css'
import index from './components/index.vue'
import goodInfo from './components/goodInfo.vue'
import buyCar from './components/buyCar.vue'
import payOrder from './components/payOrder.vue'
import login from './components/login.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import axios from "axios";
import moment from "moment";
//引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

//引入vuex
import Vuex from 'vuex'
Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让ajax携带cookie
axios.defaults.withCredentials=true;

//全局过滤器
Vue.filter('cutTime', function (value) {
      return moment(value).format("YYYY年MM月DD日");
    
})
//vuex中间件
Vue.use(Vuex)
Vue.use(iView);
//路由中间件
Vue.use(VueRouter)
//Element中间件
Vue.use(ElementUI);
//懒加载中间件
Vue.use(VueLazyload,{
  loading:require('./assets/img/01.gif')
});

//注册路由规则
const router = new VueRouter({
  routes: [{
      path: '/',
      component: index
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/goodInfo/:id',
      component: goodInfo
    },
    {
      path: '/buyCar',
      component: buyCar
    },
    {
      path: '/payOrder',
      component: payOrder
    },
    {
      path: '/login',
      component: login
    }
  ]
})
//路由守卫
router.beforeEach((to, from, next) => {
  // from 从哪来 to 去哪里 next 下一个
  //保存来时的路由
  store.commit('saveFromPath',from.path)
  // console.log(to);
  if(to.path=='/payOrder'){
    axios.get('site/account/islogin')
    .then(response=>{
      console.log(response);
      if(response.data.code=='nologin'){
        // console.log('登录页');
        next('/login')
      }else{
        next()
      }
    })
    .catch(err=>{
      console.log(err);
      
    })
  }else{
    next()
  }
})


// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList'))||{};


// 实例化一个 Vuex的 仓库
const store = new Vuex.Store({
  // 状态
  state: {
    // 数量
    // buyList: {}
    buyList,
    islogin:false,
    fromPath:'/'
  },
  // 类似于computed的属性
  getters: {
    totalCount(state) {
      let num = 0;
      // 遍历对象
      for (const key in state.buyList) {
        // 累加总数
        num += parseInt(state.buyList[key]);
      }
      return num;
    }
  },
  // 变更 需要修改数据 必须通过这种方式
  mutations: {
    // info->{goodId:xx,goodNum:xxx}
    buyGood(state, info) {
      if (state.buyList[info.goodId]) {
        // 解决字符串累加问题
        let oldNum = parseInt(state.buyList[info.goodId]);
        oldNum += parseInt(info.goodNum);
        // 重新赋值
        state.buyList[info.goodId] = oldNum;
      } else {
        // 没有 直接赋值这种方法 vue不会跟踪属性
        // state.buyList[info.goodId]=info.goodNum;
        // 需要使用 Vue.set(obj, 'newProp', 123) 替代
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    },
    changNum(state,info){
      state.buyList[info.goodId] = info.goodNum
    },
    // 删除数据
    delGoodById(state,id){
      //使用VUE方法删除
      Vue.delete(state.buyList,id);
    },
    changlogin(state,login){
      state.islogin = login
    },
    saveFromPath(state,fromPath){
      state.fromPath = fromPath
    }
  }
})


Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  render: h => h(App),
  //挂载路由规则
  store
  
})

// 注册一些逻辑
window.onbeforeunload = function () {
  // alert('onbeforeunload');
  // window.localStorage.setItem('onbeforeunload',123);
  window.localStorage.setItem('buyList',JSON.stringify(store.state.buyList));
}