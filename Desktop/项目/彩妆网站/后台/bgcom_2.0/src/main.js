import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/iconfont/iconfont.css'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入qs
import qs from 'qs'
Vue.prototype.$qs = qs
// 切换环境
// if (process.env.NODE_ENV == 'development') {    
//   axios.defaults.baseURL = '/api'
// } else if (process.env.NODE_ENV == 'debug') {    
//   axios.defaults.baseURL = '/debug'
// } else if (process.env.NODE_ENV == 'production') {    
//   axios.defaults.baseURL = '/'
// }
if (process.env.NODE_ENV == 'development') {    
  axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV == 'debug') {    
  axios.defaults.baseURL = '/debug'
} else if (process.env.NODE_ENV == 'production') {    
  axios.defaults.baseURL = '/'
}
// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
// axios.defaults.headers.common['userToken'] = sessionStorage.getItem('user_id');
// 请求拦截
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config)
  // config.headers['userToken'] = '670d64d2b83e4a2cab5a4bf67a7630b3';
  config.headers['adminToken'] = sessionStorage.getItem('user_id');
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// 响应拦截
axios.interceptors.response.use(function (res) {
  // Do something with response data
  if(res.data.code == -200) {
    // router.push('/login')
    // router.push('/login')
    // location = '/login'
    console.log(res.data.code)
    sessionStorage.removeItem('isLogin')
    console.log(sessionStorage.getItem('user_id'))
  }
  return res;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});



Vue.use(ElementUI);
// Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
