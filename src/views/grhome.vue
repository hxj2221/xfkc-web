<template>
  <div class="container">
    <div class="cardBg">
      <el-image

        fit="fill"
        :src="cardBg"
      />
      <div class="cell">
        <el-tabs v-model="activeTab1" style="height: 100%">
          <el-tab-pane v-if="newsTabs[0]" :label="newsTabs[0].label" :name="newsTabs[0].value">
            <el-carousel v-if="newsList.length > 0" style="height: 370px" :indicator-position="null">
              <el-carousel-item v-for="news in newsList" :key="news.id">
                <div class="news" @click="$router.push(`/grnews/grnewsDetail?id=${news.id}`)">
                  <el-image
                    fit="fill"
                    class="pic"
                    :src="$comm.url(news.pic)"
                  />
                  <div class="box">
                    <div>{{ news.title }}</div>
                    <div>{{ moment(news.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <el-empty v-else description="暂无数据" />
            <div slot="label" style="width:97px;" class="tab">
              {{ newsTabs[0].label }}
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="newsTabs[1]" :label="newsTabs[1].label" :name="newsTabs[1].value">
            <el-carousel v-if="news2List.length > 0" style="height: 370px" :indicator-position="null">
              <el-carousel-item v-for="news in news2List" :key="news.id">
                <div class="news" @click="$router.push(`/grnews/grnewsDetail?id=${news.id}`)">
                  <el-image
                    fit="fill"
                    class="pic"
                    :src="$comm.url(news.pic)"
                  />
                  <div class="box">
                    <div>{{ news.title }}</div>
                    <div>{{ moment(news.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div slot="label" style="width:130px;" class="tab">
              {{ newsTabs[1].label }}
            </div>
            <el-empty v-if="news2List.length === 0" description="暂无数据" />
          </el-tab-pane>
          <span
            class="more"
            @click="$router.push('/grnews/grnews?type=1')"
          >
            更多
            <el-image

              fit="fill"
              :src="moreIcon"
              style="height: 16px"
            />
          </span>
        </el-tabs>
      </div>
    </div>
    <el-image

      fit="fill"
      class="course-small"
      :src="courseSmall"
      @click="$router.push('/lessonLibrary/lessonLibrary')"
    />
    <el-image

      fit="fill"
      class="child-small"
      :src="childSmall"
    />
    <el-image

      fit="fill"
      class="do-small"
      :src="doSmall"
      @click="$router.push('/hardware/hardware')"
    />
    <el-image

      fit="fill"
      class="side1"
      :src="side2Icon"
    />
    <el-image

      fit="fill"
      class="side2"
      :src="side2Icon"
    />
    <el-image

      fit="fill"
      class="side3"
      :src="side2Icon"
    />
    <el-image

      fit="fill"
      class="side4"
      :src="side3Icon"
    />
    <el-image

      fit="fill"
      class="side5"
      :src="sideIcon"
    />
    <el-image

      fit="fill"
      class="side6"
      :src="side2Icon"
    />
    <el-image

      fit="fill"
      class="side7"
      :src="side3Icon"
    />
    <div class="card2">
      <el-image

        fit="fill"
        :src="card2Bg"
      />
      <div class="cell">
        <div class="header2">
          幸福课程精品栏目
          <span
            class="more"
            style="top: 2px"
            @click="$router.push('/grnews/grnews?type=2')"
          >
            更多
            <el-image

              fit="fill"
              :src="moreIcon"
              style="height: 16px"
            />
          </span>
        </div>
        <div class="points">
          <div v-for="(_, i) in (new Array(33).fill(''))" :key="i" class="point" />
        </div>
        <el-tabs v-model="activeTab2">
          <el-tab-pane v-for="tab in tabs" :key="tab.value" :label="tab.label" :name="tab.value">
            <div slot="label" style="width:97px;" class="tab">
              {{ tab.label }}
            </div>
            <div class="list">
              <div
                v-for="course in newList3"
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
              <el-empty v-if="newList3.length === 0" description="暂无数据" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-image

      fit="fill"
      :src="childGirl"
      class="girl"
    />
    <div class="data">
      <div class="content">
        <div class="header2">幸福课程大数据</div>
        <div style="width: calc(100% + 90px)">
          <div class="cell">
            <div class="title">{{ cards[0].title }}</div>
            <div class="num" :style="`color: ${cards[0].color}`">{{ cards[0].num }}</div>
            <el-image

              fit="fill"
              :src="cards[0].icon"
            />
          </div>
          <div class="cell">
            <div style="text-align: left;" class="title">{{ cards[1].title }}</div>
            <div class="num" :style="`color: ${cards[1].color}`">{{ cards[1].num }}</div>
            <el-image

              fit="fill"
              :src="cards[1].icon"
              style="align-self: flex-end;margin-right: 8px;"
            />
          </div>
          <div class="cell">
            <el-image

              fit="fill"
              :src="cards[2].icon"
            />
            <div class="num" :style="`color: ${cards[2].color}`">{{ cards[2].num }}</div>
            <div class="title">{{ cards[2].title }}</div>
          </div>
          <div class="cell">
            <el-image

              fit="fill"
              :src="cards[3].icon"
              style="align-self: flex-end;margin-right: 8px;"
            />
            <div class="num" :style="`color: ${cards[3].color}`">{{ cards[3].num }}</div>
            <div style="text-align: left;" class="title">{{ cards[3].title }}</div>
          </div>
        </div>
        <div class="header2" style="margin-top: 16px;" @click="$router.push('/bigData/bigData')">
          更多
          <el-image

            fit="fill"
            :src="arrowIcon"
            style="width: 8px;height: 12px;"
          />
        </div>
      </div>
    </div>
    <el-image

      fit="fill"
      :src="lineBg"
      class="line"
    />
    <div class="best-btn">
      <el-image

        fit="fill"
        style="width: 100%"
        :src="bestBg"
      />
      <div>精品课程推荐</div>
    </div>
    <div class="best">
      <div
        v-for="lesson in lessonList"
        :key="lesson.id"
        class="cell"
        @click="$router.push(`/lesson/lessondetail?id=${lesson.id}`)"
      >
        <el-image

          fit="fill"
          :src="$comm.url(lesson.coverImage)"
        />
        <div class="box" :style="`background: ${getRandomColor(lesson.id)}`">
          <div class="header2">
            <span class="title">{{ lesson.name }}</span>
          </div>
          <div class="footer">
            <span style="display: flex;align-items: center; gap: 4px">
              <el-image

                fit="fill"
                :src="loc2Icon"
              />
              {{ lesson.schoolName }}
            </span>
            {{ lesson.authorName }}
          </div>
        </div>
        <div class="label">精品</div>
      </div>
      <span
        class="more"
        style="top: -46px;right: -30px"
        @click="$router.push('/excellentCourse/excellentCourse')"
      >
        更多
        <el-image

          fit="fill"
          :src="moreIcon"
          style="height: 16px;"
        />
      </span>
    </div>
    <div class="challange">
      <el-image

        fit="fill"
        :src="dataTop"
      />
      <div class="title">幸福课程挑战中心</div>
      <span
        class="more"
        style="top: 30px;right: 40px;color: #fff"
        @click="$router.push('/challenge/index')"
      >
        更多
        <el-image

          fit="fill"
          :src="moreIcon"
          style="height: 16px;"
        />
      </span>
      <div class="list">
        <Marquee style="width: 100%;height: 100%;" direction="right">
          <div
            v-for="challenge in challengeList"
            :key="challenge.id"
            class="cell"
            @click="$router.push(`/DataUpload/DataUpload?id=${challenge.id}`)"
          >
            <el-image
              fit="fill"
              :src="$comm.url(challenge.picUrl)"
            />
            <div class="label">
              <el-image
                fit="fill"
                :src="reward2"
              />
              <span>积分：{{ challenge.rewardPoints }}</span>
            </div>
            <div class="box">
              {{ challenge.challengeName }}
              <div class="date">
                <el-image
                  fit="fill"
                  :src="time2Icon"
                />
                截止时间：{{ moment(challenge.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </div>
          </div>
        </Marquee>
      </div>
      <el-image

        fit="fill"
        :src="dataBottom"
      />
    </div>
    <div class="school">
      <el-image

        fit="fill"
        :src="bestBg"
        class="btn"
      />
      <div>幸福课程项目校</div>
      <div class="school1" @click="$router.push('/grschool/grschool?id=1')">
        <el-image

          fit="fill"
          :src="school2Bg"
        />
        <span>基&nbsp;&nbsp;地&nbsp;&nbsp;校<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>启&nbsp;&nbsp;良&nbsp;&nbsp;中&nbsp;&nbsp;学</span>
      </div>
      <div class="school2" @click="$router.push('/grschool/grschool?id=2')">
        <el-image

          fit="fill"
          :src="school3Bg"
        />
        <span>领&nbsp;&nbsp;衔&nbsp;&nbsp;校<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>上&nbsp;&nbsp;外&nbsp;&nbsp;嘉&nbsp;&nbsp;外</span>
      </div>
      <div class="school3" @click="$router.push('/grschool/grschool?id=3')">
        <el-image

          fit="fill"
          :src="school4Bg"
        />
        <span>重&nbsp;&nbsp;点&nbsp;&nbsp;校<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>中&nbsp;&nbsp;光&nbsp;&nbsp;高&nbsp;&nbsp;中</span>
      </div>
      <div class="school4" @click="$router.push('/grschool/grschool?id=4')">
        <el-image
          fit="fill"
          :src="school5Bg"
        />
        <span>一&nbsp;&nbsp;般&nbsp;&nbsp;项&nbsp;&nbsp;目&nbsp;&nbsp;校&nbsp;&nbsp;</span>
      </div>
      <div class="school5" @click="$router.push('/grschool/grschool?id=6')">
        <el-image
          fit="fill"
          :src="school6Bg"
        />
        <span>加&nbsp;&nbsp;盟&nbsp;&nbsp;园</span>
      </div>
      <div class="school6" @click="$router.push('/grschool/grschool?id=5')">
        <el-image
          fit="fill"
          :src="school7Bg"
        />
        <span>试&nbsp;&nbsp;点&nbsp;&nbsp;园&nbsp;&nbsp;</span>
      </div>
    </div>
    <el-image

      :src="bottomLine"
      class="bottom-line"
    />
  </div>
</template>

<script>

import cardBg from '@/assets/home/cardBg.png'
import moreIcon from '@/assets/home/moreIcon.png'
import courseSmall from '@/assets/home/courseSmall.png'
import childSmall from '@/assets/home/childSmall.png'
import doSmall from '@/assets/home/doSmall.png'
import sideIcon from '@/assets/home/sideIcon.png'
import side2Icon from '@/assets/home/side2.png'
import side3Icon from '@/assets/home/side3.png'
import card2Bg from '@/assets/home/card2bg.png'
import childGirl from '@/assets/home/childGirl.png'
import school2Icon from '@/assets/home/school2Icon.png'
import resource2Icon from '@/assets/home/resource2Icon.png'
import do2Icon from '@/assets/home/do2Icon.png'
import course2Icon from '@/assets/home/course2Icon.png'
import arrowIcon from '@/assets/home/arrow.png'
import lineBg from '@/assets/home/lineBg.png'
import bestBg from '@/assets/home/bestBg.png'
import loc2Icon from '@/assets/home/loc2Icon.png'
import dataTop from '@/assets/home/dataTop.png'
import dataBottom from '@/assets/home/dataBottom.png'
import reward2 from '@/assets/home/reward2.png'
import time2Icon from '@/assets/home/time2Icon.png'
import school2Bg from '../assets/images/jidixiao.png'
import school3Bg from '../assets/images/lingxianxiao.png'
import school4Bg from '../assets/images/zhongdianxiao.png'
import school5Bg from '../assets/images/蒙版组 57@2x.png'
import school6Bg from '../assets/home/加盟园.jpg'
import school7Bg from '../assets/home/试点园黄渡幼儿园.jpg'
import bottomLine from '@/assets/home/bottomLine.png'
import { getNews, getTabs } from '@/api/news/news'
import { getBigData } from '@/api/bigData/bigData'
import { getLessonList } from '@/api/lesson/lesson'
import { getList } from '@/api/challenge/challenge'
import Marquee from '@/components/marquee/index.vue'
import moment from 'moment'

export default {
  components: {
    Marquee
  },
  data() {
    return {
      cardBg,
      activeTab1: null,
      activeTab2: null,
      moreIcon,
      newsList: [],
      news2List: [],
      newList3: [],
      lessonList: [],
      challengeList: [],
      courseSmall,
      childSmall,
      doSmall,
      sideIcon,
      side2Icon,
      side3Icon,
      card2Bg,
      childGirl,
      newsTabs: [],
      tabs: [],
      cards: [{
        icon: school2Icon,
        title: '区学校总数',
        color: 'rgba(64, 158, 255, 1)',
        num: '-'
      }, {
        icon: resource2Icon,
        title: '区课程资源总数',
        color: 'rgba(115, 115, 115, 1)',
        num: '-'
      }, {
        icon: do2Icon,
        title: '区实践资源总数',
        color: 'rgba(254, 174, 51, 1)',
        num: '-'
      }, {
        icon: course2Icon,
        title: '区精品课程总数',
        color: 'rgba(104, 101, 254, 1)',
        num: '-'
      }],
      colors: ['#f28a89', '#80d3e2', '#f9b14b', '#91d7ba', '#c3d454', '#f96668'],
      school2Icon,
      resource2Icon,
      do2Icon,
      course2Icon,
      arrowIcon,
      bestBg,
      lineBg,
      loc2Icon,
      dataTop,
      dataBottom,
      reward2,
      time2Icon,
      school2Bg,
      school3Bg,
      school4Bg,
      school5Bg,
      school6Bg,
      school7Bg,
      bottomLine
    }
  },
  computed: {
    type() {
      return 1
    }
  },
  watch: {
    activeTab2() {
      this.getNews3()
    }
  },
  async mounted() {
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
        this.activeTab2 = this.tabs[0].value
        this.curTab = 0
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
    getNews() {
      if (!this.newsTabs[0].value) return

      this.newsList = []
      const params = {
        type: this.type,
        page: 0,
        size: 8,
        sort: 'id,desc',
        specialColumnId: this.newsTabs[0].value
      }
      getNews(params).then((res) => {
        if (res) {
          this.newsList = res.content
          res.content.forEach(i => {
            i.updateTime = this.timeFormat(i.updateTime)
            i.createTime = this.timeFormat(i.createTime)
          })
        }
      })
    },
    getNews2() {
      if (!this.newsTabs[1].value) return

      this.news2List = []
      const params = {
        type: this.type,
        page: 0,
        size: 8,
        sort: 'id,desc',
        specialColumnId: this.newsTabs[1].value
      }
      getNews(params).then((res) => {
        if (res) {
          this.news2List = res.content
          res.content.forEach(i => {
            i.updateTime = this.timeFormat(i.updateTime)
            i.createTime = this.timeFormat(i.createTime)
          })
        }
      })
    },
    getNews3() {
      if (!this.activeTab2) return

      this.newList3 = []
      const params = {
        type: this.type,
        page: 0,
        size: 3,
        sort: 'id,desc',
        specialColumnId: this.activeTab2
      }
      getNews(params).then((res) => {
        if (res) {
          this.newList3 = res.content
          res.content.forEach(i => {
            i.updateTime = this.timeFormat(i.updateTime)
            i.createTime = this.timeFormat(i.createTime)
          })
        }
      })
    },
    getBigData() {
      getBigData().then(res => {
        this.cards[0].num = res.numberOfSchool || 0
        this.cards[1].num = res.numberOfCoursesInDis || 0
        this.cards[2].num = res.numberOfHardwareInDis || 0
        this.cards[3].num = res.numberOfQualityCoursesInDis || 0

        this.cards = { ...this.cards }
        this.rank = res.top5CoursesViewed
      })
    },
    getLessonList() {
      const params = {
        type: this.type,
        page: 0,
        size: 6
      }
      getLessonList(params).then((res) => {
        this.lessonList = res.content || []
      })
    },
    getRandomColor(id) {
      return this.colors[id % 6]
    },
    getList() {
      const params = {
        type: this.type,
        sort: 'id,desc',
        page: 0,
        size: 8
      }
      getList(params).then((res) => {
        this.challengeList = res.content
      })
    },
    moment
  }
}
</script>

<style lang="scss" scoped>

.container {
  position: relative;
  width: 100%;
  height: 100%;

  .cardBg {
    width:525px;
    height:522px;
    position: absolute;
    top: 16px;
    left: 110px;

    /deep/.el-image {
      width: 100%;
      height: 100%;
    }

    /deep/.el-carousel__container {
      height: 100% !important;
    }
    /deep/.el-carousel__arrow {
      display: none;
    }

    .cell {
      height: 444px;
      width: 100%;
      padding: 24px 32px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      .news {
        background: #fff;
        border-radius:8px;
        box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        cursor: pointer;

        .pic {
          width: 100%;
          height: 284px;
        }

        .box {
          padding: 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 10px;

          > div:first-of-type {
            font-weight:500;
            color:#333333;
            font-size:16px;
            line-height:24px;
            text-overflow: ellipsis;
            overflow: hidden;
            height: 24px;
            white-space: nowrap;
          }
          > div:nth-of-type(2) {
            color:#9b9b9b;
            font-size:14px;
          }
        }
      }
    }
  }

  /deep/ .el-tabs__item {
    padding: 0 0 0 15px;
    .tab {
      color: rgba(140, 140, 140, 1);
      background: rgba(215, 215, 215, 1);
    }
  }
  /deep/ .is-active {
    .tab {
      background: rgba(147, 213, 185, 1);
      color: #fff;
    }
  }

  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }

  /deep/ .el-tabs__active-bar {
    display: none;
  }

  /deep/ .el-tabs__content {
    position: static;
  }

  /deep/ .el-tabs__header {
    margin: 0;
  }

  .tab {
    height:32px;
    border-radius:16px;
    line-height: 32px;
    text-align: center;
  }

  .more {
    position: absolute;
    right: 40px;
    top: 20px;
    color:rgba(100, 100, 100, 1);
    font-size:16px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;

    /deep/ .el-image {
      width: unset !important;
    }
  }

  .course-small {
    width: 258px;
    height: 258px;
    position: absolute;
    top: 56px;
    left: 718px;
    padding: 6px;
    border:6px solid;
    border-color:#ccdf58;
    border-radius: 141px;
    cursor: pointer;
  }

  .child-small {
    width: 135px;
    height: 223px;
    position: absolute;
    top: 52px;
    left: 980px;
  }

  .do-small {
    top: 271px;
    position: absolute;
    left: 936px;
    width: 258px;
    height: 258px;
    padding: 6px;
    border:6px solid;
    border-color:rgba(248, 180, 83, 1);
    border-radius: 141px;
    cursor: pointer;
  }
  .side1 {
    width: 102px;
    height: 59px;
    position: absolute;
    left: -250px;
    top: 370px;
  }
  .side2 {
    width: 102px;
    height: 59px;
    position: absolute;
    left: -40px;
    top: 746px;
  }
  .side3 {
    width: 102px;
    height: 59px;
    position: absolute;
    left: -70px;
    top: 2100px;
  }
  .side4 {
    width: 102px;
    height: 59px;
    position: absolute;
    left: -62px;
    top: 2350px;
  }
  .side5 {
    width: 132px;
    height: 106px;
    position: absolute;
    right: -160px;
    top: 391px;
  }
  .side6 {
    width: 102px;
    height: 59px;
    position: absolute;
    right: -200px;
    top: 1221px;
  }
  .side7 {
    width: 102px;
    height: 59px;
    position: absolute;
    right: -40px;
    top: 1600px;
  }

  .card2 {
    width: 525px;
    height: 444px;
    position: absolute;
    top: 570px;
    left: 110px;

    /deep/ .el-tabs__nav-scroll {
      padding: 0 32px;
      box-sizing: border-box;
      margin-top: 16px;
    }

    /deep/.el-image {
      width: 100%;
      height: 100%;
    }

    .cell {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .header2 {
        width: 100%;
        height: 44px;
        font-weight:500;
        color:#6bb797;
        font-size:18px;
        position: relative;
        line-height: 44px;
        top: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .points {
        display: flex;
        gap: 8px;
        margin: 0 33px;
        margin-top: 4px;

        .point {
          width:6px;
          height:6px;
          border-radius: 3px;
        }

        .point:nth-of-type(2n) {
          background-color:#6bb797;
        }
        .point:nth-of-type(2n+1) {
          background: #93d5b9;
        }
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        padding: 12px 4px 4px;
        box-sizing: border-box;
        gap: 16px;
        flex-direction: column;
        align-items: center;

        .cell {
          width: calc(100% - 64px);
          height: 84px;
          border-radius:8px;
          box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          padding: 12px;
          box-sizing: border-box;
          gap: 8px;
          cursor: pointer;
          position: static;
          background: #fff;

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
  }

  .girl {
    width:235px;
    height:280px;
    position: absolute;
    top: 839px;
    left: -110px;
    z-index: 4;
  }
  .data {
    width: 382px;
    height: 382px;
    border-radius: 191px;
    border: 6px solid rgba(249, 103, 104, 1);
    box-shadow:0px 3px 6px rgba(0, 0, 0, 0.16);
    position: absolute;
    top: 610px;
    left: 720px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .content {
      width: 360px;
      height: 360px;
      border-radius: 180px;
      overflow: hidden;

      .header2 {
        height: 44px;
        background: rgba(249, 103, 104, 1);
        width: 100%;
        font-weight:500;
        color:#ffffff;
        font-size:18px;
        text-align: center;
        line-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

        &:last-of-type {
          cursor: pointer;
        }
      }

      .cell {
        background-color:#ffffff;
        box-shadow:0px 3px 6px rgba(0, 0, 0, 0.16);
        width: calc(50% - 52px);
        height: 112px;
        display: inline-flex;
        margin-right: 16px;
        margin-top: 16px;
        padding: 18px;
        box-sizing: border-box;
        flex-direction: column;
        gap: 10px;

        .title {
          color:#737373;
          font-size:14px;
          text-align: right;
        }
        .num {
          font-weight:500;
          font-size:20px;
          text-align: center;
        }
        /deep/.el-image {
          width:24px;
          height:24px;
        }
      }
    }
  }

  .line {
    width: 188.6%;
    position: absolute;
    top: 1070px;
    left: -45%;
    height: 19px;
  }

  .best-btn {
    width: 208px;
    position: absolute;
    top: 1078px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    position: relative;

    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight:500;
      color:#ffffff;
      font-size:20px;
      width: 100%;
      text-align: center;
    }
  }

  .best {
    top: 1142px;
    position: absolute;
    left: 50%;
    display: flex;
    width: 1150px;
    gap: 24px;
    flex-wrap: wrap;
    transform: translateX(-50%);

    .cell {
      width: calc(33.3% - 24px);
      height: 301px;
      background:#fff;
      border-radius: 45px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: column;

      /deep/.el-image {
        width: 100%;
        height: 215px;
      }

      .box {
        color:#333333;
        font-size:16px;
        padding: 20px 24px 20px 24px;
        box-sizing: border-box;

        .header2 {
          display: flex;
          gap: 8px;
          align-items: center;
          .title {
            color:#fff;
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
          color:#fff;
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
        top: 20px;
        right: 32px;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }

  .challange {
    top: 1899px;
    left: 50%;
    transform: translateX(-50%);
    width: 1150px;
    height: 471px;
    display: flex;
    gap: 16px;
    position: absolute;
    flex-direction: column;

    .title {
      position: absolute;
      top: 10px;
      left: calc(50% + 10px);
      transform: translateX(-50%);
      font-weight:500;
      color:#ffffff;
      font-size:18px;
    }

    .list {
      /deep/ .rolling-content {
        width: 100% !important;
        height: 100% !important;
        white-space: nowrap;
      }

      height: 422px;
      width: 100%;
      display: flex;
      padding: 8px 4px 4px;
      box-sizing: border-box;

      .cell {
        width: calc(33.3% - 16px);
        height: 342px;
        background-color:#ffffff;
        border-radius:8px;
        box-shadow:0px 3px 6px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        cursor: pointer;
        display: inline-block;

        /deep/.el-image {
          width: 100%;
          height:240px;
        }

        .label {
          position: absolute;
          top: 260px;
          right: 16px;
          width: 144px;
          height: 40px;
          background-color:rgba($color: #29c677, $alpha: .16);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color:#29c677;
          font-size:16px;
          gap: 8px;

          /deep/.el-image {
            width: 20px;
            height: 20px;
          }
        }

        .box {
          padding: 26px 16px 24px 16px;
          box-sizing: border-box;
          display: flex;
          gap: 23px;
          color:#333333;
          font-size:16px;
          flex-direction: column;
          justify-content: space-between;

          .date {
            display: flex;
            align-items: center;
            color:#c2c2c2;
            font-size:14px;
            gap: 4px;

            /deep/.el-image {
              width:14px;
              height:14px;
            }
          }

          .btn {
            font-weight:700;
            color:#ffffff;
            font-size:20px;
            background-color:#72c3f0;
            border-radius:2px;
            box-shadow:0px 3px 6px rgba(73, 177, 239, 0.24);
            border: none;
            width: 125px;
          }
        }

        &:not(:first-of-type) {
          margin-left: 16px;
        }
      }
    }
  }

  .school {
    top:2413px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 208px;
    height: 59px;
    font-weight:500;
    color:#ffffff;
    font-size:20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    > div {
      z-index: 10;
    }

    /deep/ .el-image {
      overflow: hidden;
    }

    .school1 {
      width:300px;
      height:300px;
      background-color:#c3d454;
      border-radius:45px;
      position: absolute;
      font-weight:500;
      color:#ffffff;
      font-size:22px;
      line-height:32px;
      top: 79px;
      left: -529px;
      cursor: pointer;

      /deep/.el-image {
        width:212px;
        height:284px;
        border-radius:0px 37px 37px 0px;
        top: 8px;
        right: 8px;
        position: absolute;
      }
      > span {
        writing-mode: vertical-lr;
        margin: 28px 29px;
      }
    }

    .school2 {
      width:300px;
      height:300px;
      background-color:#80d3e2;
      border-radius:45px;
      position: absolute;
      font-weight:500;
      color:#ffffff;
      font-size:22px;
      line-height:32px;
      top: 120px;
      left: -199px;
      cursor: pointer;

      /deep/.el-image {
        width:212px;
        height:284px;
        border-radius:0px 37px 37px 0px;
        position: absolute;
        top: 8px;
        right: 8px;
      }
      > span {
        writing-mode: vertical-lr;
        margin: 28px 29px;
      }
    }

    .school3 {
      width:300px;
      height:300px;
      background-color:#f96668;
      border-radius: 45px;
      position: absolute;
      font-weight:500;
      color:#ffffff;
      font-size:22px;
      line-height:32px;
      top: 79px;
      left: 130px;
      cursor: pointer;

      /deep/.el-image {
        width:212px;
        height:284px;
        border-radius:0px 37px 37px 0px;
        top: 8px;
        right: 8px;
        position: absolute;
      }
      > span {
        writing-mode: vertical-lr;
        margin: 28px 29px;
      }
    }

    .school4 {
      width:300px;
      height:300px;
      background-color:#91d7ba;
      border-radius: 45px;
      position: absolute;
      font-weight:500;
      color:#ffffff;
      font-size:22px;
      line-height:32px;
      top: 120px;
      left: 460px;
      cursor: pointer;

      /deep/.el-image {
        width:212px;
        height:284px;
        border-radius:0px 37px 37px 0px;
        top: 8px;
        right: 8px;
        position: absolute;
      }
      > span {
        writing-mode: vertical-lr;
        margin: 28px 29px;
      }
    }

    .school5 {
      width:300px;
      height:300px;
      background-color:#29c677;
      border-radius:45px;
      position: absolute;
      font-weight:500;
      color:#ffffff;
      font-size:22px;
      line-height:32px;
      top: 500px;
      left: -529px;
      cursor: pointer;

      /deep/.el-image {
        width:212px;
        height:284px;
        border-radius:0px 37px 37px 0px;
        top: 8px;
        right: 8px;
        position: absolute;
      }
      > span {
        writing-mode: vertical-lr;
        margin: 28px 29px;
      }
    }

    .school6 {
      width:300px;
      height:300px;
      background-color:#49b1ef;
      border-radius:45px;
      position: absolute;
      font-weight:500;
      color:#ffffff;
      font-size:22px;
      line-height:32px;
      top: 464px;
      left: -200px;
      cursor: pointer;

      /deep/.el-image {
        width:212px;
        height:284px;
        border-radius:0px 37px 37px 0px;
        top: 8px;
        right: 8px;
        position: absolute;
      }
      > span {
        writing-mode: vertical-lr;
        margin: 28px 29px;
      }
    }
  }

  .bottom-line {
    width: 187.7%;
    position: absolute;
    top: 3294px;
    left: -44%;
    height: 46px;
  }
}

</style>
