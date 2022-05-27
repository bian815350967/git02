<template>
  <div class="rank-w">
    <scrollCore v-if="rankList.length">
      <ul class="rank-uls">
        <li  v-for="(item, index) in rankList" :key="index" class="list-item"  @click="clickItem(item, index)">
          <div class="pic">
            <img v-lazy="item.pic" alt="">
          </div>
          <ul class="uls-right">
            <li  v-for="(song, index) in item.songList" :key="index" class="list">
              <p class="desc">{{index + 1}} {{song.songName}} <span class="name">{{song.singerName}}</span></p>
            </li>
          </ul>
        </li>
      </ul>
    </scrollCore>
    <Loading v-if="!rankList.length"></Loading>
  </div>
</template>


<script >
import {getRankList} from '@/api/rank'
import scrollCore from '@/components/scrollCore'
import Loading from '@/components/Loading.vue'
export default {
  data() {
    return {
      rankList: []
    }
  },
  created() {
    this.getRank()
  },
  components: {
    Loading,
    scrollCore
  },
  methods: {
    async getRank() {
      const res = await getRankList()
      if (res.code === 0) {
        this.rankList = res.result.rankList
      }
    },
    clickItem (item, index) {

    }
  },
}
</script>

<style lang="less" scoped>
@keyframes el-skeleton-loading  {
  0%{
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.rank-w{
  position: fixed;
  top: 80px;
  bottom: 0;
  width: 100%;
  // height: calc(100vh - 80px);
  :deep(.core-container) {
    height: 100%;  
    overflow: hidden;
    .scroll-wrapper{
      height: 100%;  
      overflow: hidden;
      position: relative;
    }
  } 
  .rank-uls{
    padding-bottom: 10px;
    .list-item{
      margin: 10px;
      display: flex;
      align-items: center;
      background-color: #eee;
      border-radius: 4px;
      padding-bottom: 1px;
      .pic{
        width: 80px;
        height: 80px;
        background-color: #eee;
        background: linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%);
        background-size: 400% 100%;
        animation: el-skeleton-loading .8s ease infinite;
        img{
          width: 80px;
          object-fit: cover;
        }
      }
      .uls-right{
        padding-left: 10px;
        flex: 1;
        overflow: hidden;
        .list {  
          margin-bottom: 8px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .name{
          color: #999;
        }
        .desc{
          font-size: 13px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>