<template>
  <div class="point-main">
    <grcrumbs />
    <div class="center-title">
      <div class="select-item">
        检索类型
        <span
          :class="['item-retrieval',retrieval === 1 ? 'background-green-active' : '' ]"
          @click="changeRet(1)"
        >平台</span>
        <span
          :class="['item-retrieval',retrieval === 2 ? 'background-green-active' : '' ]"
          @click="changeRet(2)"
        >学校</span>
      </div>
    </div>
    <!--  还不清楚userId是啥-->
    <div v-if="userId === '2' || userId === '1'" class="main-point">
      <el-image :src="require('../../assets/achievement/sun.png')" alt />
      当前积分
      <span class="point">{{ myPoint }}</span>
    </div>
    <div class="chanllege-content">
      <div v-for="(item, index) in pointsList" :key="index" class="content-item" @click="toDetail(item)">
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
      </div>
    </div>
    <div class="paging">
      <div class="myTwo2">
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
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { getPoint, getMyPoint, exchange } from '@/api/point/point'
export default {
  name: 'Grpointcenter',
  components: {
    grcrumbs
  },
  data() {
    return {
      dialogVisible: false,
      userId: '',
      retrieval: 1,
      myPoint: 0,
      pointsList: [],
      currentPage: 1,
      total: 0,
      pageSize: 12,
      pointDetail: {},
      dialogTitle: ''
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
        type: this.retrieval,
        page: this.currentPage - 1,
        size: this.pageSize,
        sort: ''
      }
      getPoint(params)
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
      const params = {
        type: this.retrieval
      }
      getMyPoint(params)
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
    height: 72px;
    margin-top: 20px;
    background: url("../../assets/message/grmessagebg.png");
    background-size: 100% 100%;
    position: relative;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
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
      :nth-child(1) {
        margin-left: 20px;
      }
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
    display: flex;
    flex-wrap: wrap;
    margin-top: 34px;

    .content-item {
      cursor: pointer;
      margin-bottom: 40px;
      width: 290px;
      box-shadow: 1px 1px 5px #f1f1f1;
      border-radius: 15px;
      margin-right: 68px;
      overflow: hidden;

      &:nth-child(4n){
        margin-right: 0;
      }

      .item-img {
        width: 290px;
        height: 204px;
        overflow: hidden;
        img {
          // width: 290px;
          // height: 204px;
        }
      }
      .item-text {
        padding: 10px;
        box-sizing: border-box;
        background: #fff;

        .item-text-title {
          color: #242424;
          font-weight: bold;
          font-size: 22px;
          padding-bottom: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-text-point {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .item-text-point-number{
            font-size: 20px;
            font-weight: bold;
            color: #ff6a6a;
            display: inline-flex;
            align-items: center;

            .unit{
              padding-left: 5px;
              font-size: 14px;
              font-weight: bold;
              color: #ff6a6a;
            }
          }
        }
        .button {
          cursor: pointer;
          color: #fff;
          width: 120px;
          height: 35px;
          line-height: 35px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          border-radius: 30px;
          background-image: linear-gradient(to bottom, #4fbe30, #2d8815);
        }
        .write {
          background-image: linear-gradient(to bottom, #e4e4e4, #b5b5b5);
        }
      }

      .item-bottom{
        display: flex;
        justify-content: flex-end;
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
      background-image: linear-gradient(to bottom, #4fbe30, #2d8815);
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
