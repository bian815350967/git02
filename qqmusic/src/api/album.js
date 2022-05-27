import {get} from './base'

export const album = (id) => {
  return get('/api/getAlbum', {id: id})
}