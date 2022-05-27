
const registerHotKeys = require('./router/hot-key')
const registerRecommend = require('./router/recommend')
const registerSinger = require('./router/singer')
const registerRankList = require('./router/rank')
const registerAlbum = require('./router/album')
const registerSingerDetail = require('./router/singerDetails')

const registerSongsPureUrl = require('./router/song')
const registerLyric = require('./router/lyric')
const registerRankDetail = require('./router/rank-detail')
const registerSearch = require('./router/search')

//& 注册后端路由
function registerRouter(app) {
  registerHotKeys(app);

  registerRecommend(app);

  registerSinger(app);

  registerSingerDetail(app);

  registerRankList(app);

  registerAlbum(app);

  registerSongsPureUrl(app)

  registerLyric(app)

  registerRankDetail(app)

  registerSearch(app)
}

module.exports = registerRouter
