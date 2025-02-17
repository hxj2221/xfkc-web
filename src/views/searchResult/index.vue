<template>
  <div class="searchresult">
    <div class="searchresult-search">
      <el-input v-model="key" size="medium" prefix-icon="el-icon-search" placeholder="请输入搜索关键词">
        <el-button slot="append" @click="searchList">搜索</el-button>
      </el-input>
    </div>
    <div v-if="total > 0" class="searchresult-list">
      <div v-for="item in list" :key="item.id" class="searchresult-list-item" @click="toDetail(item)">
        <div class="searchresult-list-item-title">{{ item.name }}</div>
        <!-- <div class="searchresult-list-item-type">【{{ item.videoType === 1 ? '精品课程':'课程资源' }}】</div> -->

        <div class="searchresult-list-item-type"> 【{{ typeList.find(e=>e.id ==item.videoType ).name }}】</div>
        <div class="searchresult-list-item-time">{{ moment(item.createTime).format('YYYY-MM-DD') }}</div>
      </div>
    </div>
    <div v-else class="searchresult-list" style="text-align: center; color: #666;">没有查找到相关内容</div>
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
</template>

<script>
import { mapGetters } from 'vuex'
import { getSearchListApi } from '@/api/search/index'
import moment from 'moment'
export default {
  name: 'Searchresult',
  components: {
  },
  data() {
    return {
      currentPage: 0,
      total: 0,
      pageSize: 10,
      list: [],
      typeList:[
        {
          name:'精品课程',
          id: 1
        },
        {
          name:'课程资源',
          id: 2
        },
        {
          name:'特色展示',
          id: 3
        },
        {
          name:'精品栏目',
          id: 4
        },
      ],
      key: this.$route.query.key && this.$route.query.key !== '' ? decodeURIComponent(this.$route.query.key) : ''
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
    this.getList()
  },
  methods: {
    moment,
    getList() {
      const params = {
        key: this.key,
        page: this.currentPage,
        size: this.pageSize
      }
      getSearchListApi(params).then(res => {
        this.list = res?.content || []
        this.total = res?.totalElements
      })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 0
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    searchList() {
      this.currentPage = 0
      this.getList()
    },
    toDetail(item) {
      if (item.videoType === 1) {
        this.$router.push({ path: `/excellentCourse/excellentCourse?id=${item.id}&type=1&showType='detail'` })
      } else if (item.videoType === 3) {
        this.$router.push({ path: `/featureCourse/index?id=${item.id}` })
      } else {
        this.$router.push({ path: `/coursesource/index?id=${item.id}` })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.searchresult {
  margin: 0 auto;
  width: 100%;
  &-search {
    max-width: 400px;
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
      background: #49b1ef;
      border-color: #49b1ef;
      color: #ffffff;
    }
  }
  &-list{
    line-height: 100px;
    &-item{
      display: flex;
      margin-top: 20px;
      line-height: 40px;
      cursor: pointer;
      border-bottom: 1px dashed #e0d0d0;
      &-title{
        flex: 1;
      }
      &-type{
        width: 100px;
        color: #666;
      }
      &-time{
        width: 100px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .paging{
    margin: 60px auto;
  }
}
</style>
