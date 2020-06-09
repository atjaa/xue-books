<template>
  <el-container>
    <el-aside width="80px">
      <!--      左侧边栏,占位用  -->
    </el-aside>
    <el-main class="blog_container">
      <el-container>
      <el-aside width="460px">
        <!--      左侧导航  -->
        <div class="blog_menu">
          <b-menu @backBlogMainGetMd="backBlogMainGetMd" :blogAdmin="0"></b-menu>
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
export default {
  name: 'Main',
  data () {
    return {
      mdid: 1, // 默认打开的mdid
      title: ''
    }
  },
  mounted () {
    this.backBlogMainGetMd(this.mdid)
  },
  methods: {
    backBlogMainGetMd (titleid) {
      this.mdid = titleid
      let url = this.gohost + '/md'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'mdid': titleid
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
    }
  }
}
</script>

<style scoped>
  .blog_container{
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
