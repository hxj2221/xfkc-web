<template>
  <div class="lessonLibrary">
    <crumbs />
    <div class="top">
      <div class="one">
        <div class="name_1">检索类型</div>
        <div>
          <el-radio-group v-model="radio3" @change="getlist">
            <el-radio-button label="全部" />
            <el-radio-button
              v-for="item in gradeList"
              :key="item.id"
              :label="item.detail"
            >{{ item.detail }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="library">
      <el-row :gutter="66">
        <el-col v-for="item in lessonLibList" :key="item.id" :span="6">
          <div class="box_01" @click="changeUrl(item.id)">
            <el-image
              style="width:289px;height:204px;border-top-left-radius: 20px;
            border-top-right-radius: 20px;"
              :src="$comm.url(item.coverImage)"
              alt
            />
            <div class="bottom_1">
              <!-- <el-image v-if="item.status === 3" class="children" :src="require('../../assets/lesson/excellentCourses.png')" alt /> -->
              <div class="title">{{ item.name }}</div>
              <div v-if="userName && userName !== 'admin445' && userName !== 'admin310'" class="txt">
                <el-image :src="require('../../assets/lesson/icon.png')" alt />
                <div class="schoolName">{{ item.schoolName }}</div>
                <div class="teacherName">{{ item.authorName }}</div>
              </div>
              <!-- <img class="con" src="../../assets/lesson/dian.png" alt> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="height:90px" />
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
    <div style="height:60px" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import crumbs from '@/components/crumbs/crumbs.vue'
import { getgrade, getLib } from '@/api/lesson/lesson'
export default {
  name: 'School',
  components: {
    crumbs
  },
  data() {
    return {
      radio3: '全部',
      currentPage: 1,
      pageSize: 8,
      total: 0,
      gradeList: [],
      lessonLibList: [],
      userName: ''
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
    this.getGrade()
    this.getlist()
    this.userName = this.$store.getters.user?.username
  },
  methods: {
    changeUrl(val) {
      this.$router.push({ path: '/lesson/lessondetail?id=' + val })
    },
    getGrade() {
      const params = {
        // type: 2,
        category: 1
      }
      getgrade(params)
        .then((res) => {
          this.gradeList = res
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getlist() {
      const params = {
        grade: this.radio3 === '全部' ? null : this.radio3,
        page: this.currentPage - 1,
        size: this.pageSize
      }
      console.log(params)
      getLib(params)
        .then((res) => {
          this.lessonLibList = res.content
          this.total = res.totalElements
          console.log(this.lessonLibList)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleCurrentChange() {
      this.getlist()
    },
    handleSizeChange() {
      this.gelist()
    }
  }
}
</script>

<style lang="scss" scoped>
.lessonLibrary {
  width: 1366px;
  margin: 0 auto;
  overflow: hidden;
}
.top {
  margin-top: 20px;
  width: 1366px;
  height: 85px;
  background-image: url("../../assets/challenge/listbg.png");
  background-size: 100% 100%;
}
.one {
  display: flex;
  align-items: center;
  position: relative;
  top: 25px;
  left: 22px;
}

.name_1 {
  font-size: 16px;
  width: 70px;
}
/deep/ .el-radio-button__inner {
  color: #358de4;
  border: 1px solid #358de4;
  border-radius: 10px;
  padding: 9px 10px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: 1px solid #358de4;
  background-color: #358de4;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #358de4;
  border-radius: 10px;
  width: 87px;
  padding: 9px 16px;
  text-align: center;
  margin-left: 17px;
}
/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 1px solid #358de4;
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-button--mini {
  width: 83px;
  height: 34px;
  font-size: 16px;
  color: #358de4;
  background-color: rgba(255, 255, 255, 0);
  border: 1px #358de4 solid;
  border-radius: 10px;
}
/deep/ .el-table .cell {
  height: 114px;
  line-height: 114px;
  font-size: 18px;
}
.bottom_1 {
  width: 289px;
  height: 130px;
  border: 1px solid #e6e6e6;
  margin-top: -4px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.children {
  position: absolute;
  margin-left: 129px;
  margin-top: -48px;
}
.title {
  font-size: 22px;
  // font-weight: bold;
  margin-left: 14px;
  margin-top: 8px;
  color: black;
}
.box_01 {
  margin-bottom: 20px;
}
.txt {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 11px;
}
.schoolName {
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.title_x {
  width: 1001px;
  justify-content: center;
  display: flex;
  text-align: center;
  margin-top: 63px;
  margin-bottom: 20px;
}
.txt_1 {
  color: #05407a;
  font-size: 24px;
  margin: 0 33px 0 33px;
  cursor: pointer;
}
.active {
  color: #429cf4;
  font-size: 24px;
  margin: 0 33px 0 33px;
  cursor: pointer;
}
.banner2 {
  width: 1001px;
  height: 203px;
  border-radius: 20px;
  margin-top: 47px;
}
.childm {
  width: 77px;
  height: 98px;
}
.box {
  display: flex;
}
.news {
  color: #0552a2;
  font-size: 24px;
  margin-left: 11px;
  width: 100px;
}
.library{
  margin-top: 44px;
}
</style>
