<template>
  <div>
    <el-container>
      <el-header>
        <x-head></x-head>
      </el-header>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
      <el-footer>
        <m-footer></m-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Xue'
}
</script>

<style scoped>
  .el-main{
    background-color: #F8F8F8;
    min-height: calc(100vh - 176px)
  }
  .el-header{
    padding: 0 2px!important;
  }
</style>
