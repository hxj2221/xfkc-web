<template>
  <div class="coursesource">
    <Category ref="CategoryRef" :is-has-id="isHasId" @changeShowType="changeShowType" />
    <InsideList v-if="showType==='insideList'" :id="insideId" ref="InsideList" @changeShowType="changeShowType" @changeTab="changeTab" />
    <Detail v-else-if="showType==='detail'" :id="detailId" ref="Detail" @changeShowType="changeShowType" @changeCategory="changeCategory" />
    <List v-else :id="listId" ref="List" @changeShowType="changeShowType" />
    <!-- <div class="coursesource-list">
      <div v-for="item in list" :key="item.id" class="coursesource-list-item" @click="toCourseSourceList(item)">
        <div class="img-box">
          <el-image
            fit="fill"
            :src="item.imgUrl"
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
    </div> -->
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
import { mapGetters } from 'vuex'
// import { getCourseSourceList } from '@/api/coursesource/index'
import Category from './cmp/category.vue'
import List from './cmp/list.vue'
import InsideList from './cmp/insideList.vue'
import Detail from './cmp/detail.vue'
export default {
  name: 'CoursesourceIndex',
  components: {
    Category,
    List,
    InsideList,
    Detail
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 16,
      detailId: this.$route.query.id || null,
      showType: this.$route.query.id ? 'detail' : 'list',
      isHasId: this.$route.query.id || false,
      insideId: null,
      listId: null,
      twoId: null
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
  },
  methods: {
    changeShowType(type, info) {
      this.showType = type
      if (type === 'insideList') {
        this.insideId = info.id
      } else if (type === 'detail') {
        this.detailId = info.id
      } else {
        this.listId = info
        this.getList(info)
      }
    },
    getList(id) {
      this.$refs.List?.getList(id)
    },
    changeCategory(newColumn) {
      this.isHasId = false
      this.$refs.CategoryRef?.changeTab2(newColumn)
    },
    changeTab(newColumn) {
      this.isHasId = false
      this.$refs.CategoryRef?.changeTab(newColumn)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.coursesource {
  width: 1366px;
  margin: 0 auto;
  .paging{
    margin: 60px auto;
  }
}
</style>
