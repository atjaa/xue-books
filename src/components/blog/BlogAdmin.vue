<template>
  <el-container>
    <el-aside width="80px">
      <!--      左侧边栏,占位用  -->
    </el-aside>
    <el-main class="blog_admin_container">
      <div>
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>后台管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/blog/admin' }">MD文档管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <el-container>
      <el-aside width="460px">
        <!--      左侧导航  -->
        <div class="blog_menu">
          <el-button @click="toMenuAdmin()">管理菜单</el-button><el-button @click="toMDAdmin()">管理笔记</el-button>
          <b-menu @backBlogMainGetMd="backBlogMainGetMd" @backBlogMainDelMd="backBlogMainDelMd" :blogAdmin="1"
                  :key="timer"></b-menu>
        </div>
      </el-aside>
        <el-container direction="vertical">
        <div style="padding-left: 100px;font-weight: bold">{{ title }}</div>
        <div class="blog_main markdown" ref="mdtext">
        </div>
        </el-container>
      </el-container>
    </el-main>
    <el-aside width="80px">
      <!--      左侧边栏,占位用  -->
    </el-aside>
  </el-container>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {MessageBox} from 'element-ui'
export default {
  name: 'Admin',
  data () {
    return {
      mdid: 1, // 默认打开的mdid
      menuid: 0,
      title: '',
      timer: ''
    }
  },
  mounted () {
    this.backBlogMainGetMd(this.mdid)
  },
  methods: {
    toMenuAdmin () {
      this.$router.push({name: 'blogmenuedit'})
    },
    toMDAdmin () {
      this.$router.push({name: 'blogmdadd'})
    },
    // 接受子组件函数，获取选中的菜单id
    backBlogMainGetMd (mdid) {
      this.mdid = mdid
      let url = this.gohost + '/md'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'mdid': mdid
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            vm.title = response.data.data.title
            vm.$refs.mdtext.innerHTML = response.data.data.data
          } else {
            vm.$refs.mdtext.innerHTML = response.data.message
          }
        })
        .catch(function (response) {
          vm.$refs.mdtext.innerHTML = 'err:' + response.data
        })
    },
    // 接受子组件函数，获取要删除的mdid
    backBlogMainDelMd (mdid) {
      MessageBox.alert('确认要删除此笔记吗？ --' + mdid, '删除笔记', {
        showCancelButton: true,
        confirmButtonText: '确定'
      }).then((action) => {
        if (action === 'confirm') {
          this.delMd(mdid)
        }
      }).catch(() => {})
    },
    delMd (mdid) {
      let url = this.gohost + '/delmd'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'mdid': mdid
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            console.log(response.data.message)
          } else {
            console.log(response.data.message)
          }
          // 刷新子组件，清空已删除数据
          vm.timer = new Date().getTime()
        })
        .catch(function (massage) {
          console.log(massage)
        })
    }
  }
}
</script>

<style scoped>
  .blog_admin_container{
    background-color: #ffffff;
    text-align: left;
    min-height: calc(100vh - 176px);
    padding: 10px;
    /*box-shadow: 10px 10px 5px #888888;*/
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 16px;
  }
  .blog_main{
    background-color: #ffffff;
    text-align: left;
    padding: 10px;
  }
</style>
