import request from '@/utils/request'

// 优秀校列表
export function getSchool(params) {
  return request({
    url: '/api/school/querySchoolBySchoolSpecialId',
    method: 'get',
    params
  })
}

// 优秀校详情
export function getSchoolDetail(data) {
  return request({
    url: 'api/school/querySchool?id=' + data.id,
    method: 'get',
    data
  })
}

export function getCategory(id) {
  return request({
    url: `/api/schoolSpecial/getSchoolSpecialByParentId?id=${id}`,
    method: 'get'
  })
}
