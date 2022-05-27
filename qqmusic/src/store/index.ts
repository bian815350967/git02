import { createStore } from 'vuex'

export default createStore({
  state: {
    musicboxShow: false,
    miniBoxShow: false,
    musicBg: {}
  },
  mutations: {
    SetMiniBoxShow(state, data) {
      state.miniBoxShow = data
    },
    SetMusicBoxShow(state, data) {
      state.musicboxShow = data
    },
    SetMusicBg(state, data) {
      state.musicBg = data
    }
  },
  actions: {
  },
  modules: {
  }
})
