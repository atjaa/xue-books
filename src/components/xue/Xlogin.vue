<template>
  <div class="m-login-body">
    <el-row>
      <el-col :span="12" :offset="2">
        <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="login-form">
          <el-form-item label="用户名" prop="uname">
            <el-input v-model="user.uname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd">
            <el-input v-model="user.passwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('user')">立即登陆</el-button>
            <el-button @click="resetForm('user')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import {MessageBox} from 'element-ui'
import qs from 'qs'
export default {
  name: 'Xlogin',
  data () {
    return {
      hmenu: '登陆',
      user: {
        uname: '',
        passwd: ''
      },
      rules: {
        uname: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        passwd: [
          {required: true, message: '请输入用户密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
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
          let url = this.gohost + '/login'
          axios.defaults.withCredentials = false
          axios.post(url, qs.stringify({
            username: vm.user.uname,
            password: vm.user.passwd
          }))
            .then(function (response) {
              if (response.data.code === 1) {
                sessionStorage.setItem('user', JSON.stringify(response.data.data))
                let path = vm.$route.query.redirect
                vm.$router.push(path)
              } else {
                MessageBox.alert(response.data.message, '登陆失败', {
                  confirmButtonText: '确定'
                })
              }
            })
            .catch(function (response) {
              console.log(response)
              MessageBox.alert(response.data, '登陆失败', {
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
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  .m-login-body{
    text-align: left;
    padding-left: 280px;
    padding-right: 280px;
  }
</style>
