<template>
  <div class="worksdetail">
    <div class="worksdetail-title">{{ worksInfo.name }}</div>
    <div class="worksdetail-author">
      <span>作者：</span>{{ worksInfo.author }}
    </div>
    <div class="worksdetail-info" v-html="worksInfo.info" />
    <div class="worksdetail-btn">
      <el-button type="primary" size="lg" :loading="isworks" @click="goVote">我要投票</el-button>
      <el-button type="primary" size="lg" plain @click="goBack">看看其他</el-button>
    </div>
    <ul v-if="activityList[0]" class="worksdetail-list">
      <li v-for="worksItem in activityList" :key="worksItem.id">
        <div class="item" @click="toVote(worksItem.id)">
          <el-image class="el-item-img" :src="$comm.url(worksItem.url)" />
          <div><span>作品名称：</span>{{ worksItem.name }}</div>
          <div><span>作者：</span>{{ worksItem.author }}</div>
          <div><span>当前票数：</span>{{ worksItem.voteNumber }}</div>
        </div>
      </li>
    </ul>
    <div class="paging">
      <div class="myTwo">
        <div class="block">
          <el-pagination
            :current-page.sync="pageIndex"
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
import { getWorksDetail, vote, getWorksList } from '@/api/activity'
export default {
  name: 'Worksdetail',
  data() {
    return {
      worksInfo: {},
      isworks: false,
      currentPage: 0,
      pageIndex: 1,
      pageSize: 20,
      total: 0,
      activityList: []
    }
  },
  created() {
    this.getDetail()
    this.getList()
  },
  methods: {
    getDetail() {
      getWorksDetail({ id: this.$route.query.id }).then(res => {
        this.worksInfo = res
      })
    },
    goVote() {
      vote({ businessId: parseInt(this.$route.query.id) }).then(res => {
        this.$message.success('投票成功')
      }).catch((err) => {
        console.log('err', err)
      })
    },
    goBack() {
      this.$router.push({ path: '/activity/index', query: { activityId: this.worksInfo.activityId }})
    },
    getList() {
      const req = {
        page: this.currentPage,
        size: this.pageSize
      }
      const data = {
        sort: 3
        // activityId: null
      }
      getWorksList(req, data).then(res => {
        this.activityList = res.content
        this.total = res.totalElements
      }).catch(() => {

      })
    },
    toVote(id) {
      this.$router.push({ path: `/activity/vote?id=${id}` })
    },
    handleSizeChange(val) {
      this.currentPage = val - 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val - 1
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .worksdetail{
    width: 100%;
    padding-bottom: 40px;
    &-title{
      font-size: 18px;
      line-height: 36px;
      font-weight: bold;
      text-align: center;
    }
    &-author{
      text-align: right;
      padding: 10px;
      font-size: 14px;
      color: #999999;
      border-bottom: 1px solid #efefef;
      span{
        font-weight: bold;
        color: #333333;
      }
    }
    &-info{
      padding: 30px 15px;
      img{
        display: block;
        max-width: 100%;
        margin: 10px auto;
      }
      /deep/ video{
        width: 100% !important;
      }
    }
    &-btn{
      padding: 20px 30px;
      text-align: center;
      @media (max-width: 767px){
        /deep/ .el-button{
          display: block;
          width: 80%;
        }
        /deep/ .el-button + .el-button{
          margin-left: 0;
          margin-top: 20px;
        }
      }
    }
    &-list{
      list-style-type: none;
      overflow: hidden;
      li{
        float: left;
        width: 25%;
        .item{
          box-sizing: border-box;
          margin: 20px 10px;
          padding: 4px;
          border: 1px solid #efefef;
          cursor: pointer;
          .imgbox{
            width: 100%;
          }
          /deep/ .el-image{
            display: block;
            width: 100%;
            height: 208px;
            overflow: hidden;
          }
          @media (max-width: 767px){
            width: 100%;
            // height: calc(750 / 100vw) + 'px';
            overflow: hidden;
          }
          div {
            line-height: 28px;
            font-size: 14px;
            color: #555555;
            span{
              font-weight: bold;
              color: #333333;
            }
          }
        }
      }
    }
  }
</style>
