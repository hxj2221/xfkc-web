<template>
  <div class="hardware">
    <crumbs />
    <!-- <div class="top"> -->
    <!-- <div class="one">
        <div class="name_1">检索类型</div>
        <div>
          <el-radio-group v-model="radio3" @change="shenhe">
            <el-radio-button label="1" class="tag">平台</el-radio-button>
            <el-radio-button label="2" class="tag">学校</el-radio-button>
          </el-radio-group>
        </div>
      </div> -->
    <!-- </div> -->
    <div class="yunkt" @click="toHappyCourse">
      <el-image :src="require('../../assets/lesson/xingfu.jpg')" />
    </div>
    <div class="library">
      <el-row :gutter="66">
        <el-col v-for="item in hardWareList" :key="item.id" :span="6">
          <div class="box_01" @click="goDetail(item)">
            <el-image class="box01_img" :src="$comm.url(item.hardwarePicture)" alt />
            <div class="bottom_1">
              <div class="title">{{ item.name }} <span class="people">使用人数:{{ item.containsPeople !==null ?item.containsPeople:0 }}</span></div>
              <div class="txt">
                <el-image :src="require('../../assets/lesson/icon.png')" alt />
                <div class="schoolName">{{ item.schoolName }}</div>
                <div v-if="userId === '4'" v-show="item.status===0" class="button" @click.stop="yuyue(item)">预约</div>
                <div v-if="userId === '4'" v-show="item.status===1" class="button">正在预约</div>
                <div v-if="userId === '4'" v-show="item.status===2" class="button" @click.stop="yuyue(item)">重新预约</div>
                <div v-if="userId === '4'" v-show="item.status===3" class="button">预约成功</div>
              </div>
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
import crumbs from '@/components/crumbs/crumbs.vue'
import { getHardLib, getAppointment } from '@/api/lesson/lesson'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'School',
  components: {
    crumbs
  },
  data() {
    return {
      status: 0,
      userId: '',
      dialogVisible: false,
      radio3: 1,
      currentPage: 1,
      pageSize: 8,
      total: 0,
      hardWareList: [],
      yunktUrl: require('../../assets/lesson/xingfu.jpg')
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
    this.userId = this.$store.state.user.userId
    console.log(this.$store.state.user.userId)
    this.getList()
  },
  methods: {
    goDetail(item) {
      this.$router.push({ path: '/hardDetail/hardDetail?id=' + item.id })
    },
    shenhe() {
      this.getList()
    },
    yuyue(val) {
      if (val.schoolName === this.$store.state.user.user.dept.name) {
        this.$notify.error({
          title: '错误',
          message: '不能预约本学校'
        })
        return
      }
      const data = {
        hardwareId: Number(val.id)
      }
      getAppointment(data)
        .then((res) => {
          this.$alert('提交成功，等待管理员审核', '预约', {
            confirmButtonText: '确定'
          })
        })
        .catch((error) => {
          console.log(error)
        })
      this.getList()
    },
    getList() {
      const params = {
        type: Number(this.radio3),
        page: this.currentPage - 1,
        size: this.pageSize
      }
      getHardLib(params)
        .then((res) => {
          this.total = res.totalElements - 4
          this.hardWareList = res.content.slice(4)
          this.hardWareList.forEach(res => {
            const picList = res.hardwarePicture.split(',').map(str => {
              return {
                path: str
              }
            })
            res.hardwarePicture = picList[0].path
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // handleClose() {
    //   this.dialogVisible = false
    // },
    handleSizeChange() {
      this.getList()
    },
    handleCurrentChange() {
      this.getList()
    },
    toHappyCourse() {
      this.$router.push({ path: '/hardware/practice?type=2' })
    }
  }
}
</script>

<style lang="scss" scoped>
.hardware {
  width: 1366px;
  margin: 0 auto;
  overflow: hidden;
}
.top {
  margin-top: 20px;
  width: 1366px;
  height: 72px;
  background-image: url("../../assets/challenge/listbg.png");
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
  background-color: white;
  width: 289px;
  height: 124px;
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
  margin-top: 31px;
  color: black;
  .people{
    float: right;
    font-size: 16px;
    color: #242424;
    font-weight: 300;
    margin-top: 5px;
    margin-right: 30px;

  }
}
.box_01 {
  margin-bottom: 8px;
  cursor:pointer;
}
.txt {
  display: flex;
  align-items: center;
  margin-top: 20px;
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
.yunke{
  margin-top: 44px;

}
.button{
 margin-left: 48px;
    cursor: pointer;
    color: #fff;
    width: 81px;
    height: 35px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 30px;
    line-height: 35px;
    background-color: #0552a2;
}
.box01_img{
  width: 289px;
  height: 204px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 1px solid #e6e6e6;
  border-bottom: none;
}
.yunkt{
  height: 338px;
  margin: 20px auto;
  cursor: pointer;
  /deep/ .el-image{
    display: block;
    width: 100%;
    height: 338px;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
