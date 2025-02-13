<template>
  <div class="coursesourcedetail">
    <div class="coursesourcedetail-left">
      <div class="source-title">{{ lessonDetail.name }}</div>
      <div class="source-time">{{ parseTime(lessonDetail.createTime) }}</div>
      <div class="source-handle">
        <div class="source-handle-lt">
           <span>{{ lessonDetail.schoolName }}·{{lessonDetail.authorName}}</span>
          <el-rate
            v-if="lessonDetail.id"
            v-model="value"
            disabled
            :show-score="!!value"
            text-color="#ff9900"
            score-template="{value}"
            style="display: inline-block;"
          /><span style="color: #ff9900">{{ value > 0 ? '分':'' }}</span>
        </div>
        <div class="source-handle-rt">
          <span v-if="!value" @click="dialogVisible = true"><svg-icon icon-class="givescore" :style="` color: ${value > 0 ? '#ff9900': '#999999'}`"  /> 评分</span>
<!--          <span><svg-icon icon-class="givecollect" :style="`color: ${lessonDetail.giveCollectFlag ? '#ff9900': '#999999'}`" @click="changeGiveCollectStatus" /> 收藏</span>-->
<!--          @click="changeGiveLikeStatus" -->
          <span><svg-icon icon-class="givelike" :style="`color: ${lessonDetail.giveLikeFlag ? '#ff9900': '#999999'}`" /> {{ lessonDetail.pageView }}</span>
<!--          <span><svg-icon icon-class="eye" :style="`color: ${lessonDetail.giveLikeFlag ? '#ff9900': '#999999'}`"  /> 建议</span>-->

        </div>
      </div>
      <div class="source-content">
        <span v-show="typePlay === 'video'">
          <video id="myVideo" ref="myVideo" class="video-js vjs-big-play-centered">
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
          </video>
        </span>
        <div v-show="typePlay === 'ppt'">
          <iframe :src="pptUrl" width="100%" height="588px" frameborder="1" />
        </div>
      </div>
      <div class="source-bto">
        <div class="tips">感谢所有为资源建设提供资料的单位和个人<br>未经允许不得转载或引用</div>
