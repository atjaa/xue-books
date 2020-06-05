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
          <el-breadcrumb-item>MD文档添加</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <div>
        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label="选择分类">
                <el-cascader
                  :options="options"
                  :props="optionProps"
                  v-model="menuValue"
                  ref="refHandle"
                  clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="填写标题">
                <el-input v-model="title" placeholder="请输入内容" style="width: 220px"></el-input>
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
            <el-button @click="resetForm('mdform')">取消</el-button>
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
  name: 'BlogAdd',
  data () {
    return {
      options: [],
      optionProps: {
        checkStrictly: true,
        value: 'id', // 后台返回的id转换为前端的value
        label: 'label',
        children: 'children'
      },
      textType: 2,
      editorOption: {},
      title: '',
      menuValue: '',
      mdtext: ''
    }
  },
  watch: {
    menuValue () {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false
      }
    }
  },
  mounted () {
    let url = this.gohost + '/getmenus'
    var vm = this
    axios.defaults.withCredentials = false
    axios.post(url, qs.stringify({}))
      .then(function (response) {
        if (response.data.code === 1) {
          vm.options = response.data.data
        } else {
          console.log(response.data.message)
        }
      })
      .catch(function (response) {
        console.log(response.date)
      })
  },
  methods: {
    submitMd () {
      if (this.mdtext === '' || this.title === '' || this.menuValue === '') {
        this.$message({
          message: '输入信息不能为空',
          type: 'warning'
        })
        return ''
      }
      let url = this.gohost + '/addmd'
      var vm = this
      let menuid = this.menuValue[this.menuValue.length - 1]
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        menuid: menuid,
        mdtitle: vm.title,
        mdtext: vm.mdtext
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            vm.resetForm('menuform')
            MessageBox.alert('添加MD成功', '添加MD', {
              confirmButtonText: '确定'
            })
          } else {
            MessageBox.alert('添加MD失败: ' + response.data.message, '添加MD', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(function (response) {
          MessageBox.alert('添加MD失败' + response, '添加MD', {
            confirmButtonText: '确定'
          })
        })
    },
    resetForm (mdform) {
      this.mdtext = ''
      this.menuValue = ''
      this.title = ''
    },
    changeType () {
      this.mdtext = ''
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
