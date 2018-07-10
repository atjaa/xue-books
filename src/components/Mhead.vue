<template>
  <div class="m-head">
    <el-row>
      <el-col :span="4">
        <div class="m-menu"><i class="el-icon-d-arrow-right"></i>{{hmenu}}</div></el-col>
      <el-col :span="4" :offset="16">
        <div>
          <span v-if="user !== ''">
           <a href="#" @click="addbook()">添加图书</a> &nbsp;|
            {{user.nickname}}
            |&nbsp;<a href="#" @click="loginout()">退出</a>
          </span>
          <span v-else><a href="#" target="_self" v-on:click="login">登陆</a></span>
          <span>|</span>
          <span><a href="#" v-on:click="about">关于</a></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      user: ''
    }
  },
  props: ['hmenu'],
  methods: {
    login () {
      this.$router.push('login')
    },
    loginout () {
      sessionStorage.removeItem('user')
      this.$router.go(0)
    },
    addbook () {
      this.$router.push('addbook')
    },
    about () {
      this.$router.push('about')
    }
  },
  mounted () {
    if (sessionStorage.getItem('user') !== null) {
      this.user = JSON.parse(sessionStorage.getItem('user'))
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-head {
    border-radius: 4px;
    min-height: 26px;
    margin-top: 10px;
    font-size: 0.8em;
    padding: 0px 0px 0px 20px;
    border-bottom: groove rgba(255,255,255,0.2) ;
  }
  .m-head a {
    color: black;
    text-decoration: none;
  }
  .m-menu {
    text-align: left!important;
  }
</style>
