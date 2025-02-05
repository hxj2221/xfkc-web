import request from '@/utils/request'
// 保存课程
export function getMyClass() {
  return request({
    url: 'api/student/findDirectDept',
    method: 'get'
  })
}
// 获取学生
export function getStudent(params) {
  return request({
    url: '/api/student/queryMyClass',
    method: 'get',
    params
  })
}
