<template>
  <div class="coursesource">
    <Category ref="CategoryRef" @changeShowType="changeShowType" />
    <InsideList v-if="showType==='insideList'" :id="insideId" ref="InsideList" @changeShowType="changeShowType" @changeTab="changeTab" />
    <Detail v-else-if="showType==='detail'" :id="detailId" ref="Detail" @changeShowType="changeShowType"  />
    <List v-else :id="listId" ref="List" @changeShowType="changeShowType" />
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
import Category from './cmp/category.vue'
import List from './cmp/list.vue'
import InsideList from './cmp/insideList.vue'
import Detail from './cmp/detail.vue'
export default {
  name: 'FeatureCourse',
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
      detailId: Number(this.$route.query.id) || null,
      showType: 'list',
      insideId: null,
      listId: null,
      change: 1
      // list: []
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
  },
  watch:{
    'change'(newVal, oldVal){
      if(newVal > oldVal && this.$route.query.id){
        this.showType = 'detail'
      }
    }
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
      this.change = 2
    },
    getList(id) {
      this.$refs.List?.getList(id)
    },
    changeTab(newColumn) {
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
