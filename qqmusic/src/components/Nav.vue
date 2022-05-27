<template>
  <ul class="nav">
    <router-link 
      v-for="(item, index) in nav" 
      :to="item.link" 
      :key="index" 
      class="list"
      >{{ item.name }}</router-link>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      nav: [
        {name: '推荐', link: '/'},
        {name: '歌手', link: '/singer'},
        {name: '排行', link: '/rank'},
        {name: '搜索', link: '/search'},
      ]
    }
  }, 
  methods: {
    navFn(item, index) {
      this.$router.push(item.link)
      this.activeIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.nav{
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  .list{
    height: 100%;
    flex: 1;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    &.router-link-active {
      color: #3790ff;
    }
  }
}
</style>