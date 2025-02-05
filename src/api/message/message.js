import request from '@/utils/request'
// 消息列表
export function getMessage(params) {
  return request({
    url: '/api/message/queryUserMessage',
    method: 'get',
    params
  })
}

// 消息删除
export function delMessage(data) {
  return request({
    url: '/api/message',
    method: 'delete',
    data
  })
}
