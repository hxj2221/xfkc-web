<template>
  <div class="grhome-body">
    <div class="banner">

      <div ref="swiper" class="swiper-container">
        <div class="swiper-wrapper" style="margin-bottom: 10px">
          <div v-for="(item, index) in imgUrls" :key="index" class="swiper-slide">
            <!-- <img :src="$comm.url(item.picUrl)"> -->
            <template v-if="item.hyperlink">
              <div class="slide-bg" :style="{backgroundImage: `url(${$comm.url(item.picUrl)})`}" @click="gourlpage(item.hyperlink)" />
            </template>
            <template v-else>
              <div class="slide-bg" :style="{backgroundImage: `url(${$comm.url(item.picUrl)})`}" />
            </template>

          </div>
        </div>
        <div class="swiper-pagination" />
      </div>

      <!-- <el-carousel height="525px" class="grhome-swiper">
        <el-carousel-item v-for="(item, index) in imgUrls" :key="index">

          <template v-if="item.hyperlink">
            <a :href="item.hyperlink" target="_blank" rel="noopener noreferrer">
              <img class="swiper-img" :src="$comm.url(item.picUrl)" alt>
            </a>
          </template>
          <template v-else>
            <img class="swiper-img" :src="$comm.url(item.picUrl)" alt>
          </template>

        </el-carousel-item>
      </el-carousel> -->
    </div>

    <div class="box">
      <div class="grhome">
        <div class="disp">
          <div class="box_left">

            <div v-if="roleId === 2" class="card">
              <div class="student-title">
                <div class="txt lato" :class="{active: check === 1}" @click="check1">
                  我的课程
                </div>
                <div class="txt lato" :class="{active: check === 2}" @click="check2">
                  我的挑战
                </div>
                <div class="txt lato" :class="{active: check === 3}" @click="check3">
                  我的成就
                </div>
              </div>
              <div
                v-if="LtotalElements === 0"
                v-show="NO1 == 1"
                class="box_0001"
              >
                <img src="../assets/home/child.png" alt="">
                <span class="lato">你还没有学习过课程，请先去选择一门课程开始学习吧！</span>
              </div>
              <div
                v-if="CtotalElements === 0"
                v-show="NO2 == 1"
                class="box_0001"
              >
                <img src="../assets/home/child.png" alt="">
                <span class="lato">你还没有参与挑战呢，请先参与挑战！</span>
              </div>
              <div
                v-if="ACtotalElements === 0"
                v-show="NO3 == 1"
                class="box_0001"
              >
                <img src="../assets/home/child.png" alt="">
                <span class="lato">你还没有获得成就呢，请先去获得成就！</span>
              </div>
              <div v-if="LtotalElements!== 0 && NO1 == 1" class="macenter">
                <el-row :gutter="22">
                  <el-col
                    v-for="(item, index) in mylessonList"
                    :key="index"
                    :span="8"
                  >
                    <div
                      v-if="index < 3"
                      class="pinjie"
                      @click="gotolessonid(item)"
                    >
                      <img
                        class="grone"
                        :style="{
                          backgroundImage:
                            'url(' + $comm.url(item.coverImage) + ')',
                        }"
                        src="../assets/home/grone.png"
                        alt
                      >
                      <div class="grtwo">
                        <div class="mgl_1">{{ item.name }}</div>
                        <div class="grtwo_txt">
                          <img
                            class="mgl_2"
                            :src="require('@/assets/home/schoolicon.png')"
                            alt
                          >
                          <div class="mgl_3">{{ item.schoolName }}</div>
                          <div class="mgl_4">{{ item.authorName }}</div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-if="CtotalElements !== 0 && NO2 == 1" class="macenter" style="margin-top: 0">
                <el-row :gutter="22">
                  <el-col
                    v-for="(item, index) in mychallengeList"
                    :key="index"
                    :span="8"
                  >
                    <div
                      v-if="index < 3"
                      class="challengebox"
                      style="margin-top: 20px"
                      @click="gotochallengeid1(item)"
                    >
                      <div class="challengebox1">
                        <!-- <img class="challenge_img" :src="baseApi + '/file/' + item.challenge.picUrl" alt=""> -->
                        <div
                          class="challenge_img"
                          :style="{
                            backgroundImage:
                              'url(' +
                              $comm.url(item.challenge.picUrl)
                              +
                              ')',
                          }"
                        />
                        <!-- .replace(/\\/, '/') -->
                        <div class="integral">
                          <img src="../assets/home/cup.png" alt>
                          <div>{{ item.rewardPoints }}积分</div>
                        </div>
                      </div>
                      <div class="challengebox2">
                        <div class="challenge_title">
                          {{ item.challengeName }}
                        </div>
                        <!-- <div class="challenge_time1">{{item.endTime}}</div> -->
                        <div class="timetag">
                          <img src="../assets/home/timeicon.png" alt>
                          <div>截止时间</div>
                        </div>
                        <div class="challenge_time2">{{ item.endTime }}</div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-if="ACtotalElements !== 0 && NO3 == 1" class="macenter">
                <el-row :gutter="22">
                  <el-col
                    v-for="(item, index) in myacalist"
                    :key="index"
                    :span="8"
                  >
                    <div
                      v-if="index < 3"
                      class="pinjie"
                      @click="gotoacid(item)"
                    >
                      <img
                        class="grone"
                        :style="{
                          backgroundImage:
                            'url(' + $comm.url(item.badgeUrl) + ')',
                        }"
                        src="../assets/home/grone.png"
                        alt
                      >
                      <div class="grtwo">
                        <div class="mgl_1">{{ item.name }}</div>
                        <div class="grtwo_txt">
                          <img
                            class="mgl_22"
                            src="../assets/achievement/sun.png"
                            alt
                          >
                          <div class="mgl_3">
                            已有{{ item.numberOfPeople }}人完成
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>

            <!-- 大数据 -->
            <div v-if="roleId === 1 || roleId === 3 || roleId ===4 ">
              <div class="moreData">
                <div class="teacher-title">
                  <img src="../assets/nav/two.png" alt>
                  <div class="title">幸福课程大数据</div>
                </div>
                <div class="more" style="display:flex;margin-right:32px">
                  <router-link
                    :to="{ path: '/grbigData/grbigData' }"
                  >查看更多</router-link>
                  <div class="ball">&gt;</div>
                </div>
              </div>
              <div class="teacher-data">
                <div v-if="roleId === 1" class="content-title">
                  <div class="flex">
                    <div class="num">{{ bigData.numberOfSchool }}</div>
                    <div class="text">区学校总数</div>
                  </div>
                  <div class="flex">
                    <div class="num">{{ bigData.numberOfCoursesInDis }}</div>
                    <div class="text">区课程资源总数</div>
                  </div>
                  <div class="flex">
                    <div class="num">{{ bigData.numberOfHardwareInDis }}</div>
                    <div class="text">区实践资源总数</div>
                  </div>
                  <div class="flex">
                    <div class="num">{{ bigData.numberOfQualityCoursesInDis }}</div>
                    <div class="text">区精品课程总数</div>
                  </div>
                </div>
                <div v-if="roleId === 4 || roleId === 3" class="content-title">
                  <div class="flex">
                    <div class="num">{{ bigData.numberOfStudentsInSch }}</div>
                    <div class="text">校学生总数</div>
                  </div>
                  <div class="flex">
                    <div class="num">{{ bigData.numberOfCoursesInSch }}</div>
                    <div class="text">校课程资源总数</div>
                  </div>
                  <div class="flex">
                    <div class="num">{{ bigData.numberOfHardwareInSch }}</div>
                    <div class="text">校实践资源总数</div>
                  </div>
                  <div class="flex">
                    <div class="num">{{ bigData.numberOfQualityCoursesInSch }}</div>
                    <div class="text">校精品课程总数</div>
                  </div>
                </div>
                <div class="content-bottom">
                  <div class="content-flex" style="position:relative">
                    <div class="title">
                      <img class="content-img" src="../assets/bigData/charts3.png">课程浏览量Top5</div>
                    <div id="myChart1" :style="{width: '100%', height: '200px'}" />
                    <div v-if="top5CoursesViewedTitle.length === 0" class="noMessage">暂无数据</div>
                  </div>
                  <div class="content-flex" style="position:relative">
                    <div class="title">
                      <img class="content-img" src="../assets/bigData/charts1.png">挑战量热度Top5</div>
                    <div id="myChart3" :style="{width: '100%', height: '200px'}" />
                    <div v-if="top5ChallengeTitle.length === 0" class="noMessage">暂无数据</div>
                  </div>
                </div>
              </div>
              <!-- <div style="background:pink;width:100%;height:218px;margin-top:20px;border-radius:20px" /> -->
            </div>

            <!-- 占位宣传图 -->
            <div v-if="roleId === 6" class="card_dashuju">
              <div class="zanshide">幸福课程</div>
              <div class="sub-banner-bg">亲爱的游客，您好，登录后可查看。</div>
            </div>

            <div class="cardbanner">
              <template v-if="bannerPic">
                <a :href="bannerUrl" target="_blank">
                  <!-- <img v-if="bannerPic" :src="$comm.url(bannerPic)" alt> -->
                  <el-image
                    class="banner2"
                    :src="$comm.url(bannerPic)"
                    fit="cover"
                  />
                </a>
              </template>
              <template v-else>
                <!-- <img src="../assets/achievement/sun.png" alt> -->
                <el-image
                  class="banner2"
                  :src="$comm.url(bannerPic)"
                  fit="cover"
                />
              </template>

            </div>
          </div>
          <div class="box_right_y">
            <div class="box_right_x">
              <!-- <el-image class="childm" :src="require('../assets/home/boy.png')" alt /> -->
              <!-- <div class="news">课程动态</div> -->
              <div class="more">
                <router-link
                  :to="{ path: '/grnews/grnews' }"
                >查看更多</router-link>
              </div>
              <div class="ball">&gt;</div>
            </div>

            <div v-for="(item,index) in newNewsList" :key="index">
              <div
                class="top1"
                @click="xinwen1(item.id)"
              >
                <el-image
                  class="newbg"
                  :src="$comm.url(item.pic)"
                  fit="cover"
                />
                <div class="tag1">TOP{{ index +1 }}</div>
              </div>
              <div class="txt_2" @click="xinwen1(item.id)">
                {{ item.title }}
              </div>
            </div>

          </div>
        </div>
        <!-- 资源库 -->
        <div class="library">
          <img
            class="library1"
            src="../assets/home/library1.png"
            alt
            @click="library1"
          >
          <img
            class="library2"
            src="../assets/home/library2.png"
            alt
            @click="library2"
          >
        </div>
        <div class="right1">
          <div style="height: 49px" />
          <div class="right2">
            <el-row :gutter="22">
              <el-col
                v-for="(item, index) in lessonList"
                :key="index"
                :span="8"
              >
                <div
                  v-if="index < 6"
                  class="pinjie1"
                  @click="gotolessonid(item)"
                >
                  <img
                    class="grone1"
                    src="../assets/home/grone1.png"
                    :style="{
                      backgroundImage:
                        'url(' + $comm.url(item.coverImage) + ')',
                    }"
                    alt
                  >

                  <img
                    class="elite"
                    :src="require('@/assets/lesson/excellentCourses.png')"
                    alt
                  >
                  <div class="grtwo">
                    <div class="mgl_1">{{ item.name }}</div>
                    <div class="grtwo_txt">
                      <img
                        class="mgl_2"
                        :src="require('@/assets/home/schoolicon.png')"
                        alt
                      >
                      <div class="mgl_3">{{ item.schoolName }}</div>
                      <div class="mgl_4">{{ item.authorName }}</div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <img class="lesson" src="../assets/home/lesson.png" alt>
            <div class="more2" @click="goToLessonList">
              <img src="../assets/home/more.png" alt>
            </div>
          </div>
        </div>
        <!-- <div class="left"> -->
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="left_btn">
              <img src="../assets/home/challenge.png" alt>
              <router-link :to="{ path: '/challenge/grchallengecenter' }">
                <img class="more3" src="../assets/home/more.png" alt>
              </router-link>
            </div>
          </el-col>
          <el-col v-for="(item, index) in challengeList" :key="index" :span="6">
            <div
              v-if="index < 3"
              class="challengebox"
              style="margin-top: 120px"
              @click="gotochallengeid(item)"
            >
              <div class="challengebox1">
                <div
                  class="challenge_img"
                  :style="{
                    backgroundImage:
                      'url(' + $comm.url(item.picUrl) + ')',
                  }"
                />
                <div class="integral">
                  <img src="../assets/home/cup.png" alt>
                  <div>{{ item.rewardPoints }}积分</div>
                </div>
              </div>
              <div class="challengebox2">
                <div class="challenge_title">{{ item.challengeName }}</div>
                <!-- <div class="challenge_time1">{{challengeList[0].endTime}}</div> -->
                <div class="timetag">
                  <img src="../assets/home/timeicon.png" alt>
                  <div>截止时间</div>
                </div>
                <div class="challenge_time2">{{ item.endTime }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- </div> -->
        <div class="school">
          <img class="schoolname" src="../assets/home/schoolname.png" alt>
          <div class="schoolimg">
            <div class="schoolimg1" @click="goToClass(0)">
              <div class="school-text">基地校：启良中学</div>
            </div>
            <div class="schoolimg2" @click="goToClass(1)">
              <div class="school-text2">领衔校：上外嘉外</div>
            </div>
            <div class="schoolimg1" @click="goToClass(3)">
              <div class="school-text">重点校：中光高中</div>
            </div>
            <div class="schoolimg2" @click="goToClass(2)">
              <div class="school-text2">一般项目校</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getBigData } from '@/api/bigData/bigData'
