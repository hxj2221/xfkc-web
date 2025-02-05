<template>
  <div class="achievement-center">
    <div class="center-title">
      <div class="title">
        <div class="leftsm">成长总积分</div>
        <div class="">{{ myPoint.amountTotal }}</div>
      </div>
      <div class="subtitle">
        <div class="leftsm">您在全区的排名为</div>
        <div class="">第{{ myPoint.areaRank }}名</div>
      </div>
      <div class="subtitle">
        <div class="leftsm">您在本校的排名为</div>
        <div class="">第{{ myPoint.schoolRank }}名</div>
      </div>
    </div>
    <div class="chanllege-content">
      <div class="chanllege-content">
        <el-table
          :data="pointList"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="rank"
            label="排名"
            width="240"
            align="center"
          ><template slot-scope="scope">
            <div :class="scope.row.rank === 1 ? 'rank1': scope.row.rank === 2 ? 'rank2': scope.row.rank === 3 ? 'rank3': 'rankbd'">{{ scope.row.rank }}</div>
          </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            width="240"
            label="教师"
            align="center"
          />
          <el-table-column
            prop="deptName"
            label="学校"
            align="center"
          />
          <el-table-column
            prop="amountTotal"
            width="240"
            label="总积分"
            align="center"
          >
            <template slot-scope="scope">
              <span style="color: #FF4D36;">{{ scope.row.amountTotal }}分</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
  </div></template>

<script>
// import crumbs from '@/components/crumbs/crumbs.vue'
// import { getAchive } from '@/api/achievement/achievement'
import { getPointApi, getMyPointApi } from '@/api/point/point'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import jifenBanner from '@/assets/achievement/jifen_banner.jpg'

export default {
  name: 'Achievement',
  components: {
    // crumbs
  },
  data() {
    return {
      retrieval: 1,
      currentPage: 1,
      total: 0,
      pageSize: 20,
      pointList: [],
      jifenBanner,
      myPoint: {}
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
    this.getMyPoint()
    this.getList()
  },

  methods: {
    getMyPoint() {
      getMyPointApi()
        .then((res) => {
          this.myPoint = res
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeRet(val) {
      this.retrieval = val
      this.getList()
    },
    changeDetail(id) {
      this.$router.push({ path: '/achievement/achievedetail?id=' + id })
    },
    getList() {
      const params = {
        page: this.currentPage - 1,
        size: this.pageSize
      }
      getPointApi(params)
        .then((res) => {
          this.total = res.totalElements
          this.pointList = res.content // .filter(item => !(item.userName.indexOf('admin') > -1))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.achievement-center {
  width: 1366px;
  margin: 0 auto;
  .center-title {
    width: 1140px;
    height: 183px;
    background: url("../../assets/achievement/jifen_banner.jpg") no-repeat top center;
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 34px 44px 0;
    color: #AC321A;
    .title, .subtitle{
      display: flex;
      width: 440px;
      text-align: center;
    }
    .title div, .subtitle div{
      flex: 1;
    }
    .title .leftsm, .subtitle .leftsm{
      width: 200px;
      text-align: left;
    }
    .title{
      font-size: 36px;
      font-weight: Semibold;
      padding-bottom: 2px;
    }
    .subtitle{
      margin-top: 10px;
    }
  }
  .chanllege-content {
    width: 1140px;
    margin: 30px auto 0;
    /deep/ .el-table th.el-table__cell{
      background: #f3f2f2;
    }
    /deep/ .el-table .cell{
      line-height: 40px;
      font-size: 16px;
    }
    /deep/ .el-table th.el-table__cell > .cell{
      font-size: 20px;
      color: #333333;
    }
    .rankbd{
      margin-left: auto;
      margin-right: auto;
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      background: #eeeeee;
      border-radius: 13px;
      font-weight: 'Semibold';
      color: #666666;
    }
    .rank1, .rank2, .rank3 {
      margin: -5px auto 0;
      width: 22px;
      height: 31px;
      padding-top: 7px;
      line-height: 24px;
      text-align: center;
      box-sizing: border-box;
      background-size: contain;
      font-weight: 'Semibold';
      color: #ffffff;
    }
    .rank1 {
      background: url("../../assets/achievement/1.png") no-repeat top center;
    }
    .rank2 {
      background: url("../../assets/achievement/2.png") no-repeat top center;
    }
    .rank3 {
      background: url("../../assets/achievement/3.png") no-repeat top center;
    }
  }
  .paging{
    margin: 20px 0 60px;
  }
}
</style>
