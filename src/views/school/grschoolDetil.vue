<template>
  <div class="schoolDetil">
    <grcrumbs />
    <div class="top">
      <div class="one">
        <el-image class="schoolicon" :src="require('../../assets/school/icon.png')" alt />
        <div class="schoolname">{{ school.schoolName }}</div>
        <div class="shar" @click="copyUrl">
          <el-image class="sharicon" :src="require('../../assets/school/grshar.png')" alt />
          <div class="sharname">分享</div>
        </div>
      </div>
      <div class="two">
        <el-image class="adssicon" :src="require('../../assets/school/adss.png')" alt />
        <div class="schooladss">学校地址</div>
        <div class="adss">{{ school.schoolAddress }}</div>
      </div>
      <div class="two">
        <el-image class="adssicon" :src="require('../../assets/school/tel.png')" alt />
        <div class="schooltel">联系电话</div>
        <div class="adss">{{ school.phone }}</div>
      </div>
    </div>

    <div class="bigimg">
      <el-image class="schoolimg" :src="$comm.url(school.schoolPic)" alt />
    </div>
    <div class="new_bg">
      <div class="bigimg">
        <div class="smalltitle" style="margin-bottom:17px;">
          <el-image class="schooltxt" :src="require('../../assets/school/grdetail.png')" alt />
          <div class="txt_1">学校简介</div>
        </div>
        <div
          class="txt"
        >{{ school.schoolProfile }}</div>
        <div class="smalltitle" style="margin-top:112px;">
          <el-image :src="require('../../assets/school/grteacher.png')" alt />
          <div class="txt_1">师资力量</div>
        </div>
      </div>
      <div class="imgpadd">
        <el-row :gutter="54">
          <!-- <el-col v-for="(item,index) in teacher" :key="index" :span="3">
            <div class="teacherdetil">
              <el-image class="teacherimg" :src="baseApi + '/avatar/' +item.avatarName" alt />
              <div style="font-size:22px;">{{ item.name }}</div>
            </div>
          </el-col> -->
          <el-col v-for="(item, index) in teacher" :key="index" :span="3">
            <div class="teacherdetil">
              <el-avatar :size="109" class="teacherimg" :src="$commactive.url(item.avatarName)">
                <img src="../../assets/school/man_no.png" :style="{background: randomColor()}">
              </el-avatar>
              <div class="teacher_name">{{ item.name }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="height:106px;" />
    <!-- <div class="myTwo2">
      <div class="block">
        <el-pagination
          :slot="33"
          :current-page.sync="currentPage3"
          :page-size="size"
          :prev-text="'上一页'"
          :next-text="'下一页'"
          layout="slot,prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div> -->
    <div style="height:64px;" />
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
// import grPagination from '@/components/Pagination/grPagination.vue'
import { getSchoolDetail } from '@/api/school/school'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'School',
  components: {
    grcrumbs
  },
  data() {
    return {
      radio3: '基地校',
      twoCodes: '',
      id: '',
      school: {},
      teacher: []
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
    this.id = this.$route.query.id
    console.log(this.id)
    this.getSchoolDetail()
  },
  methods: {
    getSchoolDetail() {
      const data = {}
      data.id = this.$route.query.id
      getSchoolDetail(data).then(res => {
        console.log(res)
        this.school = res.school
        this.teacher = res.teacher
      })
    },
    copyUrl() {
      this.twoCodes = window.location.href
      alert('已复制连接，快去分享吧')
      this.$copyText(this.twoCodes).then(
      )
    },
    randomColor() {
      var r = Math.floor(Math.random() * 256)
      var g = Math.floor(Math.random() * 256)
      var b = Math.floor(Math.random() * 256)
      var color = '#' + r.toString(16) + g.toString(16) + b.toString(16)

      return color
    }
  }
}
</script>

<style  lang="scss" scoped>
.schoolDetil {
  width: 1366px;
  margin: 0 auto;
  overflow: hidden;
}
.top {
  margin-top: 20px;
  width: 1366px;
  height: 126px;
  background-image: url("../../assets/school/grbgimg.png");
  padding: 15px 33px;
}
.one {
  display: flex;
  align-items: center;
}
.shar {
  cursor:pointer;
  display: flex;
  align-items: center;
}
.sharicon {
  width: 18px;
  height: 18px;
}
.sharname {
  font-size: 16px;
  color: rgba(45, 134, 20, 1);
  margin-left: 4px;
}
.schoolicon {
  width: 35px;
  height: 35px;
}
.schoolname {
  font-size: 28px;
  font-weight: 400;
  margin: 0 10px 0 26px;
}
.shar {
  width: 92px;
  height: 30px;
  border: 1px solid rgba(45, 134, 20, 1);
  border-radius: 30px;
  padding: 0 17px;
}
.two {
  display: flex;
  align-items: center;
  margin: 8px 0 0 6px ;
  padding: 2px 0;
}
.schooladss {
  margin: 0 30px;
}
.schooladss {
  font-size: 18px;
}
.adss {
  font-size: 18px;
}
.schooltel {
  margin: 0 30px;
  font-size: 18px;
}
.schoolimg {
  margin: 34px 0 86px 0;
  width: 469px;
  height: 331px;
  border-radius: 20px;
}
.bigimg {
  width: 1366px;
  text-align: center;
}
.schooltxt {
  width: 24px;
  height: 26px;
}
.smalltitle {
  display: flex;
  align-items: center;
  justify-content: center;
}
.txt {
  font-size: 18px;
  color: rgba(112, 112, 112, 1);
  padding: 0 40px;
  text-align: left;
  text-indent: 38px;
  line-height: 25px;
  letter-spacing: 1px;
}
.txt_1 {
  margin-left: 3px;
  color: rgba(45, 134, 20, 1);
  font-size: 22px;
  font-weight: 400;
}
.teacherimg {
  width: 109px;
  height: 109px;
  border-radius: 50%;
}

.teacher_name{
  margin-top: 10px;
}
.teacherdetil {
  text-align: center;
  margin-top: 37px;
}
.new_bg {
  background: rgb(210, 238, 190);
  padding: 46px 0 46px 0;
  border-radius: 20px;
}
.imgpadd {
  padding: 0 36px 0 36px;
}
.adssicon {
  height: 22px;
  width: 26px;
}
</style>
