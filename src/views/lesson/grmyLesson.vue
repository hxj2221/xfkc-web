<template>
  <div class="lesson-main">
    <grcrumbs />
    <!-- <div class="box">
      <div class="top">
        <div class="one">
          <div class="name_1">检索类型</div>
          <div>
            <el-radio-group v-model="radio3">
              <el-radio-button label="全部" class="tag" />
              <el-radio-button label="平台" class="tag" />
              <el-radio-button label="学校" class="tag" />
            </el-radio-group>
          </div>
        </div>
        <div class="two">
          <div class="name_2">
            年
            <span class="zhanwei">级</span>
          </div>
          <div>
            <el-radio-group v-model="radio4">
              <el-radio-button label="全部" />
              <el-radio-button label="四年级" />
              <el-radio-button label="五年级" />
              <el-radio-button label="六年级" />
            </el-radio-group>
          </div>
        </div>
        <div class="three">
          <div class="name_2">课程类目</div>
          <div>
            <el-radio-group v-model="radio5">
              <el-radio-button label="全部" />
              <el-radio-button label="语文" />
              <el-radio-button label="课程" />
            </el-radio-group>
          </div>
        </div>
      </div>
    </div> -->
    <div class="box_1">
      <el-row :gutter="66">
        <el-col v-for="item in myLessonList" :key="item.id" :span="6">
          <div class="pinjie1" @click="gotolessonid(item)">
            <el-image class="grone" :style="{'backgroundImage': 'url('+ $comm.url(item.coverImage) + ')'}" :src="require('../../assets/lesson/grone1.png')" alt />
            <div class="grtwo">
              <div class="mgl_1">{{ item.name }}</div>
              <div class="grtwo_txt">
                <el-image class="mgl_2" :src="require('../../assets/home/schoolicon.png')" alt />
                <div class="mgl_3">{{ item.schoolName }}</div>
                <div class="mgl_4">{{ item.authorName }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="height:69px;" />
    <div class="myTwo2">
      <div class="block">
        <el-pagination
          :slot="33"
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
    <div style="height:69px;" />
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
// import grPagination from '@/components/Pagination/grPagination.vue'
import { getMyLesson } from '@/api/lesson/lesson'
import { mapGetters } from 'vuex'
export default {
  name: 'MyLesson',
  components: {
    grcrumbs
  },
  data() {
    return {
      // radio3: '全部',
      // radio4: '全部',
      // radio5: '全部',
      currentPage: 1,
      pageSize: 8,
      total: 0,
      myLessonList: [] // 我的课程
    }
  },
  computed: {
    ...mapGetters(['baseApi'])
  },
  created() {
    this.getList()
  },
  methods: {
    gotolessonid(item) {
      this.$router.push({ path: '/grlesson/grlessondetail?id=' + item.id })
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    },
    getList() {
      const params = {
        page: this.currentPage - 1,
        size: this.pageSize
      }
      getMyLesson(params)
        .then((res) => {
          console.log(res)
          this.myLessonList = res.content
          this.total = res.totalElements
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.lesson-main {
  width: 1366px;
  margin: 0 auto;
}
.box {
  margin-top: 20px;
}
.top {
  width: 1366px;
  height: 178px;
  background-image: url("../../assets/lesson/topimg.png");
  background-repeat: no-repeat;
}
.one {
  display: flex;
  align-items: center;
  position: relative;
  top: 25px;
  left: 22px;
}
.two {
  display: flex;
  align-items: center;
  position: relative;
  top: 36px;
  left: 22px;
}
.three {
  display: flex;
  align-items: center;
  position: relative;
  top: 46px;
  left: 22px;
}
.name_1 {
  font-size: 16px;
}
.name_2 {
  font-size: 16px;
}
.zhanwei {
  margin-left: 28px;
}
/deep/ .el-radio-button__inner {
  color: rgba(45, 136, 21, 1);
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  background-color: rgba(45, 136, 21, 1);
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 10px;
  width: 65px;
  padding: 9px 16px;
  text-align: center;
  margin-left: 17px;
}
/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
.box_1 {
  margin-top: 32px;
  // display: flex;
  // justify-content: space-between;
  margin-bottom: 17px;
  // flex-wrap: wrap;
}
.bottom_1 {
  background-color: white;
  width: 289px;
  height: 154px;
  border: 1px solid #e6e6e6;
  margin-top: -4px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.children {
  margin-left: 129px;
  margin-top: -40px;
}
.title {
  font-size: 22px;
  // font-weight: bold;
  margin-left: 14px;
  margin-top: 8px;
  color: black;
}
.box_01 {
  margin-bottom: 8px;
}
.txt {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 11px;
}
.schoolName {
  font-size: 18px;
  margin-left: 5px;
}
.teacherName {
  font-size: 18px;
  margin-left: 56px;
  color: gray;
}
.con {
  margin-top: 14px;
  margin-left: 247px;
}
.pinjie1 {
  margin-bottom: 30px;
}
.grtwo {
  padding: 0 20px;
  background-image: url("../../assets/home/grtwo.png");
  background-repeat: no-repeat;
  background-size: 290px 114px;
  width: 290px;
  height: 114px;
  margin-top: -4px;
}
.grone {
  border-top-left-radius: 120px;
  border-top-right-radius: 120px;
  // background-image: url("../../assets/home/homebanner.jpg");
  background-repeat: no-repeat;
  width: 290px;
  height: 197px;
  background-size: 290px 197px;
}
.grtwo_txt {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.mgl_1 {
  font-size: 22px;
  margin-bottom: 12px;
}
.mgl_3 {
  margin: 0 40px 0 6px;
}
</style>
