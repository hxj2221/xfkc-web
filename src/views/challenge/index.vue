<template>
  <div class="challege">
    <crumbs />
    <div class="challege-select">
      <div class="select-item">
        检索类型
        <!-- <span
          :class="['item-retrieval','border-blue',retrieval === 'whole' ? 'background-blue-active' : '' ]"
          @click="changeRet('whole')"
        >全部</span> -->
        <span
          :class="['item-retrieval','border-blue',retrieval === 1 ? 'background-blue-active' : '' ]"
          @click="changeRet(1)"
        >平台</span>
        <span
          :class="['item-retrieval','border-blue',retrieval === 2 ? 'background-blue-active' : '' ]"
          @click="changeRet(2)"
        >学校</span>
      </div>
      <!-- <div class="select-item">
        <span class="select-item-class"><span class="right">级</span><span>年</span></span>
        <span
          :class="['item-retrieval','item-four','border-blue',challenge === '4' ? 'background-blue-active' : '' ]"
          @click="changeCha('4')"
        >四年级</span>
        <span
          :class="['item-retrieval','border-blue',challenge === '5' ? 'background-blue-active' : '' ]"
          @click="changeCha('5')"
        >五年级</span>
        <span
          :class="['item-retrieval','border-blue',challenge === '6' ? 'background-blue-active' : '' ]"
          @click="changeCha('6')"
        >六年级</span>
        <span
          :class="['item-retrieval','border-blue',challenge === '7' ? 'background-blue-active' : '' ]"
          @click="changeCha('7')"
        >七年级</span>
        <span
          :class="['item-retrieval','border-blue',challenge === '8' ? 'background-blue-active' : '' ]"
          @click="changeCha('8')"
        >八年级</span>
        <span
          :class="['item-retrieval','border-blue',challenge === '9' ? 'background-blue-active' : '' ]"
          @click="changeCha('9')"
        >九年级</span>
        <span
          :class="['item-retrieval','border-blue',challenge === '1' ? 'background-blue-active' : '' ]"
          @click="changeCha('1')"
        >高一</span>
        <span
          :class="['item-retrieval','border-blue',challenge === '2' ? 'background-blue-active' : '' ]"
          @click="changeCha('2')"
        >高二</span>
        <span
          :class="['item-retrieval','border-blue',challenge === '3' ? 'background-blue-active' : '' ]"
          @click="changeCha('3')"
        >高三</span>
      </div> -->
      <!-- <img class="select-student" src="../../assets/challenge/student.png" alt @click="classChallenge">
      <span class="class-challenge" @click="classChallenge">班级挑战</span> -->
    </div>
    <div class="challege-activity">
      <div v-for="activityItem in activityList" :key="activityItem.id" class="challege-activity-item">
        <div class="challege-activity-item-box" @click="toActivity(activityItem)">
          <el-image v-if="activityItem.url" class="el-item-img" :src="$comm.url(activityItem.url)" />
        </div>
      </div>
    </div>
    <div class="chanllege-content">
      <div v-for="(item,index) in list1" :key="index" class="content-item" @click="notRegistered(item)">
        <div class="item-img">
          <el-image class="el-item-img" :src="$comm.url(item.picUrl)" fit="cover" />
        </div>
        <div class="item-point">
          <el-image :src="require('../../assets/challenge/good.png')" alt />
          <span class="point-num">{{ item.rewardPoints }}</span>
          <span class="point-text">积分</span>
        </div>
        <div class="item-text">
          <div class="item-text-title">{{ item.challengeName }}</div>
          <div class="background-short-blue item-text-finish">截止时间</div>
          <div class="item-text-time">{{ item.endTime }}</div>
        </div>
        <!-- <img class="finish-img" src="../../assets/challenge/finish.png" alt> -->
      </div>
    </div>
    <!-- <div class="chanllege-content">
      <div v-for="(item, index) in list2" :key="index" class="content-item" @click="notRegistered(item)">
        <div class="item-img">
          <img :src="baseApi + '/file/' +item.picUrl" alt>
        </div>
        <div class="item-point">
          <img src="../../assets/challenge/good.png" alt>
          <span class="point-num">{{ item.rewardPoints }}</span>
          <span class="point-text">积分</span>
        </div>
        <div class="item-text">
          <div class="item-text-title">{{ item.challengeName }}</div>
          <div class="background-short-blue item-text-finish">截止时间</div>
          <div class="item-text-time">{{ item.endTime }}</div>
        </div>
      </div>
    </div> -->
    <div class="paging">
      <div class="myTwo">
        <div class="block">
          <el-pagination
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
import { mapGetters } from 'vuex'
import crumbs from '@/components/crumbs/crumbs.vue'
import { getList } from '@/api/challenge/challenge'
import { getActivityList } from '@/api/activity'
export default {
  name: 'Challenge',
  components: {
    crumbs
  },
  data() {
    return {
      retrieval: 1,
      currentPage: 1,
      total: 0,
      pageSize: 8,
      list1: [],
      list2: [],
      activityList: [],
      activityTotal: 0
      // challenge: '4'
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
    this.getchallList()
    this.getActivity()
  },
  methods: {
    changeRet(val) {
      this.retrieval = val
      this.list1 = []
      this.list2 = []
      this.activityList = []
      this.getchallList()
      this.getActivity()
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
    getchallList() {
      const params = {
        type: this.retrieval,
        page: this.currentPage - 1,
        size: this.pageSize,
        sort: 'id,desc'
      }
      getList(params).then(res => {
        this.total = res.totalElements
        res.content.forEach((i) => {
          i.endTime = this.timeFormat(i.endTime)
          this.list1 = res.content
        })
      })
        .catch((error) => {
          console.log(error)
        })
    },
    getActivity() {
      const params = {
        page: 0,
        size: 5
      }
      const data = {
        'statusList': [2]
      }
      getActivityList(params, data).then(res => {
        this.activityTotal = res.totalElements
        this.activityList = res.content
        // res.content.forEach((i) => {
        //   i.endTime = this.timeFormat(i.endTime)
        //   this.activityList = res.content
        // })
      })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.list1 = []
      this.list2 = []
      this.getchallList()
    },
    handleCurrentChange() {
      this.list1 = []
      this.list2 = []
      this.getchallList()
    },
    // changeCha(val) {
    //   this.challenge = val
    // },
    // classChallenge() {
    //   console.log('地方')
    //   this.$router.push({ path: '/classChallenge/classChallenge' })
    // },
    notRegistered(item) {
      this.$router.push({ path: '/DataUpload/DataUpload?id=' + item.id })
    },
    toActivity(item) {
      this.$router.push({ path: '/activity/index', query: { activityId: item.id }})
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
    background: url("../../assets/challenge/select.png");
    background-size: 100% 100%;
    font-size: 16px;
    color: #202020;
    position: relative;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
      .select-item-class{
        width: 63px;
        display: inline-block;
        .right{
          float: right;
        }
      }
      .item-retrieval {
        padding: 8px 12px;
        cursor: pointer;
        color: #358DE4;
        margin-left: 5px;
        border-radius: 10px;
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
    .content-item {
      cursor: pointer;
      display: inline-block;
      margin-bottom: 40px;
      // flex: 1;
      width: 289px;
      height: 331px;
      border: 1px solid #e6e6e6;
      border-radius: 20px;
      margin-right: 66px;
      overflow: hidden;
      position: relative;
      .item-img {
        // img {
        //   width: 290px;
        //   height: 204px;
        // }

        .el-item-img{
          width: 290px;
          height: 204px;
        }
      }
      .item-point {
        position: absolute;
        right: 17px;
        bottom: 111px;
        min-width: 97px;
        padding-right: 10px;
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
    :nth-child(4n) {
      margin-right: 0px;
    }
  }
  &-activity{
    padding: 10px;
    &-item{
      height: 338px;
      margin: 20px auto 0;
      &-box{
        cursor: pointer;
        /deep/ .el-image{
          display: block;
          width: 100%;
          height: 338px;
          border-radius: 4px;
          overflow: hidden;
        }
      }
    }
  }
  .paging{
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
</style>
