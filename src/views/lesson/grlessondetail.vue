<template>
  <div class="lesson-main">
    <grcrumbs />
    <div class="lesson-main-video">
      <div class="detail-title">
        <span>{{ lessonDetail.name }}</span>
        <div class="share" @click="share">
          <img src="../../assets/lesson/grshare.png" alt>
          分享
        </div>
      </div>
      <div class="detail-subtitle">
        <el-image class="school-logo" :src="require('../../assets/lesson/schoollogo.png')" alt />
        <span class="school-name">{{ lessonDetail.schoolName }}</span>
        <span class="school-teacher">{{ lessonDetail.authorName }}</span>
        <span class="school-title">课程评分</span>
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}分"
        />
      </div>
      <div class="detail-already">
        <el-image :src="require('../../assets/lesson/already.png')" alt />
        已有
        <span class="num">{{ lessonDetail.pageView }}</span>人学过该课程
      </div>
      <div class="detail-student">
        <el-image :src="require('../../assets/lesson/peoplle.png')" alt />
      </div>
      <div class="detail-video">
        <span v-show="typePlay === 'video' && videoUrl !== '无视频'">
          <video id="myVideo" ref="myVideo" class="video-js vjs-big-play-centered">
            <source :src="videoUrl" type="video/mp4">
          </video>
        </span>
        <div v-show="typePlay === 'ppt'">
          <iframe :src="pptUrl" width="100%" height="588px" frameborder="1" />
        </div>
        <div v-show="typePlay === 'video' && videoUrl === '无视频'" class="no-video-message">
          该课程暂无视频内容
        </div>
      </div>
      <div class="detail-tab">
        <div class="detail-tab-select">
          <ul>
            <li
              :class="videoSelect === 1 ? 'active' : ''"
              @click="changevideo(1)"
            >
              <el-image :src="img1" alt /> 课程目录
            </li>
            <li
              v-if="roleId === 2"
              :class="videoSelect === 2 ? 'active' : ''"
              @click="changevideo(2)"
            >
              <el-image :src="img2" alt /> 课程笔记
            </li>
            <li
              v-if="roleId === 2"
              :class="videoSelect === 3 ? 'active' : ''"
              @click="changevideo(3)"
            >
              <el-image :src="img3" alt /> 历史笔记
            </li>
          </ul>
        </div>
        <div v-show="videoSelect === 1" class="detail-tab-content">
          <div
            v-for="item in lessonList"
            :key="item.episode"
            :class="[
              'content-item',
              item.episode === selectLesson ? 'active' : '',
            ]"
            @click="
              changeItem(
                item.episode,
                item.id,
                item.coursewareTitle,
                item.coursewareSource,
                item.source
              )
            "
          >
            <div class="lesson-title">第{{ item.episode }}课</div>
            <div>{{ item.name }}</div>
          </div>
        </div>
        <div
          v-show="videoSelect === 2"
          class="detail-tab-content text-distance"
        >
          <el-input
            v-model="lessonNote"
            class="class-note"
            type="textarea"
            placeholder="这是记录课堂笔记的地方哦..."
            :autosize="{ minRows: 24, maxRows: 24 }"
          />
          <div class="submit" @click="setnote">发布</div>
        </div>
        <div v-show="videoSelect === 3" class="detail-tab-content text-history">
          <div
            v-for="item in historyNote"
            :key="item.id"
            class="history-content"
          >
            <div class="content-title">{{ item.notes }}</div>
            <div class="content-time">{{ item.updateTime }}</div>
            <div class="line" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="roleId != 6" class="lesson-main-commont">
      <el-image class="girl" :src="require('../../assets/home/girl.png')" alt />
      <span class="text">给课程打分</span>
      <el-rate v-model="comment" :allow-half="true" :colors="['#57b715', '#57b715', '#57b715']" void-color="#73c66d" />
      <span class="score">{{ comment }}分</span>
      <span class="tip">
        系列课程只可以提交一次分数哦，请谨慎评分
        <el-image :src="require('../../assets/lesson/one.png')" alt />
      </span>
      <span class="submit" @click="video">提交</span>
    </div>
    <div v-if="roleId != 6" class="lesson-main-introduce">
      <div class="main-left">
        <div class="detail-tab-select">
          <ul>
            <li
              :class="lessonSelect === 1 ? 'active' : ''"
              @click="changeLesson(1)"
            >
              <el-image :src="img4" alt /> 课程介绍
            </li>
            <li
              :class="lessonSelect === 2 ? 'active' : ''"
              @click="changeLesson(2)"
            >
              <el-image :src="img5" alt /> 课程评价
            </li>
          </ul>
        </div>
        <div v-show="lessonSelect === 1" class="detail-tab-content" v-html="lessonDetail.briefIntroduction" />
        <div v-show="lessonSelect === 2" class="detail-tab-comment">
          <class-common />
        </div>
      </div>
      <div class="main-right">
        <div class="right-title">
          <span class="download">资料下载</span>
        </div>
        <div v-if="courseWare.name" class="right-text">
          {{ courseWare.name }}
          <div class="download">
            <el-image :src="require('../../assets/lesson/downicon.png')" alt />
            <a :href="$comm.url(courseWare.url)" download>下载</a>
          </div>
        </div>
        <div v-else class="right-text">无可下载资料</div>
      </div>
    </div>
    <el-dialog
      title
      :visible.sync="dialogVisible2"
      :center="true"
      width="30%"
      :before-close="handleClose"
    >
      <div style="text-align: center; margin-top: 12px">
        <el-image
          style="heigt: 158px; width: 158px"
          :src="require('../../assets/challenge/success.png')"
          alt
        />
      </div>
      <div style="text-align: center; margin-top: 12px">请等待管理员审核!</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="closeDialog"
        >好 的</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title
      :visible.sync="dialogVisible"
      :center="true"
      width="30%"
      :before-close="handleClose"
    >
      <div style="text-align: center; margin-top: 12px">
        <el-image
          style="heigt: 158px; width: 158px"
          :src="require('../../assets/challenge/success.png')"
          alt
        />
      </div>
      <div style="text-align: center; margin-top: 12px">已发布笔记</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="closeDialog"
        >好 的</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title
      :visible.sync="dialogVisible3"
      :center="true"
      width="30%"
      :before-close="handleClose"
    >
      <div style="text-align: center; margin-top: 12px">
        <el-image
          style="heigt: 158px; width: 158px"
          :src="require('../../assets/challenge/success.png')"
          alt
        />
      </div>
      <div style="text-align: center; margin-top: 12px">评论不能为空哦</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="closeDialog"
        >好 的</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import Avatar from '@/assets/images/avatar.png'
