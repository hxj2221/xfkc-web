<template>
  <div class="lesson-main">
    <crumbs  />
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
        <!-- 隐藏年级部分 
        <div class="two">
          <div class="name_2">
            年
            <span class="zhanwei">级</span>
          </div>
          <div>
            <el-radio-group v-model="radio4" @change="changeRadioClass">
              <el-radio-button label="全部" />
              <el-radio-button v-for="item in gradeList" :key="item.id" :label="item.id">{{ item.detail }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        -->
        <!-- 隐藏版块部分 
        <div class="three">
          <div class="name_2">版<span class="zhanwei">块</span></div>
          <div>
            <el-radio-group v-model="radio5" @change="changeRadioClass">
              <el-radio-button label="全部" />
              <el-radio-button v-for="item in lessonType" :key="item.id" :label="item.id">{{ item.detail }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        -->
        <div class="three" style="top: 0px">
          <div class="name_2" style="margin-right: 15px;">课程类目</div>
          <div class="custom-radio-group">
            <span :class="['custom-radio', radioClass === '全部' ? 'active' : '']" @click="changeCustomRadio('全部')">全部</span>
            <span v-for="item in classList" :key="item.id" :class="['custom-radio', radioClass === item.id ? 'active' : '']" @click="changeCustomRadio(item.id)">{{ item.detail }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="box_1" style="margin-top: 40px;">
      <!-- <div v-for="item in lessonList" :key="item.id" class="box_1-item">
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
      </div> -->
        <div  class="flex justify-center space-around" v-if="!showType">
          <div class="model_box_01" v-for="item in classModelList" :key="item.id" @click="changeType(item)">
            <el-image
              class="model_img"
              :src="item.coverImage"
            />
            <div class="title">{{ item.name }}</div>
          </div>
        </div>
      <div>

      </div>
      <InsideList  ref="InsideList" :params="params"  v-if="showType==='list'" :type="listType" @changeShowType="changeShowType"  />
      <LessDetail v-else-if="showType==='detail'" :id="detailId"  ref="LessDetail" @changeShowType="changeShowType" />
<!--      <el-row :gutter="66">-->
<!--        <el-col v-for="item in lessonList" :key="item.id" :span="6">-->
<!--          <div class="box_01" @click="changeUrl(item.id)">-->
<!--            &lt;!&ndash; <img class="imgg" :src="item.coverImage" alt> &ndash;&gt;-->
<!--            <el-image-->
<!--              style="width: 290px;height: 160px;"-->
<!--              :src="$comm.url(item.coverImage)"-->
<!--              fit="cover"-->
<!--            />-->
<!--            &lt;!&ndash; <img class="imgg" :src="baseApi + '/file/' + item.coverImage" alt=""> &ndash;&gt;-->

<!--            <div class="bottom_1">-->
<!--              &lt;!&ndash; <el-image v-if="courseType === 1" class="children" :src="require('../../assets/lesson/excellentCourses.png')" alt="" />-->
<!--              <div v-else class="children" style="height: 58px;" /> &ndash;&gt;-->
<!--              <div class="children" style="height: 58px;" />-->
<!--              <div class="title">{{ item.name }}</div>-->
<!--              <div v-if="userName !== 'admin445' && userName !== 'admin310'" class="txt">-->
<!--                <el-image :src="require('../../assets/lesson/icon.png')" alt="" />-->
<!--                <div class="schoolName">{{ item.schoolName }}</div>-->
<!--                <div class="teacherName">{{ item.authorName }}</div>-->
<!--              </div>-->
<!--              &lt;!&ndash; <img class="con" src="../../assets/lesson/dian.png" alt=""> &ndash;&gt;-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
<!--    <div class="myTwo">-->
<!--      <div class="block">-->
<!--        <el-pagination-->
<!--          :current-page.sync="currentPage"-->
<!--          :page-size="pageSize"-->
<!--          :prev-text="'上一页'"-->
<!--          :next-text="'下一页'"-->
<!--          layout="slot,prev, pager, next, jumper"-->
<!--          :total="total"-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils/index'
import crumbs from '@/components/crumbs/crumbs.vue'
import { getgrade, getLessonListNew } from '@/api/lesson/lesson'
import classModel1 from '@/assets/lesson/classModel1.png'
import classModel2 from '@/assets/lesson/classModel2.png'
import classModel3 from '@/assets/lesson/classModel3.png'
import classModel4 from '@/assets/lesson/classModel4.png'
import LessDetail from '@/views/lesson/premiumCourses/detail.vue'
import InsideList from '@/views/lesson/premiumCourses/insideList.vue'
export default {
  name: 'MyLesson',
  components: {
     InsideList, LessDetail, crumbs
  },
  data() {
    return {
      detailId: this.$route.query.id || null,
      showType: this.$route.query.id ? 'detail' : '',
      listType: '',
      listId: null,
      twoId: null,
      radio3: '1',
      radio4: '全部',
      radio5: '全部',
      radioClass: '全部',
      grade: 2,
      currentPage: 1,
      pageSize: 8,
      total: 0,
      classModelList:[{
        id: 1,
        coverImage: classModel1,
        name: '视频课程'
      },{
        id: 2,
        coverImage: classModel2,
        name: '图文精华'
      },{
        id: 3,
        coverImage: classModel3,
        name: '特色展示'
      },{
        id: 4,
        coverImage: classModel4,
        name: '资讯动态'
      },
      ],
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
      this.getGrade()
      this.getLesson()
      this.getGlass()
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
    changeRadioClass() {
      this.showType = ''
      this.listType = ''
      this.currentPage = 1
      this.total = 0
      this.getList()

    },
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
    changeType(val) {
      this.listType = val.id
      this.showType = 'list'
      // this.$router.push({
      //                     query: {...this.$route.query, type1: val.id, type2: 1, type3: 3, id:''}
      //                   })
      // this.$router.push({ path: '/lesson/lessondetail?id=' + val + '&type=' + this.courseType })
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
      this.params = this.courseType === 1 ? params : params2
      // getLessonListNew(this.courseType === 1 ? params : params2)
      //   .then((res) => {
      //     this.total = res.totalElements
      //     this.lessonList = res.content
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    },
    changeCustomRadio(val) {
      this.radioClass = val
      this.changeRadioClass()
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
  height: 60px;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
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
  top: 0;
  left: 22px;
}
.name_1 {
  font-size: 16px;
}
.name_2 {
  font-size: 16px;
  margin-right: 15px;
}
.zhanwei {
  margin-left: 28px;
}
.box_1 {
  // display: flex;
  // justify-content: space-between;
  margin-bottom: 17px;
  // flex-wrap:wrap;
  min-height: 500px;
  &-item{
    margin-top: 32px;
    display: flex;
    width: 100%;
    &-img{
      width: 290px;
      height: 160px;
      border-radius: 10px;
      margin-right: 20px;
      overflow: hidden;
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
.model_box_01{
  width: 25%;
  margin-right: 20px;
  background: linear-gradient( 180deg, #FFFFFF 0%, #EAF3FA 100%);
  border-radius: 8px;
  border: 1px solid #EAEAEA;
  text-align: center;
  padding:8px 0 14px 0;
  .model_img{
    width: 40%;
  }
  .text{
    font-weight: 500;
    font-size: 20px;
    color: #282828;
  }
}
.model_box_01:last-of-type{
  margin-right: 0;
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

.custom-radio-group {
  display: flex;
  flex-wrap: wrap;
}
.custom-radio {
  margin-right: 10px;
  padding: 8px 15px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background-color: #fff;
  cursor: pointer;
}
.custom-radio.active {
  border: 1px solid #409EFF;
  background-color: #409EFF;
  color: white;
}
</style>
