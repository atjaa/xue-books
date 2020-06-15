<template>
  <el-container>
    <el-aside width="80px"></el-aside>
    <el-main class="monitor_container">
      <div id="myChart" class="myChart">
      </div>
    </el-main>
    <el-aside width="80px"></el-aside>
  </el-container>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Xmonitor',
  data () {
    return {
      days: 30,
      visitData: [],
      yAxisData: [],
      seriesData: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let url = this.gohost + '/monitor/visit'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'days': vm.days
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            vm.visitData = response.data.data
            vm.initParseData()
            vm.initEcharts()
          } else {
            console.log(response.data)
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    initEcharts () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          text: '请求来源IP',
          subtext: '最近1个月数据',
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.getyAxis()
        },
        series: [
          {
            name: '请求数',
            type: 'bar',
            barWidth: 18,
            data: this.getSeries()
          }
        ],
        dataZoom: {
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          left: '96%',
          startValue: this.getDataCount() - 15,
          endValue: this.getDataCount(),
          zoomLock: true
        }
      })
      myChart.on('click', (params) => {
        var ipname = params.name
        if (ipname !== undefined && ipname !== '') {
          this.toIPDetail(ipname)
        }
      })
    },
    toIPDetail (ipname) {
      this.$router.push({name: 'xipdetail', params: {ipname: ipname}})
    },
    initParseData () {
      var axis = []
      var data = []
      for (let i = 0; i < this.visitData.length; i++) {
        axis.push(this.visitData[i].remoteAddr)
        data.push(this.visitData[i].count)
      }
      this.yAxisData = axis
      this.seriesData = data
    },
    getDataCount () {
      return this.yAxisData.length
    },
    getyAxis () {
      return this.yAxisData
      // return ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
    },
    getSeries () {
      return this.seriesData
      // return [18203, 23489, 29034, 104970, 131744, 630230]
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
