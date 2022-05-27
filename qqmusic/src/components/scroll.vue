<template>
  <div class="slide-banner">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="slide">
        <div class="slide-banner-content">
          <div v-for="(item, index) in slideList" class="slide-page" :key="index">
            <a :href="item.link" target="_blank">
              <img :src="item.pic" alt="">
            </a>
          </div>
        </div>
      </div>
      <div class="dots-wrapper">
        <span
          class="dot"
          v-for="(num, index) in slideList"
          :key="index"
          :class="{'active': currentPageIndex === index}"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from '@better-scroll/core'
  import Slide from '@better-scroll/slide'

  BScroll.use(Slide)

  export default {
    data() {
      return {
        nums: 4,
        currentPageIndex: 0
      }
    },
    props: {
      slideList: {
        type: Array,
        default: []
      }
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.slide.destroy()
    },
    methods: {
      init() {
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          scrollY: false,
          slide: true,
          click: true,
          momentum: false,
          bounce: false,
          probeType: 3
        })
        this.slide.on('scrollEnd', this._onScrollEnd)

        this.slide.on('slideWillChange', (page) => {
          this.currentPageIndex = page.pageX
        })

        // v2.1.0
        this.slide.on('slidePageChanged', (page) => {
          // console.log('CurrentPage changed to => ', page)
        })
      },
      _onScrollEnd () {
        // console.log('CurrentPage => ', this.slide.getCurrentPage())
      },
      nextPage() {
        this.slide.next()
      },
      prePage() {
        this.slide.prev()
      }
    }
  }
</script>

<style lang="less" scoped>


.slide-banner{
  position: relative;
  padding-top: 40%;
  height: 0;
  overflow: hidden;
  .banner-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .slide-banner-wrapper{
    min-height: 1px;
    overflow: hidden;
  }
  .slide-banner-content{
    height: 100%;
    white-space: nowrap;
    font-size: 0;
    img {
      // object-fit: cover;
      display: block;
      width: 100%;
    }
    .slide-page{
      display: inline-block;
      height: 100%;
      width: 100%;
      line-height: 100%;
      text-align: center;
      font-size: 26px;
    }
  }
  .dots-wrapper{
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    .dot{
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #eee;
      &.active{
        width: 20px;
        border-radius: 5px;
      }
    }
  }
  .btn-wrap{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button{
      margin: 0 10px;
      padding: 10px;
      color: #fff;
      border-radius: 4px;
      background-color: #666;
    }
  }
}
</style>