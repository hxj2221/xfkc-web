import request from '@/utils/request'

// 分类 0 为一级类别 其他为二级类别
export function getSourceCategory(params) {
  return request({
    url: 'api/featureCategory/getByParentId',
    method: 'get',
    params
  })
}

// 根据二级分类查找专题列表
export function getCourseFeatureColumn(params) {
  return request({
    url: 'api/courseFeatureColumn/getByFeatureCategoryId',
    method: 'get',
    params
  })
}

// 根据二级专题id查看课程列表
export function getCourseFeatureQuery(params) {
  return request({
    url: 'api/courseFeature/query',
    method: 'get',
    params
  })
}

// 特色课程详情
export function getCourseFeatureDetail(params) {
  return request({
    url: 'api/courseFeature/detail',
    method: 'get',
    params
  })
}

// 特色课程专题排行
export function getGroupCourseFeatureColumn(params) {
  return request({
    url: 'api/courseFeatureColumn/viewRankingGroupCourseFeatureColumnId',
    method: 'get',
    params
  })
}

// 热点排行
export function getGroupCourse(params) {
  return request({
    url: 'api/courseFeature/viewRankingGroupCourse',
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
