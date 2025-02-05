import request from '@/utils/request'
// 挑战详情
export function getChallengeDetail(data) {
  return request({
    url: '/api/challenge/queryById?id=' + data.id + '&studentId=' + data.studentId,
    method: 'get',
    data
  })
}
// 获取评价列表
export function lookOverCommentList(data) {
  return request({
    url: '/api/comment/showAllComment',
    method: 'get',
    params: data
  })
}
// 获取某个上传资料的评论列表
export function getMaterialCommentList(data) {
  return request({
    url: '/api/comment/getByAssociationId',
    method: 'get',
    params: data
  })
}
// 发表评论
export function postAComment(data) {
  return request({
    url: '/api/comment',
    method: 'post',
    data: data
  })
}
// 上传挑战列表
export function uploadSuccessList(data) {
  return request({
    url: '/api/usersChallenges/getByChallengeId',
    method: 'get',
    params: data
  })
}
// 挑战报名
export function getPchallenge(params) {
  return request({
    url: 'api/usersChallenges',
    method: 'post',
    params
  })
}

// 资料上传
export function getUpload(params) {
  return request({
    url: 'api/usersChallenges/upload',
    method: 'post',
    data: {
      fileIntroduction: params.fileIntroduction,
      filePath: params.filePath,
      id: params.id
    }
  })
}

// 教师挑战管理1
export function getFindMyChallenge(params) {
  return request({
    url: 'api/challenge/findMyChallenge',
    method: 'get',
    params
  })
}

// 保存挑战
export function getChallenge(params) {
  return request({
    url: 'api/challenge',
    method: 'post',
    data: {
      achievementId: params.achievementId,
      challengeName: params.challengeName,
      completedCondition: params.completedCondition,
      introduction: params.introduction,
      picUrl: params.picUrl,
      rewardPoints: params.rewardPoints,
      checkPerson: params.checkPerson,
      endTime: params.endTime
    }
  })
}
// 老师查询成就列表
export function getList(params) {
  return request({
    url: 'api/achievement/list',
    method: 'get',
    params
  })
}
// 老师查询积分
export function getIntegralList(params) {
  return request({
    url: 'api/challengePointsRule/queryPoints',
    method: 'get',
    params
  })
}
// 发布
export function upPchallenge(params) {
  return request({
    url: 'api/challenge/submit',
    method: 'put',
    params
  })
}

// 修改挑战
export function saveChallenge(params) {
  return request({
    url: 'api/challenge',
    method: 'put',
    data: {
      id: params.id,
      achievementId: params.achievementId,
      challengeName: params.challengeName,
      completedCondition: params.completedCondition,
      introduction: params.introduction,
      picUrl: params.picUrl,
      rewardPoints: params.rewardPoints,
      checkPerson: params.checkPerson,
      endTime: params.endTime
    }
  })
}
// 删除挑战
export function delChallenge(data) {
  return request({
    url: 'api/challenge',
    method: 'delete',
    data
  })
}

// 挑战列表（待审核）
export function getChallengeList(params) {
  return request({
    url: 'api/usersChallenges/queryStudentsList',
    method: 'get',
    params
  })
}
// 查询我的挑战
export function myChallengeList(params) {
  return request({
    url: 'api/usersChallenges/queryMyJoinedAll',
    method: 'get',
    params
  })
}
// 通过
export function getPass(data) {
  return request({
    url: 'api/usersChallenges/pass',
    method: 'post',
    data
  })
}
// 驳回
export function getReject(data) {
  return request({
    url: 'api/usersChallenges/fail',
    method: 'post',
    data
  })
}
