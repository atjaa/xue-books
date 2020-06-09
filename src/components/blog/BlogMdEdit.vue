<template>
  <el-container>
  <el-aside width="80px">
    <!--      左侧边栏,占位用  -->
  </el-aside>
  <el-main class="blog_md_edit_container">
    <div>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>后台管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/blog/admin' }">MD文档管理</el-breadcrumb-item>
        <el-breadcrumb-item>MD文档编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider></el-divider>
    <div>
      <el-form>
        <el-row>
          <el-col :span="9">
            <el-form-item label="文档标题">
              <el-input v-model="title" placeholder="请输入内容" style="width: 260px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="info" @click="changeType()">MD/富文本切换</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <el-form-item class="myQuillEditor">
          <div v-if="textType === 1">
            <quill-editor ref="text" v-model="mdtext" :options="editorOption"/>
          </div>
          <div v-else>
            <el-col :span="24">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ minRows: 22, maxRows: 22}"
                v-model="mdtext">
              </el-input>
            </el-col>
          </div>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="submitMd('mdform')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-main>
  <el-aside width="80px">
    <!--      右侧边栏，占位用  -->
  </el-aside>
  </el-container>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {MessageBox} from 'element-ui'
export default {
  name: 'BlogMdEdit',
  data () {
    return {
      mdid: '',
      title: '',
      editorOption: {},
      textType: 2,
      mdtext: ''
    }
  },
  mounted () {
    let mdid = this.$route.params.mdid
    if (mdid !== undefined) {
      this.mdid = mdid
      this.blogMainGetMd(mdid)
    }
  },
  methods: {
    blogMainGetMd (titleid) {
      let url = this.gohost + '/mdsource'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'mdid': titleid
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            vm.title = response.data.data.title
            vm.mdtext = response.data.data.data
          } else {
            console.log(response.data.message)
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    submitMd () {
      if (this.mdtext === '' || this.title === '') {
        this.$message({
          message: '输入信息不能为空',
          type: 'warning'
        })
        return ''
      }
      let url = this.gohost + '/editmd'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        mdid: vm.mdid,
        mdtitle: vm.title,
        mdtext: vm.mdtext
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            MessageBox.alert('更新MD成功', '更新MD', {
              confirmButtonText: '确定'
            })
          } else {
            MessageBox.alert('更新MD失败: ' + response.data.message, '更新MD', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(function (response) {
          MessageBox.alert('更新MD失败' + response, '更新MD', {
            confirmButtonText: '确定'
          })
        })
    },
    changeType () {
      if (this.textType === 1) {
        this.textType = 2
      } else {
        this.textType = 1
      }
    }
  }
}
</script>

<style scoped>
  .blog_md_edit_container {
    background-color: #ffffff;
    text-align: left;
    min-height: calc(100vh - 176px);
    padding: 10px;
  }

  .myQuillEditor {
    height: 430px;
  }

  .quill-editor {
    height: 415px;
  }
</style>
