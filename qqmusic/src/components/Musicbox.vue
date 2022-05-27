<template>
  <div>
    <div class="music-box-wrap"  v-show="$store.state.musicboxShow">
      <Header :backShow="true" :title="title" :back="back"></Header>
      <div class="header-name">{{ name }}</div>
      <div class="img-lyric">
        <div class="img-m">
          <div class="img-w">
            <div class="bg">
              <div
                style="
                  background-image: url('https://y.gtimg.cn/music/photo_new/T001R800x800M000001BLpXF2DyJe2.webp');
                "
                class="img"
              ></div>
            </div>
          </div>
          <div class="lyric">haha45435</div>
        </div>
      </div>
      <div class="bottom">
        <div class="play-progress-wrap">
          <div class="current-time">0:00</div>
          <div class="progress">
            <div class="current-line">
              <div class="current-slot"></div>
            </div>
          </div>
          <div class="total-time">0:00</div>
        </div>
        <div class="play-ctrl-wrap">
          <div class="play-mode">
            <listLoop></listLoop>
          </div>
          <div class="play-pre">
            <preButton></preButton>
          </div>
          <div class="play">
            <play></play>
          </div>
          <div class="play-next">
            <next></next>
          </div>
          <div class="play-like">
            <like></like>
          </div>
        </div>
      </div>
    </div>
    <div class="min-play"  v-show="!$store.state.musicboxShow && $store.state.miniBoxShow" @click="showBox">
      <div class="left">
        <div class="img">
          <img src="https://y.gtimg.cn/music/photo_new/T001R800x800M000001BLpXF2DyJe2.webp" alt="">
        </div>
        <div>
          <div class="title">ewr</div>
          <div class="name">ewr</div>
        </div>
      </div>
      <div class="right">
        <div class="play">
          <play></play>
        </div>
        <div class="list">
          <playList></playList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import listLoop from "@/assets/img/listLoop.vue";
import oneLoop from "@/assets/img/oneLoop.vue";
import randomMode from "@/assets/img/randomMode.vue";
import preButton from "@/assets/img/pre.vue";
import next from "@/assets/img/next.vue";
import play from "@/assets/img/play.vue";
import pause from "@/assets/img/pause.vue";
import like from "@/assets/img/like.vue";
import liked from "@/assets/img/liked.vue";
import playList from "@/assets/img/playList.vue";

export default {
  data() {
    return {
      title: "324",
      name: "3232323232",
    };
  },
  methods: {
    showBox() {
      this.$store.commit("SetMusicBoxShow", true);
      this.$store.commit("SetMiniBoxShow", false);
    },
    back() {
      this.$store.commit("SetMusicBoxShow", false);
      this.$store.commit("SetMiniBoxShow", true);
    },
  },
  components: {
    playList,
    Header,
    listLoop,
    oneLoop,
    randomMode,
    preButton,
    next,
    play,
    pause,
    like,
    liked,
  },
};
</script>

<style lang="less" scoped>
@keyframes rotate360 {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

.music-box-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: #fff;
  :deep(.header) {
    .back {
      color: #000;
      transform: rotate(-90deg);
    }
    .detail-title {
      color: #000 !important;
    }
  }
  .header-name {
    text-align: center;
    margin-top: 40px;
    height: 40px;
    margin-bottom: 20px;
  }
  .img-lyric {
    position: absolute;
    width: 100%;
    top: 80px;
    bottom: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .img-m {
      width: 100%;
    }
  }
  .img-w {
    width: 90%;
    height: 0;
    padding-top: 90%;
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
    .bg {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 10px solid rgba(0, 0, 0, 0.1);
      .img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        animation: rotate360 20s linear infinite;
      }
    }
  }
  .lyric {
    text-align: center;
    padding: 10px;
  }
  .bottom {
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 100%;
  }
  .play-progress-wrap {
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin: 10px 0;
    .current-time {
      text-align: right;
    }
    .progress {
      flex: 1;
      height: 4px;
      background-color: #eee;
      border-radius: 2px;
      position: relative;
      margin: 0 15px;
      .current-line {
        width: 20%;
        position: absolute;
        left: 0;
        top: 0;
        height: 4px;
        border-radius: 2px;
        background-color: #3790ff;
        .current-slot {
          position: absolute;
          right: 0;
          top: -3px;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          background-color: #3790ff;
        }
      }
    }
  }
  .play-ctrl-wrap {
    display: flex;
    align-items: center;
    div {
      flex: 1;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 5px 0;
    }
    .play-pre {
      font-size: 22px;
    }
    .play {
      font-size: 44px;
    }
  }
}
.min-play{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #eee;
  padding: 0 10px;
  z-index: 300;
  display: flex;
  align-items: center;
  .left{
    flex: 1;
    display: flex;
    align-items: center;
    .img{
      margin-right: 10px;
      img{
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .title{
      font-size: 14px;
    }
    .name{
      color: #000;
    }
  }
  .right{
    display: flex;
    align-items: center;
    font-size: 30px;
    :deep(svg) {
      display: block;
    }
    .play{
    }
    .list{
      margin-left: 10px;
    }
  }
}
</style>
