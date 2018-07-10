<template>
  <div>
    <m-head :hmenu="hmenu"></m-head>
    <div class="m-book-body">
      <m-s-menu :mmenu="mmenu"></m-s-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      hmenu: '文学艺术',
      mmenu: [{value: '1-1', text: '小说'}, {value: '1-2', text: '文学'}, {value: '1-3', text: '动漫'}, {value: '1-4', text: '传记'}]
    }
  },
  methods: {
    getStatus (urlStr) {
      if (urlStr && urlStr === 'wenxue') {
        this.hmenu = '文学艺术'
        this.mmenu = [{value: '1-1', text: '小说'}, {value: '1-2', text: '文学'}, {value: '1-3', text: '动漫'}, {value: '1-4', text: '传记'}]
      } else if (urlStr && urlStr === 'renwen') {
        this.hmenu = '人文社科'
        this.mmenu = [{value: '2-1', text: '历史'}, {value: '2-2', text: '哲学'}, {value: '2-3', text: '法律'}, {value: '2-4', text: '心理学'}]
      } else if (urlStr && urlStr === 'jingji') {
        this.hmenu = '经济管理'
        this.mmenu = [{value: '3-1', text: '投资管理'}, {value: '3-2', text: '管理'}, {value: '3-3', text: '经济与金融'}, {value: '3-4', text: '市场营销'}]
      } else if (urlStr && urlStr === 'keji') {
        this.hmenu = '科技'
        this.mmenu = [{value: '4-1', text: '科普'}, {value: '4-2', text: '计算机与网络'}, {value: '4-3', text: '医学'}, {value: '4-4', text: '建筑'}]
      } else if (urlStr && urlStr === 'lizhi') {
        this.hmenu = '励志与成功'
        this.mmenu = [{value: '5-1', text: '心灵读物'}, {value: '5-2', text: '人际交往'}, {value: '5-3', text: '职场'}, {value: '5-4', text: '成功学'}]
      } else if (urlStr && urlStr === 'shenghuo') {
        this.hmenu = '生活'
        this.mmenu = [{value: '6-1', text: '孕产育儿'}, {value: '6-2', text: '烹饪美食'}, {value: '6-3', text: '健康养生'}, {value: '6-4', text: '旅游'}]
      } else {
        this.hmenu = '文学艺术'
        this.mmenu = [{value: '1-1', text: '小说'}, {value: '1-2', text: '文学'}, {value: '1-3', text: '动漫'}, {value: '1-4', text: '传记'}]
      }
    }
  },
  mounted () {
  },
  watch: {
    '$route' (to, from) {
      this.getStatus(this.$route.params.t)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-book-body{
    padding: 20px;
  }
</style>
