<template>
  <div class="DataUpload">
    <crumbs />
    <div class="box_1">
      <div class="top">
        <div>
          <div class="shar">
            <div class="shartitle">{{ detailList.challengeName }}</div>
            <div class="sharbox" @click.stop="copyUrl">
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
              <div class="name_2">{{ detailList.achievementName }}</div>
            </div>
            <div class="name_1">获得积分</div>
            <div class="best">
              <el-image :src="require('../../assets/challenge/cup.png')" alt />
              <div class="name_2">{{ detailList.rewardPoints }}积分</div>
            </div>
          </div>
        </div>
        <div>
          <el-image v-if="enterStatus==0" class="child" :src="require('../../assets/challenge/child.png')" alt />
          <div class="time">
            <el-image :src="require('../../assets/challenge/timeicon.png')" alt />
            <div class="timename">截止时间</div>
            <div class="timetime">{{ detailList.endTime }}</div>
            <div v-if="ykId==2">
              <div v-if="enterStatus==0" class="timebtn" @click="signUp">挑战报名</div>
            </div>
          </div>
        </div>
      </div>
      <div class="photobox">
        <el-image class="photo" :src="$comm.url(detailList.picUrl)" fit="cover" />
        <div class="right">
          <div class="right-tab">
            <div class="plist">
              <el-image :src="require('../../assets/challenge/jiesjao.png')" style="width: 20px; height: 20px" alt />
              <div class="listname">挑战介绍</div>
            </div>
            <div class="txt_y">
              <div class="right-introduce">
                <div>{{ detailList.introduction }}</div>
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
                <div>{{ detailList.completedCondition }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="botom_left">
        <commentList
          :enter-status="enterStatus"
          :yk-id="ykId"
          type-number="CHALLENGE"
          :challenge-id="id"
          @submit-Information="goUp"
        />
      </div>
      <!-- <div class="botom_right">
        <div class="other_title">其他挑战</div>
        <div v-for="(item, index) in challengeList.slice(0,4)" :key="index" class="other_list">
          <div class="item-img">
            <el-image :src="$comm.url(item.picUrl)" alt />
          </div>
          <div class="item-point">
            <el-image :src="require('../../assets/challenge/good.png')" alt />
            <span class="point-num">{{ item.rewardPoints }}</span>
            <span class="point-text">积分</span>
          </div>
          <div class="item-text">
            <div class="item-text-title">
              {{ item.challengeName }}
            </div>
            <div class="background-short-blue item-text-finish">截止时间</div>
            <div class="item-text-time">{{ timeFormat(item.endTime) }}</div>
          </div>
          <el-image
            v-if="item.status >= 2"
            class="finish-img"
            :src="require('../../assets/challenge/finish.png')"
            alt
          />
        </div>
      </div> -->
    </div>

    <div style="height: 30px" />
  </div>
</template>

<script>
import commentList from '../challenge/components/commentList.vue'
import crumbs from '@/components/crumbs/crumbs.vue'
import {
  getChallengeDetail,
  getPchallenge,
  getUpload
} from '@/api/challenge/challengeDetail'
import { getList } from '@/api/challenge/challenge'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { Notification } from 'element-ui'
export default {
  name: 'School',
  components: {
    crumbs, commentList
  },
  data() {
    return {
      challengeList: [],
      endTime: '',
      detailList: {},
      enterStatus: 0,
      zi1: 1,
      zi2: 2,
      textarea4: '',
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      id: null,
      fileIntroduction: '',
      filePath: '',
      pid: 0,
      ykId: 0
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi']),
    headers() {
      return {
        Authorization: getToken()
      }
    }
  },
  created() {
    this.dialogVisible1 = true
    this.dialogVisible2 = true
    this.id = Number(this.$route.query.id)
    this.getChallengeDetail()
    this.getYK()
    this.getChallengeList()
  },
  methods: {
    getChallengeList() {
      this.challengeList = []
      const params = {
        type: 1,
        page: 0,
        size: 6,
        sort: 'id,desc'
      }
      getList(params).then(res => {
        res.content.forEach(element => {
          if (this.id !== element.id) {
            this.challengeList.push(element)
          }
        })
      })
    },
    getYK() {
      this.ykId = Number(this.$store.state.user.userId)
      console.log('userId' + this.$store.state.user.userId)
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
    handleError(response) {
      if (response.status === 400) {
        Notification.error({
          title: '图片大小不能超过6MB'
        })
      }
    },
    getUrl(file) {
      this.dialogImageUrl = file.path
      // console.log(file.path)
    },
    getChallengeDetail() {
      const data = {
        id: this.id,
        studentId: 0
      }
      getChallengeDetail(data).then(res => {
        this.detailList = res.challengeDto
        this.enterStatus = res.challengeDto.enterStatus
        res.challengeDto.endTime = this.timeFormat(res.challengeDto.endTime)
        if (res.usersChallenges !== null) {
          this.pid = res.usersChallenges.id
          this.id = res.usersChallenges.id
          this.fileIntroduction = res.usersChallenges.fileIntroduction
          this.filePath = res.usersChallenges.filePath
        }
      })
      // console.log('看id' + this.timeFormat(res.challengeDto.endTime))
    },
    // 报名
    signUp() {
      const params = {
        challengeId: this.id
      }
      getPchallenge(params).then(res => {
        this.getChallengeDetail()
      })
      this.zi1 = 1
      this.zi2 = 2
      // this.$router.go(0)
    },
    copyUrl() {
      this.twoCodes = window.location.href
      alert('已复制连接，快去分享吧')
      this.$copyText(this.twoCodes).then()
    },
    // 提交
    goUp(params) {
      getUpload(params).then(res => {
        Notification.success({
          title: '发布成功'
        })
        // console.log(res.challenge.id);
      })
      this.enterStatus = 2
    }
  }
}
</script>

<style lang="scss" scoped>
.DataUpload {
  width: 1366px;
  margin: 0 auto;
}
.bottom {
  display: flex;
  align-items: flex-start;

  .botom_left {
    width: 75%;
  }

  .botom_right {
    width: 25%;
    color: #0554a0;

    .other_title {
      font-size: 18px;
      font-weight: 600;
    }

    .other_list {
      margin-top: 20px;
      padding: 20px;
      border: 2px solid #0554a0;
      border-radius: 15px;

      .item-img {
        img {
          width: 100%;
          height: 200px;
        }
      }

      .other_name {
        font-size: 16px;
        padding-top: 10px;
        text-align: center;
      }
    }
  }
}
.box_1 {
  margin: 20px 0;
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
  background: linear-gradient(
    180deg,
    rgba(13, 108, 200, 1) 0%,
    rgba(188, 222, 255, 1) 100%
  );
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
  background: linear-gradient(
    180deg,
    rgba(5, 113, 217, 1) 0%,
    rgba(5, 72, 136, 1) 100%
  );
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
  font-size: 18px;
  font-weight: bold;
  color: rgba(5, 84, 160, 1);
}
.photobox {
  margin: 20px 0;
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
  margin-left: 88px;
  /* display: flex;
  align-items: center; */
}
.dis2 {
  display: flex;
  align-items: center;
}
.txt_01 {
  margin-left: 3px;
  width: 100%;
  font-size: 22px;
  color: rgba(78, 162, 242, 1);
  /* border-bottom: 4px solid  rgba(78, 162, 242, 1); */
}
.bottombox {
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
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
}
.disp4 {
  width: 250px;
  // margin: 0 auto;
}
.blue {
  font-size: 14px;
  font-weight: 800;
  line-height: 22px;
  color: #2583de;
  margin-left: 20px;
}
.up {
  cursor: pointer;
  margin: 10px auto 0;
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
.fanhuiimg {
  // background-color: brown;
  width: 200px;
  height: 200px;
  margin-left: 46px;
  border-radius: 20px;
}
.load {
  position: relative;
  right: 1px;
  top: -147px;
  width: 148px;
  height: 148px;
}
</style>
