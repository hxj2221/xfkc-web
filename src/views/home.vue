<template>
  <div style="width: 100%">
    <div class="cards">
      <el-tabs v-model="activeTab1" class="card1">
        <el-tab-pane
          v-for="tab in newsTabs"
          :key="tab.value"
          :label="tab.label"
          :name="tab.value"
        >
          <span slot="label">
            {{ tab.label }}
            <img
              v-if="activeTab1 === newsTabs[0].id"
              :src="arrowIcon"
              style="width: 9px"
            >
          </span>
          <div class="news">
            <div
              v-for="(news, i) in (activeTab1 === newsTabs[0].value ? newList : newList3)"
              :key="i"
              :style="`width: calc(${i === 0 ? 48 : 52}% - 12px);cursor: pointer`"
              @click="$router.push(`/news/newsDetail?id=${news.id}`)"
            >
              <div v-if="i === 0" class="news_big">
                <el-image
                  fit="fill"
                  :src="$comm.url(news.pic)"
                />
                <span class="title">{{ news.title }}</span>
                <span class="date">{{ moment(news.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
              </div>
              <div v-else class="news_small">
                <el-image

                  fit="fill"
                  :src="$comm.url(news.pic)"
                />
                <div class="box">
                  <span class="title">{{ news.title }}</span>
                  <span class="date">{{ moment(news.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                </div>
              </div>
            </div>
            <el-empty v-if="(activeTab1 === newsTabs[0].value ? newList : newList3).length === 0" description="暂无数据" />
          </div>
          <span
            class="more"
            @click="$router.push(`/news/news?type=1`)"
          >
            更多
            <el-image
              fit="fill"
              :src="rightIcon"
              style="height: 16px"
            />
          </span>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-tabs v-model="activeTab2" class="card2">
        <el-tab-pane label="幸福课程资源库" name="1"> -->
      <div class="card2">
        <div class="resources_searchbox">
          <el-input v-model="searchKey" size="medium" prefix-icon="el-icon-search" placeholder="请输入搜索关键词">
            <el-button slot="append" @click="toSearchResult">搜索</el-button>
          </el-input>
        </div>
        <div class="resources">
          <el-image

            fit="fill"
            style="cursor: pointer"
            :src="doBg"
            @click="$router.push('/hardware/hardware')"
          />
        </div>
      </div>
      <!-- </el-tab-pane>
      </el-tabs> -->
      <el-tabs v-model="activeTab3" class="card1">
        <el-tab-pane label="幸福课程精品栏目" name="1">
          <div class="course">
            <el-tabs v-model="activeTab5" stretch>
              <el-tab-pane
                v-for="tab in tabs"
                :key="tab.value"
                :name="tab.value"
              >
                <div slot="label" style="display: flex;align-items: center;justify-content: center;gap: 16px">
                  {{ tab.label }}
                </div>
                <div class="list">
                  <div
                    v-for="course in newList2"
                    :key="course.id"
                    class="cell"
                    @click="$router.push(`/news/newsDetail?id=${course.id}`)"
                  >
                    <div class="calendar">
                      <div>{{ +moment(course.updateTime).format('MM') }}月</div>
                      <div>{{ +moment(course.updateTime).format('DD') }}</div>
                    </div>
                    <div class="box">
                      <div class="title">{{ course.title }}</div>
                      <div class="date">{{ moment(course.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    </div>
                  </div>
                  <el-empty v-if="newList2.length === 0" description="暂无数据" />
                </div>
              </el-tab-pane>
              <span
                class="more"
                @click="$router.push(`/news/news?type=2`)"
              >
                更多
                <el-image

                  fit="fill"
                  :src="rightIcon"
                  style="height: 16px"
                />
              </span>
            </el-tabs></div>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-tabs v-if="userId != '2' && userId != '6' && userName !== 'admin445' && userName !== 'admin310'" v-model="activeTab4" class="card2">
        <el-tab-pane label="幸福课程大数据" name="1"> -->
      <div v-if="userId != '2' && userId != '6' && userName !== 'admin445' && userName !== 'admin310'" class="card2">
        <div class="data">
          <div v-for="(card, index) in cards" :key="index" class="card">

            <div v-if="index < 1">
              <el-popover
                placement="top-start"
                width="260"
                trigger="hover"
              >
                <el-image
                  fit="fill"
                  style="cursor: pointer"
                  :src="wechartBg"
                />
                <div slot="reference" style="display: flex; align-items: center;gap: 12px">
                  <el-image

                    fit="fill"
                    :src="card.icon"
                  />
                  <span class="title">{{ card.title }}</span>
                </div>
              </el-popover>
            </div>
            <div v-else style="display: flex; align-items: center;gap: 12px" @click="$router.push(`/featureCourse/index`)">
              <el-image

                fit="fill"
                :src="card.icon"
              />
              <span class="title">{{ card.title }}</span>
            </div>
            <!-- <div class="num" :style="`color: ${card.color}`">{{ card.num }}</div> -->
          </div>
          <div>
            <el-tabs v-model="activeTabRank" class="rank">
              <!-- <el-tab-pane label="精品栏目Top8" name="rankFirst">
                <div class="content">
                  <div v-for="(item, index) in rank" :key="index" style="height: 12px;">
                    <el-image
                      v-if="index <= 2"

                      fit="fill"
                      :src="index === 0 ? oneIcon : index === 1 ? twoIcon : thirdIcon"
                      style="width: 12px"
                    />
                    <div v-else class="num">{{ index + 1 }}</div>
                    <div class="name">{{ item.name }}</div>
                    <div class="progress" :style="`flex:${(item.pageView || 0) / (max || 1)}`" />
                  </div>
                  <el-empty v-if="rank.length === 0" description="暂无数据" />
                </div>
              </el-tab-pane> -->
              <el-tab-pane label="精品课程Top8" name="rankSecond">
                <div class="content">
                  <div v-for="(item, index) in rankJpk" :key="index" style="height: 12px;">
                    <el-image
                      v-if="index <= 2"

                      fit="fill"
                      :src="index === 0 ? oneIcon : index === 1 ? twoIcon : thirdIcon"
                      style="width: 12px"
                    />
                    <div v-else class="num">{{ index + 1 }}</div>
                    <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
                      <div class="name">{{ item.name }}</div>
                    </el-tooltip>
                    <div class="progress" :style="`flex:${(item.pageView || 0) / (maxJpk || 1)}`" />
                    <!-- {{ item.viewTotal }} -->
                  </div>
                  <el-empty v-if="rankJpk.length === 0" description="暂无数据" />
                </div>
              </el-tab-pane>
              <el-tab-pane label="课程资源Top8" name="rankThird">
                <div class="content">
                  <div v-for="(item, index) in rankKczy" :key="index" style="height: 12px;">
                    <el-image
                      v-if="index <= 2"

                      fit="fill"
                      :src="index === 0 ? oneIcon : index === 1 ? twoIcon : thirdIcon"
                      style="width: 12px"
                    />
                    <div v-else class="num">{{ index + 1 }}</div>
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                      <div class="name">{{ item.title }}</div>
                    </el-tooltip>
                    <div class="progress" :style="`flex:${(item.viewTotal || 0) / (maxKczy || 1)}`" />
                    <!-- {{ item.viewTotal }} -->
                  </div>
                  <el-empty v-if="rankKczy.length === 0" description="暂无数据" />
                </div>
              </el-tab-pane>
            </el-tabs>
            <!-- <div class="title">课程浏览量Top5</div>
                <div class="content">
                  <div v-for="(item, index) in rank" :key="index" style="height: 12px;">
                    <el-image
                      v-if="index <= 2"

                      fit="fill"
                      :src="index === 0 ? oneIcon : index === 1 ? twoIcon : thirdIcon"
                      style="width: 12px"
                    />
                    <div v-else class="num">{{ index + 1 }}</div>
                    <div class="name">{{ item.name }}</div>
                    <div class="progress" :style="`flex:${(item.pageView || 0) / (max || 1)}`" />
                    {{ item.pageView }}
                  </div>
                  <el-empty v-if="rank.length === 0" description="暂无数据" />
                </div> -->
          </div>
        </div>
        <!-- <span
              class="more"
              @click="$router.push('/bigData/bigData')"
            >
              更多
              <el-image

                fit="fill"
                :src="rightIcon"
                style="height: 16px"
              />
            </span> -->
      </div>
      <!-- </el-tab-pane>
      </el-tabs> -->
      <el-tabs v-model="activeTab6" class="card3">
        <el-tab-pane label="精品课程推荐" name="1">
          <div class="best">
            <div
              v-for="lesson in lessonList"
              :key="lesson.id"
              class="cell"
              @click="$router.push(`/excellentCourse/excellentCourse?id=${lesson.id}&type=1&showType='detail'`)"
            >
              <el-image

                fit="fill"
                :src="$comm.url(lesson.coverImage)"
              />
              <div class="box">
                <div class="header">
                  <span class="tag" :style="`width: 60px; text-align:center; color: ${getColor(lesson.grade).color};background: ${getColor(lesson.grade).bgColor}`">{{ lesson.grade }}</span>
                  <el-tooltip class="item" effect="dark" :content="lesson.name" placement="top">
                    <span class="title" :style="`flex:1`">{{ lesson.name }}</span>
                  </el-tooltip>
                </div>
                <div class="footer">
                  <span style="display: flex;align-items: center; gap: 4px">
                    <el-image

                      fit="fill"
                      :src="locIcon"
                    />
                    {{ lesson.schoolName }}
                  </span>
                  {{ lesson.authorName }}
                </div>
              </div>
              <!-- <div class="label">精品</div> -->
            </div>
            <el-empty v-if="lessonList.length === 0" description="暂无数据" />
          </div>
        </el-tab-pane>
        <span
          class="more"
          @click="$router.push('/excellentCourse/excellentCourse')"
        >
          更多
          <el-image

            fit="fill"
            :src="rightIcon"
            style="height: 16px"
          />
        </span>
      </el-tabs>
      <el-tabs v-model="activeTab7" class="card3">
        <el-tab-pane label="课程资源推荐" name="1">
          <div class="challenge">
            <div
              v-for="item in challengeList"
              :key="item.id"
              class="challengeItem"
              @click="$router.push(`/coursesource/index?id=${item.id}`)"
            >
              <div class="img-box">
                <el-image
                  fit="fill"
                  :src="$comm.url(item.imgUrl)"
                  style="width: 312px; height: 174px;"
                />
              </div>
              <div class="img-boxbg"><i class="el-icon-video-play" /></div>
              <div class="title-box">
                <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                  <div class="title">{{ item.title }}</div>
                </el-tooltip>
              </div>
              <div class="remark">{{ item.remark }}</div>
              <div class="data">
                <div><svg-icon icon-class="givelike" style="margin-right: 8px;" />{{ item.likeTotal }}</div>
                <div><svg-icon icon-class="eye" style="margin-right: 8px;" />{{ item.viewTotal }}</div>
              </div>
            </div>
            <el-empty v-if="challengeList.length === 0" description="暂无数据" />
          </div>
        </el-tab-pane>
        <span
          class="more"
          @click="$router.push('/coursesource/index')"
        >
          更多
          <el-image

            fit="fill"
            :src="rightIcon"
            style="height: 16px"
          />
        </span>
      </el-tabs>
      <el-tabs v-model="activeTab8" class="card3">
        <el-tab-pane label="幸福课程项目校" name="1">
          <div class="schoolbox">
            <div v-for="(school, i) in schools" :key="i" class="school" @click="$router.push(`/school/school?id=${school.id}`)">
              <el-image

                fit="fill"
                :src="school.bg"
              />
              <div>
                <div>{{ school.label }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <FlutterDialog />
  </div>
</template>

<script>

import arrowIcon from '@/assets/home/arrowIcon.png'
import rightIcon from '@/assets/home/rightIcon.png'
import doBg from '@/assets/home/doBg.jpg'
import wechartBg from '@/assets/home/Wechart.jpg'
import iconHjxfIcon from '@/assets/home/icon_hjxf.png'
import iconXfkcIcon from '@/assets/home/icon_xfkc.png'
// import doNumIcon from '@/assets/home/doNumIcon.png'
// import bestNumIcon from '@/assets/home/bestNumIcon.png'
import oneIcon from '@/assets/home/1.png'
import twoIcon from '@/assets/home/2.png'
import thirdIcon from '@/assets/home/3.png'
import locIcon from '@/assets/home/locIcon.png'
import rewardIcon from '@/assets/home/rewardIcon.png'
import time2Icon from '@/assets/home/time2Icon.png'
import school1Bg from '../assets/images/yibanxiao.jpg'
// import school7Bg from '../assets/home/试点园黄渡幼儿园.jpg'
// import school2Bg from '../assets/images/jidixiao.png'
import school3Bg from '../assets/images/lingxianxiao.jpg'
import school4Bg from '../assets/images/zhongdianxiao.jpg'
// import school5Bg from '../assets/home/加盟园.jpg'
import school6Bg from '../assets/images/shidianxiao.jpg'
import talkIcon from '../assets/home/悦谈.png'
import happyIcon from '../assets/home/晒幸福.png'
import dateIcon from '../assets/home/有约2.png'
import { getNews, getTabs } from '@/api/news/news'
import { getBigData } from '@/api/bigData/bigData'
import { getLessonLists} from '@/api/lesson/lesson'
import { getCourseSourceQuery } from '@/api/coursesource/index'
import moment from 'moment'
import FlutterDialog from '@/components/flutterDialog'

export default {
  components: {
    FlutterDialog
  },
  data() {
    return {
      activeTab1: null,
      activeTab2: '1',
      activeTab3: '1',
      activeTab4: '1',
      activeTab5: null,
      activeTab6: '1',
      activeTab7: '1',
      activeTab8: '1',
      activeTabRank: 'rankSecond',
      newsTabs: [],
      tabs: [],
      rank: [],
      rankJpk: [],
      rankKczy: [],
      newList: [],
      newList2: [],
      newList3: [],
      lessonList: [],
      challengeList: [],
      cards: [{
        icon: iconHjxfIcon,
        title: '嘉家幸福'
      },
      {
        icon: iconXfkcIcon,
        title: '特色展示'
      }],
      // cards: [{
      //   icon: schoolNumIcon,
      //   title: '区学校总数',
      //   color: 'rgba(64, 158, 255, 1)',
      //   num: '-'
      // }, {
      //   icon: courseNumIcon,
      //   title: '区课程资源总数',
      //   color: 'rgba(115, 115, 115, 1)',
      //   num: '-'
      // }, {
      //   icon: doNumIcon,
      //   title: '区实践资源总数',
      //   color: 'rgba(254, 174, 51, 1)',
      //   num: '-'
      // }, {
      //   icon: bestNumIcon,
      //   title: '区精品课程总数',
      //   color: 'rgba(104, 101, 254, 1)',
      //   num: '-'
      // }],
      arrowIcon,
      rightIcon,
      doBg,
      wechartBg,
      oneIcon,
      twoIcon,
      thirdIcon,
      locIcon,
      rewardIcon,
      time2Icon,
      talkIcon,
      happyIcon,
      dateIcon,
      schools: [{
      //   label: '基地校：启良中学',
      //   bg: school2Bg,
      //   id: 1
      // }, {
        label: '领衔校',
        bg: school3Bg,
        id: 2
      }, {
        label: '重点校',
        bg: school4Bg,
        id: 3
      }, {
        label: '一般项目校',
        bg: school1Bg,
        id: 4
      }, {
      //   label: '加盟园',
      //   bg: school5Bg,
      //   id: 6
      // }, {
        label: '试点园',
        bg: school6Bg,
        id: 5
      }],
      userId: '',
      userName: '',
      searchKey: ''
    }
  },
  computed: {
    type() {
      return 1
    },
    max() {
      return Math.max(...this.rank.map(item => item.pageView))
    },
    maxJpk() {
      return Math.max(...this.rankJpk.map(item => item.pageView))
    },
    maxKczy() {
      return Math.max(...this.rankKczy.map(item => item.viewTotal))
    }
  },
  watch: {
    activeTab5() {
      this.getNews2()
    }
  },
  async mounted() {
    this.userName = this.$store.getters.user.username
    this.userId = this.$store.getters.user.id
    await this.getTabs()
    this.getNews()
    this.getNews2()
    this.getNews3()
    this.getBigData()
    this.getLessonList()
    this.getList()
  },
  methods: {
    async getTabs() {
      return getTabs({
        type: this.type
      }).then(res => {
        this.newsTabs = res.slice(0, 2).map(tab => ({
          label: tab.title,
          value: '' + tab.id
        }))
        this.activeTab1 = this.newsTabs[0].value
        this.tabs = res.slice(2, 6).map(tab => ({
          label: tab.title,
          value: '' + tab.id
        }))
        this.activeTab5 = this.tabs[0].value
        this.curTab = 0
      })
    },
    getNews() {
      if (!this.newsTabs[0].value) return
      const params = {
        type: this.type,
        sort: 'id,desc',
        specialColumnId: this.newsTabs[0].value,
        page: 0,
        size: 4
      }
      getNews(params).then((res) => {
        this.newList = res.content || []
      })
    },
    getNews3() {
      if (!this.newsTabs[1].value) return

      const params = {
        type: this.type,
        sort: 'id,desc',
        page: 0,
        size: 4,
        specialColumnId: this.newsTabs[1].value
      }
      getNews(params).then((res) => {
        this.newList3 = res.content || []
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
    getNews2() {
      if (!this.activeTab5 || this.activeTab5 < 1) return
      this.newsList2 = []
      const params = {
        type: this.type,
        page: 0,
        size: 6,
        sort: 'id,desc',
        specialColumnId: this.activeTab5
      }
      getNews(params).then((res) => {
        if (res) {
          this.newList2 = res.content || []
          res.content.forEach(i => {
            i.updateTime = this.timeFormat(i.updateTime)
            i.createTime = this.timeFormat(i.createTime)
          })
        }
      })
    },
    getBigData() {
      getBigData({ top: 8 }).then(res => {
        // this.cards[0].num = res.numberOfSchool || 0
        // this.cards[1].num = res.numberOfCoursesInDis || 0
        // this.cards[2].num = res.numberOfHardwareInDis || 0
        // this.cards[3].num = res.numberOfQualityCoursesInDis || 0

        // this.cards = { ...this.cards }
        this.rank = res.top5CoursesViewed
        this.rankJpk = res.topNCoursesViewed
        this.rankKczy = res.topNCourseSourceViewed
        console.log('this.rankKczy', this.rank, this.rankJpk, this.rankKczy)
      })
    },
    getLessonList() {
      const params = {
        type: 1,
        page: 0,
        size: 8
      }
      getLessonLists(params).then((res) => {
        this.lessonList = res || []
      })
    },
    getColor(grade) {
      if (grade.includes('一') ||
        grade.includes('二') ||
        grade.includes('三') ||
        grade.includes('四') ||
        grade.includes('五') ||
        grade.includes('六')
      ) {
        return {
          bgColor: 'rgba(254, 174, 51, 0.16)',
          color: '#feae33'
        }
      } else {
        return {
          bgColor: 'rgba(64, 158, 255, 0.16)',
          color: '#409eff'
        }
      }
    },
    getList() {
      const params = {
        page: 0,
        size: 8
      }
      getCourseSourceQuery(params).then((res) => {
        this.challengeList = res?.content || []
      })
    },
    toSearchResult() {
      this.$router.push({ path: `/searchResult/index?key=${encodeURIComponent(this.searchKey)}` })
    },
    moment
  }
}
</script>

<style lang="scss" scoped>

.cards {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  /deep/ .el-tabs__header {
    margin: 0;
  }

  /deep/ .el-tabs {
    margin-bottom: 0;
  }

  /deep/ .el-tabs__nav-wrap {
    &::after {
      display: none;
    }
    .el-tabs__active-bar {
      // bottom: 0;
      background: #0084D2;
    }
    .is-active {
      font-weight:700;
      color:#0084D2 !important;
    }
    .el-tabs__item {
      color:#9b9b9b;
      font-size:18px;
      font-size: 18px;
    }
    .is-active::after {
      content: '';
    }
  }

  /deep/ .el-tabs__content {
    position: static;
    border-top: 1px solid #efefef;
  }

  /deep/ .el-empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card1 {
    width: 65.5%;
    position: relative;
  }
  .card2 {
    width: 32.5%;
    position: relative;
  }

  .card3 {
    width: 100%;
    position: relative;
    margin-top: 10px;
  }

  .more {
    position: absolute;
    right: 0;
    top: 0;
    color:#9b9b9b;
    font-size:16px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;
  }
}

.news {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 320px;
  gap: 12px;
  padding: 10px 4px;
  box-sizing: border-box;
  position: relative;
}

.news_big {
  height: 296px;
  padding: 16px 8px 8px;
  border-radius:8px;
  box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
  box-sizing:  border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;

  /deep/.el-image {
    width: 100%;
    height: 203px;
    border-radius: 6px;
  }

  .title {
    font-weight:500;
    color:#333333;
    font-size:16px;
    line-height:20px;
    height: 40px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .date {
    color:#9b9b9b;
    font-size:14px;
  }
}

.news_small {
  height: 90px;
  padding: 8px;
  border-radius:8px;
  box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
  box-sizing:  border-box;
  display: inline-flex;
  gap: 8px;
  width: 100%;

  /deep/.el-image {
    width: 112px;
    height: 74px;
    border-radius: 4px;
  }

  .box {
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: space-between;

    .title {
      font-weight:500;
      color:#333333;
      font-size:16px;
      line-height:20px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      height: 40px;
      -webkit-box-orient: vertical;
    }
    .date {
      color:#9b9b9b;
      font-size:14px;
    }
  }
}
.resources_searchbox{
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 16px;
  /deep/.el-input{
    height: 46px;
  }
  /deep/ .el-input-group > .el-input__inner{
    height: 46px;
    background: #f3f3f3;
    border-color: #f3f3f3;
  }
  /deep/ .el-input--medium{
    font-size: 16px;
  }
  /deep/ .el-input-group__append, .el-input-group__prepend{
    background: #0084D2;
    border-color: #0084D2;
    color: #ffffff;
  }
}

.resources {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /deep/.el-image {
    margin-top: 24px;
    width: 100%;
  }
}

.course {
  padding-top: 12px;
  box-sizing: border-box;
  height: 340px;
  /deep/ .el-tabs__nav-wrap {
    &::after {
      display: none;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .is-active {
      color:#fff !important;
      background-image:linear-gradient(180deg,#12d8d9 0%,#16cc82 100%);
    }
    .el-tabs__item {
      color:#9b9b9b;
      font-size:18px;
      font-size: 18px;
      padding: 0;
    }
    .is-active::after {
      content: '';
    }
    .el-tabs__nav-scroll {
      background: rgba(246, 245, 243, 1);
    }
  }
  /deep/ .el-tabs__content {
    border-top: none;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 12px 4px 4px;
    box-sizing: border-box;
    gap: 16px;
    height: 289px;
    position: relative;

    .cell {
      width: calc(50% - 8px);
      border-radius:8px;
      box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      padding: 8px;
      box-sizing: border-box;
      gap: 8px;
      cursor: pointer;
      align-self: flex-start;

      .calendar {
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        overflow: hidden;
        width: 80px;

        div:first-of-type {
          background-color:#49b1ef;
          color: #fff;
          height: 24px;
          text-align: center;
          font-size: 14px;
          line-height: 24px;
        }
        div:not(:first-of-type) {
          background-color:rgb(236, 247, 254);
          color: rgba(73, 177, 239, 1);
          height: 36px;
          text-align: center;
          font-size: 24px;
          line-height: 36px;
        }
      }

      .box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-weight:500;
          color:#333333;
          font-size:16px;
          line-height:20px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          height: 40px;
          -webkit-box-orient: vertical;
        }

        .date {
          color:#9b9b9b;
          font-size:14px;
        }
      }
    }
  }
}

.data {
  padding: 0 4px 4px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  box-sizing: border-box;
  .card {
    height:56px;
    border-radius:8px;
    width: calc(50% - 8px);
    padding: 18px 20px;
    line-height: 20px;
    box-sizing: border-box;
    &:first-of-type {
      background-color:#cfe6ff;
    }
    &:nth-of-type(2) {
      background-color:#c1ecd7;
    }
    // &:nth-of-type(3) {
    //   background-color:#f9e5c5;
    // }
    // &:nth-of-type(4) {
    //   background-color:#e5e5ff;
    // }

    /deep/.el-image {
      width: 20px;
      height: 20px;
    }

    .title {
      color: #333333;
      font-size:16px;
      font-weight: bold;
    }

    // .num {
    //   font-size: 16px;
    //   padding-left: 32px;
    // }

  }

  .rank {
    border-radius:8px;
    box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
    padding-top: 12px;
    margin-top: 16px;
    width: 100%;
    height: 290px;
    /deep/ .el-tabs__nav-wrap {
    &::after {
      display: none;
    }
  }
    /deep/ .el-tabs__active-bar {
      display: none;
    }
    /deep/ .el-tabs__item {
      height: 40px;
      line-height: 28px;
      font-size: 16px;
      padding: 0 20px;
      color: #666666;
    }
    /deep/ .el-tabs__item + .el-tabs__item{
      border-left: 1px solid #D8D8D8 !important;
    }
    /deep/ .el-tabs__content {
      border-top: none;
    }
    // .title {
    //   color:#333333;
    //   font-size:12px;
    //   border-bottom: 1px solid #e2e2e2;
    //   position: relative;
    //   height: 26px;
    //   line-height: 26px;
    //   padding-left: 20px;

    //   &::before {
    //     content: '';
    //     display: block;width:2px;
    //     height:12px;
    //     background-color:#00b41d;
    //     border-radius:2px;
    //     position: absolute;
    //     left: 12px;
    //     bottom: 6px;
    //   }
    // }

    .content {
      display: flex;
      padding: 16px 12px;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;

      > div {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        color:#333333;
        font-size:12px;

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color:#646464;
          font-size:12px;
          width: 170px;;
        }
        .progress {
          height:8px;
          background-image:linear-gradient(270deg,#49b1ef 0%,#a2d4f2 100%);
          border-radius:0px 6px 6px 0px;
        }
        .num {
          width: 13px;
          height: 13px;
          border-radius: 7px;
          text-align: center;
          line-height: 13px;
          color:#49b1ef;
          background-color:rgba($color: #49b1ef, $alpha: .16);
        }
      }
      /deep/ .el-empty__image {
        width: 80px;
      }
      /deep/ .el-empty {
        padding: 0;
        position: static;
        transform: none;
      }
    }
  }
}

.best {
  height: 512px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px 4px 16px;
  box-sizing: border-box;
  position: relative;

  .cell {
    width: calc(25% - 12px);
    height:250px;
    background-color:#ffffff;
    border-radius:8px;
    box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: pointer;
    position: relative;

    /deep/.el-image {
      width: 100%;
      height:182px;
    }

    .box {
      color:#333333;
      font-size:16px;
      padding: 10px 16px;
      box-sizing: border-box;

      .header {
        display: flex;
        gap: 8px;
        align-items: center;
        .tag {
          border-radius:2px;
          font-size:12px;
          padding: 3px 4px;
        }
        .title {
          color:#333333;
          font-size:16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .footer {
        display: flex;
        align-items: center;
        margin-top: 11px;
        color:#c2c2c2;
        font-size:14px;
        justify-content: space-between;

        /deep/.el-image {
          width: 14px;
          height: 14px;
        }
      }
    }
    .label {
      position: absolute;
      width:40px;
      height:20px;
      background-color:rgba(0, 0, 0, 0.3);
      border-radius:0px 8px 0px 8px;
      color: #fff;
      top: 0;
      right: 0;
      text-align: center;
      font-size: 12px;
      line-height: 20px;
    }
  }
}

.challenge {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.challengeItem{
  position: relative;
  width: calc(25% - 12px);
  box-sizing: border-box;
  border: 1px solid #e1e9f4;
  background-color:#ffffff;
  border-radius:8px;
  box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
  transition: .3s;
  border-radius: 8px;
  cursor: pointer;
  // margin-right: 32px;
  margin-top: 24px;
  padding: 8px;
  .img-box{
    width: 292px;
    height: 174px;
    border-radius: 8px;
  }
  .img-boxbg{
    display: none;
    text-align: center;
    line-height: 174px;
    color: #ffffff;
    // i{
    //   font-size: 40px;
    // }

  }
  .title-box{
    line-height: 26px;
    font-size: 16px;
    margin-top: 10px;
  }
  .remark{
    margin-top: 10px;
    height: 20px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .data{
    line-height: 20px;
    margin-top: 10px;
    font-size: 12px;
    color: #999999;
    div{
      display: inline-block;
      width: 34%;
    }
  }
}

.schoolbox {
  margin-top: 16px;
  margin-bottom: 20px;
  display: flex;
  gap: 16px;
  height: auto;
  cursor: pointer;
  flex-wrap: wrap;

  .school {
    height:176px;
    border-radius:8px;
    width: calc(25% - 12px);
    position: relative;
    overflow: hidden;

    /deep/ .el-image {
      width: 100%;
      height: 176px;
    }

    > div {
      position: absolute;
      bottom: 0;
      height:64px;
      background-image:linear-gradient(180deg,rgba(0, 0, 0, 0) 0%,#000000 100%);
      border-radius:0px 0px 8px 8px;
      text-align: center;
      width: 100%;

      > div {
        position: absolute;
        bottom: 16px;
        color:#ffffff;
        font-size:18px;
        text-align: center;
        width: 100%;
      }
    }
  }
}

</style>
