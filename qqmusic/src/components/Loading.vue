<template>
  <div class="loading-wrap">
    <div class="img-wrap">
      <loading></loading>
    </div>
    <span class="loading-text">{{loadingText}}</span>
  </div>
</template>

<script>
  import loading from '@/assets/img/loading.vue'
  export default {
    props: {
      loadingText: {
        type: String,
        default: '加载中...'
      }
    },
    components: {
      loading
    }
  }
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
.loading-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
  .img-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    animation: rotate360 1s linear infinite;
  }
  .loading-text {
    margin-top: 10px;
  }
}
</style>