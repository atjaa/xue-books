<template>
  <div class="m-aside">
    <img src="/static/images/ooopic.ico" />
    <el-row>
      <a href="#" target="_parent" v-on:click="goType('wenxue')">
        <div class="m-i-aside">
          <el-row>
            <i class="el-icon-tickets"></i>
          </el-row>
          <el-row>
            <span>文学艺术</span>
          </el-row>
        </div>
      </a>
    </el-row>
    <el-row>
      <a href="#" target="_parent" v-on:click="goType('renwen')">
        <div class="m-i-aside">
          <el-row>
            <i class="el-icon-menu"></i>
          </el-row>
          <el-row>
            <span>人文社科</span>
          </el-row>
        </div>
      </a>
    </el-row>
    <el-row>
      <a href="#" target="_parent" v-on:click="goType('jingji')">
        <div class="m-i-aside">
          <el-row>
            <i class="el-icon-star-off"></i>
          </el-row>
          <el-row>
            <span>经济管理</span>
          </el-row>
        </div>
      </a>
    </el-row>
    <el-row>
      <a href="#" target="_parent" v-on:click="goType('keji')">
        <div class="m-i-aside">
          <el-row>
            <i class="el-icon-share"></i>
          </el-row>
          <el-row>
            <span>科技</span>
          </el-row>
        </div>
      </a>
    </el-row>
    <el-row>
      <a href="#" target="_parent" v-on:click="goType('lizhi')">
        <div class="m-i-aside">
          <el-row>
            <i class="el-icon-refresh"></i>
          </el-row>
          <el-row>
            <span>励志与成功</span>
          </el-row>
        </div>
      </a>
    </el-row>
    <el-row>
      <a href="#" target="_parent" v-on:click="goType('shenghuo')">
        <div class="m-i-aside">
          <el-row>
            <i class="el-icon-service"></i>
          </el-row>
          <el-row>
            <span>生活</span>
          </el-row>
        </div>
      </a>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    goType (p) {
      this.$router.push({name: p, params: {t: p}})
    }
  },
  mounted () {
    let p = 'wenxue'
    this.$router.push({name: p, params: {t: p}})
  }
}
</script>

<style>
  .m-i-aside{
    padding: 10px 0;
  }
  .m-i-aside:hover{
    padding: 10px 0;
    background: #e5e9f2;
  }
  .m-i-aside i{
    font-size: 2em;
  }
  .m-i-aside span{
    font-size: 0.8em;
  }
  .m-aside img{
    padding: 20px 0 20px 0;
    height: 3em;
    width: 3em;
  }
  .m-aside a{
    color: black;
    text-decoration: none;
  }
</style>
