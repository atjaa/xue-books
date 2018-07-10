<template>
  <div>
    <m-head :hmenu="hmenu"></m-head>
    <div class="login-container">
      <el-row>
        <el-col :span="6" :offset="6">
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
              <el-button @click="registForm()">注册</el-button>
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
          let url = this.mhost + '/login'
          axios.defaults.withCredentials = false
          axios.post(url, qs.stringify({
            username: vm.user.uname,
            password: vm.user.passwd
          }))
            .then(function (response) {
              if (response.data.toString() !== 'false' && response.data.toString() !== 'err') {
                sessionStorage.setItem('user', JSON.stringify(response.data))
                vm.$router.push('/wenxue')
              } else {
                MessageBox.alert('用户名或密码错误', '登陆', {
                  confirmButtonText: '确定'
                })
              }
            })
            .catch(function (response) {
              console.log(response)
              MessageBox.alert(response.data, '登陆', {
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
    registForm () {
      this.$router.push('/regist')
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-form {
    width: 480px;
    align-items: center;
  }
  .login-container {
    padding-top: 80px;
  }
</style>
