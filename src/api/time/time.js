import request from '@/utils/request'

export function timeline() {
  return request({
    url: '/api/message/queryTimeline',
    method: 'get'
  })
}
