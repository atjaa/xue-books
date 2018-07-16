<template>
  <div class="m-head">
    <el-row>
      <el-col :span="4">
        <div class="m-menu"><i class="el-icon-d-arrow-right"></i>{{hmenu}}</div>
      </el-col>
      <el-col :span="8">
        <div class="m-searchs">
          <el-input v-model="searchvalue" placeholder="请输入搜索内容" size="mini">
            <el-select v-model="searchtype" slot="prepend" placeholder="请选择">
              <el-option label="按书名" value="1"></el-option>
              <el-option label="按作者" value="2"></el-option>
              <el-option label="按简介" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchbook()"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4" :offset="8">
        <div>
          <span v-if="user !== ''">
           <el-button type="warning" @click="addbook()" size="mini" round>添加图书</el-button> &nbsp;|
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
import { MessageBox } from 'element-ui'
export default {
  name: '',
  data () {
    return {
      user: '',
      searchtype: '1',
      searchvalue: ''
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
    },
    searchbook () {
      if (this.searchtype === '' || this.searchvalue === '') {
        MessageBox.alert('查询条件不能为空', '查询', {
          confirmButtonText: '确定'
        })
      } else {
        this.$router.push({path: 'search', query: {t: Date.parse(new Date()), searchtype: this.searchtype, searchvalue: this.searchvalue}})
      }
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
    min-height: 36px;
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
  .el-select{
    width: 90px!important;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
