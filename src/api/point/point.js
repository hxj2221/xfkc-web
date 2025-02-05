import request from '@/utils/request'

export function getPoint(params) {
  return request({
    url: 'api/exchangeableGoods/queryGoodsAll',
    method: 'get',
    params
  })
}

export function getMyPoint(params) {
  return request({
    url: 'api/exchangeableGoods/getPoints',
    method: 'get',
    params
  })
}

export function exchange(params) {
  return request({
    url: '/api/redeemOrder/submit',
    method: 'post',
    data: {
      type: params.type,
      exchangeableGoodsId: params.exchangeableGoodsId
    }
  })
}

export function getPointApi(params) {
  return request({
    url: 'api/userCredit/queryuserCreditRankingList',
    method: 'get',
    params
  })
}

export function getMyPointApi(params) {
  return request({
    url: 'api/userCredit/userCreditRanking',
    method: 'get',
    params
  })
}
