<template>
  <div class="lesson-main">
    <grcrumbs />
    <div class="box">
      <div class="top">
        <!-- <div class="one">
          <div class="name_1">检索类型</div>
          <div>
            <el-radio-group v-model="radio3" @change="getList">
              <el-radio-button label="1" class="tag">平台</el-radio-button>
              <el-radio-button label="2" class="tag">学校</el-radio-button>
            </el-radio-group>
          </div>
        </div> -->
        <div class="two">
          <div class="name_2">
            年
            <span class="zhanwei">级</span>
          </div>
          <div>
            <el-radio-group v-model="radio4" @change="getList">
              <el-radio-button label="全部" class="tag">全部</el-radio-button>
              <el-radio-button v-for="item in gradeList" :key="item.id" :label="item.detail">{{ item.detail }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="three">
          <div class="name_2">课程类目</div>
          <div>
            <el-radio-group v-model="radio5" @change="getList">
              <el-radio-button label="全部" />
              <el-radio-button v-for="item in lessonType" :key="item.id" :label="item.detail">{{ item.detail }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>

    <div style="height:82px;" />
    <div class="box_1">
      <el-row :gutter="50">
        <el-col v-for="item in lessonList" :key="item.id" :span="6">
          <!-- <div class="pinjie1" @click="changeUrl(item.id)">
            <img class="grone" :style="{'background': 'url('+ $comm.url(item.coverImage) +') center'}" :src="require('../../assets/lesson/grone1.png')" alt>
            <div class="grtwo">
              <div class="mgl_1">{{ item.name }}</div>
              <div class="grtwo_txt">
                <el-image class="mgl_2" :src="require('../../assets/home/schoolicon.png')" alt />
                <div class="mgl_3">{{ item.schoolName }}</div>
                <div class="mgl_4">{{ item.authorName }}</div>
              </div>
            </div>
          </div> -->
          <cloudsStyle :item="item" @click.native="changeUrl(item.id)" />
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
import { mapGetters } from 'vuex'
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import cloudsStyle from '@/components/cloudsStyle/cloudsStyle'
import { getgrade, getLessonList } from '@/api/lesson/lesson'
export default {
  name: 'MyLesson',
  components: {
    grcrumbs,
    cloudsStyle
  },
  data() {
    return {
      radio3: '1',
      radio4: '全部',
      radio5: '全部',
      grade: 1,
      currentPage: 1,
      pageSize: 8,
      total: 0,
      gradeList: [],
      lessonType: [],
      lessonList: []
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
    // if (this.$store.state.user.grade < 4) {
    //   this.grade = 1
    // } else {
    //   this.grade = 2
    // }
    this.getGrade()
    this.getLesson()
    this.getList()
  },
  methods: {
    changeUrl(val) {
      this.$router.push({ path: '/grlesson/grlessondetail?id=' + val })
    },
    getGrade() {
      const params = {
        // type: this.grade,
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
    getLesson() {
      const params = {
        category: 2
      }
      getgrade(params)
        .then((res) => {
          this.lessonType = res
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getList() {
      const params = {
        type: Number(this.radio3),
        grade: this.radio4 === '全部' ? null : this.radio4,
        courseCategory: this.radio5 === '全部' ? null : this.radio5,
        page: this.currentPage - 1,
        sort: 'id,desc',
        size: this.pageSize
      }
      getLessonList(params)
        .then((res) => {
          this.total = res.totalElements
          this.lessonList = res.content
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
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
  height: 120px;
  background-image: url("../../assets/lesson/youngtitle.png");
  background-size: 100% 100%;
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
  top: 20px;
  left: 22px;
}
.three {
  display: flex;
  align-items: center;
  position: relative;
  top: 30px;
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
  color: #2d8815;
  border: 1px solid #2d8815;
  border-radius: 10px;
  padding: 9px 10px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: 1px solid #2d8815;
  background-color: #2d8815;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #2d8815;
  border-radius: 10px;
  padding: 9px 16px;
  text-align: center;
  margin-left: 17px;
}
/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 1px solid #2d8815;
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 15px;
}
// .box_1 {
//   margin-top: 32px;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 17px;
//   flex-wrap: wrap;
// }
.bottom_1 {
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
.pinjie1 {
  margin-bottom: 75px;
}
.grtwo {
  padding: 0 20px;
  background-image: url("../../assets/home/grtwo.png");
  background-repeat: no-repeat;
  background-size: 307px 114px;
  background-position: bottom center;
  width: 290px;
  height: 114px;
  margin-top: -4px;
}
.grone {
  background-size: 290px auto !important;
  width: 290px;
  height: 197px;
  // border-top-left-radius: 120px;
  // border-top-right-radius: 120px;
  // background-image: url("../../assets/home/homebanner.jpg");
  background-repeat: no-repeat;
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
    width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 40px 0 6px;
}

</style>
