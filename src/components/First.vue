<template>
  <div>
    <el-container>
      <el-aside width="80px">
        <m-aside></m-aside>
      </el-aside>
      <el-container>
        <el-main>
          <transition name="fade-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer>
          <m-footer></m-footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: '',
  data () {
    return {
    }
  },
  mounted () {
    let url = this.mhost + '/iflogin'
    axios.defaults.withCredentials = false
    axios.post(url, qs.stringify({
    }))
      .then(function (response) {
      })
      .catch(function (response) {
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-aside{
    border-right: groove rgba(255,255,255,0.2) ;
    text-align: center;
    height: 100vh;
  }
  .el-main{
    padding: 0px !important;
  }
</style>
