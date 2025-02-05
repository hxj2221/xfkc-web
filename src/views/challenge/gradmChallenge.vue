<template>
  <div class="adm-challenge">
    <grcrumbs />
    <div class="center-title">
      <div class="select-item">
        检索类型
        <span
          :class="['item-retrieval','border-blue',retrieval === 1 ? 'background-green' : '' ]"
          @click="changeRet(1)"
        >已保存</span>
        <span
          :class="['item-retrieval','border-blue',retrieval === 2 ? 'background-green' : '' ]"
          @click="changeRet(2)"
        >正在进行</span>
        <span
          :class="['item-retrieval','border-blue',retrieval === 3 ? 'background-green' : '' ]"
          @click="changeRet(3)"
        >已结束</span>
      </div>
      <div class="select-release" @click="Pchallenges">发布挑战</div>
    </div>

    <div v-show="retrieval === 1" class="center-form">
      <div class="form-tittle">
        <div class="title-img">挑战头图</div>
        <div class="title-name">挑战名称</div>
        <!-- <div class="title-class">参与班级</div> -->
        <div class="title-time">截止时间</div>
        <div class="title-operation">操作</div>
      </div>

      <div v-for="(item,index) in challengeList" :key="index" class="form-item">
        <div class="title-img">
          <el-image class="title_el_img" :src="$comm.url(item.picUrl)" />
        </div>
        <div class="title-name">{{ item.challengeName }}</div>
        <!-- <div class="title-class"></div> -->
        <div class="title-time">{{ item.endTime }}</div>
        <div class="title-operation">
          <div class="button-editor" @click="toChange(item)">
            <img src="../../assets/lesson/grbianji.png" alt> 编辑
          </div>
          <div class="button-editor" @click="toDel(item.id)">
            <img src="../../assets/lesson/grlajitong.png" alt> 删除
          </div>
        </div>
      </div>
    </div>

    <div v-show="retrieval === 2" class="center-form1">
      <div class="form-tittle">
        <div class="title-img">挑战头图</div>
        <div class="title-name">挑战名称</div>
        <!-- <div class="title-class">参与班级</div> -->
        <div class="title-pepple">参与人数</div>
        <div class="title-time">截止时间</div>
        <div class="title-state">挑战状态</div>
        <div class="title-operation">操作</div>
      </div>
      <div v-for="(item,index) in challengeList" :key="index" class="form-item">
        <div class="title-img">
          <el-image class="title_el_img" :src="$comm.url(item.picUrl)" />
        </div>
        <div class="title-name">{{ item.challengeName }}</div>
        <!-- <div class="title-class">三年一般</div> -->
        <div class="title-pepple">100</div>
        <div class="title-time">{{ item.endTime }}</div>
        <div class="title-state">正在进行</div>
        <div class="title-operation" @click="gotolist(item)">
          <div class="button-editor">
            <img src="../../assets/lesson/grbianji.png" alt> 审核
          </div>
        </div>
      </div>
    </div>

    <div v-show="retrieval === 3" class="center-form1">
      <div class="form-tittle">
        <div class="title-img">挑战头图</div>
        <div class="title-name">挑战名称</div>
        <!-- <div class="title-class">参与班级</div> -->
        <div class="title-pepple">参与人数</div>
        <div class="title-time">截止时间</div>
        <div class="title-state">挑战状态</div>
        <!-- <div class="title-operation">操作</div> -->
      </div>
      <div v-for="(item,index) in challengeList" :key="index" class="form-item">
        <div class="title-img">
          <el-image class="title_el_img" :src="$comm.url(item.picUrl)" />
        </div>
        <div class="title-name">{{ item.challengeName }}</div>
        <!-- <div class="title-class">三年一般</div> -->
        <div class="title-pepple">100</div>
        <div class="title-time">{{ item.endTime }}</div>
        <div class="title-state">已经结束</div>
        <!-- <div class="title-operation" @click="gotolist"> -->
        <!-- <div class="button-editor">
            <img src="../../assets/lesson/bianji.png" alt> 审核
          </div> -->
        <!-- </div> -->
      </div>
    </div>
    <div class="paging">
      <div class="myTwo2">
        <div class="block">
          <el-pagination
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
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
// import Pagination from '@/components/Pagination/Pagination.vue'
import { getFindMyChallenge, delChallenge } from '@/api/challenge/challengeDetail'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'AdmChallenge',
  components: {
    grcrumbs
  },
  data() {
    return {
      endTime: '',
      retrieval: 1,
      challenge: 'whole',
      currentPage3: 1,
      total: 0,
      size: 5,
      challengeList: []
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
    this.getFindMyChallenge()

    // $.each(data, function(index,val) {
    // 	val.TIME = timestampToTime(val.TIME);
    // 	newsList.push(val);
    // });
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
    getFindMyChallenge() {
      const params = {
        type: this.retrieval,
        page: this.currentPage3 - 1,
        size: this.size,
        sort: 'endTime,desc'
      }
      getFindMyChallenge(params).then(res => {
        this.total = res.totalElements
        console.log(res)
        this.challengeList = res.content
        res.content.forEach(i => {
          i.endTime = this.timeFormat(i.endTime)
        })
      })
    },
    Pchallenges() {
      this.$router.push({ path: '/grPchallenge/grPchallenge' })
    },

    gotolist(item) {
      this.$router.push({ path: '/grchallengeList/grchallengeList?id=' + item.id })
    },
    handleSizeChange() {
      this.getFindMyChallenge()
    },
    handleCurrentChange() {
      this.getFindMyChallenge()
    },
    toChange(item) {
      this.$router.push({ path: '/grPchallenge/grPchallenge?id=' + item.id })
    },
    changeRet(val) {
      this.retrieval = val
      const params = {
        type: this.retrieval,
        page: this.currentPage3 - 1,
        size: this.size,
        sort: 'endTime,desc'
      }
      getFindMyChallenge(params).then(res => {
        this.total = res.totalElements
        console.log(res)
        this.challengeList = res.content
        res.content.forEach(i => {
          i.endTime = this.timeFormat(i.endTime)
        })
      })
    },
    // 删除
    toDel(id) {
      this.$confirm('是否确定要删除此挑战?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = []
        data.push(id)
        delChallenge(data).then((res) => {
          this.getFindMyChallenge()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.adm-challenge {
  width: 1366px;
  margin: 0 auto;
  .center-title {
    height: 72px;
    margin-top: 20px;
    background-image: url("../../assets/achievement/grbg.png");
    background-size: 100% 100%;
    position: relative;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
      .item-retrieval {
        padding: 8px 12px;
        border: 1px solid #2d8815;
        color: #2d8815;
        cursor: pointer;
        margin-left: 5px;
        border-radius: 10px;
      }
      .background-green {
        background-color: #2d8815 !important;
        color: #fff !important;
      }
      :nth-child(1) {
        margin-left: 20px;
      }
    }
    .select-release {
      position: absolute;
      right: 76px;
      top: 15px;
      cursor: pointer;
      font-size: 18px;
      color: #fff;
      width: 125px;
      height: 42px;
      background-color: #2d8815;
      text-align: center;
      line-height: 42px;
      border-radius: 20px;
    }
  }
  .challege-select {
     display: flex;
    align-items: center;
    height: 66px;
    border-radius: 20px;
    margin-top: 20px;
    background: url("../../assets/challenge/titlebac.png");
    background-size: 100% 100%;
    font-size: 16px;
    position: relative;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
      .item-retrieval {
        padding: 8px 12px;
        border: 1px solid #2d8815;
        color: #2d8815;
        cursor: pointer;
        margin-left: 5px;
        border-radius: 10px;
      }
      .background-green {
        background-color: #2d8815 !important;
        color: #fff !important;
      }
      :nth-child(1) {
        margin-left: 20px;
      }
    }
    // :nth-child(2) {
    //   padding-top: 30px;
    // }
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
    .select-release {
      position: absolute;
      right: 76px;
      top: 37px;
      cursor: pointer;
      font-size: 18px;
      color: #fff;
      width: 125px;
      height: 42px;
      background-color: #2d8815;
      text-align: center;
      line-height: 42px;
      border-radius: 20px;
    }
  }
  .center-form {
    margin-top: 44px;
    border-radius: 20px;
    box-shadow: 0 0 6px #f1f1f1;
    .form-tittle {
      font-size: 18px;
      font-weight: bold;
      height: 51px;
      line-height: 51px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      .title-img {
        width: 15%;
      }
      .title-name {
        width: 20%;
      }
      .title-class {
        width: 25%;
      }
      .title-time {
        width: 25%;
      }
      .title-operation {
        width: 15%;
      }
    }
    .form-item {
      font-size: 18px;
      height: 130px;
      line-height: 130px;
      display: flex;
      text-align: center;
      justify-content: space-between;
      .title-img {
        width: 15%;
        .title_el_img {
          width: 146px;
          height: 103px;
          margin-top: 13.5px;
          border-radius: 20px;
        }
      }
      .title-name {
        width: 20%;
      }
      .title-class {
        width: 25%;
      }
      .title-time {
        width: 25%;
      }
      .title-operation {
        width: 15%;
        margin-top: 10px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .button-editor {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 83px;
          height: 34px;
          border: 1px solid #2d8815;
          border-radius: 10px;
          font-size: 16px;
          color: #2d8815;
          cursor: pointer;
          img {
            width: 16px;
            margin-right: 4px;
          }
        }
      }
    }
    .form-item:nth-child(2n) {
      background-color: #fcfcfc;
    }
  }
  .center-form1 {
    margin-top: 44px;
    border-radius: 20px;
    box-shadow: 0 0 6px #f1f1f1;
    // height: 701px;
    .form-tittle {
      font-size: 18px;
      font-weight: bold;
      height: 51px;
      line-height: 51px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      .title-img {
        width: 15%;
      }
      .title-name {
        width: 15%;
      }
      .title-class {
        width: 20%;
      }
      .title-pepple {
        width: 10%;
      }
      .title-time {
        width: 15%;
      }
      .title-state {
        width: 15%;
      }
      .title-operation {
        width: 10%;
      }
    }
    .form-item {
      font-size: 18px;
      height: 130px;
      line-height: 130px;
      display: flex;
      text-align: center;
      justify-content: space-between;
      .title-img {
        width: 15%;
        .title_el_img {
          width: 146px;
          height: 103px;
          margin-top: 13.5px;
          border-radius: 20px;
        }
      }
      .title-name {
        width: 15%;
      }
      .title-class {
        width: 20%;
      }
      .title-pepple {
        width: 10%;
      }
      .title-time {
        width: 15%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .title-state {
        width: 15%;
      }
      .title-operation {
        margin-top: 10px;
        cursor: pointer;
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        .button-editor {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 83px;
          height: 34px;
          border: 1px solid #2d8815;
          border-radius: 10px;
          font-size: 16px;
          color: #2d8815;
          cursor: pointer;
          img {
            width: 16px;
            margin-right: 4px;
          }
        }
      }
    }
    .form-item:nth-child(2n) {
      background-color: #fcfcfc;
    }
  }
  .paging {
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
</style>
