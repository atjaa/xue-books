<template>
  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content "><img src="/static/images/timg.jpeg" /></div></el-col>
    <el-col :span="10">
      <div class="grid-content ">
        <ul class="nav">
          <li><a href="#" v-on:click="first">首页</a></li>
          <li><a href="#/book">电子书</a></li>
          <li><a href="http://blog.xue37.cn" target="_blank">博客</a></li>
          <li><a href="https://github.com/lijinzhuang" target="_blank">GitHub</a></li>
          <li><a href="#" v-on:click="about">关于</a></li>
        </ul>
      </div>
    </el-col>
    <el-col :span="7"><div class="grid-content "></div></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Xhead',
  methods: {
    about () {
      this.$router.push({name: 'xabout'})
    },
    first () {
      this.$router.push({name: 'blog'})
    }
  }
}
</script>

<style scoped>
  .nav{
    list-style: none;
    padding-left: 0;
  }
  .nav > li{
    position: relative;
    display: block;
    float: left;
    font-size: 16px;
  }
  .nav > li > a{
    color: #428bca;
    padding: 10px 25px;
    text-decoration: none;
  }
  .nav > li > a:hover{
    background-color: #F0F0F0;
  }
.el-row {
  padding-top: 0px;
  box-shadow:0px 15px 10px -15px #ccc;
}
.el-row img{
  height: 3em;
  width: 3em;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
