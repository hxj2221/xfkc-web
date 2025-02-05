<template>
  <div class="coursesourcelist">
    <div v-if="list.length > 0" class="coursesourcelist-list">
      <div v-for="item in list" :key="item.id" class="coursesourcelist-list-item" @click="toCourseSourceList(item)">
        <div class="img-box">
          <el-image
            fit="fill"
            :src="$comm.url(item.imgUrl)"
            style="width: 292px; height: 174px;"
          />
        </div>
        <div class="img-boxbg"><i class="el-icon-video-play" /></div>
        <div class="title-box">
          <div class="type">{{ }}</div>
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="remark">{{ item.remark }}</div>
        <div class="data">
          <div><svg-icon icon-class="givelike" style="margin-right: 8px;" />{{ item.likeTotal }}</div>
          <div><svg-icon icon-class="eye" style="margin-right: 8px;" />{{ item.viewTotal }}</div>
        </div>
      </div>
    </div>
    <div v-else style="line-height: 200px; text-align: center; color: #999999;">
      暂无数据
    </div>
    <!-- <div class="paging">
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
    </div> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getCourseSourceList } from '@/api/coursesource/index'
export default {
  name: 'CoursesourceIndex',
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
      pageSize: 10,
      list: []
    }
  },
  computed: {
    // ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
    // this.getCategoryList(0)
    this.getList(this.id)
  },
  methods: {
    getList(id) {
      getCourseSourceList({ sourceCategoryId: id }).then(res => {
        this.list = res
      })
        .catch((error) => {
          console.log(error)
        })
    },
    toCourseSourceList(item) {
      this.$emit('changeShowType', 'insideList', item)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.coursesourcelist {
  .coursesourcelist-list{
    padding-bottom: 32px;
    overflow: hidden;
  }
  .coursesourcelist-list-item{
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
      // i{
      //   font-size: 40px;
      // }

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
  .coursesourcelist-list-item:hover{
    .img-boxbg{
      position: absolute;
      display: block;
      top: 8px;
      left: 8px;
      right: 8px;
      width: 292px;
      height: 174px;
      background: rgba(0, 0, 0, .06);
      border-radius: 8px;
    }
  }
  .coursesourcelist-list-item:nth-child(4n){
    margin-right: 0;
  }
}
</style>
