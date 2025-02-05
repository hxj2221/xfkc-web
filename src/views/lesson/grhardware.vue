<template>
  <div class="hardware">
    <grcrumbs />
    <!-- <div class="top">
      <div class="one">
        <div class="name_1">检索类型</div>
        <div>
          <el-radio-group v-model="radio3" @change="shenhe">
            <el-radio-button label="1" class="tag">平台</el-radio-button>
            <el-radio-button label="2" class="tag">学校</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div> -->
    <div class="library">
      <el-row :gutter="66">
        <el-col v-for="item in hardWareList" :key="item.id" :span="6">
          <div class="pinjie1" @click="goDetail(item)">
            <el-image class="grone" :src="require('../../assets/lesson/grone1.png')" :style="{'backgroundImage': 'url(' + $comm.url(item.hardwarePicture) + ')'}" alt />
            <div class="grtwo">
              <div class="mgl_1">{{ item.name }} <span class="people">使用人数:{{ item.containsPeople !==null ?item.containsPeople:0 }}</span></div>
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
      <!-- <el-dialog title="请填写预约信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>预约时间</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog> -->
    </div>
    <div style="height:90px" />
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
    <div style="height:60px" />
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { getHardLib, getAppointment } from '@/api/lesson/lesson'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'School',
  components: {
    grcrumbs
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
      hardWareList: []
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
    console.log(this.$store.state.user.user.dept.name)
    this.userId = this.$store.state.user.userId
    this.getList()
  },
  methods: {
    goDetail(item) {
      this.$router.push({ path: '/grhardDetail/grhardDetail?id=' + item.id })
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
          this.total = res.totalElements
          this.hardWareList = res.content
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
    }
  }
}
</script>

<style lang="scss" scoped>
.txt {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 11px;
  .button {
    // position: absolute;
    // right: 0;
    // bottom: -5px;
    margin-left: 28px;
    cursor: pointer;
    color: #fff;
    width: 81px;
    height: 35px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 30px;
    line-height: 35px;
    background-color: #2d8815;
  }
}
.schoolName {
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  margin-left: 5px;
}
.hardware {
  width: 1366px;
  margin: 0 auto;
  overflow: hidden;
}
.top {
  margin-top: 20px;
  width: 1366px;
  height: 72px;
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
  margin-top: 38px;
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
  cursor:pointer;
  margin-bottom: 30px;
}
.grtwo {
  padding: 14px 20px 0 20px;
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
  background-size: 290px 197px;
}
.grtwo_txt {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.mgl_1 {
  height: 24px;
  font-size: 22px;
  margin-left: 10px;
  margin-bottom: 12px;
  .people{
    float: right;
    font-size: 16px;
    color: #242424;
    font-weight: 300;
  }
}
.mgl_3 {
  margin: 0 40px 0 6px;
}
</style>
