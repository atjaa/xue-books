<template>
  <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
    <el-tab-pane v-for="item in mmenu" v-bind:key="item.value" :label="item.text" :id="item.value">
      <m-list :msmenu="item.value"></m-list>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tabPosition: 'top'
    }
  },
  props: ['mmenu'],
  mounted () {
  },
  methods: {
    handleClick (tab, event) {
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