import { mapGetters } from 'vuex'
import classCommon from '@/components/classCommon/classCommon.vue'
import {
  getVideo,
  setNote,
  getNote,
  setScore,
  recordProcess,
  judgeVideo
} from '@/api/lesson/lesson'
export default {
  name: 'Grlessondetail',
  components: {
    classCommon,
    grcrumbs
  },
  data() {
    return {
      pptUrl: '',
      typePlay: '',
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      twoCodes: '', // 分享
      roleId: 0,
      Avatar: Avatar,
      value: 0, // 得分
      comment: null, // 评分
      videoSelect: 1, // 右侧tab选择
      lessonSelect: 1, // 底部tab选择
      img1: require('../../assets/lesson/grlist2.png'), // 右侧tab小图标
      img2: require('../../assets/lesson/grnote1.png'), // 右侧tab小图标
      img3: require('../../assets/lesson/grhis1.png'), // 右侧tab小图标
      img4: require('../../assets/lesson/grintro2.png'), // 课程tab
      img5: require('../../assets/lesson/grcommont1.png'), // 课程tab
      lessonList: [], // 课程列表
      selectLesson: 0, // 选择课程
      lessonNote: '', // 课堂笔记
      historyNote: [], // 历史笔记
      lessonDetail: {}, // 课程详情
      videoPlayer: null, // 播放器实例
      courseId: 0, // 课程id
      courseWare: {
        // 课件
        name: '',
        url: ''
      },
      size: 5,
      lessonId: 0,
      videoUrl: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'baseApi'])
  },
  created() {
    this.lessonId = this.$route.query.id
    this.roleId = Number(this.$store.state.user.roleId)
    this.getDetail()
  },
  mounted() {
    this.initVideo() // 初始化视频
  },
  methods: {
    // 分享
    share() {
      this.twoCodes = window.location.href
      alert('已复制连接，快去分享吧')
      this.$copyText(this.twoCodes).then()
    },

    // 视频记录
    judgeVideo() {
      const params = {
        courseTitleId: Number(this.$route.query.id)
      }
      judgeVideo(params)
        .then((res) => {
          const currentLesson = !res.watchTime ? this.lessonList[0] : this.lessonList[res.episode - 1]

          this.changeItem(
            currentLesson.episode,
            currentLesson.id,
            currentLesson.coursewareTitle,
            currentLesson.coursewareSource,
            currentLesson.source,
            res.watchTime
          )

          // this.selectLesson = res.episode
          // this.lessonList.forEach((i) => {
          //   if (i.episode === this.selectLesson) {
          //     // 若播放器初始化完成，则直接设定播放地址和观看进度
          //     if (this.videoPlayer) {
          //       const source = this.$comm.url(i.source)
          //       this.videoPlayer.src(source)
          //       this.videoPlayer.currentTime(res.watchTime)
          //       this.typePlay = 'video'
          //     }
          //   }
          // })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 时间戳转换
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
    // 获取课程详情
    getDetail() {
      const params = {
        id: this.lessonId
      }
      getVideo(params)
        .then((res) => {
          if (res.scorePersonNumber !== 0) {
            this.value = Number(
              (res.totalPoints / res.scorePersonNumber).toFixed(1)
            )
          } else {
            this.value = 0
          }
          this.lessonDetail = res
          this.lessonList = res.courseList
          this.chapterId = this.lessonList[0].id
          this.judgeVideo()
          this.videoUrl = res.videoUrl
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 获得笔记
    getnote() {
      if (!this.courseId) {
        return
      }
      const params = {
        courseId: this.courseId
      }
      getNote(params)
        .then((res) => {
          res.forEach((i) => {
            i.updateTime = this.timeFormat(i.updateTime)
          })
          this.historyNote = res
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 提交笔记
    setnote() {
      const params = {
        notes: this.lessonNote,
        courseId: this.courseId
      }
      setNote(params)
        .then((res) => {
          if (res.id) {
            this.dialogVisible = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 初始化视频方法
    initVideo() {
      var _this = this
      this.videoPlayer = this.$video(
        this.$refs.myVideo,
        {
          // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          // 自动播放属性,muted:静音播放
          autoplay: false,
          // autoplay: 'muted',
          // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: 'auto',
          // 设置视频播放器的显示宽度（以像素为单位）
          width: '908px',
          // 设置视频播放器的显示高度（以像素为单位）
          height: '561px'
          // 设置暂停播放回调函数
        },
        function() {
          this.on('pause', function() {
            // this.videoPlayer.currentTime()
            const params = {
              courseTitleId: Number(_this.lessonId),
              episode: _this.selectLesson,
              watchTime: _this.videoPlayer.currentTime()
            }
            recordProcess(params)
              .then((res) => {
                if (res.scorePersonNumber !== 0) {
                  this.value = Number(
                    (res.totalPoints / res.scorePersonNumber).toFixed(1)
                  )
                } else {
                  this.value = 0
                }
                this.lessonDetail = res
                this.lessonList = res.courseList
              })
              .catch((error) => {
                console.log(error)
              })
          })
        }
      )
    },

    // 评分
    video() {
      const data = {
        score: this.comment,
        courseTitleId: this.lessonDetail.id
      }
      setScore(data)
        .then((res) => {})
        .catch((error) => {
          console.log(error)
        })
    },

    // 右侧tab切换
    changevideo(val) {
      if (val === 2) {
        this.lessonNote = ''
      } else if (val === 3) {
        this.getnote()
      }
      this.img1 = require('../../assets/lesson/grlist1.png')
      this.img2 = require('../../assets/lesson/grnote1.png')
      this.img3 = require('../../assets/lesson/grhis1.png')
      switch (val) {
        case 1:
          this.img1 = require('../../assets/lesson/grlist2.png')
          break
        case 2:
          this.img2 = require('../../assets/lesson/grnote2.png')
          break
        case 3:
          this.img3 = require('../../assets/lesson/grhis2.png')
          break
      }
      this.videoSelect = val
    },

    //  底部tab切换
    changeLesson(val) {
      this.img4 = require('../../assets/lesson/grintro1.png')
      this.img5 = require('../../assets/lesson/grcommont1.png')
      switch (val) {
        case 1:
          this.img4 = require('../../assets/lesson/grintro2.png')
          break
        case 2:
          this.img5 = require('../../assets/lesson/grcommont2.png')
          break
      }
      this.lessonSelect = val
    },

    // 选择课程
    changeItem(e, note, courseName, courseUrl, video, watchTime) {
      this.selectLesson = e
      this.courseId = note
      this.courseWare.name = courseName
      this.courseWare.url = courseUrl
      this.videoUrl = video || '无视频'
      const url = this.$comm.url(video)
      if (
        url.substring(url.length - 3, url.length) === 'ppt' ||
        url.substring(url.length - 3, url.length) === 'ptx'
      ) {
        this.typePlay = 'ppt'
        this.pptUrl = 'https://api.idocv.com/view/url?url=' + url
      } else {
        this.typePlay = 'video'
        this.videoPlayer.src(url)
        if (this.videoPlayer) {
          this.videoPlayer.currentTime(watchTime)
        }
      }
    },

    // 关闭弹窗
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    closeDialog() {
      this.dialogVisible = false
      this.dialogVisible2 = false
      this.dialogVisible3 = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.lesson-main {
  width: 1366px;
  margin: 0 auto;
  .lesson-main-video {
    position: relative;
    margin-top: 20px;
    padding: 171px 60px 12px;
    height: 877px;
    background: url("../../assets/lesson/grdetail.png");
    border-radius: 20px;
    background-size: 100% 100%;
    .detail-title {
      display: flex;
      font-size: 28px;
      color: #242424;
      font-weight: bold;
      .share {
        display: flex;
        margin-left: 10px;
        align-items: center;
        padding-left: 15px;
        width: 88px;
        border-radius: 30px;
        border: 1px solid #2d8815;
        height: 29px;
        line-height: 29px;
        color: #2d8815;
        font-size: 16px;
        cursor: pointer;
        img {
          margin-right: 6px;
        }
      }
    }
    .detail-subtitle {
      margin-top: 4px;
      width: 1000px;
      display: flex;
      .school-logo {
        width: 24px;
        height: 24px;
      }
      .school-name {
        font-size: 18px;
        font-weight: bold;
        margin-left: 5px;
      }
      .school-teacher {
        font-size: 18px;
        margin-left: 30px;
        margin-right: 55px;
      }
      .school-title {
        font-size: 18px;
        color: #707070;
        margin-right: 5px;
      }
    }
    .detail-already {
      color: #707070;
      margin-top: 8px;
      .num {
        color: #ff7d0c;
      }
      img {
        width: 18px;
        height: 18px;
        margin-left: 3px;
        vertical-align: middle;
      }
    }
    .detail-student {
      position: absolute;
      top: 150px;
      right: 69px;
    }
    .detail-video {
      display: inline-block;
      overflow: hidden;
      width: 953px;
      height: 588px;
      background-color: #111;
      border-radius: 20px;
      margin-top: 10px;
      .no-video-message {
        color: #fff;
        font-size: 24px;
        text-align: center;
        line-height: 588px;
        background-color: #333;
        border-radius: 15px;
        height: 100%;
        width: 100%;
      }
    }
    .detail-tab {
      display: inline-block;
      vertical-align: top;
      width: 300px;
      height: 559px;
      margin-left: 30px;
      margin-top: 31px;
      .detail-tab-select {
        ul {
          display: flex;
          li {
            font-weight: bold;
            cursor: pointer;
            font-size: 16px;
            color: #80bc56;
            width: 33.3%;
            text-align: center;
            img {
              vertical-align: middle;
            }
          }
          .active {
            color: #2d8815;
            position: relative;
          }
          .active::after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 33px;
            border-radius: 20px;
            width: 40px;
            background-color: #2d8815;
            height: 4px;
          }
        }
      }
      .detail-tab-content {
        height: 515px;
        .content-item {
          cursor: pointer;
          color: #80bc56;
          border-left: 1px solid #80bc56;
          font-size: 14px;
          width: 300px;
          margin-left: 10px;
          padding-left: 10px;
          padding-bottom: 8px;
          display: inline-block;
          .lesson-title {
            margin-top: 10px;
            padding-bottom: 5px;
            position: relative;
          }
          .lesson-title:before {
            content: "";
            position: absolute;
            left: -15px;
            top: 3px;
            border-radius: 50%;
            width: 9px;
            height: 9px;
            background-color: #80bc56;
          }
        }
        .active {
          position: relative;
          background-image: linear-gradient(
            to right,
            transparent,
            #04a014 90%,
            transparent
          );
          color: #2d8815;
        }
        .active::before {
          content: "";
          position: absolute;
          left: -7.5px;
          top: 10px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background: url("../../assets/lesson/grdian.png") no-repeat;
          background-size: 100% 100%;
          z-index: 999;
        }
        .content-item:nth-child(1) {
          margin-top: 24px;
        }
      }
      .text-distance {
        margin-top: 17px;
        /deep/ .el-textarea__inner {
          border-radius: 20px;
        }
        .submit {
          margin-top: 20px;
          float: right;
          margin-right: 18px;
          width: 125px;
          height: 42px;
          background-color: #2d8815;
          color: #fff;
          text-align: center;
          font-size: 18px;
          line-height: 42px;
          border-radius: 20px;
          cursor: pointer;
        }
        .submit::after {
          content: "";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
      }
      .text-history {
        margin-top: 16px;
        background-color: #fff;
        border-radius: 20px;
        overflow: auto;
        .history-content {
          height: 88px;
          .content-title {
            margin-left: 19px;
            padding-top: 23px;
            color: #242424;
            font-size: 16px;
          }
          .content-time {
            position: relative;
            font-size: 14px;
            padding-top: 16px;
            margin-left: 19px;
            color: #b4b4b4;
            .more {
              position: absolute;
              top: -2px;
              right: 39px;
              color: #80bc56;
              font-size: 30px;
              cursor: pointer;
            }
          }
          .line {
            width: 220px;
            margin: 0 auto;
            margin-top: 7px;
            border-top: 1px solid #cfcfcf;
          }
        }
      }
    }
  }
  .lesson-main-commont {
    margin-top: 18px;
    height: 101px;
    border-radius: 20px;
    background-color: #c9e2b3;
    display: flex;
    align-items: center;
    /deep/ .el-rate__icon {
      font-size: 30px;
    }
    /deep/ .el-rate {
      position: relative;
      top: -5px;
    }
    .girl {
      width: 46px;
      height: 55px;
      margin-left: 83px;
    }
    .text {
      font-size: 22px;
      color: #242424;
      margin-left: 16px;
      line-height: 101px;
      margin-right: 65px;
    }
    .score {
      color: #5dbe5b;
      width: 240px;
      font-size: 20px;
      margin-left: 10px;
    }
    .tip {
      font-size: 12px;
      color: #2d8815;
      width: 273px;
      line-height: 25px;
      padding-left: 7px;
      height: 25px;
      border-radius: 30px;
      img {
        vertical-align: middle;
      }
    }
    .submit {
      width: 125px;
      height: 42px;
      background-image: linear-gradient(to bottom, #ebe65d, #fe7f2b);
      color: #fff;
      font-size: 18px;
      line-height: 42px;
      text-align: center;
      font-weight: bold;
      border-radius: 20px;
      margin-left: 34px;
      cursor: pointer;
    }
  }
  .lesson-main-introduce {
    margin-top: 24px;
    margin-bottom: 76px;
    display: flex;
    .main-left {
      display: inline-block;
      background-color: #fff;
      width: 990px;
      min-height: 355px;
      box-shadow: 0 0 10px #efefef;
      border-radius: 20px;
      margin-right: 30px;
      .detail-tab-select {
        ul {
          width: 400px;
          margin: 0 auto;
          margin-top: 10px;
          display: flex;
          li {
            flex: 1;
            font-weight: bold;
            cursor: pointer;
            font-size: 16px;
            color: #80bc56;
            width: 33.3%;
            text-align: center;
            img {
              vertical-align: middle;
            }
          }
          .active {
            color: #2d8815;
            position: relative;
          }
          .active::after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 90px;
            border-radius: 20px;
            width: 40px;
            background-color: #2d8815;
            height: 4px;
          }
        }
      }
      .detail-tab-content {
        height: 275px;
        margin-top: 23px;
        padding: 0 23px;
        color: #707070;
        letter-spacing: 1px;
        font-size: 18px;
        overflow-y: auto;
      }
      .detail-tab-comment {
        margin-top: 10px;
        padding-left: 37px;
        padding-right: 37px;
        .personal {
          color: #242424;
          font-size: 22px;
          font-weight: bold;
          img {
            width: 47px;
            height: 47px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 17px;
          }
        }
        .comment {
          margin-top: 16px;
          .expression {
            margin-top: 17px;
            padding-bottom: 22px;
            border-bottom: 1px solid #cfcfcf;
            .expression-content {
              position: relative;
              float: right;
              margin-top: 8px;
              color: #2d8815;
              font-size: 18px;
              font-weight: bold;
              cursor: pointer;
              .face {
                z-index: 999;
                position: absolute;
                right: -40px;
                top: 34px;
              }
              img {
                vertical-align: middle;
                margin-right: 11px;
              }
            }
            .expression-submit {
              float: right;
              margin-left: 35px;
              width: 125px;
              height: 42px;
              background-color: #2d8815;
              text-align: center;
              color: #fff;
              font-size: 18px;
              line-height: 42px;
              border-radius: 20px;
              cursor: pointer;
            }
            &:after {
              content: "";
              display: block;
              height: 0;
              clear: both;
              visibility: hidden;
            }
          }
        }
        .content {
          border-top: 1px solid #e6e6e6;

          .content-person {
            padding-top: 24px;
            img {
              width: 47px;
              height: 47px;
              vertical-align: middle;
              margin-right: 17px;
              border-radius: 50%;
            }
            .name {
              color: #242424;
              font-size: 22px;
              font-weight: bold;
            }
            .time {
              float: right;
              vertical-align: middle;
              color: #b4b4b4;
              line-height: 41px;
              font-size: 16px;
            }
            .reply {
              font-size: 18px;
              color: #707070;
              cursor: pointer;
            }
          }
          .content-text {
            margin-top: 14px;
            margin-left: 70px;
            margin-bottom: 40px;
            font-size: 18px;
            color: #707070;
            .content-text-img {
              /deep/ img {
                height: 80px;
                width: 80px;
              }
            }
            .reply {
              margin-top: 17px;
              background: #f8f8f8;
              padding: 10px;

              .reply-title {
                img {
                  width: 47px;
                  height: 47px;
                  vertical-align: middle;
                }
                .name {
                  font-size: 22px;
                  margin: 0 15px;
                  color: #242424;
                  font-weight: bold;
                  vertical-align: middle;
                }
              }
              .reply-content {
                color: #707070;
                margin-top: 12px;
                margin-left: 65px;
                font-size: 18px;
                .reply-content-img {
                  /deep/ img {
                    height: 80px;
                    width: 80px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .main-right {
      width: 380px;
      display: inline-block;
      background-color: #fff;
      box-shadow: 0 0 10px #efefef;
      border-radius: 20px;
      text-align: center;
      .right-title {
        display: inline-block;
        margin-top: 21px;
        width: 291px;
        height: 26px;
        background: url("../../assets/lesson/ziliaoxiazai.png");
        background-size: 100% 100%;
        text-align: left;
        .download {
          margin-left: 27px;
          position: relative;
          bottom: 5px;
          color: #2d8815;
          font-size: 22px;
          font-weight: bold;
        }
      }
      .right-text {
        position: relative;
        display: flex;
        width: 291px;
        height: 45px;
        margin: 0 auto;
        border-bottom: 1px solid #cccccc;
        font-size: 18px;
        color: #707070;
        line-height: 45px;
        text-align: left;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .download {
          display: flex;
          width: 57px;
          height: 23px;
          background-color: #2d8815;
          border-radius: 20px;
          font-size: 12px;
          color: #fff;
          align-items: center;
          cursor: pointer;
          img {
            margin-left: 10px;
          }
        }
      }
    }
  }
}

/deep/ .video-js .vjs-big-play-button{
  font-size: 2.5em;
  line-height: 2.3em;
  height: 2.5em;
  width: 2.5em;
  -webkit-border-radius: 2.5em;
  -moz-border-radius: 2.5em;
  border-radius: 2.5em;
  background-color: #73859f;
  background-color: rgba(115,133,159,.5);
  border-width: 0.15em;
  margin-top: -1.25em;
  margin-left: -1.75em;
}
/* 中间的播放箭头 */
/deep/ .vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em;
}
/* 加载圆圈 */
/deep/ .vjs-loading-spinner {
  font-size: 2.5em;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  margin-top: -1em;
  margin-left: -1.5em;
}
.cur-pointer {
  cursor: pointer;
}
</style>
