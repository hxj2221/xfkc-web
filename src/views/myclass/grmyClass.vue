<template>
  <div class="myclass-main">
    <grcrumbs />
    <div class="center-title">
      <div class="select-item">
        检索类型
        <span
          v-for="item in classList"
          :key="item.id"
          :class="['item-retrieval','border-blue',retrieval === item.id ? 'background-blue-active' : '' ]"
          @click="changeRet(item.id)"
        >{{ item.label }}</span>
      </div>
    </div>
    <div class="center-form">
      <div class="form-tittle">
        <div class="title-img">学生头像</div>
        <div class="title-name">学生姓名</div>
        <div class="title-number">学生学号</div>
        <div class="title-sex">性别</div>
      </div>
      <div v-for="item in studentList" :key="item.id" class="form-item">
        <div class="title-img">
          <el-image :src="item.avatarName ? $commactive.url(user.avatarName) : Avatar" alt />
        </div>
        <div class="title-name">{{ item.name }}</div>
        <div class="title-number">{{ item.userName }}</div>
        <div class="title-sex">
          <span v-if="item.gender">
            男
          </span>
          <span v-else>女</span>
        </div>
      </div>
    </div>
    <div class="paging">
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
    </div>
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { getMyClass, getStudent } from '@/api/class/class'
import Avatar from '@/assets/images/avatar.png'
export default {
  name: 'Myclass',
  components: {
    grcrumbs
  },
  data() {
    return {
      Avatar: Avatar,
      retrieval: '',
      currentPage: 1,
      pageSize: 5,
      total: 0,
      classList: [],
      studentList: []
    }
  },
  created() {
    this.getMyClass()
  },
  methods: {
    changeRet(val) {
      this.retrieval = val
      const params = {
        deptId: this.retrieval,
        page: this.currentPage - 1,
        size: this.pageSize
      }
      getStudent(params)
        .then((res) => {
          this.studentList = res.content
          console.log(this.studentList)
          this.total = res.totalElements
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMyClass() {
      getMyClass()
        .then((res) => {
          this.classList = res
          this.retrieval = res[0].id
          this.changeRet(this.retrieval)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange() {

    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getMyClass()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.myclass-main {
  width: 1366px;
  margin: 0 auto;
  .center-title {
    height: 72px;
    margin-top: 20px;
    background: url("../../assets/message/grmessagebg.png");
    background-size: 100% 100%;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
      .item-retrieval {
        padding: 8px 12px;
        cursor: pointer;
        color: rgba(45, 134, 20, 1);
        margin-left: 5px;
        border-radius: 10px;
      }
      :nth-child(1) {
        margin-left: 20px;
      }
    }
  }
  .center-form {
    margin-top: 44px;
    border-radius: 20px;
    box-shadow: 0 0 6px #f1f1f1;
    // height: 701px;
    background-color: #fff;
    .form-tittle {
      font-size: 18px;
      font-weight: bold;
      height: 51px;
      line-height: 51px;
      display: flex;
      text-align: center;
      .title-img {
        width: 20%;
      }
      .title-name {
        width: 30%;
      }
      .title-number {
        width: 30%;
      }
      .title-sex {
        width: 20%;
      }
    }
    .form-item {
      font-size: 18px;
      height: 130px;
      line-height: 130px;
      display: flex;
      text-align: center;
      .title-img {
        width: 20%;
        img {
          margin-top: 7px;
          height: 100px;
          width: 100px;
        }
      }
      .title-name {
        width: 30%;
      }
      .title-number {
        width: 30%;
      }
      .title-sex {
        width: 20%;
      }
    }
    .form-item:nth-child(2n){
      background-color: #FCFCFC;
    }
  }
  .paging{
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
.border-blue{
    border: 1px solid rgba(45, 134, 20, 1);
  }
  .background-blue-active{
    background-color: rgba(45, 134, 20, 1) !important;
    color: #fff !important;
  }
</style>
