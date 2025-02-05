<template>
  <div class="DataUpload">
    <crumbs />
    <div class="box_1">
      <div class="top">
        <div>
          <div class="shar">
            <div class="shartitle">{{ challengeName }}</div>
            <div class="sharbox" @click="share">
              <el-image class="sharicon" :src="require('../../assets/challenge/shar.png')" alt />
              <div class="sharname">分享</div>
            </div>
          </div>
          <div class="challbox">
            <el-image :src="require('../../assets/challenge/challenge.png')" alt />
            <div class="challtitle">挑战奖励</div>
            <div class="name_1">获得成就</div>
            <div class="best">
              <el-image :src="require('../../assets/challenge/sun.png')" alt />
              <div class="name_2">{{ achievementName }}</div>
            </div>
            <div class="name_1">获得积分</div>
            <div class="best">
              <el-image :src="require('../../assets/challenge/cup.png')" alt />
              <div class="name_2">{{ rewardPoints }}积分</div>
            </div>
          </div>
        </div>
        <div>
          <div class="time">
            <el-image :src="require('../../assets/challenge/timeicon.png')" alt />
            <div class="timename">截止时间</div>
            <div class="timetime">{{ endTime }}</div>
          </div>
        </div>
      </div>
      <div class="photobox">
        <el-image class="photo" :src="$comm.url(picUrl)" alt />
        <div class="right">
          <div class="right-tab">
            <div class="plist">
              <el-image :src="require('../../assets/challenge/jiesjao.png')" style="width: 20px; height: 20px" alt />
              <div class="listname">挑战介绍</div>
            </div>
            <div class="txt_y">
              <div class="right-introduce">
                <div>{{ introduction }}</div>
              </div>
            </div>
          </div>
          <div class="right-tab">
            <div class="plist">
              <el-image :src="require('../../assets/challenge/renwulist.png')" style="margin-left: 2px" alt />
              <div class="listname" style="margin-left: 2px">完成条件</div>
            </div>
            <div class="txt_y">
              <div class="right-introduce">
                <div>{{ completedCondition }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottombtn">
      <div class="upbtn">
        <div class="dis2">
          <el-image :src="require('../../assets/challenge/shangchuan2.png')" alt />
          <div class="txt_02">资料上传</div>
        </div>
      </div>
    </div>
    <div class="bottombox">
      <div class="disp3">
        <img style="width: 24px; height: 24px;" src="../../assets/challenge/wenzimiaoshu.png" alt>
        <div class="mgl2">文字描述</div>
      </div>
      <div class="txt_001">
        {{ fileIntroduction }}
      </div>
      <div style="height:19px;" />
      <div class="disp3">
        <img style="width: 24px; height: 24px;" src="../../assets/challenge/tupiantubiao.png" alt>
        <div class="mgl2">图片</div>
      </div>
      <div class="txt_001">
        <el-row :gutter="20">
          <el-col v-for="(item,index) in imgArr" :key="index" :span="6">
            <img class="showimg" :src="$comm.url(item.path)" alt>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="status==1" class="bottombtn1">
      <div class="leftbtn" @click="reject">驳 回</div>
      <div class="rightbtn" @click="pass">通 过</div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import crumbs from '@/components/crumbs/crumbs.vue'
import {
  getChallengeDetail,
  getPass,
  getReject
} from '@/api/challenge/challengeDetail'
export default {
  name: 'School',
  components: {
    crumbs
  },
  data() {
    return {
      filePath: '',
      imgArr: [],
      fileIntroduction: '',
      studentId: '',
      id: '',
      textarea4: '',
      dialogImageUrl: '',
      challengeName: '',
      achievementName: '',
      rewardPoints: '',
      completedCondition: '',
      picUrl: '',
      introduction: '',
      passId: '',
      endTime: '',
      status: ''
    }
  },
  computed: {
    ...mapGetters(['baseApi'])
  },
  created() {
    this.id = this.$route.query.id
    this.studentId = this.$route.query.studentId
    console.log(this.id)
    this.getChallengeDetail()
  },
  methods: {
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
    getChallengeDetail() {
      const data = {
        id: this.id,
        studentId: this.studentId
      }
      getChallengeDetail(data).then((res) => {
        if (res.usersChallenges.filePath.indexOf(',') !== -1) {
          const imgList = res.usersChallenges.filePath.split(',').map(str => {
            return {
              path: str
            }
          })
          this.imgArr = imgList
        } else {
          const imgOne = {
            path: res.usersChallenges.filePath
          }
          this.imgArr.push(imgOne)
        }
        this.challengeName = res.challengeDto.challengeName
        this.achievementName = res.challengeDto.achievementName
        this.rewardPoints = res.challengeDto.rewardPoints
        this.completedCondition = res.challengeDto.completedCondition
        this.picUrl = res.challengeDto.picUrl
        this.introduction = res.challengeDto.introduction
        this.introduction = res.challengeDto.introduction
        this.introduction = res.challengeDto.introduction
        this.fileIntroduction = res.usersChallenges.fileIntroduction
        this.passId = res.usersChallenges.id
        this.endTime = this.timeFormat(res.challengeDto.endTime)
        this.status = res.usersChallenges.status
        console.log('1' + this.passId)
      })
    },
    // 分享
    share() {
      this.twoCodes = window.location.href
      alert('已复制连接，快去分享吧')
      this.$copyText(this.twoCodes).then()
    },
    // 通过
    pass() {
      const data = {}
      data.id = this.passId
      getPass(data).then((res) => {})
      this.$router.push({
        path: '/challenge/admchallenge'
      })
    },
    // 驳回
    reject() {
      const data = {}
      data.id = this.passId
      getReject(data).then((res) => {

      })
      this.$router.push({
        path: '/challenge/admchallenge'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .DataUpload {
    width: 1366px;
    margin: 0 auto;
  }

  .box_1 {
    margin-top: 20px;
    padding: 12px 0 21px 33px;
    width: 1366px;
    height: 748px;
    background-image: url("../../assets/challenge/upbg.png");
    background-size: 1366px 748px;
  }

  .shartitle {
    font-size: 28px;
  }

  .sharbox {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 92px;
    height: 30px;
    border: 1px solid rgba(3, 83, 161, 1);
    border-radius: 30px;
    margin-left: 28px;
  }

  .sharname {
    color: rgba(4, 83, 160, 1);
    font-size: 16px;
    margin-left: 3px;
  }

  .shar {
    display: flex;
    align-items: center;
  }

  .challbox {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }

  .best {
    justify-content: center;
    display: flex;
    align-items: center;
    margin-left: 9px;
    width: 133px;
    height: 33px;
    background: linear-gradient(180deg,
      rgba(13, 108, 200, 1) 0%,
      rgba(188, 222, 255, 1) 100%);
    border-radius: 30px;
  }

  .cup {
    display: flex;
    align-items: center;
  }

  .challtitle {
    margin-left: 7px;
    font-size: 18px;
    font-weight: 400;
  }

  .name_1 {
    margin-left: 18px;
    font-size: 18px;
    color: rgba(112, 112, 112, 1);
  }

  .name_2 {
    color: white;
    margin-left: 3px;
  }

  .time {
    margin-top: 23px;
    margin-left: 225px;
    display: flex;
    align-items: center;
  }

  .timename {
    font-size: 18px;
    margin-left: 5px;
  }

  .timetime {
    margin-left: 10px;
    font-size: 18px;
    color: rgba(219, 46, 59, 1);
  }

  .timebtn {
    cursor: pointer;
    margin-left: 16px;
    color: white;
    font-size: 23px;
    line-height: 61px;
    text-align: center;
    border-radius: 30px;
    width: 182px;
    height: 61px;
    background: linear-gradient(180deg,
      rgba(5, 113, 217, 1) 0%,
      rgba(5, 72, 136, 1) 100%);
  }

  .child {
    float: right;
    margin-top: -28px;
    margin-left: -62px;
  }

  .top {
    display: flex;
  }

  .photo {
    width: 900px;
    height: 600px;
    border-radius: 20px;
  }

  .plist {
    display: flex;
    align-items: center;
  }

  .listname {
    margin-left: 3px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(5, 84, 160, 1);
  }

  .photobox {
    margin-top: 20px;
    display: flex;
  }

  .p1 {
    display: flex;
    align-items: center;
    margin-top: 25px;
  }

  .p2 {
    color: rgba(4, 83, 160, 1);
    font-size: 16px;
    font-weight: bold;
    margin-left: 12px;
  }

  .p3 {
    color: rgba(4, 83, 160, 1);
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    margin-left: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  .over {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .overtitle {
    color: rgba(5, 84, 160, 1);
    margin-left: 3px;
    font-size: 14px;
    font-weight: bold;
  }

  .overicon {
    margin-left: 4px;
  }

  .overtxt {
    font-size: 14px;
    color: rgba(5, 84, 160, 1);
    width: 252px;
    margin: 0 auto;
  }

  .overtxt div {
    line-height: 20px;
    margin-left: 17px;
  }
  .right-introduce {
    text-indent: 2em;
    font-size: 14px;
    color: rgba(5, 84, 160, 1);
    padding: 20px;
    word-break: break-all;
    word-wrap: break-word;
  }
  .right {
    height: 600px;
    overflow: auto;
    padding: 0 30px;
    flex: 1;

    .right-tab {
      margin-bottom: 30px;
    }
  }

  .txt_y {
    overflow-y: auto;
  }

  ::-webkit-scrollbar-thumb {
    width: 4px;
    background-color: rgba(4, 83, 160, 1);
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 2px;
    background: #c6e1fc;
    border-radius: 18px;
  }

  .challbtn {
    /* display: flex;
  align-items: center; */
    cursor: pointer;
  }

  .upbtn {
    cursor: pointer;
  }

  .dis1 {
    display: flex;
    align-items: center;
  }

  .dis2 {
    display: flex;
    align-items: center;
  }

  .bottombtn {
    margin-top: 33px;
  }

  .txt_01 {
    margin-left: 3px;
    width: 100%;
    font-size: 22px;
    color: rgba(78, 162, 242, 1);
    /* border-bottom: 4px solid  rgba(78, 162, 242, 1); */
  }

  .txt_02 {
    margin-left: 5px;
    width: 100%;
    font-size: 25px;
    font-weight: 600;
    color: rgba(4, 83, 160, 1);
  }

  .ob_02 {
    margin-left: 3px;
    width: 40px;
    height: 4px;
    background-color: rgba(4, 83, 160, 1);
    margin-top: 4px;
    border-radius: 4px;
    margin-left: 27px;
  }

  .bottombox {
    margin-top: 20px;
    margin-bottom: 30px;
    color: rgba(112, 112, 112, 1);
    font-size: 18px;
  }

  .explain {
    margin: 31px auto;
    width: 1269px;
    height: 127px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    opacity: 1;
    border-radius: 20px;
    padding: 13px 20px;
  }

  .disp1 {
    display: flex;
    align-items: center;
    color: rgba(112, 112, 112, 1);
    font-size: 18px;
  }

  .mgl1 {
    margin-left: 3px;
  }

  .disp2 {
    margin-left: 10px;
    display: flex;
    align-items: center;
    color: rgba(112, 112, 112, 1);
    font-size: 16px;
    margin-top: 11px;
  }

  .ball {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: rgba(4, 83, 160, 1);
  }

  .disp3 {
    width: 1269px;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  .mgl2 {
    margin-left: 5px;
    color: #0554a0;
    font-weight: 600;
  }

  /deep/.el-textarea__inner {
    background-color: rgba(249, 249, 249, 1);
    margin: 0 auto;
    width: 1269px;
    border-radius: 20px;
  }

  .disp4 {
    width: 1269px;
    margin: 0 auto;
  }

  .blue {
    font-size: 14px;
    font-weight: 800;
    line-height: 22px;
    color: #2583de;
    margin-left: 20px;
  }

  .up {
    margin: 20px auto;
    width: 125px;
    height: 42px;
    background: linear-gradient(180deg, #0453a0 0%, #044480 100%);
    border-radius: 20px;
    font-size: 18px;
    font-weight: 800;
    line-height: 42px;
    color: #ffffff;
    text-align: center;
  }

  .shenhe {
    text-align: center;
    margin-top: 127px;
  }

  .shenhe div {
    color: rgba(112, 112, 112, 1);
    font-size: 22px;
    margin-top: 44px;
    margin-bottom: 103px;
  }

  .txt_001 {
    padding: 0 100px;
    margin-top: 20px;
    font-size: 18px;
    color: #0554a0;
  }

  .showimg {
    width: 261px;
    height: 185px;
    border-radius: 20px;
  }

  .bottombtn1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }

  .leftbtn {
    cursor: pointer;
    font-size: 14px;
    color: white;
    line-height: 37px;
    text-align: center;
    width: 112px;
    height: 37px;
    background: linear-gradient(180deg, #fb9662 0%, #fc6928 100%);
    border-radius: 30px;
  }

  .rightbtn {
    cursor: pointer;
    font-size: 14px;
    color: white;
    line-height: 37px;
    text-align: center;
    width: 112px;
    height: 37px;
    background: linear-gradient(180deg, #0571d9 0%, #054888 100%);
    border-radius: 30px;
    margin-left: 80px;
  }
</style>
