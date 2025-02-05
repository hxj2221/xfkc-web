<template>
  <div class="dashuju_box">
    <template v-if="canAccess">
      <grcrumbs />
      <div v-if="roleId === 1" class="header">
        <div class="header-top">
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfSchool !== undefined ? headerData.numberOfSchool : '-' }}</div>
            <div class="header-title">区学校总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfCoursesInDis !== undefined ? headerData.numberOfCoursesInDis : '-' }}</div>
            <div class="header-title">区课程资源总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfHardwareInDis !== undefined ? headerData.numberOfHardwareInDis : '-' }}</div>
            <div class="header-title">区实践资源总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfQualityCoursesInDis !== undefined ? headerData.numberOfQualityCoursesInDis : '-' }}</div>
            <div class="header-title">区精品课程总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfStudentsInDis !== undefined ? headerData.numberOfStudentsInDis : '-' }}</div>
            <div class="header-title">区学生总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfChallengeInDis !== undefined ? headerData.numberOfChallengeInDis : '-' }}</div>
            <div class="header-title">区发布挑战总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfStuFinishedChallengeInDis !== undefined ? headerData.numberOfStuFinishedChallengeInDis : '-' }}</div>
            <div class="header-title">区已完成挑战总数</div>
          </div>
        </div>
      </div>
      <div v-if="roleId === 3 || roleId === 4" class="header-xiao">
        <div class="header-top">
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfStudentsInSch !== undefined ? headerData.numberOfStudentsInSch : '-' }}</div>
            <div class="header-title">校学生总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfCoursesInSch !== undefined ? headerData.numberOfCoursesInSch : '-' }}</div>
            <div class="header-title">校课程资源总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfHardwareInSch !== undefined ? headerData.numberOfHardwareInSch : '-' }}</div>
            <div class="header-title">校实践资源总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfQualityCoursesInSch !== undefined ? headerData.numberOfQualityCoursesInSch : '-' }}</div>
            <div class="header-title">校精品课程总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfChallengeInSch !== undefined ? headerData.numberOfChallengeInSch : '-' }}</div>
            <div class="header-title">校发布挑战总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfStuFinishedChallengeInSch !== undefined ? headerData.numberOfStuFinishedChallengeInSch : '-' }}</div>
            <div class="header-title">校已完成挑战总数</div>
          </div>
        </div>
      </div>
      <!-- <div class="header-top">
          <div class="header-bottom-tab" />
          <div class="header-bottom-tab">
            <div v-if="headerData.numberOfStudentsInSch" class="header-value">{{ headerData.numberOfStudentsInSch }}</div>
            <div v-else class="header-value">0</div>
            <div class="header-title">校学生总数</div>
          </div>
          <div class="header-bottom-tab">
            <div v-if="headerData.numberOfStudentsInSch" class="header-value">{{ headerData.numberOfStudentsInSch }}</div>
            <div v-else class="header-value">0</div>
            <div class="header-title">校精品课总数</div>
          </div>
          <div class="header-bottom-tab">
            <div v-if="headerData.numberOfChallengeInSch" class="header-value">{{ headerData.numberOfChallengeInSch }}</div>
            <div v-else class="header-value">0</div>
            <div class="header-title">校发布挑战总数</div>
          </div>
          <div class="header-bottom-tab">
            <div v-if="headerData.numberOfCoursesInSch" class="header-value">{{ headerData.numberOfCoursesInSch }}</div>
            <div v-else class="header-value">0</div>
            <div class="header-title">校课程资源总数</div>
          </div>
          <div class="header-bottom-tab" />
        </div>
      </div> -->
      <!--
      <div v-if="isAdmin" class="header-xiao">
        <div class="header-top">
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfSchool !== undefined ? headerData.numberOfSchool : '-' }}</div>
            <div class="header-title">区下辖学校总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfStudentsInDis !== undefined ? headerData.numberOfStudentsInDis : '-' }}</div>
            <div class="header-title">区下辖学生总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfChallengeInDis !== undefined ? headerData.numberOfChallengeInDis : '-' }}</div>
            <div class="header-title">区发布挑战总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfStuFinishedChallengeInDis !== undefined ? headerData.numberOfStuFinishedChallengeInDis : '-' }}</div>
            <div class="header-title">区挑战完成人数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfQualityCoursesInDis !== undefined ? headerData.numberOfQualityCoursesInDis : '-' }}</div>
            <div class="header-title">区精品课总数</div>
          </div>
          <div class="header-top-tab">
            <div class="header-value">{{ headerData.numberOfCoursesInDis !== undefined ? headerData.numberOfCoursesInDis : '-' }}</div>
            <div class="header-title">区课程资源总数</div>
          </div>
        </div>
      </div> -->

      <div class="chart">
        <div class="chart-tab chart-posi" style="background: #E4F1D8;">
          <div class="chart-title">
            <el-image style="width: 16rpx;height: 16rpx;margin-right: 5px" :src="require('../../assets/bigData/charts3.png')" />
            <div>课程浏览量Top5</div>
          </div>
          <div id="myChart1" :style="{width: '100%', height: '200px'}" />
          <div v-if="top5CoursesViewedTitle.length === 0" class="noMessage">暂无数据</div>
        </div>
        <div class="chart-tab chart-posi" style="background: #E4F1D8;">
          <div class="chart-title">
            <el-image style="width: 16rpx;height: 16rpx;margin-right: 5px" :src="require('../../assets/bigData/charts2.png')" />
            <div>课程评分Top5</div>
          </div>
          <div id="myChart2" :style="{width: '100%', height: '200px'}" />
          <div v-if="top5CoursesScoreTitle.length === 0" class="noMessage">暂无数据</div>
        </div>
      </div>
      <div class="chart">
        <div class="chart-tab chart-posi" style="background: #FDFFE3;">
          <div class="chart-title">
            <el-image style="width: 16rpx;height: 16rpx;margin-right: 5px" :src="require('../../assets/bigData/charts1.png')" />
            <div>挑战量热度Top5</div>
          </div>
          <div id="myChart3" :style="{width: '100%', height: '200px'}" />
          <div v-if="top5ChallengesCompletedTitle.length === 0" class="noMessage">暂无数据</div>
        </div>
        <div class="chart-tab chart-posi" style="background: #A6D17F;">
          <div class="chart-title">
            <el-image style="width: 16rpx;height: 16rpx;margin-right: 5px" :src="require('../../assets/bigData/charts4.png')" />
            <div>受欢迎成就Top5</div>
          </div>
          <div id="myChart4" :style="{width: '100%', height: '200px'}" />
          <div v-if="top5AchievementReceivedTitle.length === 0" class="noMessage">暂无数据</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-access">
        <h3>您没有权限访问该页面</h3>
      </div>
    </template>
  </div>
