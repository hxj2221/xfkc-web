<template>
  <div class="searchresult">
    <div class="searchresult-search">
      <div class="search-type">
        <el-radio-group v-model="searchType" @change="handleTypeChange">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">精品课程</el-radio-button>
          <el-radio-button :label="2">课程资源</el-radio-button>
          <el-radio-button :label="3">新闻</el-radio-button>
          <el-radio-button :label="4">特色课程</el-radio-button>
        </el-radio-group>
      </div>
      <el-input v-model="key" size="medium" prefix-icon="el-icon-search" placeholder="请输入搜索关键词">
        <el-button slot="append" @click="searchList">搜索</el-button>
      </el-input>
    </div>
    <!-- 其他内容保持与原搜索结果页面一致 -->
  </div>
</template>

<script>
import { getSearchAllApi } from '@/api/search/index'
// ...其他 import

export default {
  name: 'SearchAllResult',
  data() {
    return {
      searchType: 0,
      currentPage: 0,
      total: 0,
      pageSize: 10,
      list: [],
      key: this.$route.query.key && this.$route.query.key !== '' ? decodeURIComponent(this.$route.query.key) : ''
    }
  },
  methods: {
    handleTypeChange() {
      this.currentPage = 0
      this.getList()
    },
    getList() {
      const params = {
        key: this.key,
        type: this.searchType,
        page: this.currentPage,
        size: this.pageSize
      }
      getSearchAllApi(params).then(res => {
        this.list = res?.content || []
        this.total = res?.totalElements
      })
    }
    // ...其他方法保持不变
  }
}
</script> 