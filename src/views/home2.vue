<template>
  <div>
    <div class="banner">

      <div ref="swiper" class="swiper-container home-swiper">
        <div class="swiper-wrapper">
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

    </div>
    <div class="first-main">
      <div class="box">
        <div class="left-box">
          <div v-if="roleId === 2" class="tab-container">
            <div class="title_x">
              <div class="txt_1" :class="{active: clb === 1}" @click="onclass1">
                我的课程
              </div>
              <div class="txt_1" :class="{active: clb === 2}" @click="onclass2">
                我的挑战
              </div>
              <div class="txt_1" :class="{active: clb === 3}" @click="onclass3">
                我的成就
              </div>
            </div>
            <div v-if="LtotalElements === 0" v-show="NO1 == 1" class="box_0001">
              <img src="../assets/home/child.png" alt="">
              <span class="alifont nodata-user">你还没有学习过课程，请先去选择一门课程开始学习吧！</span>
            </div>
            <div v-if="CtotalElements === 0" v-show="NO2 == 1" class="box_0001">
              <img src="../assets/home/child.png" alt="">
              <span class="alifont nodata-user">你还没有参与挑战呢，请先参与挑战！</span>
            </div>
            <div
              v-if="ACtotalElements === 0"
              v-show="NO3 == 1"
              class="box_0001"
            >
              <img src="../assets/home/child.png" alt="">
              <span class="alifont nodata-user">你还没有获得成就呢，请先去获得成就！</span>
            </div>
            <div v-show="NO1 == 1" class="box_1">
              <el-row :gutter="66">
                <el-col
                  v-for="(item, index) in mylessonList"
                  :key="index"
                  :span="8"
                  class="box_row"
                >
                  <div
                    v-if="index < 3"
                    class="box_01"
                    @click="gotolessonid(item)"
                  >
                    <el-image
                      class="xianzhi"
                      :src="$comm.url(item.coverImage)"
                      fit="cover"
                    />
                    <div class="bottom_1">
                      <el-image
                        class="children"
                        :src="require('../assets/lesson/excellentCourses.png')"
                        alt
                      />
                      <div class="title">{{ item.name }}</div>
                      <div class="txt">
                        <el-image :src="require('../assets/lesson/icon.png')" alt />
                        <div class="schoolName">{{ item.schoolName }}</div>
                        <div class="teacherName">{{ item.authorName }}</div>
                      </div>
                      <!-- <img class="con" src="../assets/lesson/dian.png" alt> -->
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-show="NO2 == 1" class="box_1">
              <el-row :gutter="66">
                <el-col
                  v-for="(item, index) in mychallengeList"
                  :key="index"
                  :span="8"
                  class="box_row"
                >
                  <div
                    v-if="index < 3"
                    class="box_01"
                    @click="gotochallengeid1(item)"
                  >
                    <div
                      class="tiaozhanbg"
                      :style="{
                        backgroundImage:
                          'url(' +
                          $comm.url(item.challenge.picUrl)
                          +
                          ')',
                      }"
                    >
                      <div class="integral">
                        <el-image
                          class="cup"
                          :src="require('../assets/challenge/good.png')"
                          alt
                        />
                        <div class="txt_4">
                          {{ item.challenge.rewardPoints }}
                        </div>
                        <div class="txt_5">积分</div>
                      </div>
                    </div>
                    <div class="bottom_2">
                      <div class="title_001">
                        {{ item.challenge.challengeName }}
                      </div>
                      <div class="txt_001">
                        <el-image :src="require('../assets/home/timebtn.png')" alt />
                      </div>
                      <div class="lasttime_1">{{ item.endTime }}</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-show="NO3 == 1" class="box_1">
              <el-row :gutter="66">
                <el-col
                  v-for="(item, index) in myacalist"
                  :key="index"
                  :span="8"
                  class="box_row"
                >
                  <div v-if="index < 3" class="box_01" @click="gotoacid(item)">
                    <div
                      class="tiaozhanbg"
                      :style="{
                        backgroundImage:
                          'url(' + $comm.url(item.badgeUrl) + ')',
                      }"
                    />
                    <div class="bottom_2">
                      <div class="title_002">{{ item.name }}</div>
                      <div class="txt_002">
                        <el-image
                          class="txt_002img"
                          :src="require('../assets/achievement/sun.png')"
                          alt
                        />
                        <span>已有0人完成</span>
                        <el-image
                          class="txt_002img_2"
                          :src="require('../assets/challenge/finish.png')"
                          alt
                        />
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="roleId ===6">
            <div class="student-title">
              <el-image :src="require('../assets/nav/two.png')" alt />
              <span class="title">幸福课程</span>
            </div>
            <div class="student-data" />
            <div class="touristLogin">亲爱的游客，您好，登录后可查看。</div>
          </div>
          <!-- 大数据 -->
          <div v-if="roleId === 1 || roleId === 3 || roleId ===4 ">
            <div class="moreData topicback">
              <div class="teacher-title">
                <el-image :src="require('../assets/nav/two.png')" alt />
                <div class="title">幸福课程大数据</div>
              </div>
              <div class="more" style="display:flex;margin-right:32px">
                <router-link
                  :to="{ path: '/bigData/bigData' }"
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
                    <el-image class="content-img" :src="require('../assets/bigData/charts3.png')" />课程浏览量Top5</div>
                  <div id="myChart1" :style="{width: '100%', height: '200px'}" />
                  <div v-if="top5CoursesViewedTitle.length === 0" class="noMessage">暂无数据</div>
                </div>
                <div class="content-flex" style="position:relative">
                  <div class="title">
                    <el-image class="content-img" :src="require('../assets/bigData/charts1.png')" />挑战量热度Top5</div>
                  <div id="myChart3" :style="{width: '100%', height: '200px'}" />
                  <div v-if="top5ChallengeTitle.length === 0" class="noMessage">暂无数据</div>
                </div>
              </div>
            </div>
            <!-- <div style="background:pink;width:100%;height:218px;margin-top:20px;border-radius:20px" /> -->
          </div>
          <!-- sub_banner -->
          <div v-if="bannerUrl" class="sub_banner">
            <template v-if="bannerLink">
              <a :href="bannerLink" target="_blank">
                <el-image
                  class="banner2"
                  :src="$comm.url(bannerUrl)"
                  fit="cover"
                />
              </a>
            </template>
            <template v-else>
              <el-image
                class="banner2"
                :src="$comm.url(bannerUrl)"
                fit="cover"
              />
            </template>
          </div>
        </div>
        <div class="box_right">
          <div class="box_right_x ">
            <el-image class="childm" :src="require('../assets/home/boy.png')" alt />
            <div class="news-title">新闻与课程动态</div>
            <div class="more">
              <router-link :to="{ path: '/news/news' }">查看更多</router-link>
            </div>
            <div class="ball">&gt;</div>
          </div>
          <div class="box_right_y">
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
      </div>
      <!-- 幸福课程资源库 -->
      <div class="lesson-lib">
        <div class="col_top">
          <el-image class="colimg" :src="require('../assets/home/boy.png')" alt />
          <div class="title">幸福课程资源库</div>
        </div>
        <div class="img">
          <router-link :to="{ path: '/lessonLibrary/lessonLibrary' }">
            <div class="img-left">
              <el-image :src="require('../assets/nav/kjzyk.png')" alt />
            </div>
          </router-link>
          <router-link :to="{ path: '/hardware/hardware' }">
            <div class="img-right">
              <el-image :src="require('../assets/nav/yjzyk.png')" alt />
            </div>
          </router-link>
        </div>
      </div>
      <!-- 精品课程推荐 -->
      <div class="col">
        <div class="col_top">
          <el-image class="colimg" :src="require('../assets/home/girl.png')" alt />
          <div class="coltitle">精品课程推荐</div>
          <div class="more2" @click="gotomoreclass">查看更多</div>
          <div class="ball2">&gt;</div>
        </div>
        <el-row :gutter="66">

          <template v-for="(item, index) in lessonList">
            <el-col :key="index" :span="6">
              <div
                v-if="index < 8"
                class="box_01"
                style="margin-top: 18px"
                @click="gotolessonid(item)"
              >
                <el-image
                  class="xianzhi"
                  fit="cover"
                  :src="$comm.url(item.coverImage)"
                  alt
                />
                <div class="bottom_1">
                  <el-image
                    class="children"
                    :src="require('../assets/lesson/excellentCourses.png')"
                    alt
                  />
                  <div class="title">{{ item.name }}</div>
                  <div class="txt">
                    <el-image :src="require('../assets/lesson/icon.png')" alt />
                    <div class="schoolName">{{ item.schoolName }}</div>
                    <div class="teacherName">{{ item.authorName }}</div>
                  </div>
                  <!-- <img class="con" src="../assets/lesson/dian.png" alt> -->
                </div>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
      <!-- 幸福课程挑战中心 -->
      <div class="challengecenter">
        <div class="col_top">
          <el-image class="colimg" :src="require('../assets/home/boy.png')" alt />
          <div class="coltitle">幸福课程挑战中心</div>
          <div class="more2">
            <router-link :to="{ name: 'Index' }">查看更多</router-link>
          </div>
          <div class="ball2">&gt;</div>
        </div>
        <el-row :gutter="71">
          <el-col v-for="(item, index) in challengeList" :key="index" :span="8">
            <div
              v-if="index < 3"
              class="challbg"
              :style="{
                backgroundImage:
                  'url(' + $comm.url(item.picUrl) + ')',
              }"
              @click="gotochallengeid(item)"
            >

              <el-image class="challbigbg" :src="$comm.url(item.picUrl)" fit="cover" />
              <div class="challwhite">
                <div class="integral">
                  <el-image class="cup" :src="require('../assets/challenge/good.png')" alt />
                  <div class="txt_4">{{ item.rewardPoints }}</div>
                  <div class="txt_5">积分</div>
                </div>
                <div class="challlast">
                  <div style="font-size: 24px; color: #2d2d2d">
                    {{ item.challengeName }}
                  </div>
                  <div class="challtime">
                    <el-image :src="require('../assets/home/timebtn.png')" alt />
                    <div class="lasttime">{{ item.endTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 幸福课程示范校 -->
      <div class="schoolbox">
        <div class="col_top">
          <el-image class="colimg" :src="require('../assets/home/girl.png')" alt />
          <div class="coltitle">幸福课程项目校</div>
        </div>
        <el-row :gutter="68">
          <el-col :span="6">
            <div class="showschool1" @click="jidischool(0)" />
            <div class="schoolbg" @click="jidischool(0)">
              <div class="schooltxt1" @click="jidischool(0)">基地校：启良中学</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="showschool2" @click="jidischool(1)" />
            <div class="schoolbg" @click="jidischool(1)">
              <div class="schooltxt1" @click="jidischool(1)">领衔校：上外嘉外</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="showschool3" @click="jidischool(2)" />
            <div class="schoolbg" @click="jidischool(2)">
              <div class="schooltxt1" @click="jidischool(2)">重点校：中光高中</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="showschool" @click="jidischool(3)" />
            <div class="schoolbg" @click="jidischool(3)">
              <div class="schooltxt1" @click="jidischool(3)">一般项目校</div>
            </div>
          </el-col>
        </el-row>
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
  name: 'Dashboard',
  components: {},
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
      newList: [],
      myacalist: [],
      mylessonList: [],
      mychallengeList: [],
      imgUrls: [],
      newsList1: [],
      challengeList: [],
      lessonList: [],
      achievementList: [],
      bannerUrl: '',
      bannerLink: '',
      // subBanner: {
      //   image: '',
      //   link: ''
      // },
      NO1: 1,
      NO2: 0,
      NO3: 0,
      clb: 1,
      coverImage: '',
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
    ...mapGetters(['baseApi']),
    roleId() {
      return this.$store.getters.roleID
    },
    headers() {
      return {
        Authorization: getToken()
      }
    },
    newNewsList() {
      let newsArr = [...(this.newList.length > 0 ? [this.newList[0]] : []), ...this.newsList1]
      if (this.$store.getters.roleID === 1) {
        newsArr = [...this.newList]
      }
      return newsArr.slice(0, 3)
    }
  },
  created() {
    // this.roleId = Number(this.$store.state.user.roleId)
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
    imgUrl(item) {
      window.location.href = item
    },
    xinwen1(id) {
      this.getNews()
      this.$router.push({ path: 'news/newsDetail?id=' + id })
    },
    myacList() {
      const params = {}
      myacList(params).then((res) => {
        this.myacalist = res.content
        this.ACtotalElements = res.totalElements
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

    createSwiper() {
      this.swiperIntance = new Swiper(this.$refs.swiper, {
        slidesPerView: 'auto',
        // autoplay: true,
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
      this.$router.push({ path: 'lesson/lessondetail?id=' + item.id })
    },
    gotochallengeid(item) {
      this.$router.push({
        path: 'DataUpload/DataUpload?id=' + item.id
      })
    },
    gotochallengeid1(item) {
      this.$router.push({
        path: 'DataUpload/DataUpload?id=' + item.challenge.id
      })
    },
    gotoacid(item) {
      this.$router.push({ path: 'achievement/achievedetail?id=' + item.id })
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
    // banner
    getBanner1() {
      const params = {
        type: 2,
        pcPhone: 1
      }
      getBanner(params).then((res) => {
        if (res && res.length > 0) {
          this.bannerUrl = res[0].picUrl
          this.bannerLink = res[0].hyperlink
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
        this.newList = res.content
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
        this.lessonList = res.content || []
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
    onclass1() {
      this.clb = 1
      this.NO1 = 1
      this.NO2 = 0
      this.NO3 = 0
      this.getLessonList()
    },
    onclass2() {
      this.clb = 2
      this.NO1 = 0
      this.NO2 = 1
      this.NO3 = 0
    },
    onclass3() {
      this.clb = 3
      this.NO1 = 0
      this.NO2 = 0
      this.NO3 = 1
    },
    gotomoreclass() {
      this.$router.push({ path: '/excellentCourse/excellentCourse' })
    },
    // findDetail() {
    //   this.$router.push({ path: "/lesson/lessondetail?id=" + item.id });
    // },
    jidischool(val) {
      this.$router.push({ path: '/school/school?id=' + val })
    }
  }
}
</script>

<style lang="scss" scoped>
.first-main {
  width: 1366px;
  margin: 0 auto;
}

.swiper-img{
  width: 1366px;
  height: 525px;
  border-radius: 10px;
  overflow: hidden;
}
//  .el-carousel__item h3 {
//     color: #475669;
//     font-size: 14px;
//     opacity: 0.75;
//     line-height: 150px;
//     margin: 0;
//   }

//   .el-carousel__item:nth-child(2n) {
//      background-color: #99a9bf;
//   }

//   .el-carousel__item:nth-child(2n+1) {
//      background-color: #d3dce6;
//   }

.home-swiper{
  height: 525px;
  margin: auto;
}

.slide-bg{
  width: 100%;
  height: 525px;
  background-size: 100%;
  background-position: center;
}

.banner{
  // background: #f0f7ff;
}

.banner img {
  width: 100%;
  height: 525px;
  // border-bottom-left-radius: 30%;
  // border-bottom-right-radius: 30%;
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
.box_1 {
  // display: flex;
  // justify-content:space-around;

  padding: 15px;
}
.box_0001 {
  width: 1001px;
  height: 366px;
  text-align: center;
  font-size: 28px;
  color: #0152a3;
  padding-top: 100px;
}
.box_0001 img {
  width: 118px;
  height: 80px;
}
.bottom_1 {
  width: 290px;
  height: 154px;
  position: relative;
  // border: 1px solid #e6e6e6;
  margin-top: -38px;
  // border-bottom-right-radius: 20px;
  // border-bottom-left-radius: 20px;
}

.children {
  margin-left: 129px;
  margin-top: -40px;
  z-index: 9;
}
.title {
  // height: 50px;
  font-size: 22px;
  // font-weight: bold;
  margin-left: 14px;
  color: black;
}
.box_01 {
  cursor: pointer;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  overflow: hidden;
  background: #fff;
}
.xianzhi {
  width: 289px;
  height: 160px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.tiaozhanbg {
  background-size: 289px 204px;
  padding-top: 200px;
  width: 289px;
  height: 204px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.txt {
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 11px;
}
.txt_001 {
  // height: 40px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 11px;
}
.schoolName {
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  margin-left: 5px;
}
.teacherName {
  font-size: 18px;
  margin-left: 56px;
  color: gray;
}
.con {
  // margin-top: 24px;
  margin-left: 247px;
}
.title_x {
  // width: 1001px;
  justify-content: center;
  display: flex;
  text-align: center;
  padding: 20px 0;

}

.alifont{
  font-family: 'ali';
}

.nodata-user{
  font-size: 20px;
}
.txt_1 {
  color: #429cf4;
  font-size: 24px;
  margin: 0 33px 0 33px;
  cursor: pointer;
  font-family: 'ali';

  &.active {
    color: #05407a;
    font-size: 24px;
    margin: 0 33px 0 33px;
    cursor: pointer;
    position: relative;

    &:after{
      content: '';
      position: absolute;
      height: 6px;
      width: 40px;
      background: #05407a;
      left: 0;
      right: 0;
      margin: auto;
      bottom: -10px;
      border-radius: 4px;
    }
  }

}

.banner2 {
  width: 1001px;
  height: 203px;
}
.childm {
  width: 77px;
  height: 98px;
}
.box {
  display: flex;

  .student-title,.teacher-title {
    display: flex;
    align-items: center;
    img {
      vertical-align: bottom;
    }
    .title {
      font-size: 24px;
      color: #0152a3;
      margin-left: 5px;
    }
  }
  .student-data {
    width: 1003px;
    height: 345px;
    text-align: center;
    background-color: #deeefe;
    background: url('~@/assets/home/home_sub_banner_1.png');
    border-radius: 20px;
    display: inline-block;
  }
  .teacher-data {
    width: 1009px;
    height: 345px;
    // padding:20px;
    background-color: #deeefe;
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
.news-title {
  color: #0552a2;
  font-size: 24px;
  margin-left: 11px;
  width: 100px;
}
.more {
  color: #0152a3;
  margin-left: 36px;
}
.ball {
  text-align: center;
  line-height: 15px;
  color: white;
  margin-left: 5px;
  width: 15px;
  height: 15px;
  background-color: #0152a3;
  border-radius: 50%;
}
.box_right_x {
  height: 100px;
  display: flex;
  align-items: center;
  margin: 10px 0;
    background: #eef5fc;
    border-radius: 10px;
}
.box_right_y {
  width: 325px;
  height: 578px;
  background: url("../assets/home/top.png");
  background-size: 100% 100%;
  border-radius: 20px;
  margin-top: 8px;
}
.box_right {
  margin-left: 32px;
}
.top1 {
  cursor: pointer;
  background-size: 302px 150px;
  position: relative;
  width: 302px;
  height: 150px;
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
  color: #0152a3;
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
  color: #0152a3;
  margin-left: 3px;
}
.colimg {
  width: 77px;
  height: 98px;
}
.coltitle {
  font-size: 24px;
  color: #0152a3;
  margin-left: 5px;
}
.more2 {
  color: #0152a3;
  margin-left: 992px;
  cursor: pointer;
}
.ball2 {
  text-align: center;
  line-height: 15px;
  color: white;
  margin-left: 5px;
  width: 15px;
  height: 15px;
  background-color: #0152a3;
  border-radius: 50%;
  cursor: pointer;
}
.col_top {
  margin-top: 19px;
  display: flex;
  align-items: center;
  background: #eef5fc;
  border-radius: 10px;
  margin: 10px 0;
  height: 100px;
}
.challbg {
  cursor: pointer;
  background-image: url("../assets/home/homebanner.jpg");
  background-size: 405px 298px;
  width: 405px;
  height: 298px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.challbigbg{
  width: 405px;
  height: 298px;
  position: absolute;
  top: 0;
  left: 0;
}

.cup {
  widows: 16px;
  height: 16px;
}
.txt_4 {
  margin-left: 2px;
  color: white;
  font-size: 18px;
  line-height: 30px;
}
.txt_5 {
  margin-left: 2px;
  color: white;
  font-size: 12px;
  line-height: 30px;
}
.challwhite {
  position: absolute;
  z-index: 99;
  right: 0;
  bottom: 0;
  width: 299px;
  height: 99px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px 0px 0px 20px;
}
.integral {
  margin-top: -12px;
  margin-left: 165px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  width: 97px;
  height: 30px;
  background: linear-gradient(
    225deg,
    rgba(66, 156, 245, 1) 0%,
    rgba(0, 117, 235, 1) 100%
  );
  border-radius: 20px;
}
.challtime {
  margin-top: 6px;
  display: flex;
  align-items: center;
}
.lasttime {
  font-size: 14px;
  color: #2d2d2d;
}
.challlast {
  margin-top: 7px;
  margin-left: 32px;
}
.showschool {
  background-image: url("../assets/home/homebanner.jpg");
  width: 288px;
  height: 198px;
  border-radius: 20px;
  padding: 80px;
  background-size: 288px 198px;
}
.showschool1 {
  background-image: url("../assets/images/jidixiao.png");
  width: 288px;
  height: 198px;
  border-radius: 20px;
  padding: 80px;
  background-size: 288px 198px;
}
.showschool2 {
  background-image: url("../assets/images/lingxianxiao.png");
  width: 288px;
  height: 198px;
  border-radius: 20px;
  padding: 80px;
  background-size: 288px 198px;
}
.showschool3 {
  background-image: url("../assets/images/zhongdianxiao.png");
  width: 288px;
  height: 198px;
  border-radius: 20px;
  padding: 80px;
  background-size: 288px 198px;
}
.schoolbg {
  cursor: pointer;
  position: absolute;
  top: 0px;
  width: 288px;
  height: 198px;
  border-radius: 20px;
}
.schooltxt1 {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 10px;
  border-radius: 0 0 20px 20px;
  background-color: rgba(3, 83, 161, 0.5);
}
.schooltxt2 {
  position: absolute;
  top: 115px;
  color: white;
  font-size: 24px;
  margin: 0 108px;
}
.schoolbox {
  margin-bottom: 20px;
}
.lesson-lib {
  margin-top: 36px;
  margin-bottom: 17px;
  .img {
    margin-top: 17px;
    display: flex;
    justify-content: space-between;
    .img-left {
      width: 641px;
      height: 238px;
      img {
        width: 641px;
        height: 238px;
      }
    }
    .img-right {
      width: 641px;
      height: 238px;
      img {
        width: 641px;
        height: 238px;
      }
    }
  }
  img {
    width: 77px;
    height: 98px;
    vertical-align: middle;
  }
  .title {
    font-size: 24px;
    color: #0152a3;
    margin-left: 5px;
  }
}
.title_001 {
  height: 65px;
  font-size: 22px;
  margin-left: 14px;
  padding-top: 40px;
  margin-bottom: 20px;
  color: #000;
}
.lasttime_1 {
  margin-bottom: 20px;
  margin-top: 10px;
  margin-left: 10px;
}
.bottom_2 {
  height: 154px;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.txt_002 {
  display: flex;
  align-items: center;
}
.txt_002img {
  margin-left: 10px;
  margin-right: 8px;
  width: 40px;
  height: 40px;
}
.title_002 {
  height: 65px;
  font-size: 22px;
  margin-left: 14px;
  padding-top: 40px;
  color: #000;
}
.txt_002img_2 {
  margin-left: 42px;
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

.newbg{
  position: absolute;
  width: 300px;
  height: 150px;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: 10px;
}
.moreData {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.touristLogin {
  font-size: 27px;
  text-align: center;
  margin-top: 80px;
}
 .noMessage {
    position: absolute;
    left: 200px;
    top: 80px;
    color: #666666;
  }

  .sub_banner{
    border-radius: 5px;
    overflow: hidden;
    width: 1001px;
    height: 203px;
    border-radius: 20px;
    margin-top: 30px;
  }

  .tab-container{
    min-height: 480px;
    border-radius: 20px;
    background-image: linear-gradient(#fff 50%,#e5f2ff);
  }

  .left-box{
    flex: 1;
  }

  .box_row{
    padding: 40px 0;
  }
  .topicback {
    background: #eef5fc;
    border-radius: 10px;
    margin: 10px 0;
    height: 100px;
    // background-image:linear-gradient(180deg,#ffffff,#eef5fc)
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
    background: #0152a3;
    opacity: 1;
  }
</style>
