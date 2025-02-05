import request from '@/utils/request'

// 搜索
export function getSearchListApi(params) {
  return request({
    url: 'api/videoSearch/search',
    method: 'get',
    params
  })
}

// 新增全站搜索API
export function getSearchAllApi(params) {
  return request({
    url: 'api/videoSearch/searchAll',
    method: 'get',
    params
  })
}
