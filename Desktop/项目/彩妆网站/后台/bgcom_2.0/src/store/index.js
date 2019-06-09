import Vue from 'vue';
import Vuex from 'vuex';

import account from './modules/account'
import chart from './modules/chart'
import classify from './modules/classify'
import customer from './modules/customer'
import goodsadd from './modules/goodsadd'
import goodsmagement from './modules/goodsmagement'
import home from './modules/home'
import login from './modules/login'
import order from './modules/order'
import store from './modules/store'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    account,
    chart,
    classify,
    customer,
    goodsadd,
    goodsmagement,
    home,
    login,
    order,
    store
  }
})