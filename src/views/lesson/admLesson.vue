<template>
  <div class="lesson-main">
    <crumbs />
    <div class="center-title">
      <div class="select-item">
        检索类型
        <span
          :class="['item-retrieval','border-blue',retrieval === 0 ? 'background-blue-active' : '' ]"
          @click="changeRet(0)"
        >已保存</span>
        <span
          :class="['item-retrieval','border-blue',retrieval === 1 ? 'background-blue-active' : '' ]"
          @click="changeRet(1)"
        >公开</span>
      </div>
      <div class="select-release">
        <router-link :to="{name:'Releaselesson'}">发布课程</router-link>
      </div>
    </div>
    <div v-show="retrieval === 0" class="center-form">
      <div class="form-tittle">
        <div class="title-img">课程图片</div>
        <div class="title-name">课程名称</div>
        <div class="title-class">课程类目</div>
        <div class="title-time">年级</div>
        <div class="title-operation">操作</div>
      </div>
      <div v-for="item in lessonList" :key="item.id" class="form-item">
        <div class="title-img">
          <img style="width: 146px; height: 103px" :src="$comm.url(item.coverImage)">
        </div>
        <div class="title-name">{{ item.name }}</div>
        <div class="title-class">{{ item.courseCategory }}</div>
        <div class="title-time">{{ item.grade }}</div>
        <div class="title-operation">
          <div class="button-editor" @click="editor(item.id)">
            <img src="../../assets/lesson/bianji.png" alt> 编辑
          </div>
          <div slot="reference" class="button-editor" @click="toDelete(item.id)">
            <img src="../../assets/lesson/lajitong.png" alt> 删除
          </div>
        </div>
      </div>
    </div>
    <div v-show="retrieval === 1" class="center-form1">
      <div class="form-tittle">
        <div class="title-img">课程图片</div>
        <div class="title-name">课程名称</div>
        <div class="title-class">课程类目</div>
        <div class="title-pepple">年级</div>
        <div class="title-time">浏览量</div>
        <div class="title-state">查看方式</div>
        <div class="title-operation">操作</div>
      </div>
      <div v-for="item in lessonList" :key="item.id" class="form-item">
        <div class="title-img">
          <img :src="$comm.url(item.coverImage)" alt>
        </div>
        <div class="title-name">{{ item.name }}</div>
        <div class="title-class">{{ item.courseCategory }}</div>
        <div class="title-pepple">{{ item.grade }}</div>
        <div class="title-time">{{ item.pageView }}</div>
        <div class="title-state">
          <span v-if="item.status === 3">精品课</span>
          <span v-if="item.status === 2">审核中</span>
          <span v-if="item.status === 1">课程资源库</span>
        </div>
        <div class="title-operation">
          <div v-if="item.status === 1" class="button-editor1" @click="apply(item.id)">
            <img src="../../assets/lesson/shi.png" alt> 申请加精
          </div>
          <div class="button-editor" @click="offShelf(item.id)">
            <img src="../../assets/lesson/cuo.png" alt> 下架
          </div>
        </div>
      </div>
    </div>
    <div class="paging">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import crumbs from '@/components/crumbs/crumbs.vue'
