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
      <div v-if="hasVideoContent" class="source-content">
        <span v-if="typePlay === 'video' && videoUrl !== '无视频'">
          <video id="myVideo" ref="myVideo" class="video-js vjs-big-play-centered">
            <source :src="$comm.url(videoUrl)" type="video/mp4">
          </video>
        </span>
        <div v-else-if="typePlay === 'ppt'">
          <iframe :src="pptUrl" width="100%" height="588px" frameborder="1" />
        </div>
      </div>
      <div class="source-bto">
        <div class="tips">感谢所有为资源建设提供资料的单位和个人<br>未经允许不得转载或引用</div>
<!--         <div class="shouke">全屏授课</div>-->


      </div>
      <div class="source-remark" :class="{ 'no-video': !hasVideoContent }">
        <div v-html="lessonDetail.briefIntroduction"></div>
      </div>
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
            <div class="imgbox">
              <el-image
                fit="cover"
                :src="$comm.url(item.coverImage)"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" style="font-size: 24px; color: #909399;"></i>
                </div>
              </el-image>
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
      videoUrl: '无视频',
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
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  },
  computed: {
    hasVideoContent() {
      return (this.typePlay === 'video' && this.videoUrl !== '无视频') || 
             (this.typePlay === 'ppt' && this.pptUrl);
    }
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
    // 不在这里初始化视频播放器，而是等待数据加载完成后再决定是否初始化
  },
  methods: {
    parseTime,
    // 初始化视频方法
    initVideo() {
      // 如果没有视频元素或没有视频内容，或不是视频模式，则不初始化视频播放器
      if (!this.$refs.myVideo || this.videoUrl === '无视频' || this.typePlay !== 'video') {
        return
      }
      
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
          
          // 验证并清理HTML内容
          if (res) {
            res.briefIntroduction = this.validateHtml(res.briefIntroduction);
          }
          
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
      this.videoUrl = video || '无视频'
      const url = this.$comm.url(video)
      
      // 先设置内容类型，这样v-if条件会先生效
      if (
        url.substring(url.length - 3, url.length) === 'ppt' ||
        url.substring(url.length - 3, url.length) === 'ptx'
      ) {
        this.typePlay = 'ppt'
        this.pptUrl =
          'https://api.idocv.com/view/url?url=' + url
      } else {
        this.typePlay = 'video'
      }
      
      // 使用nextTick确保DOM更新后再初始化视频播放器
      this.$nextTick(() => {
        // 只有当是视频模式且有视频内容时，才处理视频播放器
        if (this.typePlay === 'video' && video && video !== '无视频') {
          // 如果视频播放器未初始化，则初始化
          if (!this.videoPlayer) {
            this.initVideo()
          }
          
          // 初始化后设置视频源和播放位置
          if (this.videoPlayer) {
            this.videoPlayer.src(url)
            if (watchTime) {
              this.videoPlayer.currentTime(watchTime)
            }
          }
        }
      })
    },

    getList() {
      const params = {
        page: 0,
        size: 8,
        recommendFlag: 1,
        type:1
      }
      queryQualityCoursesNew(params).then(res => {
        // 确保返回的数据是有效的，并且每个项目都有name属性和有效的briefIntroduction
        this.list = (res?.content || []).map(item => {
          return {
            ...item,
            name: item.name || '暂无标题',  // 如果name为空，设置默认值
            briefIntroduction: this.validateHtml(item.briefIntroduction) // 验证并清理HTML内容
          }
        })
      })
        .catch((error) => {
          console.log(error)
          this.list = []  // 发生错误时清空列表
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
    },
    validateHtml(html) {
      if (!html || typeof html !== 'string') {
        return '暂无课程简介';
      }

      // 1. 移除所有HTML标签，只保留文本内容
      let textContent = html.replace(/<[^>]+>/g, '');
      
      // 2. 移除HTML实体
      textContent = textContent.replace(/&[^;]+;/g, '');
      
      // 3. 移除多余空格和换行
      textContent = textContent.replace(/\s+/g, ' ').trim();
      
      // 4. 如果处理后的内容为空，返回默认文本
      if (!textContent.trim()) {
        return '暂无课程简介';
      }
      
      return textContent;
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
      border-radius: 20px;
      
      video {
        width: 100%;
        height: 100%;
        object-fit: contain;
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
      
      &.no-video {
        margin-top: 0; // 当没有视频时，移除上边距
        padding: 20px;
        background: #fff;
        border-radius: 20px;
      }
    }
  }
  .coursesourcedetail-right{
    margin-left: 32px;
    flex: 1;
    &-head{
      line-height: 32px;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 16px;
      span{
        color: #49B1EE;
        letter-spacing: 2px;
        padding-right: 4px;
      }
    }
    &-list{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      
      .listitem {
        cursor: pointer;

        .imgbox {
          width: 100%;
          padding-bottom: 60%; // 保持宽高比
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          background: #f5f5f5;

          /deep/ .el-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            .image-slot {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              background: #f5f5f5;
            }
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
