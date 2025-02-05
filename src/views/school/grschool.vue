<template>
  <div class="school">
    <grcrumbs />
    <!-- 检索 -->
    <div class="box">
      <div class="top">
        <div class="one">
          <div class="name_1">检索类型</div>
          <div>
            <el-radio-group v-model="radio3">
              <el-radio-button v-for="category in categories" :key="category.id" :label="category.id" class="tag">
                {{ category.name }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div style="margin-top: 12px;margin-left: 88px">
          <el-radio-group v-model="radio4">
            <el-radio-button v-for="category in categories2" :key="category.id" :label="category.id" class="tag">
              {{ category.name }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="box_shcool">
        <el-row :gutter="66">
          <el-col
            v-for="(item, index) in schoolList"
            :key="index"
            :span="6"
          >
            <div

              class="pinjie1"
              @click="goToDetail(item)"
            >
              <!-- :style="{'backgroundImage': 'url(' + item.badgeUrl + ')'}" -->
              <el-image class="grone" :style="{'backgroundImage': 'url(' + $comm.url(item.schoolPic) + ')'}" :src="require('../../assets/lesson/grone1.png')" alt />
              <div class="grtwo">
                <!-- <div class="mgl_1">中小学必回古诗词3000首（九年义务精选）</div> -->
                <div class="grtwo_txt">
                  <el-image class="mgl_2" :src="require('../../assets/home/schoolicon.png')" alt />
                  <div class="mgl_3">{{ item.schoolName }}</div>
                  <!-- <div class="mgl_4">张晓晓老师</div> -->
                </div>
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
    <div class="myTwo2">
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
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
// import grPagination from '@/components/Pagination/grPagination.vue'
import { getSchool, getCategory } from '@/api/school/school'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'School',
  components: {
    grcrumbs
  },
  data() {
    return {
      type: '',
      schoolList: [],
      currentPage3: 1,
      total: 0,
      pageSize: 8,
      categories: [],
      radio3: 0,
      radio4: 0,
      categories2: []
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
      getCategory(val).then(res => {
        this.radio4 = res[0].id
        this.categories2 = res
      })
    },
    radio4() {
      this.currentPage3 = 1
      this.getSchool()
    }

  },
  created() {
    this.type = this.$route.query.id
    getCategory(this.type).then(res => {
      this.radio3 = res[0].id
      this.categories = res
      getCategory(this.radio3).then(res => {
        this.radio4 = res[0].id
        this.categories2 = res
      })
    })
  },
  methods: {
    goToDetail(item) {
      this.$router.push({ path: '/grschool/grschoolDetil?id=' + item.id })
    },
    getSchool() {
      const params = {
        schoolSpecialId: this.radio4,
        page: this.currentPage3 - 1,
        size: this.pageSize,
        sort: ''
      }
      getSchool(params).then(res => {
        this.total = res.totalElements
        this.schoolList = res.content
      })
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
.box_shcool {
  margin-top: 40px;
}

.top {
  width: 1366px;
  padding: 12px;
  background-image: url("../../assets/message/grmessagebg.png");
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
  color: rgba(45, 134, 20, 1);
  border: 1px solid rgba(45, 134, 20, 1);
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: 1px solid rgba(45, 134, 20, 1);
  background-color: rgba(45, 134, 20, 1);
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid rgba(45, 134, 20, 1);
  border-radius: 10px;
  padding: 9px 16px;
  text-align: center;
  margin-left: 17px;
}
/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 1px solid rgba(45, 134, 20, 1);
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
.img {
  width: 289px;
  height: 204px;
  border-radius: 20px 20px 0 0;
  background-image: url("../../assets/challenge/content.png");
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
}
.pinjie1 {
  cursor:pointer;
  margin-bottom: 30px;
}
.grtwo {
  padding: 40px 20px 0 20px;
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
  background-image: url("../../assets/home/homebanner.jpg");
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
  margin: 0 40px 0 12px;
}
.no_date {
  text-align: center;
  margin-top: 128px;

  .no_date_title {
    font-size: 18px;
    font-weight: 500;
    color: #999;
  }
}
</style>
