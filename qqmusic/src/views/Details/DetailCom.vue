<template>
  <Header :backShow="true" :title="$store.state.musicBg.title"></Header>
  <div class="bg" :style="{'background-image': 'url(' + $store.state.musicBg.pic + ')'}">
    <div class="radom-btn">
      <playAll></playAll>
      随机播放全部
    </div>
    <div class="filter"></div>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import playAll from '@/assets/img/playAll'
  export default {
    data() {
      return {
        title: ''
      }
    },
    components: {
      playAll,
      Header
    }
  }
</script>

<style lang="less" scoped>

  .bg{
    width: 100%;
    height: 0;
    padding-top: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    top: 0;
    .filter{ 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.3);
    }
    .radom-btn{
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid #fff;
      color: #fff;
      border-radius: 16px;
      padding: 4px 10px;
      font-size: 13px;
      z-index: 100;
      :deep(svg) {
        color: #fff;
        font-size: 20px;
        path {
          fill: #fff !important;
        }
      }
    }
  }
</style>