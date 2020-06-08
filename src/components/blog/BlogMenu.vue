<template>
  <el-card class="box-card">
    <div slot="header" class="menutitle">
      <span>技术笔记</span>
    </div>
    <el-container>
    <el-tree :data="data" :props="defaultProps" :default-expand-all="true"
             :expand-on-click-node="false" :check-on-click-node="true"
             :highlight-current="true" @node-click="handleNodeClick">
    </el-tree>
      <div class="menu-divider"></div>
      <el-container direction="vertical">
      <div v-for="o in titles" :key="o.id" class="text item mdlist">
        <el-tooltip class="item" effect="light" :content="o.mdTitle" placement="right-start">
          <el-link @click="querymd(o.mdId)" :class="{active: activeName === o.mdId}">{{ o.mdTitle | ellipsis }}</el-link>
        </el-tooltip>
        <a v-if="blogAdmin === 1"><i class="el-icon-delete" @click="delMd(o.mdId)"></i></a>
      </div>
      </el-container>
    </el-container>
  </el-card>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'BlogMenu',
  props: [
    'blogAdmin'
  ],
  data () {
    return {
      activeName: 1,
      title: '技术笔记',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      titles: []
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 12) {
        return value.slice(0, 12) + '...'
      }
      return value
    }
  },
  mounted () {
    let url = this.gohost + '/getmenus'
    var vm = this
    axios.defaults.withCredentials = false
    axios.post(url, qs.stringify({
    }))
      .then(function (response) {
        if (response.data.code === 1) {
          vm.data = response.data.data
          // 同时加载菜单第一个对应的列表数据
          vm.handleNodeClick(response.data.data[0])
        } else {
          console.log(response.data.message)
        }
      })
      .catch(function (response) {
        console.log(response.date)
      })
  },
  methods: {
    // 菜单选择事件，查询菜单下的内容列表
    handleNodeClick (data) {
      let url = this.gohost + '/mds'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'menuid': data.id
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            vm.titles = response.data.data
          } else {
            console.log(response.data.message)
          }
        })
        .catch(function (response) {
          console.log(response.date)
        })
    },
    querymd (titleid) {
      // 调用父组件方法
      this.$emit('backBlogMainGetMd', titleid)
      this.activeName = titleid
    },
    delMd (mdid) {
      // 调用父组件方法
      this.$emit('backBlogMainDelMd', mdid)
    }
  }
}
</script>

<style scoped>
  .blog_menu_boot_title{
    color: #99a9bf;
  }
  .menu-divider{
    width: 2px;
    height: 290px;
    background: #F0F0F0;
    display: inline-block;
    margin-top: 8px;
    vertical-align: top;
    margin-right: 29px;
    margin-left: 30px;
  }
  .menutitle{
    color: #3a8ee6;
    font-weight: bold;
  }
  .active{
    color: #8cc5ff;
  }
  .mdlist{
    margin-bottom: 6px;
  }
</style>