import { getBanner } from '@/api/home/home'
import { getNews } from '@/api/news/news'
import { getList } from '@/api/challenge/challenge'
import { getLessonList, getMyLesson } from '@/api/lesson/lesson'
import { getAchive, myacList } from '@/api/achievement/achievement'
import { myChallengeList } from '@/api/challenge/challengeDetail'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  data() {
    return {
      bigData: {
        numberOfSchool: 0,
        numberOfCoursesInDis: 0,
        numberOfHardwareInDis: 0,
        numberOfQualityCoursesInDis: 0,
        numberOfStudentsInSch: 0,
        numberOfCoursesInSch: 0,
        numberOfHardwareInSch: 0,
        numberOfQualityCoursesInSch: 0
      },
      myacalist: [],
      mylessonList: [],
      mychallengeList: [],
      check: 1,
      imgUrls: [],
      newsList: [],
      challengeList: [],
      lessonList: [],
      achievementList: [],
      NO1: 1,
      NO2: 0,
      NO3: 0,
      clb: 1,
      bannerPic: '',
      bannerUrl: '',
      roleId: 0,
      coverImage: '',
      newsList1: [],
      picUrl: '',
      title: '',
      LtotalElements: '',
      CtotalElements: '',
      ACtotalElements: '',
      top5CoursesViewedTitle: [],
      top5CoursesViewedValue: [],
      top5ChallengeTitle: [],
      top5ChallengeValue: [],
      swiperIntance: null
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi']),
    headers() {
      return {
        Authorization: getToken()
      }
    },
    newNewsList() {
      let newsArr = [...(this.newsList.length > 0 ? [this.newsList[0]] : []), ...this.newsList1]
      if (this.$store.getters.roleID === 1) {
        newsArr = [...this.newsList]
      }
      return newsArr.slice(0, 3)
    }
  },
  created() {
    this.roleId = Number(this.$store.state.user.roleId)
    this.getBanner()
    this.getBanner1()
    this.myChallengeList()
    this.getNews()
    this.getList()
    this.getLessonList()
    this.getAchive()
    this.getMyLesson()
    this.myacList()
    if (this.roleId === 1 || this.roleId === 3 || this.roleId === 4) {
      this.getDataList()
    }
  },
  methods: {
    createSwiper() {
      this.swiperIntance = new Swiper(this.$refs.swiper, {
        slidesPerView: 'auto',
        autoplay: {
          delay: 10000 // 10秒切换一次
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    getDataList() {
      getBigData().then(res => {
        this.bigData = res
        this.bigData.numberOfSchool = res.numberOfSchool || 0
        this.bigData.numberOfCoursesInDis = res.numberOfCoursesInDis || 0
        this.bigData.numberOfHardwareInDis = res.numberOfHardwareInDis || 0
        this.bigData.numberOfQualityCoursesInDis = res.numberOfQualityCoursesInDis || 0

        this.top5CoursesViewedTitle = []
        this.top5CoursesViewedValue = []
        this.top5ChallengeTitle = []
        this.top5ChallengeValue = []
        // 浏览量前5的课程
        res.top5CoursesViewed.forEach(item => {
          if (item.pageView) {
            this.top5CoursesViewedTitle.push(item.name)
            this.top5CoursesViewedValue.push(item.pageView)
          }
        })
        // 挑战完成人数前5的挑战
        res.top5ChallengesCompleted.forEach(item => {
          if (item.numberOfPeople) {
            this.top5ChallengeTitle.push(item.challengeName)
            this.top5ChallengeValue.push(item.numberOfPeople)
          }
        })
        // 管理员和老师可以看大数据
        const viewData = [1, 3, 4]
        if (viewData.includes(this.$store.getters.roleID)) {
          this.drawLine1()
          this.drawLine3()
        }
      })
    },
    // 课程浏览量柱状图
    drawLine1() {
      const myChart = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      const dayDate = this.top5CoursesViewedTitle
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
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dayDate,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            formatter: function(params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = 4
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }

          }

          // boundaryGap: [0, 0.01]
        },

        yAxis: {
          type: 'value'
          // data: dayDate.reverse()
        },

        series: [
          {
            name: '浏览量',
            type: 'bar',
            barWidth: 23,
            data: amountOfWithdrawal
          }
        ]
      })
    },
    // 挑战量热度柱状图
    drawLine3() {
      const myChart = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      const dayDate = this.top5ChallengeTitle
      const amountOfWithdrawal = this.top5ChallengeValue.map((item, index) => {
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
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dayDate,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            formatter: function(params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = 4
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }

          }

          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'value'
          // data: dayDate.reverse()
        },
        series: [
          {
            name: '挑战量',
            type: 'bar',
            barWidth: 23,
            data: amountOfWithdrawal
          }
        ]
      })
    },
    imgUrl(item) {
      window.location.href = item
    },
    xinwen1(id) {
      this.getNews()
      this.$router.push({ path: 'grnews/grnewsDetail?id=' + id })
    },
    myacList() {
      const params = {}
      myacList(params).then((res) => {
        this.myacalist = res.content
        this.ACtotalElements = res.totalElements
      })
    },
    timeFormat(timestamp) {
      function add0(m) {
        return m < 10 ? '0' + m : m
      }
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return (
        year +
        '-' +
        add0(month) +
        '-' +
        add0(date) +
        ' ' +
        add0(hours) +
        ':' +
        add0(minutes) +
        ':' +
        add0(seconds)
      )
    },
    gotolessonid(item) {
      this.$router.push({ path: 'grlesson/grlessondetail?id=' + item.id })
    },
    gotochallengeid(item) {
      this.$router.push({ path: 'grDataUpload/grDataUpload?id=' + item.id })
    },
    gotochallengeid1(item) {
      this.$router.push({
        path: 'grDataUpload/grDataUpload?id=' + item.challenge.id
      })
    },

    gotoacid(item) {
      this.$router.push({
        path: 'grachievement/grachievedetail?id=' + item.id
      })
    },
    // 我的课程
    getMyLesson() {
      const params = {}
      getMyLesson(params).then((res) => {
        this.mylessonList = res.content
        this.LtotalElements = res.totalElements
      })
    },
    // 我的挑战
    myChallengeList() {
      const params = {}
      myChallengeList(params).then((res) => {
        this.mychallengeList = res.content
        this.CtotalElements = res.totalElements
        res.content.forEach((i) => {
          i.endTime = this.timeFormat(i.endTime)
        })
      })
    },
    // 轮播
    getBanner() {
      const params = {
        type: 1,
        pcPhone: 1
      }
      getBanner(params).then((res) => {
        this.imgUrls = res
        this.$nextTick(() => {
          this.createSwiper()
        })
      })
    },
    getBanner1() {
      const params = {
        type: 2,
        pcPhone: 1
      }
      getBanner(params).then((res) => {
        console.log(res)
        if (res[0]) {
          this.bannerPic = res[0].picUrl
          this.bannerUrl = res[0].hyperlink
        }
      })
    },
    // 新闻
    getNews() {
      const params = {
        type: 1,
        sort: 'id,desc'
      }
      getNews(params).then((res) => {
        this.newsList = res.content || []
      })
      const params2 = {
        type: 2,
        sort: 'id,desc'
      }
      getNews(params2).then((res) => {
        this.newsList1 = res.content || []
      })
    },
    // 挑战中心
    getList() {
      const params = {
        type: 1,
        sort: 'id,desc'
      }
      getList(params).then((res) => {
        this.challengeList = res.content
        res.content.forEach((i) => {
          i.endTime = this.timeFormat(i.endTime)
        })
      })
    },
    gotochallenge() {
      this.$router.push({ path: 'challenge/index' })
    },
    // 精品课
    getLessonList() {
      const params = {
        type: 1
      }
      getLessonList(params).then((res) => {
        this.lessonList = res.content
      })
    },
    goSchool() {
      this.$router.push({ path: 'school/school' })
    },
    // 我的成就
    getAchive() {
      const params = {
        type: 1
      }
      getAchive(params).then((res) => {
        this.achievementList = res.content
      })
    },
    check1() {
      this.check = 1
      this.NO1 = 1
      this.NO2 = 0
      this.NO3 = 0
    },
    check2() {
      this.check = 2
      this.NO2 = 1
      this.NO1 = 0
      this.NO3 = 0
    },
    check3() {
      this.check = 3
      this.NO3 = 1
      this.NO1 = 0
      this.NO2 = 0
    },
    goToClass(val) {
      this.$router.push({ path: '/grschool/grschool?id=' + val })
    },
    library1() {
      this.$router.push({ path: '/grlessonLibrary/grlessonLibrary' })
    },
    library2() {
      this.$router.push({ path: '/grhardware/grhardware' })
    },
    goToLessonList() {
      this.$router.push({ path: '/grlesson/grlessonlist' })
    },

    gourlpage(url) {
      location.href = url
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$swiperHeight: 420px;
.grhome-body{
  padding-bottom: $swiperHeight;
}

.grhome {
  width: 1366px;
  margin: 0 auto;
}

.grhome-swiper{
  width: 1366px;
  margin: auto;
}

.banner {
  /* background-image: url("../assets/home/homebanner.jpg"); */
  /* background-repeat: no-repeat;
  background-size: 1920px 668px;
  width: 100%;
  height: 668px; */
  // background: #e4f8d3;
}

.swiper-img{
  width: 1366px;
  height: 525px;
  border-radius: 10px;
  overflow: hidden;
}

.banner img {
  background-repeat: no-repeat;
  width: 100%;
  height: 525px;
  background-size: 100% 525px;
  /* // border-bottom-left-radius: 30%;
  // border-bottom-right-radius: 30%; */
}
/deep/ .el-carousel__item {
  border: 1px solid #fff;
  img {
    position: relative;
    width: calc(100% + 2px);
    left: -1px;
    top: -1px;
  }
}
.box {
  z-index: 50;
  position: relative;
  padding-top: 100px;
  background-image: url("../assets/home/grbg_n.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position-y: -245px;
  display: flex;
  top: 420px;

  .student-title,.teacher-title {
    display: flex;
    align-items: center;

    margin-bottom: 18px;
    margin-top: 22px;
    img {
      vertical-align: bottom;
    }
    .title {
      font-size: 24px;
      color: #2d8614;
      margin-left: 5px;
    }
  }

  .student-title{
    justify-content: center;
  }
  .student-data {
    width: 1003px;
    height: 345px;
    text-align: center;
    background-color: #e4f8d3;
    // background: url('~@/assets/home/home_sub_banner_1.png');
    border-radius: 20px;
    display: inline-block;
  }
  .teacher-data {
    width: 1003px;
    height: 345px;
    // padding:20px;
    background-color: #e4f8d3;
    // background: url('~@/assets/home/home_sub_banner_1.png');
    border-radius: 20px;
    display: inline-block;
    .content-title {
    text-align: center;
      width: 944px;
      height: 107px;
      background-color: #fff;
      border-radius: 20px;
      margin: 0 auto;
      margin-top: 20px;
      display: flex;
      .flex {
        flex:1;
        margin-top: 24px;
        font-size: 24px;

      .num {
        font-size: 26px;
        font-weight: bold;
      }
      .text {
        font-size: 20px;
        margin-top: 10px;
      }
      }
    }
  }
}
.card {
  padding: 75px 0 0 0;
  // margin-top: 102px;
  width: 1006px;
  background-image: url("../assets/home/grcardbg.png");
  background-repeat: no-repeat;
  background-size: 1006px 483px;
  height: 483px;
}
.card_dashuju {
  text-align: center;
  padding: 75px 0 0 0;
  margin-top: 102px;
  width: 1006px;
  background-image: url("../assets/home/grcardbg.png");
  background-repeat: no-repeat;
  background-size: 1006px 483px;
  height: 483px;
}
.title {
// height: 50px;
  font-size: 22px;
  // font-weight: bold;
  margin-left: 14px;
  color: black;
}
.txt {
  cursor: pointer;
  margin: 0 16px 0 16px;
  width: 134px;
  height: 49px;

  border: 3px white solid;
  border-radius: 40px;
  color: white;
  font-size: 24px;
  text-align: center;
  line-height: 46px;
}
.library1 {
  position: relative;
  cursor: pointer;
  /* z-index: 999; */
}
.library2 {
  position: relative;
  cursor: pointer;
}
.active {
  cursor: pointer;
  margin: 0 16px 0 16px;
  width: 134px;
  height: 49px;
  border: 3px #2d8615 solid;
  border-radius: 40px;
  color: #2d8615;
  background: #fff;
  font-size: 24px;
  text-align: center;
  line-height: 46px;
}
.cardbanner {
  padding: 0px;
  margin-top: 40px;
  width: 1006px;
  height: 207px;
  img {
    width: 1006px;
    height: 207px;
    border-radius: 10px;
  }
}
.grtwo {
  padding: 0 20px;
  background-image: url("../assets/home/grtwo.png");
  background-repeat: no-repeat;
  background-size: 290px 114px;
  width: 290px;
  height: 114px;
  margin-top: -4px;
}
.grone {
  border-top-left-radius: 120px;
  border-top-right-radius: 120px;
  /* background-image: url("../assets/home/homebanner.jpg"); */
  background-repeat: no-repeat;
  background-size: 290px 197px;
}
.grone1 {
  background-repeat: no-repeat;
  background-size: 290px 197px;
}
.grtwo_txt {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.mgl_1 {
  font-size: 22px;
  margin-bottom: 12px;
}
.mgl_3 {
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 40px 0 6px;
}
.macenter {
  margin-top: 6px;
  margin-left: 20px;
}
.box_right_x {
  margin-left: 180px;
  // height: 92px;
  line-height: 120px;
  display: flex;
  align-items: center;
}
.box_right_y {
  width: 325px;
  height: 727px;
  /* height: 575px; */
  background: url("../assets/home/rightbg.png");
  background-size: 100% 100%;
  border-radius: 20px;
  // margin-top: 48px;
  // padding: 13px 0 13px 0;
}
.box_right {
  /* margin-left: 32px; */
}
.top1 {
  cursor: pointer;
  background-size: 302px 150px;
  position: relative;
  width: 302px;
  height: 150px;
  background-color: white;
  border-radius: 20px;
  margin: 0 auto;
  padding: 9px 0 0 0;
}
.top2 {
  cursor: pointer;
  background-size: 302px 150px;
  position: relative;
  width: 302px;
  height: 150px;
  background-color: white;
  border-radius: 20px;
  margin: 0 auto;
  padding: 9px 0 0 0;
}
.tag1 {
  position: absolute;
  top: 12px;
  width: 77px;
  height: 26px;
  border-radius: 10px 20px 20px 10px;
  background-image: linear-gradient(to bottom, #ff785d, #e43a1f);
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 26px;
  margin-left: -8px;
}
.txt_2 {
  cursor: pointer;
  width: 302px;
  font-size: 18px;
  color: rgba(45, 134, 20, 1);
  margin: 8px auto;
}
.line {
  width: 300px;
  height: 1px;
  background-color: #e4e6e3;
  margin: 0 auto;
  margin-top: 14px;
  margin-bottom: 14px;
}
.orball {
  width: 21px;
  height: 21px;
  background-color: #ff512c;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 21px;
}
.news2 {
  display: flex;
  align-items: center;
  width: 302px;
  margin: 8px auto;
}
.txt_3 {
  cursor: pointer;
  font-size: 18px;
  color: rgba(45, 134, 20, 1);
  margin-left: 3px;
}
.childm {
  width: 52px;
  height: 62px;
}
.disp {
  display: flex;
  // align-items: flex-end;
  justify-content: space-around;
}
.news {
  color: rgba(45, 134, 20, 1);
  font-size: 24px;
  margin-left: 11px;
  width: 100px;
}
.more {
  color: rgba(45, 134, 20, 1);
  margin-left: 36px;
}
.ball {
  text-align: center;
  line-height: 15px;
  color: white;
  margin-left: 5px;
  width: 15px;
  height: 15px;
  background-color: rgba(45, 134, 20, 1);
  border-radius: 50%;
}
.right2 {
  width: 1006px;
}
.pinjie {
  cursor: pointer;
}
.pinjie1 {
  cursor: pointer;
  margin-bottom: 30px;
  position: relative;
}
.right2 > div > div:nth-child(2) {
  position: relative;
  top: -30px;
}
.right2 > div > div:nth-child(3) {
  position: relative;
  top: 30px;
}
.right2 > div > div:nth-child(5) {
  position: relative;
  top: -30px;
}
.right2 > div > div:nth-child(6) {
  position: relative;
  top: 30px;
}
.right1 {
  display: flex;
  margin-top: 89px;
  justify-content: space-around;
}
.lesson {
  margin-top: 104px;
}
.more2 {
  margin-top: 129px;
  cursor: pointer;
}
.right3 {
  width: 1366px;
}
.left_btn {
  width: 238px;
  margin-top: 44px;
}
.more3 {
  cursor: pointer;
  margin-top: 24px;
}
.challengebox {
  cursor: pointer;
  width: 290px;
  height: 296px;
  background-color: white;
  border-radius: 30px;
}
.challenge_img {
  /* background-image: url("../assets/home/homebanner.jpg"); */
  background-size: 264px 157px;
  width: 264px;
  height: 157px;
  border-radius: 30px;
}
.challengebox1 {
  padding: 13px 13px 13px 13px;
}
.integral {
  width: 147px;
  height: 41px;
  background: linear-gradient(311deg, #358b3a 0%, #05cf0e 100%);
  border-radius: 60px 0px 50px 0px;
  float: right;
  margin-top: -28px;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
}
.integral img {
  width: 22px;
  height: 25px;
  margin-right: 4px;
}
.challenge_title {
  font-size: 22px;
}
.challengebox2 {
  padding: 8px 13px 13px 13px;
}
.challenge_time1 {
  font-size: 19px;
  float: right;
  margin-top: 12px;
}
.timetag {
  margin-top: 6px;
  display: flex;
  align-items: center;
  width: 147px;
  height: 35px;
  background-color: rgba(201, 226, 179, 1);
  border-radius: 30px;
  justify-content: center;
}
.timetag img {
  width: 26px;
  height: 26px;
  margin-right: 3px;
}
.timetag div {
  color: rgba(32, 128, 4, 1);
  font-size: 19px;
}
.challenge_time2 {
  /* float: right; */
  font-size: 19px;
  margin-top: 8px;
  /* margin-left: 120px; */
}
.left {
  display: flex;
  justify-content: space-around;
}
.school {
  text-align: center;
}
.schoolname {
  margin-top: 28px;
}
.schoolimg {
  display: flex;
  height: 300px;
  justify-content: space-between;
}
.schoolimg1 {
  background-image: url("../assets/home/schoolimgstyle1.png");
  width: 25%;
  background-repeat: no-repeat;
  background-size: 100%;
  cursor: pointer;
  margin-top: 64px;
}
.schoolimg2 {
  background-image: url("../assets/home/schoolimgstyle2.png");
  width: 25%;
  background-repeat: no-repeat;
  background-size: 100%;
  cursor: pointer;
  margin-top: 45px;
}
.schoolimg3 {
  cursor: pointer;
  margin-top: 41px;
}
.schoolimg4 {
  cursor: pointer;
  margin-top: 56px;
}
.school-text {
  margin-top: 80px;
  font-family: lato;
  color: #2d8815;
  font-size: 30px;
}
.school-text2 {
  margin-top: 110px;
  font-family: lato;
  color: #2d8815;
  font-size: 30px;
}
.library2 {
  // margin-left: -20px;
  float: right;
  width: 630px;
  height: 354px;
}
.library {
  margin-top: 56px;
}
.bannerchild {
  position: absolute;
  top: 10%;
}
.mgl_22 {
  width: 30px;
  height: 30px;
}
.zanshide {
  text-align: center;
  color: rgba(45, 134, 21, 1);
  font-size: 24px;
  margin: 0 auto;
  height: 49px;
  border: 3px rgba(45, 134, 21, 1) solid;
  line-height: 46px;
  width: 210px;
  border-radius: 40px;
  margin-bottom: 40px;
}
.box_0001 {
  // width: 1067px;
  height: 366px;
  text-align: center;
  font-size: 28px;
  color: white;
  padding-top: 100px;
}
.box_0001 img {
  width: 118px;
  height: 80px;
}

.sub-banner-bg{
  height: 300px;
  width: 960px;
  margin: 0 auto;
  font-size: 27px;
  border-radius: 92px;
  // background: url('~@/assets/home/home_sub_banner_2.png');
}
.content-bottom {
  width: 944px;
  height:160px;
  text-align: center;
  display:flex;
  margin: 0 auto;
  margin-top: 20px;
  .content-flex {
    flex:1;
    display:flex;
    .title {
      font-size: 18px;
      -webkit-writing-mode: vertical-rl;
      writing-mode: vertical-rl;
    }
    .content-img {
      width: 17px;height: 17px;margin-bottom:4px
    }
  }
}

.moreData {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

  .hardware{
    display: flex;
    margin-bottom: 20px;

    .hardware_left{
      position: relative;
      width: 60%;
      margin-right: 20px;

      .vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
        border-radius: 15px;
      }

      .hardware_imag {
        width: 100%;
        height: 400px;
        border-radius: 15px;
      }

      .hardware_small_imag {
        height: 110px;
        border-radius: 10px;
      }

      .hardware_imag_list {
        display: flex;
        width: 100%;
        overflow: auto;

        .hardware_imag_small {
          height: 100px;
        }
      }
    }

    .hardware_content {
      flex: 1;
      padding: 20px;
      border-radius: 15px;
      background: #e4f8d4;
    }
  }
  .swiper-container {
    min-height:525px
  }
  .noMessage {
    position: absolute;
    left: 200px;
    top: 80px;
    color: #666666;
  }

  .elite{
    position: absolute;
    right: 40px;
    bottom: 120px;
  }

  .banner{
    position: absolute;
    left: 0;
    right: 0;
  }

  .swiper-slide{
    width: 100%;
  }

  .slide-bg{
    width: 100%;
    height: 525px;
    background-size: 100%;
    background-position: center;
  }

  .lato{
    font-family: lato;
  }

  .banner2 {
    width: 1001px;
    height: 203px;
    border-radius: 20px;
    overflow: hidden;
  }
  .newbg{
  position: absolute;
  width: 300px;
  height: 150px;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .swiper-pagination-bullet{
    width: 46px;
    height: 12px;
    border-radius: 12px;
    background: #fff;
    opacity: .4;
    box-shadow: 0 0 5px #fff;
  }

  /deep/ .swiper-pagination-bullet-active{
    background: #2d8614;
    opacity: 1;
  }
  /deep/ .swiper-pagination-bullets{
    bottom: 120px;
    left: 0;
    width: 1366px;
    right: 0;
    margin: auto;
    text-align: left;
  }
</style>
