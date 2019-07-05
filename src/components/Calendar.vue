<template>
  <div>
    <m-head :hmenu="hmenu"></m-head>
    <div class="m-about-body">
      <el-calendar v-model="value">
      </el-calendar>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      hmenu: '日历',
      value: new Date()
    }
  },
  methods: {
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-about-body{
    padding: 40px;
  }
</style>
