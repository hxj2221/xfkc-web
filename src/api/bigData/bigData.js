import request from '@/utils/request'

export function getBigData(params) {
  return request({
    url: 'api/bigData/showBigData',
    method: 'get',
    params
  })
}

export function getIsAdmin(params) {
  return request({
    url: 'api/users/isAdmin',
    method: 'get',
    params
  })
}
