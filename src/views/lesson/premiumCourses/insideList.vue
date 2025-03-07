<template>
  <div class="coursesourceinside">
    <div class="coursesourceinside-lf">
      <template v-if="list.length > 0">
        <div v-for="item in list" :key="item.id" class="coursesourceinside-lf-item" @click="toCourseDetail(item)">
          <div class="title">{{item.name || '暂无标题'}}</div>
          <div class="time">{{ parseTime(item.createTime) }}</div>
          <div class="content-wrapper">
            <div class="item-left">
              <el-image
                class="thumb-img"
                :src="$comm.url(item.coverImage)"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" style="font-size: 30px; color: #909399;"></i>
                </div>
              </el-image>
            </div>
            <div class="item-right">
              <div class="content-text">{{ item.briefIntroduction }}</div>
              <div class="bottom-tag">
                <el-image
                  class="icon_img"
                  :src="locIcon"
                />
                <span>总区 区管理员</span>
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
        <div v-for="item in tuijianList" :key="item.id" class="tj-item" @click="toCourseDetail(item)">
          <div class="imgbox">
            <el-image
              fit="fill"
              :src="$comm.url(item.coverImage)"
              style="width: 182px; height: 98px;"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 30px; color: #909399;"></i>
              </div>
            </el-image>
          </div>
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
    validateHtml(html) {
      if (!html || typeof html !== 'string') {
        return '暂无课程简介';
      }

      // 1. 移除所有HTML标签，只保留文本内容
      let textContent = html.replace(/<[^>]+>/g, '');
      
      // 2. 移除HTML实体
      textContent = textContent.replace(/&[^;]+;/g, '');
      
      // 3. 移除多余空格和换行
      textContent = textContent.replace(/\s+/g, ' ').trim();
      
      // 4. 如果处理后的内容为空，返回默认文本
      if (!textContent.trim()) {
        return '暂无课程简介';
      }
      
      return textContent;
    },
    getList() {
      const params = {
        ...this.params,
        page: this.currentPage - 1,
        size: this.pageSize,
        dateType: this.type,
        videoType: 1
      }
      getLessonListNew(params).then(res => {
        this.list = (res?.content || []).map(item => {
          return {
            ...item,
            name: item.name || '暂无标题',
            coverImage: item.coverImage || '',
            briefIntroduction: this.validateHtml(item.briefIntroduction)
          }
        })
        this.total = res?.totalElements || 0
      })
      .catch((error) => {
        console.log(error)
        this.list = []
        this.total = 0
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
        // 确保返回的数据是有效的，并且每个项目都有name属性
        this.groupList = (res || []).map(item => {
          return {
            ...item,
            name: item.name || '暂无标题',  // 如果name为空，设置默认值
            briefIntroduction: this.validateHtml(item.briefIntroduction) // 验证并清理HTML内容
          }
        })
      })
        .catch((error) => {
          console.log(error)
          this.groupList = []  // 发生错误时清空列表
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
        // 确保返回的数据是有效的，并且每个项目都有name属性
        this.courseList = (res || []).map(item => {
          return {
            ...item,
            name: item.name || '暂无标题',  // 如果name为空，设置默认值
            briefIntroduction: this.validateHtml(item.briefIntroduction) // 验证并清理HTML内容
          }
        })
      })
        .catch((error) => {
          console.log(error)
          this.courseList = []  // 发生错误时清空列表
        })
    },
    getTjList() {
      const params = {
        page: 0,
        size: 10,
        recommendFlag: 1,
        type: 1
      }
      queryQualityCoursesNew(params).then(res => {
        this.tuijianList = (res?.content || []).map(item => {
          return {
            ...item,
            name: item.name || '暂无标题',
            coverImage: item.coverImage || '',
            briefIntroduction: this.validateHtml(item.briefIntroduction)
          }
        })
      })
      .catch((error) => {
        console.log(error)
        this.tuijianList = []
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
      border-bottom: 1px solid #EEEEEE;
      cursor: pointer;
      .title {
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
        margin-bottom: 10px;
      }
      .time {
        font-size: 14px;
        color: #666666;
        line-height: 24px;
        margin-bottom: 20px;
      }
      .content-wrapper {
        display: flex;
        .item-left {
          margin-right: 20px;
          .thumb-img {
            width: 170px;
            height: 106px;
            border-radius: 4px;
            object-fit: cover;
          }
        }
        .item-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .content-text {
            font-size: 14px;
            line-height: 1.5;
            color: #666;
            margin-bottom: 10px;
            /deep/ p {
              margin: 0;
            }
          }
          .bottom-tag {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #999;
            .icon_img {
              width: 12px;
              height: 12px;
              margin-right: 4px;
            }
          }
        }
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
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      
      .tj-item {
        .imgbox {
          margin-top: 12px;
          width: 182px;
          height: 98px;
          border-radius: 6px;
          overflow: hidden;
          background: #f5f5f5;
          cursor: pointer;
          
          /deep/ .el-image {
            width: 100%;
            height: 100%;
            
            .image-slot {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              background: #f5f5f5;
            }
          }
        }
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