import { admLesson, deleteLesson, apply, offShelf } from '@/api/lesson/lesson'
export default {
  name: 'MyLesson',
  components: {
    crumbs
  },
  data() {
    return {
      dialogVisible: true,
      retrieval: 0,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      lessonList: []
    }
  },
  computed: {
    ...mapGetters([
      'baseApi',
      'fileUploadApi'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    toDelete(id) {
      this.$confirm('是否确定要删除此课程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = []
        params.push(id)
        deleteLesson(params)
          .then((res) => {
            this.getList()
          })
          .catch((error) => {
            console.log(error)
          })
      }).catch(() => {
      })
    },
    changeRet(val) {
      this.retrieval = val
      this.getList()
    },
    getList() {
      const params = {
        status: this.retrieval,
        page: this.currentPage - 1,
        size: this.pageSize,
        sort: ''
      }
      admLesson(params)
        .then((res) => {
          console.log(res)
          this.total = res.totalElements
          this.lessonList = res.content
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 编辑
    editor(id) {
      console.log(111111)
      this.$router.push({ path: '/lesson/releaselesson?id=' + id })
    },

    // 申请加精
    apply(id) {
      const params = {
        courseTitleId: id
      }
      apply(params)
        .then((res) => {
          this.getList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 下架
    offShelf(id) {
      const params = {
        courseTitleId: id
      }
      offShelf(params)
        .then((res) => {
          this.getList()
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
  .center-title {
    height: 72px;
    margin-top: 20px;
    background: url("../../assets/achievement/title.png");
    background-size: 100% 100%;
    position: relative;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
      .item-retrieval {
        padding: 8px 12px;
        cursor: pointer;
        margin-left: 5px;
        color: #358de4;
        border-radius: 10px;
      }
      :nth-child(1) {
        margin-left: 20px;
      }
    }
    .select-release {
      position: absolute;
      right: 76px;
      top: 15px;
      cursor: pointer;
      font-size: 18px;
      color: #fff;
      width: 125px;
      height: 42px;
      background-image: linear-gradient(to top, #044480, #0453a0);
      text-align: center;
      line-height: 42px;
      border-radius: 20px;
    }
  }
  .center-form {
    margin-top: 44px;
    border-radius: 20px;
    box-shadow: 0 0 6px #f1f1f1;
    // height: 701px;
    .form-tittle {
      font-size: 18px;
      font-weight: bold;
      height: 51px;
      line-height: 51px;
      display: flex;
      text-align: center;
      .title-img {
        width: 15%;
      }
      .title-name {
        width: 20%;
        line-height: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        word-break: break-all;
      }
      .title-class {
        width: 25%;
      }
      .title-time {
        width: 25%;
      }
      .title-operation {
        width: 15%;
      }
    }
    .form-item {
      font-size: 18px;
      height: 130px;
      line-height: 130px;
      display: flex;
      text-align: center;
      .title-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15%;
        img {
          width: 146px;
          height: 103px;
          margin-top: 13.5px;
          border-radius: 20px;
        }
      }
      .title-name {
        width: 20%;
        line-height: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        word-break: break-all;
      }
      .title-class {
        width: 25%;
      }
      .title-time {
        width: 25%;
      }
      .title-operation {
        width: 15%;
        cursor: pointer;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .button-editor {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 83px;
          height: 34px;
          border: 1px solid #358de4;
          border-radius: 10px;
          font-size: 16px;
          margin-left: 5px;
          color: #358de4;
          cursor: pointer;
          img {
            width: 16px;
            margin-right: 2px;
          }
        }
      }
    }
    .form-item:nth-child(2n) {
      background-color: #fcfcfc;
    }
  }
  .center-form1 {
    margin-top: 44px;
    border-radius: 20px;
    box-shadow: 0 0 6px #f1f1f1;
    // height: 701px;
    .form-tittle {
      font-size: 18px;
      font-weight: bold;
      height: 51px;
      line-height: 51px;
      display: flex;
      text-align: center;
      .title-img {
        width: 15%;
      }
      .title-name {
        width: 20%;
        line-height: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        word-break: break-all;
      }
      .title-class {
        width: 10%;
      }
      .title-pepple {
        width: 10%;
      }
      .title-time {
        width: 15%;
      }
      .title-state {
        width: 10%;
      }
      .title-operation {
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
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 146px;
          height: 103px;
          margin-top: 13.5px;
          border-radius: 20px;
        }
      }
      .title-name {
        width: 20%;
        line-height: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        word-break: break-all;
      }
      .title-class {
        width: 10%;
      }
      .title-pepple {
        width: 10%;
      }
      .title-time {
        width: 15%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .title-state {
        width: 10%;
      }
      .title-operation {
        margin-top: 10px;
        cursor: pointer;
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        .button-editor {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 83px;
          height: 34px;
          border: 1px solid #358de4;
          border-radius: 10px;
          font-size: 16px;
          margin-left: 5px;
          color: #358de4;
          cursor: pointer;
          img {
            width: 14px;
            margin-right: 4px;
          }
        }
        .button-editor1 {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 108px;
          height: 34px;
          border: 1px solid #358de4;
          border-radius: 10px;
          font-size: 16px;
          margin-left: 5px;
          color: #358de4;
          cursor: pointer;
          img {
            width: 14px;
            margin-right: 4px;
          }
        }
      }
    }
    .form-item:nth-child(2n) {
      background-color: #fcfcfc;
    }
  }
  .paging {
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
</style>
