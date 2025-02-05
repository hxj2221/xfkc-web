<template>
  <div class="coursesourceinside">
    <div class="coursesourceinside-lf">
      <template v-if="list.length > 0">
        <div v-for="item in list" :key="item.id" class="coursesourceinside-lf-item" @click="toCourseDetail(item)">
          <div class="topline">
            <div class="title">{{ item.title }}</div>
            <div class="time">{{ parseTime(item.createTime) }}</div>
          </div>
          <div class="remark">{{ item.remark }}</div>
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
      <div class="coursesourceinside-rt-box">
        <div class="head"><span>//</span>热点排行</div>
        <div v-for="(item, index) in groupList" :key="item.id" class="groupitem" @click="toCourseDetail(item)">
          <div class="num">{{ index + 1 }}</div>
          <div class="title">{{ item.title }}</div>
          <div class="zan">{{ item.viewTotal }}</div>
        </div>
      </div>
      <div class="coursesourceinside-rt-box">
        <div class="head"><span>//</span>专题排行</div>
        <div v-for="(item, index) in courseList" :key="item.id" class="groupitem" @click="openNewList(item)">
          <div class="num">{{ index + 1 }}</div>
          <div class="title">{{ item.title }}</div>
          <div class="zan">{{ item.viewTotal }}</div>
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
// import { mapGetters } from 'vuex'
// import moment from 'moment'
import { parseTime } from '@/utils/index'
import { getGroupCourseSourceColumn, getGroupCourse, getCourseSourceQuery } from '@/api/coursesource/index'
export default {
  components: {
  },
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
      list: [],
      groupList: [],
      courseList: [],
      tuijianList: [],
      columnId: this.id
    }
  },
  computed: {
    // ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
    this.getList(this.id)
    this.getHotList()
    this.getCourseSource()
    this.getTjList(this.id)
    this.columnId = this.id
  },
  methods: {
    parseTime,
    getList(id) {
      const params = {
        page: this.currentPage - 1,
        size: this.pageSize,
        courseSourceColumnId: id
      }
      getCourseSourceQuery(params).then(res => {
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
        size: 10
      }
      getGroupCourse(params).then(res => {
        this.groupList = res.content
      })
        .catch((error) => {
          console.log(error)
        })
    },
    getCourseSource() {
      const params = {
        page: 0,
        size: 10
      }
      getGroupCourseSourceColumn(params).then(res => {
        console.log('专题列表', res)
        this.courseList = res.content
      })
        .catch((error) => {
          console.log(error)
        })
    },
    getTjList(id) {
      const params = {
        page: 0,
        size: 10,
        recommendFlag: 1
      }
      getCourseSourceQuery(params).then(res => {
        console.log('图文动态', res)
        this.tuijianList = res.content
      })
        .catch((error) => {
          console.log(error)
        })
    },
    toCourseDetail(item) {
      this.$emit('changeShowType', 'detail', item)
    },
    openNewList(item) {
      if (item.id === this.id) {
        return false
      } else {
        this.columnId = item.id
        this.currentPage = 1
        this.getList(item.id)
        this.getTjList(item.id)
        this.$emit('changeTab', item)
      }
    }
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
      .topline{
        position: relative;
        padding-right: 140px;
        height: 24px;
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
        display: block;
        position: absolute;
        right: 0;
        top: 0;
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
    flex: 1;
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
      display: flex;
      margin-top: 14px;
      border-left: 1px solid #eeeeee;
      height: 16px;
      line-height: 16px;
      margin-left: 8px;
      .num{
        width: 16px;
        height: 16px;
        margin-left: -8px;
        border-radius: 8px;
        color:#fff;
        background: #D3D3D3;
        text-align: center;
        position: relative;
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
