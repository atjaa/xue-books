// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Maside from './components/book/Maside'
import Mhead from './components/book/Mhead'
import Msmenu from './components/book/Msmenu'
import Mlist from './components/book/Mlist'
import MFooter from './components/book/Footer'
import Slist from './components/book/SearchItem'
import Xhead from './components/xue/Xhead'
import BlogMenu from './components/blog/BlogMenu'
import '../static/css/markdown.css'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import echarts from 'echarts'
import { Button
  , ButtonGroup, Menu, MenuItem, MenuItemGroup, Submenu
  , Dialog, Breadcrumb, BreadcrumbItem, Divider
  , Row, Tree, Card, Table, TableColumn, Link
  , Col, Message
  , Aside, Tag, Tooltip, Timeline, TimelineItem
  , Container
  , Main
  , Tabs
  , TabPane, Collapse, CollapseItem
  , Pagination, Form, FormItem, Select
  , Option, Input, Cascader, Footer
  , Calendar, Header} from 'element-ui'
Vue.use(TimelineItem)
Vue.use(Timeline)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(quillEditor)
Vue.use(Link)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Divider)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Footer)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(ButtonGroup)
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
Vue.use(Calendar)
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Tree)
Vue.use(Card)
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$echarts = echarts
Vue.prototype.mhost = process.env.MYHTTP + window.location.host.split(':')[0] + process.env.MYPYTHONPORT + '/bot'
Vue.prototype.gohost = process.env.MYHTTP + window.location.host.split(':')[0] + process.env.MYGOOPORT + '/goo'
// Vue.prototype.mhost = 'http://localhost:8080/bot' // python服务
// Vue.prototype.gohost = 'http://localhost:8082/goo' // golang服务
Vue.component('m-aside', Maside)
Vue.component('m-head', Mhead)
Vue.component('m-s-menu', Msmenu)
Vue.component('m-list', Mlist)
Vue.component('m-footer', MFooter)
Vue.component('s-list', Slist)
Vue.component('x-head', Xhead)
Vue.component('b-menu', BlogMenu)
Vue.component('quill-editor', quillEditor)
/* eslint-disable no-new */
var pathArray = [ // 需要登陆验证的页面
  '/blog/admin',
  '/blog/menu/admin',
  '/blog/md/add',
  '/blog/md/edit'
]
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  // TODO 问题1：直接打开需要加密验证的页面，这里逻辑走不到
  // TODO 问题2：book中登录校验也无效了
  if (skipCheck(to.path) && sessionStorage.getItem('user') === null) {
    next({
      path: '/xlogin',
      query: {redirect: to.fullPath}
    })
  } else {
    next()
  }
})
function skipCheck (path) {
  let check = false
  pathArray.forEach(function (item, index) {
    if (item === path) {
      check = true
      return check
    }
  })
  return check
}
