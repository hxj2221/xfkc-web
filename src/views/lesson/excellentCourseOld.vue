<template>
  <div class="lesson-main">
    <crumbs />
    <div v-if="courseType === 1" class="box">
      <div class="top">
        <!-- <div class="one">
          <div class="name_1">检索类型</div>
          <div>
            <el-radio-group v-model="radio3" @change="getList">
              <el-radio-button label="1" class="tag">全部</el-radio-button>
              <el-radio-button label="2" class="tag">平台</el-radio-button>
              <el-radio-button label="3" class="tag">学校</el-radio-button>
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
              <el-radio-button label="全部" />
              <el-radio-button v-for="item in gradeList" :key="item.id" :label="item.id">{{ item.detail }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="three">
          <div class="name_2">板<span class="zhanwei">块</span></div>
          <div>
            <el-radio-group v-model="radio5" @change="getList">
              <el-radio-button label="全部" />
              <el-radio-button v-for="item in lessonType" :key="item.id" :label="item.id">{{ item.detail }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="three" style="top: 36px">
          <div class="name_2">课程类目</div>
          <div>
            <el-radio-group v-model="radioClass" @change="getList">
              <el-radio-button label="全部" />
              <el-radio-button v-for="item in classList" :key="item.id" :label="item.detail">{{ item.detail }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="box_1">
      <div v-for="item in lessonList" :key="item.id" class="box_1-item">
        <div class="box_1-item-img">
          <el-image
            style="width: 290px;height: 160px;"
            :src="$comm.url(item.coverImage)"
            fit="cover"
          />
        </div>
        <div class="box_1-item-info">
          <div class="box_1-item-info-title">{{ item.name }}</div>
          <div class="box_1-item-info-time">{{ parseTime(item.createTime) }}</div>
          <div v-if="userName !== 'admin445' && userName !== 'admin310'" class="txt">
            <el-image :src="require('../../assets/lesson/icon.png')" alt="" />
            <div class="schoolName">{{ item.schoolName }}</div>
            <div class="teacherName">{{ item.authorName }}</div>
          </div>
        </div>
      </div>
      <el-row :gutter="66">
        <el-col v-for="item in lessonList" :key="item.id" :span="6">
          <div class="box_01" @click="changeUrl(item.id)">
            <!-- <img class="imgg" :src="item.coverImage" alt> -->
            <el-image
              style="width: 290px;height: 160px;"
              :src="$comm.url(item.coverImage)"
              fit="cover"
            />
            <!-- <img class="imgg" :src="baseApi + '/file/' + item.coverImage" alt=""> -->

            <div class="bottom_1">
              <!-- <el-image v-if="courseType === 1" class="children" :src="require('../../assets/lesson/excellentCourses.png')" alt="" />
              <div v-else class="children" style="height: 58px;" /> -->
              <div class="children" style="height: 58px;" />
              <div class="title">{{ item.name }}</div>
              <div v-if="userName !== 'admin445' && userName !== 'admin310'" class="txt">
                <el-image :src="require('../../assets/lesson/icon.png')" alt="" />
                <div class="schoolName">{{ item.schoolName }}</div>
                <div class="teacherName">{{ item.authorName }}</div>
              </div>
              <!-- <img class="con" src="../../assets/lesson/dian.png" alt=""> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
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

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils/index'
import crumbs from '@/components/crumbs/crumbs.vue'
import { getgrade, getLessonList } from '@/api/lesson/lesson'
export default {
  name: 'MyLesson',
  components: {
    crumbs
  },
  data() {
    return {
      radio3: '1',
      radio4: '全部',
      radio5: '全部',
      radioClass: '全部',
      grade: 2,
      currentPage: 1,
      pageSize: 8,
      total: 0,
      gradeList: [],
      classList: [],
      lessonType: [],
      lessonList: [],
      courseType: 1,
      userId: '',
      userName: ''
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi']),
    headers() {
      return {
        Authorization: getToken()
      }
    }
  },
  created() {
    // if (this.$store.state.user.grade < 4) {
    //   this.grade = 1
    // } else {
    //   this.grade = 2
    // }
    if (this.$route.query.type) {
      this.courseType = parseInt(this.$route.query.type)
      this.getList()
    } else {
      this.getGrade()
      this.getLesson()
      this.getGlass()
      this.getList()
    }
    this.userId = this.$store.getters.user?.userId
    this.userName = this.$store.getters.user?.username
  },
  methods: {
    parseTime,
    changeUrl(val) {
      this.$router.push({ path: '/lesson/lessondetail?id=' + val + '&type=' + this.courseType })
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
    getGlass() {
      const params = {
        // type: this.grade,
        category: 3
      }
      getgrade(params)
        .then((res) => {
          this.classList = res
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getList() {
      const params = {
        courseCategoryId1: this.radio4 === '全部' ? null : this.radio4,
        courseCategoryId2: this.radio5 === '全部' ? null : this.radio5,
        courseCategoryId3: this.radioClass === '全部' ? null : this.radioClass,
        // grade: this.radio4 === '全部' ? null : this.radio4,
        // courseCategory: this.radio5 === '全部' ? null : this.radio5,
        type: 1,
        page: this.currentPage - 1,
        sort: 'id,desc',
        size: this.pageSize
      }
      const params2 = {
        courseCategoryId1: null,
        courseCategoryId2: null,
        courseCategoryId3: null,
        // grade: null,
        // courseCategory: null,
        type: 2,
        page: this.currentPage - 1,
        sort: 'id,desc',
        size: this.pageSize
      }
      getLessonList(this.courseType === 1 ? params : params2)
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
  height: 156px;
  background-image: url("../../assets/achievement/top_background.png");
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
  top: 16px;
  left: 22px;
}
.three {
  display: flex;
  align-items: center;
  position: relative;
  top: 26px;
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
  width: 65px;
  padding: 9px 16px;
  text-align: center;
  margin-left: 12px;
}
/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 1px solid #358de4;
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
.box_1 {
  // display: flex;
  // justify-content: space-between;
  margin-bottom: 17px;
  // flex-wrap:wrap;
  &-item{
    margin-top: 32px;
    display: flex;
    width: 100%;
    &-img{
      width: 290px;
      height: 160px;
      border-radius: 10px;
      margin-right: 20px;
    }
    &-info{
      flex: 1;
      &-title{
        height: 60px;
        line-height: 60px;
        font-size: 20px;
      }
      &-time{
        height: 40px;
        font-size: 14px;
        color: #999999;
      }
    }
  }

}
.bottom_1 {
  width: 290px;
  height: 154px;
  position: relative;
  // border: 1px solid #e6e6e6;
  margin-top: -38px;
}
.children{
  margin-left: 129px;
  margin-top: -40px;
  z-index: 9;
}
.title{
  font-size: 22px;
  // font-weight: bold;
  margin-left: 14px;
  margin-top: 8px;
  color: black;
}
.box_01{
  cursor:pointer;
  margin-bottom: 40px;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  overflow: hidden;

  .imgg{
    width: 290px;
    height: 160px;
  }
}
.txt{
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
  margin-left: 11px;
}
.schoolName{
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  margin-left: 5px;
}
.teacherName{
  font-size: 18px;
  margin-left: 56px;
  color: gray;
}
.con{
  margin-top: 14px;
  margin-left: 247px;
    }

</style>
