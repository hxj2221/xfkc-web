<template>
  <div class="point-main">
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
      <el-table
        :data="pointsList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="rank"
          label="排名"
          width="140"
          align="center"
        ><template slot-scope="scope">
          <div :class="scope.row.rank === 1 ? 'rank1': scope.row.rank === 2 ? 'rank2': scope.row.rank === 3 ? 'rank3': 'rankbd'">{{ scope.row.rank }}</div>
        </template>
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="学校"
          align="center"
        />
        <el-table-column
          prop="monthRank"
          label="月榜单"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.monthRank ? scope.row.monthRank: '未上榜' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="quarterRank"
          label="季榜单"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quarterRank ? scope.row.quarterRank: '未上榜' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="yearRank"
          label="年榜单"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.yearRank ? scope.row.yearRank: '未上榜' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="amountTotal"
          width="140"
          label="总积分"
          align="center"
        >
          <template slot-scope="scope">
            <span style="color: #FF4D36;">{{ scope.row.amountTotal }}分</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div v-for="(item, index) in pointsList" :key="index" class="content-item" @click="toDetail(item)">
        <div class="item-img">
          <el-image
            style="width: 290px;height: 204px;"
            :src="$comm.url(item.picUrl)"
            fit="cover"
          />
        </div>
        <div class="item-text">
          <div class="item-text-title">{{ item.name }}</div>
          <div class="item-text-point">
            <div class="item-text-point-number">
              <div>{{ item.requiredPoints }}</div>
              <div class="unit">积分</div>
            </div>
            <template v-if="userId === '2' || userId === '1'">
              <div v-if="item.status === 0" class="button">兑换</div>
              <div v-if="item.status === 1" class="button write">待核销</div>
            </template>
          </div>
        </div>
      </div> -->
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
    <!-- 弹出框 积分兑换详情 -->
    <el-dialog
      :visible.sync="dialogVisible"
      class="score-dialog"
      destroy-on-close
      @close="clearInfo"
    >
      <i class="close-btn el-icon-circle-close" @click="dialogVisible = false" />
      <template v-if="pointDetail.name">
        <div class="left-area">
          <el-image :src="$comm.url(pointDetail.picUrl)" alt="" srcset="" />
        </div>
        <div class="right-area score-info">
          <div class="title">{{ pointDetail.name }}</div>
          <div class="price">{{ pointDetail.requiredPoints }}积分</div>
          <div class="number">剩余数量 {{ pointDetail.number }}</div>
          <div class="detail">{{ pointDetail.detail }}</div>
          <template v-if="userId === '2' || userId === '1'">
            <div v-if="pointDetail.status === 0" class="exchange-btn" @click="exchange(pointDetail.id)">立即兑换</div>
            <div v-if="pointDetail.status === 1" class="exchange-btn unable">待核销</div>
          </template>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
