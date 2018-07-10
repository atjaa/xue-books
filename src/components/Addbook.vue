<template>
  <div>
    <m-head :hmenu="hmenu"></m-head>
    <div class="addbook-container">
      <el-row>
        <el-col :span="20" :offset="1">
          <el-form :model="book" :rules="rules" ref="book" label-width="100px" class="addbook-form">
            <el-form-item label="图书分类" prop="menuid">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleItemChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="图书名称" prop="bookname">
              <el-input v-model="book.bookname"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="book.author"></el-input>
            </el-form-item>
            <el-form-item label="图书简介" prop="introduction">
              <el-input v-model="book.introduction" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="资源地址" prop="pan">
              <el-input v-model="book.pan"></el-input>
            </el-form-item>
            <el-form-item label="资源来源" prop="source">
              <el-input v-model="book.source"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('book')">提交</el-button>
              <el-button @click="resetForm('book')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { MessageBox } from 'element-ui'
export default {
  name: '',
  data () {
    return {
      hmenu: '添加图书',
      book: {
        menuid: '1-1',
        author: '',
        bookname: '',
        introduction: '',
        pan: '',
        source: ''
      },
      options: [{
        value: '1',
        label: '文学艺术',
        children: [
          {value: '1-1', label: '小说'}
        ]
      }, {
        value: '2',
        label: '人文社科',
        children: [
          {value: '2-1', label: '小说'}
        ]
      }, {
        value: '3',
        label: '经济管理',
        children: [
          {value: '3-1', label: '小说'}
        ]
      }, {
        value: '4',
        label: '科技',
        children: [
          {value: '4-1', label: '小说'}
        ]
      }, {
        value: '5',
        label: '励志与成功',
        children: [
          {value: '5-1', label: '小说'}
        ]
      }, {
        value: '6',
        label: '生活',
        children: [
          {value: '6-1', label: '小说'}
        ]
      }],
      selectedOptions: ['1', '1-1'],
      rules: {
        menuid: [
          {required: true, message: '请选择分类', trigger: 'blur'}
        ],
        author: [
          {required: true, message: '请输入作者名称', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur'}
        ],
        bookname: [
          {required: true, message: '请输入图书名称', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 30 个字符', trigger: 'blur'}
        ],
        introduction: [
          {required: true, message: '请输入图书简介', trigger: 'blur'},
          {min: 3, max: 300, message: '长度在 3 到 300 个字符', trigger: 'blur'}
        ],
        pan: [
          {required: true, message: '请输入资源地址', trigger: 'blur'},
          {min: 3, max: 300, message: '长度在 3 到 300 个字符', trigger: 'blur'}
        ],
        source: [
          {required: true, message: '请输入资源来源', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  props: [],
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var vm = this
          let url = this.mhost + '/addbook'
          axios.defaults.withCredentials = false
          axios.post(url, qs.stringify({
            menuid: vm.book.menuid,
            author: vm.book.author,
            bookname: vm.book.bookname,
            introduction: vm.book.introduction,
            pan: vm.book.pan,
            source: vm.book.source
          }))
            .then(function (response) {
              if (response.data.toString() === 'success') {
                MessageBox.alert('新增图书成功', '新增', {
                  confirmButtonText: '确定'
                })
                vm.$router.push('/wenxue')
              } else {
                MessageBox.alert(response.data, '新增', {
                  confirmButtonText: '确定'
                })
              }
            })
            .catch(function (response) {
              console.log(response)
              MessageBox.alert(response.data, '新增', {
                confirmButtonText: '确定'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleItemChange (val) {
      this.book.menuid = val[1]
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addbook-container {
    padding-top: 40px;
  }
  .el-form-item {
    text-align: left!important;
  }
</style>