</template>

<script>
import { getBigData, getIsAdmin } from '@/api/bigData/bigData'
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    grcrumbs
  },
  data() {
    return {
      headerData: {},
      isAdmin: false,
      top5CoursesViewedTitle: [],
      top5CoursesViewedValue: [],
      top5CoursesScoreTitle: [],
      top5CoursesScoreValue: [],
      top5ChallengesCompletedTitle: [],
      top5ChallengesCompletedValue: [],
      top5AchievementReceivedTitle: [],
      top5AchievementReceivedValue: [],
      roleId: 0
    }
  },
  computed: {
    ...mapGetters(['user']),
    canAccess() {
      const username = this.user.username || localStorage.getItem('touristUsername')
      return username !== 'admin445'
    }
  },
  created() {
    this.roleId = Number(this.$store.state.user.roleId)
    console.log(this.roleId)
    this.getHeaderData()
    this.getQueXiao()
  },
  methods: {
    getQueXiao() {
      getIsAdmin().then(res => {
        this.isAdmin = res
      })
    },
    getHeaderData() {
      getBigData().then(res => {
        // this.headerData = res

        for (const key in res) {
          if (Object.hasOwnProperty.call(res, key)) {
            this.headerData[key] = res[key] || 0
          }
        }

        this.top5CoursesViewedTitle = []
        this.top5CoursesViewedValue = []
        this.top5CoursesScoreTitle = []
        this.top5CoursesScoreValue = []
        this.top5ChallengesCompletedTitle = []
        this.top5ChallengesCompletedValue = []
        this.top5AchievementReceivedTitle = []
        this.top5AchievementReceivedValue = []
        // 浏览量前5的课程
        res.top5CoursesViewed.forEach(res => {
          this.top5CoursesViewedTitle.push(res.name)
          this.top5CoursesViewedValue.push(res.pageView)
        })
        // 评分前5的课程
        res.top5CoursesScore.forEach(res => {
          this.top5CoursesScoreTitle.push(res.name)
          this.top5CoursesScoreValue.push(res.totalPoints / res.scorePersonNumber)
        })
        // 挑战完成人数前5的挑战
        res.top5ChallengesCompleted.forEach(res => {
          this.top5ChallengesCompletedTitle.push(res.challengeName)
          this.top5ChallengesCompletedValue.push(res.numberOfPeople)
        })
        console.log(this.top5ChallengesCompletedTitle)
        // 被获得人数前5的成就
        res.top5AchievementReceived.forEach(res => {
          this.top5AchievementReceivedTitle.push(res.name)
          this.top5AchievementReceivedValue.push(res.numberOfPeople)
        })
        this.drawLine1()
        this.drawLine2()
        this.drawLine3()
        this.drawLine4()
      })
    },
    drawLine1() {
      const myChart = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      const dayDate = this.top5CoursesViewedTitle
      // console.log()
      const amountOfWithdrawal = this.top5CoursesViewedValue.map((item, index) => {
        const arr = [
          '#FE7D1F',
          '#6CCFF8',
          '#FFBF44'
        ]

        const newItem = {
          value: item,
          itemStyle: {}
        }

        if (index % 3 === 0) {
          newItem.itemStyle.color = arr[0]
        } else if (index % 3 === 1) {
          newItem.itemStyle.color = arr[1]
        } else if (index % 3 === 2) {
          newItem.itemStyle.color = arr[2]
        }

        return newItem
      })

      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '0',
          containLabel: true
        },

        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },

        yAxis: {
          type: 'category',
          data: dayDate.reverse()
        },

        series: [
          {
            name: '浏览量',
            type: 'bar',
            barWidth: 23,
            data: amountOfWithdrawal.reverse()
          }
        ]
      })
    },
    drawLine2() {
      const myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      const dayDate = this.top5CoursesScoreTitle
      // console.log()
      const amountOfWithdrawal = this.top5CoursesScoreValue.map((item, index) => {
        const arr = [
          '#FE7D1F',
          '#6CCFF8',
          '#FFBF44'
        ]

        const newItem = {
          value: item,
          itemStyle: {}
        }

        if (index % 3 === 0) {
          newItem.itemStyle.color = arr[0]
        } else if (index % 3 === 1) {
          newItem.itemStyle.color = arr[1]
        } else if (index % 3 === 2) {
          newItem.itemStyle.color = arr[2]
        }

        return newItem
      })

      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '0',
          containLabel: true
        },

        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },

        yAxis: {
          type: 'category',
          data: dayDate.reverse()
        },

        series: [
          {
            name: '评分',
            type: 'bar',
            barWidth: 23,
            data: amountOfWithdrawal.reverse()
          }
        ]
      })
    },
    drawLine3() {
      const myChart = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      const dayDate = this.top5ChallengesCompletedTitle
      // console.log()
      const amountOfWithdrawal = this.top5ChallengesCompletedValue.map((item, index) => {
        const arr = [
          '#FE7D1F',
          '#6CCFF8',
          '#FFBF44'
        ]

        const newItem = {
          value: item,
          itemStyle: {}
        }

        if (index % 3 === 0) {
          newItem.itemStyle.color = arr[0]
        } else if (index % 3 === 1) {
          newItem.itemStyle.color = arr[1]
        } else if (index % 3 === 2) {
          newItem.itemStyle.color = arr[2]
        }

        return newItem
      })

      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '0',
          containLabel: true
        },

        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },

        yAxis: {
          type: 'category',
          data: dayDate.reverse()
        },

        series: [
          {
            name: '挑战人数',
            type: 'bar',
            barWidth: 23,
            data: amountOfWithdrawal.reverse()
          }
        ]
      })
    },
    drawLine4() {
      const myChart = this.$echarts.init(document.getElementById('myChart4'))
      // 绘制图表
      const dayDate = this.top5AchievementReceivedTitle
      // console.log()
      const amountOfWithdrawal = this.top5AchievementReceivedValue.map((item, index) => {
        const arr = [
          '#FE7D1F',
          '#6CCFF8',
          '#FFBF44'
        ]

        const newItem = {
          value: item,
          itemStyle: {}
        }

        if (index % 3 === 0) {
          newItem.itemStyle.color = arr[0]
        } else if (index % 3 === 1) {
          newItem.itemStyle.color = arr[1]
        } else if (index % 3 === 2) {
          newItem.itemStyle.color = arr[2]
        }

        return newItem
      })

      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '0',
          containLabel: true
        },

        xAxis: {
          type: 'value'
        },

        yAxis: {
          type: 'category',
          data: dayDate.reverse()
        },

        series: [
          {
            name: '获得人数',
            type: 'bar',
            barWidth: 23,
            data: amountOfWithdrawal.reverse()
          }
        ]
      })
    }
  }
}
</script>

<style>
.dashuju_box{
  width: 1366px;
  margin: 0 auto 150px;
}
.dashuju{
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.chart{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
}
.chart-tab{
  border-radius: 15px;
  width: 48%;
  padding: 24px 30px;
}
.chart-title{
  display: flex;
  align-items: center;
  color: #311514;
  font-size: 15px;
}
.header{
  width: 80%;
  color: #311514;
  background-image: url(../../assets/bigData/header3.png);
  background-size: contain;
  /* background-size: cover; */
  margin: 40px auto 0;
}
.header-xiao{
  width: 80%;
  color: #311514;
  background-image: url(../../assets/bigData/header2.png);
  background-size: cover;
  margin: 40px auto 0;
}
.header-top{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.header-top-tab{
  padding: 50px 0 40px;
  width: 15%;
  text-align: center;
}
.header-bottom-tab{
  padding: 0 0 45px;
  width: 15%;
  text-align: center;
}
.header-title{
  font-size: 18px;
}
.header-value{
  font-family: 'lato';
  font-size: 38px;
  padding: 5px;
  font-weight: bold;
}
 .noMessage {
    position: absolute;
    left: 50%;
    top: 50%;
    color: #666666;
  }
  .chart-posi {
    position:relative;
  }
</style>
