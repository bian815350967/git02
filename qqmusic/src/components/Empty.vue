<template>
  <div class="empty">
    <emptyIcon></emptyIcon>
    <span class="text">{{emptyString}}</span>
  </div>
</template>

<script>
  import emptyIcon from '@/assets/img/empty.vue'
  export default {
    props: {
      emptyString: {
        type: String,
        default: '暂无数据'
      }
    },
    components: {
      emptyIcon
    }
  }
</script>

<style lang="less" scoped>
.empty{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
  font-size: 30px;
  .text{
    color: #999;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>