<template>
  <div class="home">
    <Loading v-if="!albums.length && !slideList.length"></Loading>
    <scrollCore v-if="albums.length">
      <slider :slideList="slideList" v-if="slideList.length"></slider>
      <div class="record-w">
        <h3 class="record-title">热门歌单推荐</h3>
        <ul class="uls">
          <li v-for="(item, index) in albums" :key="index" class="list" @click="gotoDetails(item)">
            <div class="avatar">
              <img v-lazy="item.pic" alt="">
            </div>
            <div class="list-r">
              <div class="list-title">{{item.username}}</div>
              <div class="list-desc">{{item.title}}</div>
            </div>
          </li>
        </ul>
      </div>
    </scrollCore>
    <router-view></router-view>
  </div>
</template>


<script>
import { recommend} from '@/api/recommend'
import scrollCore from '@/components/scrollCore.vue'
import slider from '@/components/scroll.vue'
import Loading from '@/components/Loading.vue'
import Empty from '@/components/Empty.vue'

export default {
  data() {
    return {
      albums: [],
      slideList: []
    }
  },
  components: {
    Empty,
    Loading,
    slider,
    scrollCore
  },
  created () {
    this.getRecommend();
  },
  methods: {
    gotoDetails(item){
      console.log(item.id);
      this.$store.commit('SetMusicBg', item)
      this.$router.push('/recommend/' +item.id)
    },
    getRecommend() {
      recommend().then(res => {
        if (res.code === 0) {
          this.slideList = res.result.sliders
          this.albums = res.result.albums
          if (this.$route.params.id) {
            let obj = {}
            this.albums.forEach(item => {
              console.log(this.$route.params.id);
              if (String(item.id) === String(this.$route.params.id)) {
                obj = item
              }
            })
            this.$store.commit('SetMusicBg', obj)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home{
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
}
.record-w{
  .record-title{
    font-size: 14px;
    color: #3790ff;
    text-align: center;
    padding: 20px 0 10px;
  }
  .uls{
    padding-bottom: 10px;
    .list {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      padding-left: 10px;
      .avatar{
        width: 60px;
        height: 60px;
        background-color: #eee;
        img{
          height: 60px;
          object-fit: cover;
        }
      }
      .list-r{
        margin-left: 5px;
        padding: 8px 0;
        .list-title{
          font-size: 14px;
          font-weight: bold;
        }
        .list-desc{
          margin-top: 7px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>