<template>
  <div class="foot">
    <span>Copyright © 2017 Zhuang. All rights reserved.</span><br>
    <span><a href="http://www.miitbeian.gov.cn" target="_blank">京ICP备17059127号</a> |
      <a href="https://blog.xue37.cn" target="_blank">个人博客</a> | 总访问量{{ visitcount }}</span>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: '',
  data () {
    return {
      visitcount: 0
    }
  },
  methods: {
  },
  mounted () {
    let url = this.mhost + '/visitcount'
    var vm = this
    axios.defaults.withCredentials = false
    axios.post(url, qs.stringify({
      visitcount: ''
    }))
      .then(function (response) {
        if (response.data.toString() !== 'false' && response.data.toString() !== 'err') {
          vm.visitcount = response.data.count
        }
      })
      .catch(function (response) {
        console.log(response)
      })
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .foot {
    font-size: x-small;
    padding: 10px 20px;
  }
  .foot a{
    color: black;
    text-decoration: none;
  }
</style>