<!--         <div class="shouke">全屏授课</div>-->
      </div>
      <div class="source-remark" v-html="lessonDetail.briefIntroduction" />
      <el-dialog
        title="给出您的合理评分"
        :visible.sync="dialogVisible"
        width="300px"
      >
        <div><el-rate
          v-model="valueScore"
          :colors="colors"
        /></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeGiveScoreStatus">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="coursesourcedetail-right">
      <div class="coursesourcedetail-right-head"><span>//</span>相关推荐</div>
      <div class="coursesourcedetail-right-list">
        <template v-if="list.length > 0">
          <div v-for="item in list" :key="item.id" class="listitem" @click="openDetail(item)">
            <el-image
              fit="fill"
              :src="$comm.url(item.imgUrl)"
              style="width: 132px; height: 84px;"
              class="imgbox"
            />
            <div class="info">
              <div class="remark">{{ item.name }}1111111111111111111111111111111111111111111111111111111111111</div>
               <div class="from" v-html="item.briefIntroduction" />
            </div>
          </div>
        </template>
        <div v-else class="nomore">
          暂无相关推荐内容
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import {  giveCollect, giveLike, handleViewTime } from '@/api/coursesource/index'
import { getCode, getVideo, judgeVideo, queryQualityCoursesNew, recordProcess, setScore} from '@/api/lesson/lesson'
export default {
  name: '',
  props: {
    id: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      courseWare: {
        // 课件
        name: '',
        url: ''
      },
      value:'',
      pptUrl:'',
      typePlay:'',
      currentPage: 1,
      total: 0,
      pageSize: 8,
      lessonDetail: {},
      list: [],
      dialogVisible: false,
      valueScore: null,
      timeout: null,
      courseId:0,
      isGetCode:false,
      vCode:null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'] // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  },
  computed: {
  },
  created() {
    if (this.id) {
      this.getDetail(this.id, true)
      this.getList()
    }
  },
  beforeDestroy() {
    this.stopPolling()
  },
  mounted() {
    window.removeEventListener('beforeunload', this.stopPolling)
    this.initVideo() // 初始化视频
  },
  methods: {
    parseTime,
    // 初始化视频方法
    initVideo() {
      const _this = this
      _this.stopPolling()
      _this.isGetCode = true
      this.videoPlayer = this.$video(
        this.$refs.myVideo,
        {
          // https://docs.videojs.com/tutorial-options.html
          // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          // 自动播放属性
          autoplay: false,
          // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: 'auto',
          // 设置视频播放器的显示宽度（以像素为单位）
          width: '953px',
          // 设置视频播放器的显示高度（以像素为单位）
          height: '588px'
        },
        function() {
          console.log('Player Has Been Ready!')

          // 设置暂停播放回调函数
          this.on('pause', function() {
            const params = {
              courseTitleId: Number(_this.id),
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
          this.on('play', function() {
            _this.isGetCode = true
            _this.getViewCode()
          })
          this.on('ended', function() {
            _this.stopPolling()
          })
        }
      )
    },
    getViewCode() {
      if (this.isGetCode) {
        this.stopPolling()
        if (this.vCode) {
          this.timeout = setInterval(() => {
            if (this.$refs.myVideo.ended || this.$refs.myVideo.paused) {
              this.stopPolling()
            } else {
              handleViewTime(this.vCode).then()
            }
          }, 10 * 1000)
        } else {
          getCode({ type: 3, businessId: this.id }).then(res => {
            if (res && res.code) {
              this.vCode = res.code
              if (this.timeout) {
                clearInterval(this.timeout)
              }
              this.timeout = setInterval(() => {
                if (this.$refs.myVideo.ended || this.$refs.myVideo.paused) {
                  this.stopPolling()
                } else {
                  handleViewTime(res.code).then()
                }
              }, 10 * 1000)
            }
          })
        }
      }
    },
    getDetail(id, isInit) {
      this.stopPolling()
      const params = {
        id: id
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
          this.isGetCode = true
          this.vCode = null
          this.lessonDetail = res
          this.lessonList = res.courseList
          this.courseId = this.lessonList[0].id
          this.judgeVideo()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    judgeVideo() {
      const params = {
        courseTitleId: this.id
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
    changeItem(e, note, courseName, courseUrl, video, watchTime) {
      this.selectLesson = e
      this.courseId = note
      this.courseWare.name = courseName
      this.courseWare.url = courseUrl
      const url = this.$comm.url(video)
      if (
        url.substring(url.length - 3, url.length) === 'ppt' ||
        url.substring(url.length - 3, url.length) === 'ptx'
      ) {
        this.typePlay = 'ppt'
        this.pptUrl =
          'https://api.idocv.com/view/url?url=' + url
      } else {
        this.typePlay = 'video'
        this.videoPlayer.src(url)
        if (this.videoPlayer) {
          this.videoPlayer.currentTime(watchTime)
        }
      }
    },

    getList() {
      const params = {
        page: 0,
        size: 8,
        recommendFlag: 1,
        type:1
      }
      queryQualityCoursesNew(params).then(res => {
        this.list = res?.content || []
      })
        .catch((error) => {
          console.log(error)
        })
    },
    openDetail(item) {
      console.log(item,  361)
      this.getDetail(item.id, true)
      this.getList()
    },
    handleScore(done) {
      this.dialogVisible = false
    },
    changeGiveScoreStatus() {
      const params = {
        score: this.valueScore,
        courseTitleId: this.lessonDetail.id
      }
      setScore(params).then(res => {
        if (res) {
          this.dialogVisible = false
          this.lessonDetail.score = this.valueScore
        }
      })
        .catch((error) => {
          console.log(error)
        })
    },
    changeGiveCollectStatus() {
      const params = {
        type: 1,
        businessId: this.lessonDetail.id
      }
      giveCollect(params, this.lessonDetail.giveCollectFlag ? 'delete' : 'post').then(res => {
        this.lessonDetail.giveCollectFlag = !this.lessonDetail.giveCollectFlag
      })
        .catch((error) => {
          console.log(error)
        })
    },
    changeGiveLikeStatus() {
      const params = {
        type: 1,
        businessId: this.lessonDetail.id
      }
      giveLike(params, this.lessonDetail.giveLikeFlag ? 'delete' : 'post').then(res => {
        this.lessonDetail.giveLikeFlag = !this.lessonDetail.giveLikeFlag
      })
        .catch((error) => {
          console.log(error)
        })
    },
    stopPolling() {
      if (this.timeout) clearInterval(this.timeout)
    }
  },
  beforeUnmount() {
    this.stopPolling()
    window.removeEventListener('beforeunload', this.stopPolling)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.coursesourcedetail {
  display: flex;
  padding: 32px;
  .coursesourcedetail-left{
    width: 953px;
    box-sizing: border-box;
    .source-title{
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
    }
    .source-time{
      margin-top: 10px;
      font-size: 14px;
      color: #666666;
    }
    .source-handle{
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      line-height: 20px;
      font-size: 14px;
      .source-handle-rt{
        color: #999999;
        span{
          display: inline-block;
          margin: 0 16px;
          cursor: pointer;
          .svg-icon{
            color: #999999;
          }
        }
      }
    }
    .source-content{
      margin: 20px 0;
      display: inline-block;
      overflow: hidden;
      width: 953px;
      height: 588px;
      background-color: #111;
      border-radius: 20px;
      img{
        display: block;
        max-width: 100%;
        margin: 10px auto;
      }
      /deep/ video{
        width: 100% !important;
      }
    }
    .source-bto{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tips{
        width: 370px;
        height: 40px;
        line-height: 20px;
        font-size: 12px;
        color: #999999;
      }
      .shouke{
        width: 120px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        border-radius: 18px;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .source-remark{
      margin-top: 20px;
    }
  }
  .coursesourcedetail-right{
    margin-left: 32px;
    flex: 1;
    &-head{
      line-height: 32px;
      font-size: 18px;
      font-weight: bold;
      span{
        color: #49B1EE;
        letter-spacing: 2px;
        padding-right: 4px;
      }
    }
    &-list{
      .listitem{
        cursor: pointer;
        margin-top: 20px;
        display: flex;
        .info{
          flex: 1;
          line-height: 20px;
          font-size: 14px;
          margin-left: 10px;
          .remark{
            width: 136px;
            margin-top: 2px;
            height: 40px;
            word-wrap:break-word;
            overflow:hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          .from{
            width: 136px;
            margin-top: 12px;
            height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #999999;
          }
        }
      }
    }
    .nomore{
      line-height: 100px;
      text-align: center;
      font-size: 14px;
      color: #999999;
    }
  }
  .coursesourcedetail-list{
    padding-bottom: 32px;
    overflow: hidden;
  }
  .coursesourcedetail-list-item{
    position: relative;
    float: left;
    width: 310px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #e1e9f4;
    box-shadow: 0 0 8px -2px rgba(0, 0, 0, .06);
    transition: .3s;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 32px;
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
      i{
        font-size: 40px;
      }

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
  .paging{
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
</style>
