<template>
  <Headers/>
  <Nav/>
  <router-view/>
  <Musicbox/>
</template>

<style lang="less">
@import url('./assets/css/reset');

</style>

<script>
import {hotKeys} from './api/hotKeys'
import Headers from './components/Header'
import Nav from './components/Nav.vue'
import Musicbox from './components/Musicbox.vue'

export default {
  created () {
    // hotKeys().then(res => {
    //   console.log(res);
    // })
  },
  components: {
    Musicbox,
    Headers,
    Nav
  }
}
</script>
