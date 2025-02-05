import request from '@/utils/request'

// 新闻列表
export function getNews(params) {
  return request({
    url: '/api/news/queryNews',
    method: 'get',
    params
  })
}
// 新闻详情
export function getNewsDetail(params) {
  return request({
    url: '/api/news/findDetail',
    method: 'get',
    params
  })
}

/** 获取专栏列表 */
export function getTabs(params) {
  return request({
    url: 'api/specialColumn/querySpecialColumnWeb',
    method: 'get',
    params
  })
}

