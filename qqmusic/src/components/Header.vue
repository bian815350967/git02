<template>
  <div class="header">
    <div class="back" @click="goback">
      <back v-show="backShow"></back>
    </div>
    <div class="title" :class="{'detail-title': backShow}">{{title}}</div>
    <div class="right"></div>
  </div>
</template>

<script>
import back from '@/assets/img/back.vue'
export default {
  props: {
    backShow: {
      type: Boolean,
      default: false
    },
    back: {
      type: Function,
    },
    title: {
      type: String,
      default: 'Music'
    }
  },
  methods: {
    goback() {
      if (this.back) {
        this.back()
      } else if (this.backShow) {
        this.$router.go(-1)
      }
    }
  },
  components: {
    back
  }
}
</script>

<style lang="less" scoped>
.header{
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .back {
    padding: 10px;
    position: relative;
    z-index: 100;
    color: #fff;
  }
  .title {
    text-align: center;
    color: #000;
    font-weight: bold;
    &.detail-title{
      color: #fff;
    }
  }
  .right{
    width: 36px;
  }
}
</style>