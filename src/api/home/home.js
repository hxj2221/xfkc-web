import request from '@/utils/request'

// 轮播图
export function getBanner(params) {
  return request({
    url: 'api/rotationPic/showRotationPic',
    method: 'get',
    params
  })
}

// 浮窗
export function getWindow() {
  return request({
    url: 'api/window/getWindow',
    method: 'get'
  })
}
