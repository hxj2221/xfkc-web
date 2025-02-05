<template>
  <div class="challengeList">
    <grcrumbs />
    <div class="top">
      <div class="one">
        <div class="name_1">检索类型</div>
        <div>
          <el-radio-group v-model="radio3" @change="shenhe">
            <el-radio-button label="1" class="tag">待审核</el-radio-button>
            <el-radio-button label="2" class="tag">未通过</el-radio-button>
            <el-radio-button label="3" class="tag">已通过</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="challengeList" stripe style="width: 100%">
        <el-table-column prop="avatarName" label="学生头像" width="480">
          <div v-for="(item,index) in challengeList" :key="index">
            <el-image class="stuimg" :src="$comm.url(item.avatarName, 'avatar')" alt />
          </div>
        </el-table-column>
        <el-table-column prop="name" label="学生姓名" width="180" />
        <el-table-column prop="userName" label="学生学号" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '1'">待审核</span>
            <span v-if="scope.row.status == '2'">未通过</span>
            <span v-if="scope.row.status == '3'">已通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.challenge.checkPerson !== 1 && scope.row.status == '1'"
              size="mini"
              @click="handleEdit(scope.$index, challengeList)"
            >
              <img class="see" src="../../assets/challenge/greditor.png" alt>
              <span>审核</span>
            </el-button>
            <span v-else>需要家长审核</span>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><img class="see" src="../../assets/message/del.png" alt=""><span>删除</span></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="height:60px" />
    <div class="myTwo2">
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
    </div>
    <div style="height:60px" />
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { getChallengeList } from '@/api/challenge/challengeDetail'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  components: {
    grcrumbs
  },
  data() {
    return {
      status: '',
      challengeList: [],
      challengeId: '',
      total: 0,
      currentPage3: 1,
      size: 8,
      id: '',
      radio3: 1,
      type: 1
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
    this.getChallengeList()
  },
  methods: {
    getChallengeList() {
      const params = {
        type: this.radio3,
        challengeId: this.id,
        page: this.currentPage3 - 1,
        size: this.size
      }
      getChallengeList(params).then(res => {
        this.total = res.totalElements
        this.challengeList = res.content
        if (res.content.length > 0) {
          this.type = res.content[0].status
        }
      })
    },
    handleEdit(index, row) {
      this.id = row[index].challenge.id
      this.studentId = row[index].userId
      console.log(row[index].challenge.id)
      this.$router.push({ path: '/grteacherExamine/grteacherExamine?id=' + this.id + '&studentId=' + this.studentId })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    shenhe() {
      this.radio3 = Number(this.radio3)
      console.log(this.radio3)
      this.getChallengeList()
    },
    handleSizeChange() {
      this.getChallengeList()
    },
    handleCurrentChange() {
      this.getChallengeList()
    }
  }
}
</script>

<style lang="scss" scoped>
.challengeList {
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
.see {
  width: 16px;
  height: 16px;
  line-height: 34px;
  position: relative;
  top: 3px;
  margin-right: 3px;
}
.stuimg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 8px;
}
/deep/ .el-table .cell {
  color: black;
}
</style>
