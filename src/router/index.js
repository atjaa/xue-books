import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/book/First'
import Xue from '@/components/xue/Xue'
import About from '@/components/xue/About'
import BlogMain from '@/components/blog/BlogMain'
import BlogMenuEdit from '@/components/blog/BlogMenuEdit'
import BlogMdAdd from '@/components/blog/BlogMdAdd'
import BlogAdmin from '@/components/blog/BlogAdmin'
import BlogMdEdit from '@/components/blog/BlogMdEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Xue,
      children: [
        {
          path: '/',
          name: 'blog',
          component: BlogMain
        },
        {
          path: '/xabout',
          name: 'xabout',
          component: About
        },
        {
          path: '/blog/admin',
          name: 'blogadmin',
          component: BlogAdmin
        },
        {
          path: '/blog/menu/admin',
          name: 'blogmenuedit',
          component: BlogMenuEdit
        },
        {
          path: '/blog/md/add',
          name: 'blogmdadd',
          component: BlogMdAdd
        },
        {
          path: '/blog/md/edit',
          name: 'blogmdedit',
          component: BlogMdEdit
        }
      ]
    },
    {
      path: '/book',
      name: 'First',
      component: First,
      children: [
        {
          path: '/wenxue',
          name: 'wenxue',
          component: resolved => require(['@/components/book/Mmain.vue'], resolved)
        },
        {
          path: '/renwen',
          name: 'renwen',
          component: resolved => require(['@/components/book/Mmain.vue'], resolved)
        },
        {
          path: '/jingji',
          name: 'jingji',
          component: resolved => require(['@/components/book/Mmain.vue'], resolved)
        },
        {
          path: '/keji',
          name: 'keji',
          component: resolved => require(['@/components/book/Mmain.vue'], resolved)
        },
        {
          path: '/lizhi',
          name: 'lizhi',
          component: resolved => require(['@/components/book/Mmain.vue'], resolved)
        },
        {
          path: '/shenghuo',
          name: 'shenghuo',
          component: resolved => require(['@/components/book/Mmain.vue'], resolved)
        },
        {
          path: '/login',
          name: 'login',
          component: resolved => require(['@/components/book/Login.vue'], resolved)
        },
        {
          path: '/regist',
          name: 'regist',
          component: resolved => require(['@/components/book/Regist.vue'], resolved)
        },
        {
          path: '/addbook',
          name: 'addbook',
          component: resolved => require(['@/components/book/Addbook.vue'], resolved)
        },
        {
          path: '/about',
          name: 'about',
          component: resolved => require(['@/components/book/About.vue'], resolved)
        },
        {
          path: '/calendar',
          name: 'calendar',
          component: resolved => require(['@/components/book/Calendar.vue'], resolved)
        },
        {
          path: '/search',
          name: 'search',
          component: resolved => require(['@/components/book/Search.vue'], resolved)
        }
      ]
    }
  ]
})
