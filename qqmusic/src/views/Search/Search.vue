<template>
  <div class="search">
    <div class="input-wrap">
      <div class="icon-search">
        <searchSvg></searchSvg>
      </div>
      <input type="text" v-model.trim="searchVal" @input="searchChange" placeholder="搜索歌曲，歌手，关键字">
      <searchCloseSvg class="close" v-show="searchVal" @click="clearInput"></searchCloseSvg>
    </div>
    <h3 class="hot-title">热门搜索</h3>
    <ul class="hot-uls">
      <li  
        v-for="(item, index) in hotSearch" 
        :key="index" 
        class="list-item" 
        @click="clickItem(item, index)">
        {{item.k}}
      </li>
    </ul>
  </div>
</template>


<script>
import searchSvg from '@/assets/img/search'
import searchCloseSvg from '@/assets/img/searchClose'
import { hotKeys } from '@/api/hotKeys'
export default {
  data() {
    return {
      searchVal: '',
      hotSearch: []
    }
  },
  created() {
    this.getHotKeys()
  },
  methods: {
    clearInput() {
      this.searchVal = '';
    },
    async getHotKeys() {
      const res = await hotKeys();
      if (res.code === 0 && res.data.hotkey && res.data.hotkey.length) {
        this.hotSearch = res.data.hotkey.slice(0, 10)
      }
    },
    searchChange() {},
    clickItem(item, index){

    },
  },
  components: {
    searchSvg,
    searchCloseSvg
  }
}
</script>

<style lang="less" scoped>
.search{
  padding: 0 10px;
  .input-wrap{
    display: flex;
    align-items: center;
    background-color: #eee;
    border-radius: 6px;
    position: relative;
    .icon-search{
      padding: 0 10px;
    }
    input{
      height: 30px;
      border-radius: 6px;
      background-color: #eee;
      border: none;
      flex: 1;
    }
    .close{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 22px;
    }
  }
  .hot-title{
    padding: 10px 0;
    font-size: 16px;
  }
  .hot-uls{
    .list-item{
      display: inline-block;
      padding: 5px 7px;
      background-color: #eee;
      border-radius: 3px;
      margin-top: 5px;
      margin-right: 10px;
      font-size: 13px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
}
</style>
