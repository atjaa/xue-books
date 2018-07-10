<template>
  <div>
    <m-head :hmenu="hmenu"></m-head>
    <div class="m-about-body">
      这个家伙很懒，什么也没留下。<i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      hmenu: '关于本站'
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
