import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/First'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'First',
      component: First,
      children: [
        {
          path: '/wenxue',
          name: 'wenxue',
          component: resolved => require(['@/components/Mmain.vue'], resolved)
        },
        {
          path: '/renwen',
          name: 'renwen',
          component: resolved => require(['@/components/Mmain.vue'], resolved)
        },
        {
          path: '/jingji',
          name: 'jingji',
          component: resolved => require(['@/components/Mmain.vue'], resolved)
        },
        {
          path: '/keji',
          name: 'keji',
          component: resolved => require(['@/components/Mmain.vue'], resolved)
        },
        {
          path: '/lizhi',
          name: 'lizhi',
          component: resolved => require(['@/components/Mmain.vue'], resolved)
        },
        {
          path: '/shenghuo',
          name: 'shenghuo',
          component: resolved => require(['@/components/Mmain.vue'], resolved)
        },
        {
          path: '/login',
          name: 'login',
          component: resolved => require(['@/components/Login.vue'], resolved)
        },
        {
          path: '/regist',
          name: 'regist',
          component: resolved => require(['@/components/Regist.vue'], resolved)
        },
        {
          path: '/addbook',
          name: 'addbook',
          component: resolved => require(['@/components/Addbook.vue'], resolved)
        },
        {
          path: '/about',
          name: 'about',
          component: resolved => require(['@/components/About.vue'], resolved)
        },
        {
          path: '/search',
          name: 'search',
          component: resolved => require(['@/components/Search.vue'], resolved)
        }
      ]
    }
  ]
})
