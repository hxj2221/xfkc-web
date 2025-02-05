<template>
  <div class="challege">
    <crumbs />
    <div class="challege-select">
      <div class="select-item">
        检索类型
        <span
          :class="[
            'item-retrieval',
            'border-blue',
            retrieval === 0 ? 'background-blue-active' : '',
          ]"
          @click="changeRet(0)"
        >全部</span>
        <span
          :class="[
            'item-retrieval',
            'border-blue',
            retrieval === 1 ? 'background-blue-active' : '',
          ]"
          @click="changeRet(1)"
        >平台</span>
        <span
          :class="[
            'item-retrieval',
            'border-blue',
            retrieval === 2 ? 'background-blue-active' : '',
          ]"
          @click="changeRet(2)"
        >学校</span>
      </div>
      <div class="select-item">
        挑战状态
        <span
          :class="[
            'item-retrieval',
            'border-blue',
            challenge === 0 ? 'background-blue-active' : '',
          ]"
          @click="changeCha(0)"
        >全部</span>
        <span
          :class="[
            'item-retrieval',
            'border-blue',
            challenge === 1 ? 'background-blue-active' : '',
          ]"
          @click="changeCha(1)"
        >正在进行</span>
        <span
          :class="[
            'item-retrieval',
            'border-blue',
            challenge === 2 ? 'background-blue-active' : '',
          ]"
          @click="changeCha(2)"
        >已结束</span>
      </div>
      <!-- <img class="select-student" src="../../assets/challenge/student.png" alt>
      <span class="class-challenge">班级挑战</span>-->
    </div>
    <div class="chanllege-content">
      <!-- <el-row :gutter="20">
      <el-col :span="6">-->
      <el-row style="width:100%" :gutter="66">
        <el-col
          v-for="(item, index) in challengeList"
          :key="index"
          :span="6"
          @click="goDetail(item)"
        >
          <div class="content-item">
            <div class="item-img">
              <el-image :src="$comm.url(item.challenge.picUrl)" alt />
            </div>
            <div class="item-point">
              <el-image :src="require('../../assets/challenge/good.png')" alt />
              <span class="point-num">{{ item.challenge.rewardPoints }}</span>
              <span class="point-text">积分</span>
            </div>
            <div class="item-text">
              <div class="item-text-title">
                {{ item.challenge.challengeName }}
              </div>
              <div class="background-short-blue item-text-finish">截止时间</div>
              <div class="item-text-time">{{ item.endTime }}</div>
            </div>
            <el-image
              v-if="item.status >= 2"
              class="finish-img"
              :src="require('../../assets/challenge/finish.png')"
              alt
            />
          </div>
        </el-col>
      </el-row>
      <!-- </el-col>
      </el-row>-->
    </div>

    <div class="paging">
      <div class="myTwo">
        <div class="block">
          <el-pagination
            :slot="33"
            :current-page.sync="currentPage3"
            :page-size="size"
            :prev-text="'上一页'"
            :next-text="'下一页'"
            layout="slot,prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/crumbs.vue'
// import Pagination from '@/components/Pagination/Pagination.vue'
import { myChallengeList } from '@/api/challenge/challengeDetail'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'Challenge',
  components: {
    crumbs
  },
  data() {
    return {
      challengeList: [],
      total: 0,
      currentPage3: 1,
      size: 8,
      retrieval: 0,
      challenge: 0
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
    this.myChallengeList()
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
    myChallengeList() {
      const params = {
        type: this.retrieval,
        page: this.currentPage3 - 1,
        size: this.size,
        status: this.challenge
      }
      myChallengeList(params).then((res) => {
        console.log(res)
        this.total = res.totalElements
        this.challengeList = res.content
        res.content.forEach((i) => {
          i.endTime = this.timeFormat(i.endTime)
          console.log(this.timeFormat(i.endTime))
        })
      })
    },
    changeRet(val) {
      this.retrieval = val
      const params = {
        type: this.retrieval,
        page: this.currentPage3 - 1,
        size: this.size
      }
      myChallengeList(params).then((res) => {
        this.total = res.totalElements
        this.challengeList = res.content
        res.content.forEach((i) => {
          i.endTime = this.timeFormat(i.endTime)
          console.log(this.timeFormat(i.endTime))
        })
      })
    },
    changeCha(val) {
      this.challenge = val
      const params = {
        status: this.challenge,
        page: this.currentPage3 - 1,
        size: this.size
      }
      myChallengeList(params).then((res) => {
        console.log(res)
        this.total = res.totalElements
        this.challengeList = res.content
        res.content.forEach((i) => {
          i.endTime = this.timeFormat(i.endTime)
          console.log(this.timeFormat(i.endTime))
        })
      })
    },
    handleSizeChange() {
      this.myChallengeList()
    },
    handleCurrentChange() {
      this.myChallengeList()
    },
    goDetail(item) {
      this.$router.push({
        path: '/DataUpload/DataUpload?id=' + item.challenge.id
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.challege {
  width: 1366px;
  margin: 0 auto;
  .challege-select {
    height: 126px;
    border-radius: 20px;
    margin-top: 20px;
    background: url("../../assets/challenge/select.png");
    background-size: 100% 100%;
    font-size: 16px;
    color: #202020;
    position: relative;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
      .item-retrieval {
        padding: 8px 12px;
        cursor: pointer;
        margin-left: 5px;
        border-radius: 10px;
        color: #358de4;
      }
      :nth-child(1) {
        margin-left: 20px;
      }
    }
    :nth-child(2) {
      padding-top: 30px;
    }
    .select-student {
      width: 46px;
      height: 45px;
      position: absolute;
      top: 17px;
      right: 76px;
    }
    .class-challenge {
      color: #358de4;
      padding: 10px 25px;
      font-weight: bold;
      border-radius: 10px;
      border: 2px solid #358de4;
      position: absolute;
      right: 65px;
      top: 60px;
    }
  }
  .chanllege-content {
    display: flex;
    .content-item {
      // flex: 1;
      width: 289px;
      height: 331px;
      border: 1px solid #e6e6e6;
      border-radius: 20px;
      margin-top: 40px;
      margin-right: 66px;
      overflow: hidden;
      position: relative;
      .item-img {
        img {
          width: 290px;
          height: 204px;
        }
      }
      .item-point {
        position: absolute;
        right: 17px;
        bottom: 111px;
        width: 97px;
        height: 30px;
        background-image: linear-gradient(to right, #0075eb, #429cf5);
        border-radius: 20px;
        img {
          width: 16px;
          height: 19px;
          margin-top: 6px;
          margin-left: 18px;
        }
        .point-num {
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          vertical-align: top;
          position: relative;
          top: 5px;
        }
        .point-text {
          font-size: 12px;
          color: #fff;
          vertical-align: top;
          position: relative;
          top: 10px;
        }
      }
      .item-text {
        padding-bottom: 16px;
        background-color: white;
        padding-left: 14px;
        padding-top: 22px;
        .item-text-title {
          color: #242424;
          font-weight: bold;
          font-size: 22px;
        }
        .item-text-finish {
          margin-top: 6px;
          color: #fff;
          border-radius: 20px;
          font-size: 16px;
          display: inline-block;
          width: 81px;
          padding: 5px 0px;
          text-align: center;
        }
        .item-text-time {
          font-size: 18px;
          color: #242424;
          margin-top: 5px;
        }
      }
      .finish-img {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    :nth-child(4) {
      margin-right: 0px;
    }
  }
  .paging {
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
</style>
