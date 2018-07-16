<template>
  <div class="m-book-list">
    <div v-if="mbooklist === ''" class="m-no">
      <el-row>
        <el-col :span="8" :offset="1"><i class="el-icon-warning"></i>没有找到您想要的资源</el-col>
      </el-row>
    </div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item :name="item.id" v-for="item in mbooklist" v-bind:key="item.id">
        <template slot="title">
          <span>{{item.bookname}}</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>作者：{{item.author}}</span>
        </template>
        <div class="m-book-line">介绍：{{item.introduction}}</div>
        <div class="m-book-line">资源地址：<a :href="item.pan" target="_blank">{{item.pan}}</a></div>
        <div class="m-book-line">来源：{{item.source}}</div>
      </el-collapse-item>
    </el-collapse>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="15"
      layout="total, prev, pager, next"
      :total="pagecount">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: '',
  data () {
    return {
      mbooklist: '',
      pagecount: 0,
      currentPage1: 2,
      activeName: '1',
      utype: '1',
      uvalue: ''
    }
  },
  props: ['search'],
  mounted () {
  },
  methods: {
    handleSizeChange () {
    },
    handleCurrentChange (val) {
      this.getBookList(this.utype, this.uvalue, val)
    },
    getBookList (utype, uvalue, page) {
      let url = this.mhost + '/searchbook'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        utype: utype,
        uvalue: uvalue,
        currentpage: page
      }))
        .then(function (response) {
          if (response.data.toString() !== 'false' && response.data.toString() !== 'err') {
            vm.mbooklist = response.data.res
            vm.pagecount = response.data.pcount
          } else {
            vm.mbooklist = ''
            vm.pagecount = 0
          }
        })
        .catch(function (response) {
          vm.mbooklist = 'error'
        })
    }
  },
  watch: {
    search (val) {
      this.utype = val.type
      this.uvalue = val.param
      this.getBookList(val.type, val.param, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-book-list{
    text-align: left;
  }
  .m-book-line {
    padding: 0 30px;
  }
  .el-collapse {
    border-top: hidden!important;
  }
  .m-no {
    padding-top: 30px;
    padding-bottom: 5px;
  }
</style>
