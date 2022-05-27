<template>
  <scrollCore v-if="songList.length">
    <ul class="uls">
      <li  v-for="(item, index) in songList" :key="index" class="list-item"  @click="clickItem(item, index)">
        <div class="name">{{item.name}}</div>
        <div class="title">{{item.singer}}</div>
      </li>
    </ul>
  </scrollCore>
</template>

<script>
  import scrollCore from './scrollCore.vue'
  export default {
    data() {
      return {
      }
    },
    props: {
      songList: {
        type: Array,
        default: []
      }
    },
    components: {
      scrollCore
    },
    methods: {
      clickItem(item, index){
        this.$store.commit('SetMusicBoxShow', true)
      }
    }
  }
</script>

<style lang="less" scoped>
.uls{
  .list-item{
    padding: 10px 10px;
    line-height: 1.2;
    .name{
      font-size: 14px;
      margin-bottom: 6px;
    }
    .title{
      font-size: 12px;
      color: #999;
    }
  }
}
</style>