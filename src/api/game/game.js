import request from '@/utils/request'

// 完成游戏
export function finishGame() {
  return request({
    url: 'api/usersAchievements/obtainGameAchievement',
    method: 'post'
  })
}
