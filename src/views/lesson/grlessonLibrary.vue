<template>
  <div class="lessonLibrary">
    <grcrumbs />
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
          <!-- <div class="pinjie1" @click="changeUrl(item.id)">
            <el-image
              class="grone"
              :style="{ background: 'url('+ $comm.url(item.coverImage) + ')' }"
              :src="require('../../assets/lesson/grone1.png')"
              alt
            />
            <div class="grtwo" style="position: relative">
              <div class="mgl_1">
                {{ item.name }}
                <el-image
                  v-if="item.status === 3"
                  style="
                    width: 38px;
                    height: 38px;
                    position: absolute;
                    right: 18px;
                    top: -30px;
                  "
                  :src="require('../../assets/lesson/jing.png')"
                  alt=""
                />
              </div>
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
    <div style="height: 90px" />
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
    <div style="height: 60px" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import cloudsStyle from '@/components/cloudsStyle/cloudsStyle'
import { getgrade, getLib } from '@/api/lesson/lesson'
export default {
  name: 'School',
  components: {
    grcrumbs,
    cloudsStyle
  },
  data() {
    return {
      radio3: '全部',
      currentPage: 1,
      pageSize: 8,
      total: 0,
      gradeList: [],
      lessonLibList: []
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
    this.getGrade()
    this.getlist()
  },
  methods: {
    getGrade() {
      const params = {
        // type: 1,
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
      getLib(params)
        .then((res) => {
          this.lessonLibList = res.content
          this.total = res.totalElements
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeUrl(val) {
      this.$router.push({ path: '/grlesson/grlessondetail?id=' + val })
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
  background-image: url("../../assets/message/grmessagebg.png");
  background-repeat: no-repeat;
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
  vertical-align: middle;
}
/deep/ .el-radio-button__inner {
  color: rgba(45, 134, 20, 1);
  border: 1px solid rgba(45, 134, 20, 1);
  border-radius: 10px;
  padding: 9px 10px;
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
  width: 87px;
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
/deep/ .el-button--mini {
  width: 83px;
  height: 34px;
  font-size: 16px;
  color: rgba(45, 134, 20, 1);
  background-color: rgba(255, 255, 255, 0);
  border: 1px rgba(45, 134, 20, 1) solid;
  border-radius: 10px;
}
/deep/ .el-table .cell {
  height: 114px;
  line-height: 114px;
  font-size: 18px;
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
.library {
  margin-top: 44px;
}
.pinjie1 {
  margin-bottom: 30px;
}
.grtwo {
  padding: 20px 20px;
  background-image: url("../../assets/home/grtwo.png");
  background-repeat: no-repeat;
  background-size: 290px 114px;
  width: 290px;
  height: 114px;
  margin-top: -4px;
}
.grone {
  // border-top-left-radius: 120px;
  // border-top-right-radius: 120px;
  // background-image: url("../../assets/home/homebanner.jpg");
  background-repeat: no-repeat;
  background-size: 290px 197px !important;
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
