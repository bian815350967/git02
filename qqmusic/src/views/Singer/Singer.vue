<template>
  <div class="singer">
    <Loading v-if="!singerList.length"></Loading>
    <scrollCore v-if="singerList.length">
      <ul class="uls-w">
        <li class="list-w" v-for="(item, index) in singerList" :key="index">
          <div class="title">{{item.title}}</div>
          <ul class="item-w">
            <li class="list" v-for="(singer, index) in item.list" :key="singer.id" @click="gotoDetails(singer, index)">
              <div class="pic">
                <img v-lazy="singer.pic" alt="">
              </div>
              <div class="name">{{singer.name}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </scrollCore>
    <ul class="expressway" v-show="singerList.length">
      <li  v-for="(item, index) in singerList" :key="index" class="list-item">
        <div class="name" :class="{'active': activeIndex === index}">{{item.title}}</div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import {singer} from '@/api/singer'
import scrollCore from '@/components/scrollCore.vue'
import Loading from '@/components/Loading.vue'

export default {
  data() {
    return {
      activeIndex: 0,
      singerList: []
    }
  },
  created () {
    this.getSinger()
  },
  components: {
    Loading,
    scrollCore
  },
  methods: {
    async getSinger() {
      let res = await singer()
      if (res.code === 0) {
        this.singerList = res.result.singers
        if (this.$route.params.id) {
          let obj = {}
          this.singerList.forEach(item => {
            console.log(item.mid, this.$route.params.id);
            if (String(item.mid) === String(this.$route.params.id)) {
              obj = item
            }
          })
          this.$store.commit('SetMusicBg', obj)
        }
      }
    },
    gotoDetails(item, index) {
      console.log(item);
      this.$store.commit('SetMusicBg', item)
      this.$router.push('/singer/' + item.mid)
    }
  }
}
</script>

<style lang="less" scoped>
.singer{
  height: calc(100vh - 80px);
  :deep(.core-container) {
    height: 100%;  
    overflow: hidden;
    .scroll-wrapper{
      height: 100%;  
      overflow: hidden;
      position: relative;
    }
  } 
  .uls-w{
    .list-w{
      .title{
        height: 30px;
        line-height: 30px;
        background-color: #eee;
        padding-left: 10px;
      }
    }
    .item-w{
      .list {
        padding: 8px 10px;
        display: flex;
        align-items: center;
        .pic {
          height: 60px;
          width: 60px;
          img{
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
          }
        }
        .name{
          padding: 0 10px;
          font-size: 14px;
        }
      }
    }
  }
  .expressway{
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 40px;
    right: 5px;
    background-color: #eee;
    padding: 10px 0;
    border-radius: 10px;
    .list-item{
      padding: 3px 5px;
      font-size: 12px;
      text-align: center;
      .active{
        color: #3790ff;
        font-weight: bold;
      }
    }
  }
}
</style>

