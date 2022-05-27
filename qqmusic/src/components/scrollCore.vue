<template>
  <div class="core-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from '@better-scroll/core'

  export default {
    data () {
      return {
        emojis: []
      }
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.bs.destroy()
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.scroll, {
          probeType: 3,
          click: true
        })
        this.bs.on('scrollStart', () => {
          // console.log('scrollStart-')
        })
        this.bs.on('scroll', ({ y }) => {
          // console.log('scrolling-')
        })
        this.bs.on('scrollEnd', (pos) => {
          // console.log(pos)
        })
      },
      clickHandler (item) {
        // window.alert(item)
      }
    }
  }
</script>
