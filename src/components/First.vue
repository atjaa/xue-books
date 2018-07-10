<template>
  <div>
    <el-container>
      <el-aside width="80px">
        <m-aside></m-aside>
      </el-aside>
      <el-main>
        <transition name="fade-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      visible: false
    }
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
  .el-container {
  }
  .el-main{
    padding: 0px !important;
  }
</style>
