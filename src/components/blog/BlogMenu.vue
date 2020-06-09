<template>
  <el-card class="box-card">
    <div slot="header" class="menutitle">
      <span>技术笔记</span>
    </div>
    <el-container>
    <el-tree ref="mytree" :data="data" :props="defaultProps" :default-expand-all="true"
             :expand-on-click-node="false" :check-on-click-node="true"
             :highlight-current="true" node-key="id" :current-node-key="treeCurrentId" @node-click="handleNodeClick">
    </el-tree>
      <div class="menu-divider"></div>
      <el-container direction="vertical">
      <div v-for="o in titles" :key="o.id" class="text item mdlist">
        <el-tooltip class="item" effect="light" :content="o.mdTitle" placement="right-start">
          <el-link @click="querymd(o.mdId)" :class="{active: activeName === o.mdId}">{{ o.mdTitle | ellipsis }}</el-link>
        </el-tooltip>
        <a v-if="blogAdmin === 1">
          <i class="el-icon-delete" @click="delMd(o.mdId)"></i>
          <i class="el-icon-edit" @click="editMd(o.mdId)"></i>
        </a>
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
      treeCurrentId: 1,
      title: '技术笔记',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        id: 'id'
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
  created () {
    let currentkey = JSON.parse(sessionStorage.getItem('current-node-key'))
    if (currentkey !== null) {
      this.treeCurrentId = parseInt(currentkey.id)
    }
  },
  mounted () {
    // 初始化菜单树
    let url = this.gohost + '/getmenus'
    var vm = this
    axios.defaults.withCredentials = false
    axios.post(url, qs.stringify({
    }))
      .then(function (response) {
        if (response.data.code === 1) {
          vm.data = response.data.data
          // start
          // 初始化菜单选中后的文章列表，如果不能从sessionStorage获取则取菜单数据的首项
          let currentkey = JSON.parse(sessionStorage.getItem('current-node-key'))
          if (currentkey === null) {
            currentkey = response.data.data[0]
          }
          vm.handleNodeClick(currentkey)
          // end
        } else {
          console.log(response.data.message)
        }
      })
      .catch(function (response) {
        console.log(response)
      })
    // 初始化文章，从sessionStorage中获取上次查看的文章进行展示
    let mdid = sessionStorage.getItem('mdid')
    if (mdid !== null && mdid !== undefined) {
      this.querymd(mdid)
    }
  },
  methods: {
    // 菜单选择事件，查询菜单下的文章列表
    handleNodeClick (data) {
      sessionStorage.setItem('current-node-key', JSON.stringify(data))
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
    // 调用父组件，加载文章信息
    querymd (titleid) {
      // 调用父组件方法
      this.activeName = parseInt(titleid)
      this.$emit('backBlogMainGetMd', titleid)
      sessionStorage.setItem('mdid', titleid)
    },
    delMd (mdid) {
      // 调用父组件方法，删除文章
      this.$emit('backBlogMainDelMd', mdid)
    },
    editMd (mdid) {
      // 跳转到文章编辑页面
      this.$router.push({name: 'blogmdedit', params: {mdid: mdid}})
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
