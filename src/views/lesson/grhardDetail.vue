<template>
  <div class="hardDetail">
    <grcrumbs />
    <div class="top_box001">
      <div class="hardname">
        <div class="hard_txt1">{{ hardname }}</div>
        <div class="shar" @click="copyUrl">
          <el-image class="sharicon" :src="require('../../assets/school/grshar.png')" alt />
          <div class="sharname">分享</div>
        </div>
      </div>
      <div class="hardschool">所在学校:{{ name }}</div>
      <div class="hardschool">使用人数:{{ containsPeople }}</div>
    </div>
    <div class="hardware">
      <div class="hardware_left">
        <div v-show="showPlay && videoSrc">
          <i class="el-icon-circle-close close_btn" @click="closeVideo" />
          <video ref="myVideo" class="video-js" style="border-radius: 15px;">
            <source type="video/mp4">
          </video>
        </div>
        <div v-show="!showPlay && swiperList.length > 1">
          <div v-if="videoSrc" class="video_play">
            <i class="el-icon-video-play play_btn" @click="openVideo" />
          </div>
          <div ref="swiper" class="swiper-container">
            <div class="swiper-wrapper" style="margin-bottom: 10px">
              <div v-for="(item, index) in swiperList" :key="index" class="swiper-slide">
                <img class=" hardware_imag" :src="item">
              </div>
            </div>
          </div>
          <div ref="swiperThumbs" class="swiper-container">
            <div class="swiper-wrapper gallery-thumbs">
              <img v-for="(item, index) in swiperList" :key="index" class="swiper-slide hardware_small_imag" :src="item">
            </div>
          </div>
        </div>
        <div v-show="!showPlay && swiperList.length <= 1">
          <div class="swiper-container">
            <div v-if="videoSrc" class="video_play">
              <i class="el-icon-video-play play_btn" @click="openVideo" />
            </div>
            <img v-for="(item, index) in swiperList" :key="index" class="swiper-slide hardware_imag" :src="item">
          </div>
        </div>
      </div>
      <div class="hardware_content">
        <div v-html="detail" />
      </div>
    </div>
    <div class="other">
      <div class="other_message">
        <div class="other_message_title">
          留言板
        </div>
        <classCommon type-number="HARD_WARE" />
      </div>
      <div class="other_resource">
        <div class="other_resource_title">其他实践资源</div>
        <div class="other_resource_list">
          <div v-for="(item, index) in otherList.slice(0,4)" :key="index" class="resource_box" @click="toDetail(item)">
            <el-image class="resource_img" :src="$comm.url(item.hardwarePicture)" alt="" />
            <div class="resource_title">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 30px" />
  </div>
</template>

