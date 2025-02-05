<template>
  <div class="school">
    <crumbs />
    <!-- 检索 -->
    <div class="box">
      <div class="top">
        <div class="one" style="margin-bottom: 40px;">
          <div class="name_1">检索类型</div>
          <div>
            <el-radio-group v-model="radio3">
              <el-radio-button v-for="category in categories" :key="category.id" :label="category.id" class="tag">
                {{ category.name }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- <div style="margin-top: 12px;margin-left: 88px">
          <el-radio-group v-model="radio4">
            <el-radio-button v-for="category in categories2" :key="category.id" :label="category.id" class="tag">
              {{ category.name }}
            </el-radio-button>
          </el-radio-group>
        </div> -->
      </div>
      <div class="box_shcool">
        <el-row :gutter="66">
          <el-col
            v-for="(item, index) in schoolList"
            :key="index"
            :span="6"
          >
            <div

              class="schoolbox"
              @click="schoolDetil(item)"
            >
              <div class="img" :style="{'backgroundImage': 'url(' + $comm.url(item.schoolPic) + ')'}" />
              <div class="bottom">
                <el-image class="icon" :src="require('../../assets/lesson/icon.png')" alt />
                <div>{{ item.schoolName }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="schoolList.length == 0" class="no_date">
      <img src="../../assets/challenge/nopinglun.png" alt="">
      <div class="no_date_title">暂无数据</div>
    </div>
    <div style="height:179px;" />
    <div class="myTwo">
      <div class="block">
        <el-pagination
          :slot="33"
          :current-page.sync="currentPage3"
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
    <div style="height:68px;" />
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/crumbs.vue'
// import Pagination from "@/components/Pagination/Pagination.vue";
import { getSchool, getCategory } from '@/api/school/school'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'School',
  components: {
    crumbs
  },
  data() {
    return {
      type: '',
      currentPage3: 1,
      radio3: 0,
      // radio4: 0,
      schoolList: [],
      currentPage: 1,
      total: 0,
      pageSize: 8,
      categories: []
      // categories2: []
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
  watch: {
    radio3(val) {
      this.radio3 = val
      this.currentPage3 = 1
      this.getSchool()
      // getCategory(val).then(res => {
      //   this.radio3 = res[0].id
      //   // this.categories2 = res
      //   this.currentPage3 = 1
      //   this.getSchool()
      // })
    }
    // radio4() {
    //   this.currentPage3 = 1
    //   this.getSchool()
    // }
  },
  created() {
    this.type = this.$route.query.id
    getCategory(this.type).then(res => {
      this.radio3 = res[0].id
      this.categories = res
      // getCategory(this.radio3).then(res => {
      //   this.radio4 = res[0].id
      //   this.categories2 = res
      // })
    })
  },

  methods: {
    getSchool() {
      const params = {
        schoolSpecialId: this.radio3,
        page: this.currentPage3 - 1,
        size: this.pageSize,
        sort: ''
      }
      getSchool(params).then(res => {
        this.total = res.totalElements
        this.schoolList = res.content
      })
    },

    schoolDetil(item) {
      if (item.linkUrl && item.linkUrl !== '') {
        window.open(item.linkUrl, '_blank')
      }
      // this.$router.push({ path: '/schoolDetil/schoolDetil'})
      // this.$router.push({ path: '/schoolDetil/schoolDetil?id=' + item.id })
    },
    handleSizeChange() {
      this.getSchool()
    },
    handleCurrentChange() {
      this.getSchool()
    }
  }
}
</script>

<style lang="scss" scoped>
.school {
  width: 1366px;
  margin: 0 auto;
  overflow: hidden;
}
.box {
  margin-top: 20px;
}
.top {
  width: 1366px;
  padding: 12px;
  background-image: url("../../assets/message/messagebg.png");
  background-size: cover;
}
.one {
  display: flex;
  align-items: center;
  margin-left: 22px;
  margin-top: 25px;
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
  padding: 9px 16px;
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
.img {
  background-size: 289px 204px!important;
  width: 289px;
  height: 204px;
  border-radius: 20px 20px 0 0;
  // background-image: url("../../assets/challenge/content.png");
}
.bottom {
  background-color: white;
  width: 289px;
  height: 82px;
  border-radius: 0 0 20px 20px;
  border: 1px solid rgba(230, 230, 230, 1);
  display: flex;
  align-items: center;
}
.icon {
  margin: 0 11px 0 11px;
}
.schoolbox {
  margin-top: 44px;
  cursor:pointer;
}

.no_date {
  margin-top: 128px;
  text-align: center;

  .no_date_title {
    font-size: 18px;
    font-weight: 500;
    color: #999;
  }

}
</style>
