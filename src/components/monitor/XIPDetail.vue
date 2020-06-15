<template>
  <el-container>
    <el-aside width="80px"></el-aside>
    <el-main class="monitor_container">
      <div id="myChart" class="myChart">
        {{ipname}} <a><i class="el-icon-arrow-left"></i><el-link type="primary" v-on:click="monitor">返回</el-link></a>
        <br>
        {{ipaddr}}
      </div>
    </el-main>
    <el-aside width="80px"></el-aside>
  </el-container>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'XIPDetail',
  data () {
    return {
      ipname: '',
      ip: '',
      ipaddr: ''
    }
  },
  mounted () {
    let ipname = this.$route.params.ipname
    if (ipname !== undefined) {
      this.ipname = ipname
      this.ip = ipname.substring(0, ipname.indexOf('-'))
      this.getIpAddr(this.ip)
    }
  },
  methods: {
    getIpAddr (ip) {
      let url = this.gohost + '/monitor/ipaddr'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'ip': ip
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            vm.ipaddr = response.data.data
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    monitor () {
      this.$router.push({name: 'xmonitor'})
    }
  }
}
</script>

<style scoped>
  .monitor_container{
    background-color: #ffffff;
    text-align: left;
    min-height: calc(100vh - 176px);
    min-width: calc(100vh - 176px);
    padding: 10px;
    /*box-shadow: 10px 10px 5px #888888;*/
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 16px;
  }
  .myChart{
    min-height: calc(100vh - 176px);
  }
</style>