<script>
import Swiper from 'swiper'
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { getHardDetail, getHardLib } from '@/api/lesson/lesson'
import { mapGetters } from 'vuex'
import classCommon from '@/components/classCommon/classCommon.vue'
import 'swiper/dist/css/swiper.min.css'
export default {
  components: {
    grcrumbs,
    classCommon
  },

  data() {
    return {
      id: '',
      hardname: '',
      name: '',
      pic: '',
      detail: '',
      videoSrc: '',
      showPlay: false,
      containsPeople: '',
      otherList: [],
      swiperIntance: null,
      swiperThumbsIntance: null,
      videoPlayer: null,
      swiperList: []
    }
  },
  computed: {
    ...mapGetters([
      'baseApi'
    ])
  },
  created() {
    this.id = this.$route.query.id
    this.getHardDetail()
    this.getOtherList()
  },
  methods: {
    createSwiper() {
      this.swiperThumbsIntance = new Swiper(this.$refs.swiperThumbs, {
        spaceBetween: 10,
        freeMode: true,
        slidesPerView: 4,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      })
      this.swiperIntance = new Swiper(this.$refs.swiper, {
        thumbs: {
          swiper: this.swiperThumbsIntance
        }
      })
    },
    // 打开视频
    openVideo() {
      this.showPlay = true
      this.$refs.myVideo.play()
    },
    // 关闭视频
    closeVideo() {
      this.showPlay = false
      this.$refs.myVideo.pause()
      this.$refs.myVideo.currentTime = 0
    },
    // 初始化视频组件
    initVideo() {
      const src = this.$comm.url(this.videoSrc)
      this.videoPlayer = this.$video(
        this.$refs.myVideo,
        {
          sources: [{ src: src, type: 'video/mp4' }],
          controls: true,
          autoplay: false,
          preload: 'auto',
          width: '820px',
          height: '530px'
        },
        function() {
          this.on('pause', function() {
            console.log('Player Has Been Ready!')
          })
        }
      )
    },
    copyUrl() {
      this.twoCodes = window.location.href
      alert('已复制连接，快去分享吧')
      this.$copyText(this.twoCodes).then(
      )
    },
    // 获取硬件详情
    getHardDetail() {
      const params = {
        id: this.id
      }
      getHardDetail(params).then(res => {
        this.hardname = res.name
        this.name = res.schoolName
        this.videoSrc = res.video
        this.containsPeople = res.containsPeople
        this.detail = res.detail
        this.swiperList = res.hardwarePicture.split(',').map(item => {
          return this.$comm.url(item)
        })
        this.$nextTick(() => {
          console.log(this.$comm.url(this.videoSrc))
          this.createSwiper()
          this.initVideo()
        })
      })
    },
    // 获取其他资源列表
    getOtherList() {
      this.otherList = []
      var params = {
        type: 1,
        page: 0,
        size: 10
      }
      getHardLib(params).then(res => {
        res.content.map(item => {
          var newItem = {
            id: item.id,
            name: item.name,
            hardwarePicture: ''
          }
          if (item.hardwarePicture) {
            newItem.hardwarePicture = item.hardwarePicture.split(',')[0]
          }
          if (item.id !== Number(this.id)) {
            this.otherList.push(newItem)
          }
        })
      })
    },
    // 跳转到硬件详情
    toDetail(item) {
      this.id = item.id
      this.$router.push({ path: '/grhardDetail/grhardDetail?id=' + item.id })
      this.getHardDetail()
      this.getOtherList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .video_play {
    text-align: center;
    right: 25%;
    top: 175px;
    width: 50%;
    z-index: 8;
    position: absolute;
  }
  .play_btn {
    font-size: 60px;
    color: #fff;
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }
  }
  .close_btn {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 9999;
    font-size: 40px;
    color: #fff;
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }
  }
  .hardDetail {
    width: 1366px;
    margin: 0 auto;
  }
  .top_box001 {
    margin-top: 20px;
    width: 1366px;
    height: 126px;
    background-image: url(../../assets/achievement/grtop_background.png);
    background-size: 1366px 126px;;
        padding: 17px 14px 14px 38px;
        margin-bottom: 34px;
  }
  .hard_txt1 {
    font-size: 28px;
    font-weight: bold;
  }
  .shar {
    margin-left: 66px;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 92px;
    height: 30px;
    /* background: #2d8815; */
    border: 1px solid #2d8815;
    border-radius: 30px;
    padding: 0 17px;
  }
  .sharicon {
    width: 18px;
    height: 18px;
  }
  .sharname {
    font-size: 16px;
    color: #2d8815;
    margin-left: 4px;
  }
  .hardname{
    display: flex;
    align-items: center;
  }
  .hardschool{
    font-size: 18px;
    margin-top: 5px;
    font-weight: bold;
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
  .other {
    display: flex;
    align-items: flex-start;

    .other_message {
      width: 60%;
      margin-right: 20px;

      .other_message_title {
        padding: 20px;
        font-size: 20px;
        border-bottom: 2px solid #2d8815;
        font-weight: 600;
        color: #2d8815;
        margin-bottom: 20px;
      }
    }

    .other_resource {
      flex: 1;
      border: 1px solid #2d8815;
      border-radius: 15px;
      padding: 20px;

      .other_resource_title{
        font-size: 20px;
        font-weight: 600;
        color: #2d8815;
        margin-bottom: 20px;
      }

      .other_resource_list{
        display: flex;
        flex-wrap: wrap;

        .resource_box {
          width: 48%;
          margin-right: 4%;

          .resource_img {
            width: 100%;
            height: 120px;
          }

          .resource_title {
            color: #2d8815;
            padding: 10px 0 20px;
          }

          &:nth-child(2n){
            margin-right: 0;
          }
        }
      }
    }
  }
  .swiper-slide{
    color: #fff;
  }
</style>
