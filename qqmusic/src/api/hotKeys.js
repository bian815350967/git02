import { get } from './base'

export const hotKeys = () => {
  return get('/api/getHotKeys')
}