<template>
  <div class="yunkt">
    <ul v-if="yunktList[0]" class="yunkt-list">
      <li v-for="worksItem in yunktList" :key="worksItem.id">
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
// import { getDetail, getWorksList } from '@/api/activity'
import { parseTime } from '@/utils/index'
export default {
  name: 'Yunkt',
  data() {
    return {
      currentPage: 0,
      pageIndex: 1,
      pageSize: 12,
      total: 0,
      yunktInfo: {},
      yunktList: []
    }
  },
  created() {
    // this.getActivity()
    // this.getList()
  },
  methods: {
    parseTime,
    getyunkt() {
      console.log('获取')
      // getDetail({ id: this.yunktId }).then(res => {
      //   this.yunktInfo = res
      // }).catch(() => {

      // })
    },
    getList() {
      // const req = {
      //   page: this.currentPage,
      //   size: this.pageSize
      // }
      // const data = {
      //   sort: 3,
      //   yunktId: this.yunktId
      // }
      // getWorksList(req, data).then(res => {
      //   this.yunktList = res.content
      //   this.total = res.totalElements
      // }).catch(() => {

      // })
    },
    toVote(id) {
      this.$router.push({ path: `/yunkt/vote?id=${id}` })
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
  .yunkt{
    width: 100%;
    &-list{
      list-style-type: none;
      overflow: hidden;
      li{
        float: left;
        width: 33.333333%;
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
            height: 284px;
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
    .paging{
      margin-top: 30px;
      margin-bottom: 40px;
    }
  }
</style>
