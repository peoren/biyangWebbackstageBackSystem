import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

import account from './routers/account.js'
import chart from './routers/chart.js'
import classify from './routers/classify.js'
import customer from './routers/customer'
import goodsadd from './routers/goodsadd'
import goodsmagement from './routers/goodsmagement'
import home from './routers/home'
import login from './routers/login'
import order from './routers/order'
import store from './routers/store'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homepage',
    component:  () => import(/* webpackChunkName: "about" */ './views/goodsmagement/goodsmagement.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    ...account,
    ...chart,
    ...classify,
    ...customer,
    ...goodsadd,
    ...goodsmagement,
    ...home,
    ...login,
    ...order,
    ...store
  ]
})
