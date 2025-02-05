<template>
  <div class="DataUpload">
    <grcrumbs />
    <div class="box_1">
      <div class="top">
        <div>
          <div class="shar">
            <div class="shartitle">{{ detailList.challengeName }}</div>
            <div class="sharbox" @click.stop="copyUrl">
              <el-image class="sharicon" :src="require('../../assets/challenge/grshar.png')" />
              <div class="sharname">分享</div>
            </div>
          </div>
          <div class="challbox">
            <el-image :src="require('../../assets/challenge/grchallenge.png')" alt />
            <div class="challtitle">挑战奖励</div>
            <div class="name_1">获得成就</div>
            <div class="best">
              <el-image :src="require('../../assets/challenge/sun.png')" />
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
            <el-image :src="require('../../assets/challenge/grtimeicon.png')" alt />
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
              <el-image :src="require('../../assets/challenge/grjieshao.png')" style="width: 20px; height: 20px" alt />
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
              <el-image :src="require('../../assets/challenge/grrenwulist.png')" alt />
              <div class="listname">完成条件</div>
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
          theme="green"
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
          <div class="">
            <el-image class="other_img" :src="$comm.url(item.picUrl)" fit="cover" />
          </div>
          <div class="other_name">{{ item.challengeName }}</div>
        </div>
      </div> -->
    </div>

    <div style="height: 30px" />
  </div>
</template>

<script>
import commentList from '../challenge/components/commentList.vue'
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
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
  name: 'Gr',
  components: {
    grcrumbs, commentList
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
      id: 0,
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
    this.getChallengeDetail()
    this.dialogVisible1 = true
    this.dialogVisible2 = true
    this.id = Number(this.$route.query.id)
    this.getChallengeList()
    this.getYK()
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
    getChallengeDetail() {
      const data = {
        id: this.$route.query.id,
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
    },
    // 报名
    signUp() {
      this.enterStatus = 1
      const params = {
        challengeId: this.id
      }
      getPchallenge(params).then(res => {
        this.getChallengeDetail()
        // this.pid = res.id
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
    color: #2d8815;

    .other_title {
      font-size: 18px;
      font-weight: 600;
    }

    .other_list {
      margin-top: 20px;
      padding: 20px;
      border: 2px solid #2d8815;
      border-radius: 15px;

      .other_img {
        width: 100%;
        height: 200px;
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
  padding: 200px 0 21px 33px;
  width: 1366px;
  // height: 748px;
  background-image: url("../../assets/challenge/grupbg.png");
  background-size: 100% 100%;
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
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 30px;
  margin-left: 28px;
}
.sharname {
  color: rgba(45, 136, 21, 1);
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
  background: rgba(45, 136, 21, 0.5);
  border-radius: 30px;
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
  background: rgba(45, 136, 21, 1);
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
  color: rgba(45, 136, 21, 1);
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
  color: rgba(45, 136, 21, 1);
  font-size: 16px;
  font-weight: bold;
  margin-left: 12px;
}
.p3 {
  color: rgba(45, 136, 21, 1);
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
  color: rgba(45, 136, 21, 1);
  margin-left: 3px;
  font-size: 14px;
  font-weight: bold;
}
.overicon {
  margin-left: 4px;
}
.overtxt {
  font-size: 14px;
  color: rgba(45, 136, 21, 1);
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
  color: #2d8815;
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
  background-color: rgba(45, 136, 21, 1);
}
::-webkit-scrollbar {
  width: 4px;
  height: 2px;
  background: #c6e1fc;
  border-radius: 18px;
}
.bottombox {
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  color: rgba(112, 112, 112, 1);
  font-size: 18px;
}
/deep/ .el-textarea__inner {
  background-color: rgba(249, 249, 249, 1);
  margin: 0 auto;
  width: 1269px;
  border-radius: 20px;
}
.up {
  cursor: pointer;
  margin: 20px auto;
  width: 125px;
  height: 42px;
  background: rgba(45, 136, 21, 1);
  border-radius: 20px;
  font-size: 18px;
  font-weight: 800;
  line-height: 42px;
  color: #ffffff;
  text-align: center;
}
/deep/ .el-button--primary {
  background-color: rgba(45, 136, 21, 1);
  border-color: rgba(45, 136, 21, 1);
}
.load {
  position: relative;
  right: 1px;
  top: -147px;
  width: 148px;
  height: 148px;
}
</style>
