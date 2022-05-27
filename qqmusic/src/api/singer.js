import {get} from './base'

export const singer = () => {
  return get('/api/getSingerList')
}

export const singerDetails = (obj) => {
  return get('/api/getSingerDetail', obj)
}