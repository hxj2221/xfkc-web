import request from '@/utils/request'

export function getAchive(params) {
  return request({
    url: 'api/achievement/queryAllAchievements',
    method: 'get',
    params
  })
}

export function getDetail(params) {
  return request({
    url: 'api/achievement/findById',
    method: 'get',
    params
  })
}

export function getUser(params) {
  return request({
    url: 'api/achievement/userList',
    method: 'get',
    params
  })
}

export function getacList(params) {
  return request({
    url: 'api/achievement/list',
    method: 'get',
    params
  })
}
// 我的已完成成就
export function myacList(params) {
  return request({
    url: 'api/achievement/queryMyAchievements',
    method: 'get',
    params
  })
}
