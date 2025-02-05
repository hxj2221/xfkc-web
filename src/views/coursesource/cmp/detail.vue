<template>
  <div class="coursesourcedetail">
    <div class="coursesourcedetail-left">
      <div class="source-title">{{ sourceData.title }}</div>
      <div class="source-handle">
        <div class="source-handle-lt">
          <!-- <span>{{ sourceData.from }}</span> -->
          <el-rate
            v-model="sourceData.score"
            disabled
            :show-score="sourceData.score"
            text-color="#ff9900"
            score-template="{value}"
            style="display: inline-block;"
          />{{ sourceData.score && sourceData.score > 0 ? '分':'' }}
        </div>
        <div class="source-handle-rt">
          <span><svg-icon icon-class="givescore" :style="` color: ${sourceData.score && sourceData.score > 0 ? '#ff9900': '#999999'}`" @click="dialogVisible = true" /> 评分</span>
          <span><svg-icon icon-class="givecollect" :style="`color: ${sourceData.giveCollectFlag ? '#ff9900': '#999999'}`" @click="changeGiveCollectStatus" /> 收藏</span>
          <span><svg-icon icon-class="givelike" :style="`color: ${sourceData.giveLikeFlag ? '#ff9900': '#999999'}`" @click="changeGiveLikeStatus" /> {{ sourceData.likeTotal }}</span>
          <!-- <span>{{ sourceData. }}建议</span> -->
        </div>
      </div>
      <div class="source-content" v-html="sourceData.context" />
      <div class="source-bto">
        <div class="tips">感谢所有为资源建设提供资料的单位和个人<br>未经允许不得转载或引用</div>
        <!-- <div class="shouke">全屏授课</div> -->
      </div>
      <div class="source-remark">
        {{ sourceData.remark }}
      </div>
      <el-dialog
        title="给出您的合理评分"
        :visible.sync="dialogVisible"
        width="300px"
      >
        <div><el-rate
          v-model="valueScore"
          :colors="colors"
        /></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeGiveScoreStatus">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="coursesourcedetail-right">
      <div class="coursesourcedetail-right-head"><span>//</span>相关推荐</div>
      <div class="coursesourcedetail-right-list">
        <template v-if="list.length > 0">
          <div v-for="item in list" :key="item.id" class="listitem" @click="openDetail(item)">
            <el-image
              fit="fill"
              :src="$comm.url(item.imgUrl)"
              style="width: 132px; height: 84px;"
              class="imgbox"
            />
            <div class="info">
              <div class="remark">{{ item.title }}</div>
              <!-- <div class="from">{{ item.remark }}</div> -->
            </div>
          </div>
        </template>
        <div v-else class="nomore">
          暂无相关推荐内容
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourseSourceDetail, getCourseSourceQuery, giveCollect, giveLike, giveScore, handleViewTime } from '@/api/coursesource/index'
export default {
  name: '',
  props: {
    id: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 8,
      sourceData: {},
      list: [],
      dialogVisible: false,
      valueScore: null,
      timeout: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'] // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  },
  computed: {
  },
  created() {
    if (this.id) {
      this.getDetail(this.id, true)
      this.getList(this.id)
    }
  },
  beforeDestroy() {
    this.stopPolling()
  },
  mounted() {
    window.removeEventListener('beforeunload', this.stopPolling)
  },
  methods: {
    getDetail(id, isInit) {
      getCourseSourceDetail({ id: id }).then(res => {
        if (res) {
          this.sourceData = res
          this.valueScore = res.score
          if (this.$route.query.id && isInit) {
            this.$emit('changeCategory', res)
          }
          this.stopPolling()
          this.timeout = setInterval(() => {
            handleViewTime(res.code).then()
          }, 10 * 1000)
        }
      })
        .catch((error) => {
          console.log(error)
        })
    },
    getList() {
      const params = {
        page: 0,
        size: 10,
        recommendFlag: 1
      }
      getCourseSourceQuery(params).then(res => {
        this.list = res?.content || []
      })
        .catch((error) => {
          console.log(error)
        })
    },
    openDetail(item) {
      this.getDetail(item.id, false)
      this.getList(item.id)
    },
    handleScore(done) {
      this.dialogVisible = false
    },
    changeGiveScoreStatus() {
      const params = {
        type: 1,
        score: this.valueScore,
        businessId: this.sourceData.id
      }
      giveScore(params).then(res => {
        if (res) {
          this.dialogVisible = false
          this.sourceData.score = this.valueScore
        }
      })
        .catch((error) => {
          console.log(error)
        })
    },
    changeGiveCollectStatus() {
      const params = {
        type: 1,
        businessId: this.sourceData.id
      }
      giveCollect(params, this.sourceData.giveCollectFlag ? 'delete' : 'post').then(res => {
        this.sourceData.giveCollectFlag = !this.sourceData.giveCollectFlag
      })
        .catch((error) => {
          console.log(error)
        })
    },
    changeGiveLikeStatus() {
      const params = {
        type: 1,
        businessId: this.sourceData.id
      }
      giveLike(params, this.sourceData.giveLikeFlag ? 'delete' : 'post').then(res => {
        this.sourceData.giveLikeFlag = !this.sourceData.giveLikeFlag
      })
        .catch((error) => {
          console.log(error)
        })
    },
    stopPolling() {
      if (this.timeout) clearInterval(this.timeout)
    }
  },
  beforeUnmount() {
    this.stopPolling()
    window.removeEventListener('beforeunload', this.stopPolling)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.coursesourcedetail {
  display: flex;
  padding: 32px;
  .coursesourcedetail-left{
    width: 862px;
    box-sizing: border-box;
    .source-title{
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
    }
    .source-handle{
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      line-height: 20px;
      font-size: 14px;
      .source-handle-rt{
        color: #999999;
        span{
          display: inline-block;
          margin: 0 16px;
          cursor: pointer;
          .svg-icon{
            color: #999999;
          }
        }
      }
    }
    .source-content{
      margin: 20px 0;
      img{
        display: block;
        max-width: 100%;
        margin: 10px auto;
      }
      /deep/ video{
        width: 100% !important;
      }
    }
    .source-bto{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tips{
        width: 370px;
        height: 40px;
        line-height: 20px;
        font-size: 12px;
        color: #999999;
      }
      .shouke{
        width: 120px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        border-radius: 18px;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .source-remark{
      margin-top: 20px;
      line-height: 22px;
      font-size: 16px;
    }
  }
  .coursesourcedetail-right{
    margin-left: 32px;
    flex: 1;
    &-head{
      line-height: 32px;
      font-size: 18px;
      font-weight: bold;
      span{
        color: #49B1EE;
        letter-spacing: 2px;
        padding-right: 4px;
      }
    }
    &-list{
      .listitem{
        margin-top: 20px;
        display: flex;
        .info{
          flex: 1;
          line-height: 20px;
          font-size: 14px;
          margin-left: 10px;
          .remark{
            margin-top: 2px;
            height: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
          .from{
            height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #999999;
          }
        }
      }
    }
    .nomore{
      line-height: 100px;
      text-align: center;
      font-size: 14px;
      color: #999999;
    }
  }
  .coursesourcedetail-list{
    padding-bottom: 32px;
    overflow: hidden;
  }
  .coursesourcedetail-list-item{
    position: relative;
    float: left;
    width: 310px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #e1e9f4;
    box-shadow: 0 0 8px -2px rgba(0, 0, 0, .06);
    transition: .3s;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 32px;
    margin-top: 24px;
    padding: 8px;
    .img-box{
      width: 292px;
      height: 174px;
      border-radius: 8px;
    }
    .img-boxbg{
      display: none;
      text-align: center;
      line-height: 174px;
      color: #ffffff;
      i{
        font-size: 40px;
      }

    }
    .title-box{
      line-height: 26px;
      font-size: 16px;
      margin-top: 10px;
    }
    .remark{
      margin-top: 10px;
      height: 20px;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
    }
    .data{
      line-height: 20px;
      margin-top: 10px;
      font-size: 12px;
      color: #999999;
      div{
        display: inline-block;
        width: 34%;
      }
    }
  }
  .paging{
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
</style>