// import crumbs from '@/components/crumbs/crumbs.vue'
import { getPointApi, getMyPointApi, exchange } from '@/api/point/point'
import jifenBanner from '@/assets/achievement/jifen_banner.jpg'
export default {
  name: 'Pointcenter',
  components: {
    // crumbs
  },
  data() {
    return {
      dialogVisible: false,
      userId: '',
      retrieval: 1,
      myPoint: {},
      pointsList: [],
      currentPage: 1,
      total: 0,
      pageSize: 20,
      pointDetail: {},
      dialogTitle: '',
      jifenBanner
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
    this.userId = this.$store.state.user.userId
    this.getMyPoint()
    this.getPoint()
  },

  methods: {
    toDetail(item) {
      this.pointDetail = item
      this.dialogTitle = item.name
      this.dialogVisible = true
    },
    changeRet(val) {
      this.pointsList = []
      this.retrieval = val
      this.getPoint()
      this.getMyPoint()
    },
    getPoint() {
      const params = {
        type: 1,
        page: this.currentPage - 1,
        size: this.pageSize
      }
      getPointApi(params)
        .then((res) => {
          this.total = res.totalElements
          this.pointsList = res.content

          // 测试使用
          // const testData = []
          // for (let index = 0; index < 12; index++) {
          //   const newItem = res.content[0]
          //   newItem.status = 1
          //   testData.push(newItem)
          // }
          // this.pointsList = testData
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMyPoint() {
      // const params = {
      //   type: this.retrieval
      // }
      getMyPointApi()
        .then((res) => {
          this.myPoint = res
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.getPoint()
    },
    handleCurrentChange() {
      this.getPoint()
    },
    exchange(id) {
      const params = {
        type: this.retrieval,
        exchangeableGoodsId: id
      }
      exchange(params)
        .then((res) => {
          this.$message({
            type: 'success',
            message: '兑换成功'
          })

          this.dialogVisible = false

          this.getPoint()
          this.getMyPoint()
        })
        .catch((error) => {
          console.log(error)
        })
    },

    clearInfo() {
      this.pointDetail = {}
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.point-main {
  width: 1366px;
  margin: 0 auto;
  .center-title {
    width: 1140px;
    height: 183px;
    background: url("../../assets/achievement/jifen_banner.jpg") no-repeat top center;
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 34px 44px 0;
    // height: 72px;
    // margin-top: 20px;
    // background: url("../../assets/achievement/title.png");
    // background-size: 100% 100%;
    // position: relative;
    // .select-item {
    //   padding-top: 25px;
    //   margin-left: 31px;
    //   .item-retrieval {
    //     padding: 8px 12px;
    //     cursor: pointer;
    //     color: #358de4;
    //     margin-left: 5px;
    //     border-radius: 10px;
    //   }
    //   :nth-child(1) {
    //     margin-left: 20px;
    //   }
    // }
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
  .main-point {
    font-size: 22px;
    font-weight: bold;
    margin-top: 25px;
    color: #242424;
    .point {
      color: #f85745;
      font-size: 26px;
    }
    img {
      width: 32px;
      vertical-align: middle;
      height: 32px;
      margin-right: 6px;
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
    // display: flex;
    // flex-wrap: wrap;
    // margin-top: 34px;

    // .content-item {
    //   cursor: pointer;
    //   margin-bottom: 40px;
    //   width: 290px;
    //   box-shadow: 1px 1px 5px #f1f1f1;
    //   border-radius: 15px;
    //   margin-right: 68px;
    //   overflow: hidden;

    //   &:nth-child(4n){
    //     margin-right: 0;
    //   }

    //   .item-img {
    //     width: 290px;
    //     height: 204px;
    //     overflow: hidden;
    //     img {
    //       // width: 290px;
    //       // height: 204px;
    //     }
    //   }
    //   .item-text {
    //     padding: 10px;
    //     box-sizing: border-box;

    //     .item-text-title {
    //       color: #242424;
    //       font-weight: bold;
    //       font-size: 22px;
    //       padding-bottom: 15px;
    //       white-space: nowrap;
    //       overflow: hidden;
    //       text-overflow: ellipsis;
    //     }
    //     .item-text-point {
    //       display: flex;
    //       justify-content: space-between;
    //       align-items: center;

    //       .item-text-point-number{
    //         font-size: 20px;
    //         font-weight: bold;
    //         color: #ff6a6a;
    //         display: inline-flex;
    //         align-items: center;

    //         .unit{
    //           padding-left: 5px;
    //           font-size: 14px;
    //           font-weight: bold;
    //           color: #ff6a6a;
    //         }
    //       }
    //     }
    //     .button {
    //       cursor: pointer;
    //       color: #fff;
    //       width: 120px;
    //       height: 35px;
    //       line-height: 35px;
    //       font-size: 16px;
    //       font-weight: bold;
    //       text-align: center;
    //       border-radius: 30px;
    //       background-image: linear-gradient(to bottom, #0571d9, #054888);
    //     }
    //     .write {
    //       background-image: linear-gradient(to bottom, #e4e4e4, #b5b5b5);
    //     }
    //   }

    //   .item-bottom{
    //     display: flex;
    //     justify-content: flex-end;
    //   }
    // }
    // :nth-child(4) {
    //   margin-right: 0px;
    // }
  }

  .paging {
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
.item-text-over {
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
	line-height:1.5;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 16px;
  margin-top: 4px;
  color: #242424;
}
.dialog-width {
  width: 50%;
}
.dialog-flex {
  margin-top: 10px;
  display: flex;
  font-size: 20px;
  text-align: center;
}
/deep/.el-dialog__body {
  padding:0 20px;
}
/deep/.el-dialog__title {
  font-size: 25px;
  min-width: 1000px;
}
.dialog-content {
  display: flex;
  margin-top: 20px;
}
.dialog-img {
  width: 50%;
  text-align: center;
  img {
    width: 290px;
    height: 204px;
  }
}
.dialog-detail {
  text-indent: 32px;
  flex:1;
  font-size: 16px;
}

// 积分物品详情弹窗
.score-dialog{

  .close-btn{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 22px;
    color: #b5b5b5;
    cursor: pointer;
  }

  /deep/ .el-dialog{
    width: 680px;
    border-radius: 8px;
    overflow: hidden;
  }

  /deep/ .el-dialog__header{
    display: none;
  }

  /deep/ .el-dialog__body{
    position: relative;
    display: flex;
    height: 480px;
    padding: 0;
  }

  .left-area{
    padding: 40px 20px 20px;
    height: 100%;
    display: flex;
    align-items: flex-start;
    width: 320px;
    justify-content: center;
    background: #f9f9f9;

    img{
      max-width: 100%;
      max-height: 100%;
      border-radius: 5px;
    }
  }

  .right-area{
    padding: 40px 20px 20px;
    height: 100%;
    padding-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #f1f1f1;
  }

  .score-info{

    .title{
      font-size: 28px;
      font-weight: bold;
      color: #666;
      margin-bottom: 15px;
    }

    .price{
      color: #ff6f61;
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 15px;
    }

    .number{
      color: #bbb;
      font-size: 12px;
      margin-bottom: 15px;
    }

    .detail{
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      border-top: 1px solid #eee;
      padding-top: 15px;

      $scrollbar: #c7c7c7;

      /deep/ &::-webkit-scrollbar-thumb {
        border: none;
        background: $scrollbar;
        border-radius: 10px;
      }

      /deep/ &::-webkit-scrollbar-thumb:hover {
        background: $scrollbar;
      }

      /deep/ &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background: lighten($scrollbar,85%);
        z-index: 999;
      }

      /deep/ &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: lighten($scrollbar,85%);
      }

    }

    .exchange-btn{
      margin-top: 20px;
      background-image: linear-gradient(to bottom, #0571d9, #054888);
      color: #fff;
      height: 46px;
      line-height: 46px;
      text-align: center;
      border-radius: 46px;
      cursor: pointer;
      user-select: none;
      font-size: 18px;

      &.unable{
        background-image: linear-gradient(to bottom, #d0d0d0, #989898);
      }
    }
  }
}

</style>
