<template>
  <div>
    <m-head :hmenu="hmenu"></m-head>
    <s-list :search="search"></s-list>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      hmenu: '资源查询',
      search: ''
    }
  },
  props: [],
  mounted () {
    this.searchBook(this.$route.query.searchtype, this.$route.query.searchvalue)
  },
  methods: {
    searchBook (val1, val2) {
      this.search = {type: val1, param: val2}
    }
  },
  watch: {
    '$route' (to, from) {
      this.searchBook(this.$route.query.searchtype, this.$route.query.searchvalue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
