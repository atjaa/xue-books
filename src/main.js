// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Maside from './components/Maside'
import Mhead from './components/Mhead'
import Msmenu from './components/Msmenu'
import Mlist from './components/Mlist'
import MFooter from './components/Footer'

import { Button
  , Dialog
  , Row
  , Col
  , Aside
  , Container
  , Main
  , Tabs
  , TabPane, Collapse, CollapseItem, Pagination, Form, FormItem, Select, Option, Input, Cascader, Footer} from 'element-ui'

Vue.use(Footer)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Main)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.config.productionTip = false
// Vue.prototype.mhost = 'https://xue37.cn/bot'
Vue.prototype.mhost = 'https://' + window.location.host.split(':')[0] + '/bot'
Vue.component('m-aside', Maside)
Vue.component('m-head', Mhead)
Vue.component('m-s-menu', Msmenu)
Vue.component('m-list', Mlist)
Vue.component('m-footer', MFooter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/addbook' && sessionStorage.getItem('user') === null) {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else {
    next()
  }
})
