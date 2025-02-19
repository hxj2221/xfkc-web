<template>
  <div class="coursesourceinside">
    <div class="coursesourceinside-lf">
      <template v-if="list.length > 0">
        <div v-for="item in list" :key="item.id" class="coursesourceinside-lf-item" @click="toCourseDetail(item)">
          <div class="title">
           {{item.name}}
          </div>
          <div class="time">{{ parseTime(item.createTime) }}</div>
          <div class="flex items-center content_box">
            <el-image
              v-if="type != 4"
              class="model_img"
              :src="$comm.url(item.coverImage)"
            />
            <div style="vertical-align: top">
              <div class="content_text" v-html="item.briefIntroduction"  />
              <div class='flex items-center' style="margin-top: 8px;font-size: 12px;color: #999999;" v-if="type == 1">
                <el-image
                  class="icon_img"
                  :src="locIcon"
                />
                {{item.schoolName}}·{{item.authorName}}
              </div>
            </div>
          </div>
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
      </template>
      <div v-else style="line-height: 200px; text-align: center; color: #999999;">
        暂无数据
      </div>
    </div>
    <div class="coursesourceinside-rt">
      <div class="resources_searchbox">
        <el-input v-model="searchKey" clearable size="medium" prefix-icon="el-icon-search" placeholder="请输入搜索关键词">
          <el-button slot="append" @click="searchList">搜索</el-button>
        </el-input>
      </div>
      <div class="coursesourceinside-rt-box">
        <div class="head"><span>//</span>热点排行</div>
        <div v-for="(item, index) in groupList" :key="item.id" class="groupitem" @click="toCourseDetail(item)">
          <div class="num">{{ index + 1 }}</div>
          <div class="title">{{ item.name }}</div>
          <div class="zan">{{ item.pageView }}</div>
        </div>
      </div>
      <div class="coursesourceinside-rt-box">
        <div class="head"><span>//</span>专题排行</div>
        <div v-for="(item, index) in courseList" :key="item.id" class="groupitem" @click="toCourseDetail(item)">
          <div class="num">{{ index + 1 }}</div>
          <div class="title">{{ item.name }}</div>
          <div class="zan">{{ item.pageView }}</div>
        </div>
      </div>
      <div class="head"><span>//</span>图文动态</div>
      <div v-if="tuijianList.length > 0" class="coursesourceinside-rt-tjbox">
        <div v-for="item in tuijianList" :key="item.id" @click="toCourseDetail(item)">
          <div class="imgbox">
            <el-image
              fit="fill"
              :src="$comm.url(item.imgUrl)"
              style="width: 182px; height: 98px;"
            /></div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
      <div v-else style="line-height: 100px; text-align: center; color: #999999;">暂无内容</div>
    </div>
  </div>
