import request from '@/utils/request'

export function getSourceCategory(params) {
  return request({
    url: 'api/sourceCategory/getByParentId',
    method: 'get',
    params
  })
}

export function getCourseSourceList(params) {
  return request({
    url: 'api/courseSourceColumn/getBySourceCategoryId',
    method: 'get',
    params
  })
}
// 资源详情
export function getCourseSourceDetail(params) {
  return request({
    url: 'api/courseSource/detail',
    method: 'get',
    params
  })
}
// 专题详情
export function getCourseSourceColumnDetail(params) {
  return request({
    url: 'api/courseSourceColumn/detail',
    method: 'get',
    params
  })
}
export function getCourseSourceColumnId(params) {
  return request({
    url: 'api/courseSource/getByCourseSourceColumnId',
    method: 'get',
    params
  })
}
// 内页列表
export function getCourseSourceColumnQuery(params) {
  return request({
    url: 'api/courseSourceColumn/query',
    method: 'get',
    params
  })
}

// 专题排行
export function getGroupCourseSourceColumn(params) {
  return request({
    url: 'api/courseSourceColumn/viewRankingGroupCourseSourceColumnId',
    method: 'get',
    params
  })
}

// 热点排行
export function getGroupCourse(params) {
  return request({
    url: 'api/courseSource/viewRankingGroupCourse',
    method: 'get',
    params
  })
}

// 相关推荐
export function getCourseSourceQuery(params) {
  return request({
    url: 'api/courseSource/query',
    method: 'get',
    params
  })
}
// 点赞、取消点赞
export function giveLike(data, type) {
  return request({
    url: 'api/giveLike',
    method: type,
    data
  })
}
// 收藏、取消收藏
export function giveCollect(data, type) {
  return request({
    url: 'api/giveCollect',
    method: type,
    data
  })
}
// 评分
export function giveScore(data) {
  return request({
    url: 'api/giveScore',
    method: 'post',
    data
  })
}
// 课程资源详情阅读记录积分
export function handleViewTime(code) {
  return request({
    url: `api/viewRecord/handleViewTime?code=${code}`,
    method: 'get'
  })
}
