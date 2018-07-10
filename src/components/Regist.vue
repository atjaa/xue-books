<template>
  <div>
    <m-head :hmenu="hmenu"></m-head>
    <div class="regist-container">
      <el-row>
        <el-col :span="6" :offset="6">
          <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="regist-form">
            <el-form-item label="用户名" prop="uname">
              <el-input v-model="user.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passwd">
              <el-input v-model="user.passwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confimpassword">
              <el-input v-model="user.confimpassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="user.nickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('user')">注册</el-button>
              <el-button @click="resetForm('user')">重置</el-button>
              <el-button @click="loginForm()">登陆</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      hmenu: '用户注册',
      user: {
        uname: '',
        passwd: '',
        confimpassword: '',
        nickname: '',
        phone: ''
      },
      rules: {
        uname: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        passwd: [
          {required: true, message: '请输入用户密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        confimpassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'},
          { validator: validatePass, trigger: 'blur' }
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入电话', trigger: 'blur'},
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
          let url = this.mhost + '/regist'
          axios.defaults.withCredentials = false
          axios.post(url, qs.stringify({
            username: vm.user.uname,
            password: vm.user.passwd,
            nickname: vm.user.nickname,
            phone: vm.user.phone
          }))
            .then(function (response) {
              if (response.data.toString() === 'existusername') {
                MessageBox.alert('账户已存在', '注册', {
                  confirmButtonText: '确定'
                })
                return
              }
              if (response.data.toString() === 'existphone') {
                MessageBox.alert('手机号已存在', '注册', {
                  confirmButtonText: '确定'
                })
                return
              }
              if (response.data.toString() === 'existnickname') {
                MessageBox.alert('昵称已存在', '注册', {
                  confirmButtonText: '确定'
                })
                return
              }
              if (response.data.toString() !== 'false' && response.data.toString() !== 'err') {
                MessageBox.alert('注册成功', '注册', {
                  confirmButtonText: '确定'
                })
                sessionStorage.setItem('user', JSON.stringify(response.data))
                vm.$router.push('/wenxue')
              } else {
                MessageBox.alert('注册失败', '注册', {
                  confirmButtonText: '确定'
                })
                return false
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
    loginForm () {
      this.$router.push('/login')
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .regist-form {
    width: 480px;
    align-items: center;
  }
  .regist-container {
    padding-top: 80px;
  }
</style>
