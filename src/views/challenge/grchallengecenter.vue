<template>
  <div class="challege">
    <grcrumbs />
    <div class="challege-select">
      <div class="select-item">
        检索类型
        <!-- <span
          :class="['item-retrieval','border-blue',retrieval === 'whole' ? 'background-green-active' : '' ]"
          @click="changeRet('whole')"
        >全部</span>-->
        <span
          :class="['item-retrieval',retrieval === 1 ? 'background-green-active' : '' ]"
          @click="changeRet(1)"
        >平台</span>
        <span
          :class="['item-retrieval',retrieval === 2 ? 'background-green-active' : '' ]"
          @click="changeRet(2)"
        >学校</span>
      </div>
      <!-- <div class="select-item">
        <span class="select-item-class">
          <span class="right">级</span>
          <span>年</span>
        </span>
        <span
          :class="['item-retrieval','item-four',challenge === '4' ? 'background-green-active' : '' ]"
          @click="changeCha('4')"
        >四年级</span>
        <span
          :class="['item-retrieval',challenge === '5' ? 'background-green-active' : '' ]"
          @click="changeCha('5')"
        >五年级</span>
        <span
          :class="['item-retrieval',challenge === '6' ? 'background-green-active' : '' ]"
          @click="changeCha('6')"
        >六年级</span>
        <span
          :class="['item-retrieval',challenge === '7' ? 'background-green-active' : '' ]"
          @click="changeCha('7')"
        >七年级</span>
        <span
          :class="['item-retrieval',challenge === '8' ? 'background-green-active' : '' ]"
          @click="changeCha('8')"
        >八年级</span>
        <span
          :class="['item-retrieval',challenge === '9' ? 'background-green-active' : '' ]"
          @click="changeCha('9')"
        >九年级</span>
        <span
          :class="['item-retrieval',challenge === '1' ? 'background-green-active' : '' ]"
          @click="changeCha('1')"
        >高一</span>
        <span
          :class="['item-retrieval',challenge === '2' ? 'background-green-active' : '' ]"
          @click="changeCha('2')"
        >高二</span>
        <span
          :class="['item-retrieval',challenge === '3' ? 'background-green-active' : '' ]"
          @click="changeCha('3')"
        >高三</span>
      </div>-->
      <!-- <img class="select-student" src="../../assets/challenge/student.png" alt @click="classChallenge"> -->
      <!-- <span class="class-challenge" @click="classChallenge">班级挑战</span> -->
    </div>
    <div class="chanllege-content">
      <div
        v-for="(item,index) in list1"
        :key="index"
        class="content-item"
        @click="notRegistered(item)"
      >
        <div class="item-img">
          <el-image class="el-item-img" :src="$comm.url(item.picUrl)" fil="cover" />
        </div>
        <div class="item-point">
          <el-image :src="require('../../assets/challenge/good.png')" alt />
          <span class="point-num">{{ item.rewardPoints }}</span>
          <span class="point-text">积分</span>
        </div>
        <div class="item-text">
          <div class="item-text-title">{{ item.challengeName }}</div>
          <div class="background-short-green item-text-finish">
            <el-image :src="require('../../assets/challenge/timee.png')" alt /> 截止时间
          </div>
          <div class="item-text-time">{{ item.endTime }}</div>
        </div>
        <!-- <img class="finish-img" src="../../assets/challenge/finish.png" alt> -->
      </div>
    </div>
    <div class="chanllege-content">
      <div
        v-for="(item,index) in list2"
        :key="index"
        class="content-item"
        @click="notRegistered(item)"
      >
        <div class="item-img">
          <el-image class="el-item-img" :src="$comm.url(item.picUrl)" fil="cover" />
        </div>
        <div class="item-point background-blue">
          <el-image :src="require('../../assets/challenge/good.png')" alt />
          <span class="point-num">{{ item.rewardPoints }}</span>
          <span class="point-text">积分</span>
        </div>
        <div class="item-text">
          <div class="item-text-title">{{ item.challengeName }}</div>
          <div class="background-short-green item-text-finish">
            <el-image :src="require('../../assets/challenge/timee.png')" alt /> 截止时间
          </div>
          <div class="item-text-time">{{ item.endTime }}</div>
        </div>
      </div>
    </div>
    <div class="paging">
      <!-- <grPagination /> -->
      <div class="myTwo2">
        <div class="block">
          <el-pagination
            :slot="33"
            :current-page.sync="currentPage"
            :page-size="pageSize"
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
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { getList } from '@/api/challenge/challenge'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'Challenge',
  components: {
    grcrumbs
  },
  data() {
    return {
      retrieval: 1,
      currentPage: 1,
      total: 0,
      pageSize: 8,
      list1: [],
      list2: [],
      startTime: ''
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
    this.getList()
  },
  methods: {
    changeRet(val) {
      this.list1 = []
      this.list2 = []
      this.retrieval = val
      this.getList()
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
    getList() {
      const params = {
        type: this.retrieval,
        page: this.currentPage - 1,
        size: this.pageSize,
        sort: 'id,desc'
      }
      console.log(params)
      getList(params)
        .then(res => {
          console.log(res)
          this.total = res.totalElements
          // this.startTime = res.startTime
          res.content.forEach(i => {
            i.endTime = this.timeFormat(i.endTime)
          })
          if (res.content.length < 5) {
            this.list1 = res.content
            // console.log(this.list1);
          } else {
            this.list1 = res.content.slice(0, 4)
            this.list2 = res.content.slice(4)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.list1 = []
      this.list2 = []
      this.getList()
    },
    handleCurrentChange() {
      this.list1 = []
      this.list2 = []
      this.getList()
    },
    // changeCha(val) {
    //   this.challenge = val
    // },
    // classChallenge() {
    //   console.log('地方')
    //   this.$router.push({ path: '/classChallenge/classChallenge' })
    // },
    notRegistered(item) {
      this.$router.push({ path: '/grDataUpload/grDataUpload?id=' + item.id })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.challege {
  width: 1366px;
  margin: 0 auto;
  .challege-select {
    height: 72px;
    border-radius: 20px;
    margin-top: 20px;
    background: url("../../assets/challenge/titlebac.png");
    background-size: 100% 100%;
    font-size: 16px;
    color: #202020;
    position: relative;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
      .select-item-class {
        width: 63px;
        display: inline-block;
        .right {
          float: right;
        }
      }
      .item-retrieval {
        padding: 8px 12px;
        cursor: pointer;
        color: #2d8815;
        border: 1px solid #2d8815;
        margin-left: 5px;
        border-radius: 10px;
      }
      .background-green-active {
        background-color: #2d8815;
        color: #fff;
      }
      .item-four {
        margin-left: 20px;
      }
      .item-retrieval:nth-child(1) {
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
      cursor: pointer;
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
      cursor: pointer;
    }
  }
  .chanllege-content {
    margin-top: 34px;
    display: flex;
    .content-item {
      // flex: 1;
      width: 289px;
      height: 295px;
      background-color: #fff;
      border: 1px solid #e6e6e6;
      border-radius: 20px;
      margin-right: 66px;
      overflow: hidden;
      position: relative;
      .item-img {
        padding: 14px 12px 0px;

        .el-item-img{
          width: 263px;
          height: 155px;
          border-radius: 15px;
          overflow: hidden;
        }

        img {
          width: 264px;
          height: 158px;
          border-radius: 20px;
        }
      }
      .item-point {
        position: absolute;
        right: 11px;
        bottom: 111px;
        padding-right: 10px;
        min-width: 97px;
        height: 30px;
        background-image: linear-gradient(to right, #358b3a, #05cf0e);
        border-radius: 40px 0px 40px 0px;
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
        padding-left: 14px;
        padding-top: 22px;
        .background-short-green {
          background-color: #c9e2b3;
        }
        .item-text-title {
          color: #242424;
          font-weight: bold;
          font-size: 22px;
        }
        .item-text-finish {
          margin-top: 6px;
          color: #208004;
          border-radius: 20px;
          font-size: 16px;
          display: flex;
          width: 120px;
          padding: 5px 0px;
          align-items: center;
          justify-content: center;
          img {
            margin-right: 7px;
          }
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
