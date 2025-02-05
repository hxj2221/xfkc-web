import request from '@/utils/request'

export function binding() {
  return request({
    url: '/api/student/bind',
    method: 'post'
  })
}

export function login(username, password, code, uuid, noCode) {
  const codeparam = noCode ? '?no_code=1' : ''

  return request({
    url: `auth/login${codeparam}`,
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function loginCode(code, appId) {
  return request({
    url: `auth/login`,
    method: 'post',
    data: {
      code,
      appid: appId,
      password: 'tqwQS9yGe0qaEdj3qZF1CHAnWnbkwQerRzMsnneICEPh/uIRcHSH5j0TfXFz7XgrGCeZf3qpVgTFAi0Evn4hhg=='
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}

export function schoolList(params) {
  return request({
    url: 'api/dept/findSchoolListByLevel',
    method: 'get',
    params
  })
}

export function selectShool(params) {
  return request({
    url: 'api/users/queryAccount',
    method: 'get',
    params
  })
}

export function getPasswordRemind() {
  return request({
    url: 'api/users/getPasswordRemind',
    method: 'get'
  })
}
