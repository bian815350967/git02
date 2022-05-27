import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'

createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/img/loading.png'), // 加载时默认图片
  error: require('@/assets/img/loading.png')// 图片失败时默认图片
}).mount('#app')
