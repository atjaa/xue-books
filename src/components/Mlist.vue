<template>
  <div class="m-book-list">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item :name="item.id" v-for="item in mbooklist" v-bind:key="item.id">
        <template slot="title">
          <span>{{item.bookname}}</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>作者：{{item.author}}</span>
        </template>
        <div>介绍：{{item.introduction}}</div>
        <div>资源地址：<a :href="item.pan" target="_blank">{{item.pan}}</a></div>
        <div>来源：{{item.source}}</div>
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
      activeName: '1'
    }
  },
  props: ['msmenu'],
  mounted () {
    // this.mbooklist = this.msmenu + 'aa'
    this.getBookList(1)
  },
  methods: {
    handleSizeChange () {
    },
    handleCurrentChange (val) {
      this.getBookList(val)
    },
    getBookList (page) {
      let url = this.mhost + '/getbooklist'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        menuid: vm.msmenu,
        currentpage: page
      }))
        .then(function (response) {
          if (response.data.toString() !== 'false' && response.data.toString() !== 'err') {
            vm.mbooklist = response.data.res
            vm.pagecount = response.data.pcount
          } else {
            vm.mbooklist = []
          }
        })
        .catch(function (response) {
          vm.mbooklist = 'error'
        })
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-book-list{
    text-align: left;
  }
  .el-collapse {
    border-top: hidden!important;
  }
</style>