</template>
<script>
import locIcon from '@/assets/lesson/address.png'
import { parseTime } from '@/utils/index'
import {getLessonListNew, queryQualityCoursesNew, queryQualityViewRank} from '@/api/lesson/lesson'
export default {
  components: {
  },
  props: {
    type: {
      default: null,
      type: Number
    },
    params: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      locIcon,
      searchKey:'',
      currentPage: 1,
      total: 0,
      pageSize: 8,
      list: [],
      groupList: [],
      courseList: [],
      tuijianList: [],
      columnId: this.id
    }
  },
  computed: {
  },
  created() {
    this.getList()
    this.getHotList()
    this.getCourseSource()
    this.getTjList()
    this.columnId = this.id
  },
  methods: {
    parseTime,
    searchList(){
      this.$router.push({ path: `/searchResult/index?key=${encodeURIComponent(this.searchKey)}&videoType=1` })
    },
    getList() {
      const params = {
        ...this.params,
        page: this.currentPage - 1,
        size: this.pageSize,
        dateType: this.type,
        videoType:1
      }
      getLessonListNew(params).then(res => {
        this.list = res?.content || []
        this.total = res?.totalElements
      })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.getList(this.columnId)
    },
    handleCurrentChange() {
      this.getList(this.columnId)
    },
    getHotList(level) {
      const params = {
        page: 0,
        size: 10,
        ...this.params,
        dateType: this.type,
        type:1,
        topN:10
      }
      queryQualityViewRank(params).then(res => {
        this.groupList = res
      })
        .catch((error) => {
          console.log(error)
        })
    },
    getCourseSource() {
      const params = {
        page: 0,
        size: 10,
        type:1,
        topN:10
      }
      queryQualityViewRank(params).then(res => {
        console.log('专题列表', res)
        this.courseList = res
      })
        .catch((error) => {
          console.log(error)
        })
    },
    getTjList() {
      const params = {
        page: 0,
        size: 10,
        recommendFlag: 1,
        type:1
      }
      queryQualityCoursesNew(params).then(res => {
        this.tuijianList = res.content
      })
        .catch((error) => {
          console.log(error)
        })
    },
    toCourseDetail(item) {
      this.$emit('changeShowType', 'detail', item)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .coursesourceinside{
    display: flex;
    padding: 32px;
  }
  .coursesourceinside-lf{
    width: 900px;
    margin-right: 32px;
    &-item{
      padding: 20px 0;
      box-shadow: inset 0px -1px 0px 0px #EEEEEE;
      .title{
        margin-bottom: 10px;
      }
      .content_box{
        margin-top: 20px;
        align-content: flex-start;
        .icon_img{
          width: 11px;
          height: 12px;
          margin-right: 4px;
        }
        .model_img{
          width: 170px;
          min-width: 170px;
          height: 106px;
          margin-right: 20px;
        }
        .content_text{
          max-height: 88px;
          min-height: 60px;
          word-wrap: break-word;   //自动换行
          word-break: break-all;    //自动换行（兼容字母）
          overflow: hidden;       //超出隐藏
          text-overflow: ellipsis;   //溢出显示省略号
          display: -webkit-box;
          -webkit-line-clamp: 4;   //显示3行
          -webkit-box-orient: vertical;
          font-size: 16px;
          line-height: 22px;
          color: #999999;

        }
      }
      .title{
        height: 24px;
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time{
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #666666;
      }
      .remark{
        margin-top: 20px;
        height: 66px;
        line-height: 22px;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 16px;
        color: #999999;
      }
    }
  }
  .coursesourceinside-rt{
    cursor: pointer;
    flex: 1;
    .resources_searchbox{
      margin-bottom: 20px;
      font-size: 16px;
      /deep/.el-input{
        height: 46px;
      }
      /deep/ .el-input-group > .el-input__inner{
        height: 46px;
        background: #f3f3f3;
        border-color: #f3f3f3;
      }
      /deep/ .el-input--medium{
        font-size: 16px;
      }
      /deep/ .el-input-group__append, .el-input-group__prepend{
        background: #0084D2;
        border-color: #0084D2;
        color: #ffffff;
      }
    }
    &-box{
      background: #FFFFFF;
      box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
      border-radius: 4px;
      padding: 12px;
      margin-bottom: 20px;
    }
    &-tjbox{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .imgbox{
        margin-top: 12px;
        width: 182px;
        height: 98px;
        border-radius: 6px;
        overflow: hidden;
      }
      .title{
        width: 182px;
        margin-top: 10px;
        height: 20px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .head{
      height: 30px;
      line-height: 24px;
      font-size: 18px;
      font-weight: bold;
      span{
        color: #49B1EE;
        letter-spacing: 2px;
        padding-right: 4px;
      }
    }
    .groupitem{
      cursor: pointer;
      display: flex;
      margin-top: 14px;
      border-left: 1px solid #eeeeee;
      height: 16px;
      line-height: 16px;
      margin-left: 8px;
      .num{
        text-align: center;
        width: 16px;
        height: 16px;
        margin-left: -8px;
        border-radius: 8px;
        color:#fff;
        background: #D3D3D3;
        text-align: center;
        position: relative;
        font-size: 10px;
      }
      .num::after{
        position: absolute;
        content: '';
        width: 1px;
        height: 14px;
        left: 7px;
        top: 16px;
        background: #eee;
      }
      .num:last-child::after{
        display: none;
      }
      .title{
        margin: 0 14px;
        width: 240px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .zan{
        width: 60px;
        text-align: right;
        color: #D85435;
      }
    }

    .groupitem:last-child .num{
      background: #D85435;
    }
    .groupitem:nth-child(2) .num{
      background: #F6A522;
    }
    .groupitem:nth-child(3) .num{
      background: #9C766D;
    }
    .groupitem:last-child .num::after{
      display: none;
    }

  }
  .paging{
    margin-top: 90px;
    margin-bottom: 63px;
  }
</style>
