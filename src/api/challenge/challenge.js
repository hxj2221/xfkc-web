import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/challenge/active',
    method: 'get',
    params
  })
}

export function getAllList(params) {
  return request({
    url: 'api/challenge',
    method: 'get',
    params
  })
}
