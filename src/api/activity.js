import request from '@/utils/request'

export function getActivityList(params, data) {
  return request({
    url: 'api/activity/query',
    method: 'post',
    params,
    data
  })
}

export function getDetail(params) {
  return request({
    url: 'api/activity/detail',
    method: 'get',
    params
  })
}
export function getWorksList(params, data) {
  return request({
    url: 'api/activityWorks/query',
    method: 'post',
    params,
    data
  })
}
export function getWorksDetail(params) {
  return request({
    url: 'api/activityWorks/detail',
    method: 'get',
    params
  })
}

export function vote(data) {
  return request({
    url: 'api/vote',
    method: 'post',
    data
  })
}
