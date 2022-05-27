import {get} from './base'

export const recommend = () => {
  return get('/api/getRecommend')
}