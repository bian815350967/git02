<template>
  <div class="details-home">
    <DetailCom></DetailCom>
    <SongListCom :songList="songList"></SongListCom>
  </div>
</template>

<script>
  import DetailCom from '@/views/Details/DetailCom.vue'
  import SongListCom from '@/components/SongList.vue'
  import {singerDetails} from '@/api/singer'
  export default {
    data() {
      return {
        songList: []
      }
    },
    created() {
      this.getAlbum();
    },
    methods: {
      async getAlbum() {
        const id = this.$route.params.id
        const res = await singerDetails({mid: id});
        console.log(res);
        if (res.code === 0) {
          this.songList = res.result.songs
        }
      }
    },
    components: {
      DetailCom,
      SongListCom
    }
  }
</script>

<style lang="less" scoped>
.details-home{
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
}
</style>