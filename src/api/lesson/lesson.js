import request from '@/utils/request'
// 保存课程
export function senLesson(data) {
  return request({
    url: '/api/courseTitle',
    method: 'post',
    data
  })
}
// 修改课程
export function updateLesson(data) {
  return request({
    url: '/api/courseTitle',
    method: 'put',
    data
  })
}
// 删除课程
export function deleteLesson(data) {
  return request({
    url: '/api/courseTitle',
    method: 'delete',
    data
  })
}
// 公开课程
export function publicLesson(params) {
  return request({
    url: 'api/courseTitle/makePublic',
    method: 'put',
    params
  })
}
// 获得班级 获得科目
export function getgrade(params) {
  return request({
    url: '/api/courseCategory/findByCategory',
    method: 'get',
    params
  })
}
// 获得课程详情数据
export function geDetail(params) {
  return request({
    url: 'api/courseTitle/findById',
    method: 'get',
    params
  })
}
// export function updateVideo(data) {
//   return request({
//     url: 'api/course',
//     method: 'post',
//     data
//   })
// }
// 管理课程列表
export function admLesson(params) {
  return request({
    url: '/api/courseTitle/queryMyUploadCourse',
    method: 'get',
    params
  })
}
// 申请加精
export function apply(params) {
  return request({
    url: 'api/courseTitle/applyQualityCourse',
    method: 'put',
    params
  })
}
// 下架
export function offShelf(params) {
  return request({
    url: 'api/courseTitle/offShelf',
    method: 'put',
    params
  })
}
// 课程视频详情
export function getVideo(params) {
  return request({
    url: 'api/courseTitle/findById',
    method: 'get',
    params
  })
}
// 发布课程笔记
export function setNote(data) {
  return request({
    url: 'api/courseNotes ',
    method: 'post',
    data
  })
}
// 获取课程笔记
export function getNote(params) {
  return request({
    url: 'api/courseNotes/queryHistory',
    method: 'get',
    params
  })
}
// 课程评分
export function setScore(data) {
  return request({
    url: 'api/courseScore',
    method: 'post',
    data
  })
}
// 发布评论
export function sentComment(data) {
  return request({
    url: 'api/comment',
    method: 'post',
    data
  })
}

// 获得一级评论
export function getAllComment(params) {
  return request({
    url: '/api/comment/showAllComment',
    method: 'get',
    params
  })
}

// 获得二级评论
export function getUserComment(params) {
  return request({
    url: '/api/comment/getSubComments',
    method: 'get',
    params
  })
}

// 获得评论
export function getComment(params) {
  return request({
    url: 'api/comment/showCourseComment',
    method: 'get',
    params
  })
}
// 热点排行
export function queryQualityViewRank(params) {
  return request({
    url: 'api/courseTitle/queryQualityViewRank',
    method: 'get',
    params
  })
}
// 图文动态
export function queryQualityCoursesNew(params) {
  return request({
                   url: 'api/courseTitle/queryQualityCoursesNew',
                   method: 'get',
                   params
                 })
}
// 课程列表
export function getLessonList(params) {
  return request({
    url: 'api/courseTitle/queryQualityCourses',
    method: 'get',
    params
  })
}
export function getLessonListNew(params) {
  return request({
    url: 'api/courseTitle/queryQualityCoursesNew',
    method: 'get',
    params
  })
}
export function getLessonLists(params) {
  return request({
                   url: 'api/courseTitle/queryCourseTitleRes',
                   method: 'get',
                   params
                 })
}
// 资源库列表
export function getLib(params) {
  return request({
    url: 'api/courseTitle/querySchoolCourses',
    method: 'get',
    params
  })
}
// 记录视频进度
export function recordProcess(data) {
  return request({
    url: 'api/usersCourses/recordWatchingTime',
    method: 'post',
    data
  })
}
// 查看是否观看过视频
export function judgeVideo(data) {
  return request({
    url: 'api/usersCourses/readWatchingTime',
    method: 'post',
    data
  })
}
// 查看我的课程
export function getMyLesson(params) {
  return request({
    url: 'api/courseTitle/queryMyWatchedCourses',
    method: 'get',
    params
  })
}
// 查看硬件资源库
export function getHardLib(params) {
  return request({
    url: 'api/hardware',
    method: 'get',
    params
  })
}
// 预约硬件资源库
export function getAppointment(data) {
  return request({
    url: 'api/hardwareReserve',
    method: 'post',
    data
  })
}
// 查看硬件资源库详情
export function getHardDetail(params) {
  return request({
    url: 'api/hardware/findById',
    method: 'get',
    params
  })
}
// 获取表情包列表
export function getMoji(params) {
  return request({
    url: 'api/emojiDiy',
    method: 'get',
    params
  })
}

// 视频点击播放获取code
export function getCode(data) {
  return request({
    url: `api/viewRecord`,
    method: 'post',
    data
  })
}
