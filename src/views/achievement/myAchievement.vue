<template>
  <div class="achievement-center">
    <crumbs />
    <div class="center-title">
      <div class="select-item">
        检索类型
        <span
          :class="['item-retrieval','border-blue',retrieval === 1 ? 'background-blue-active' : '' ]"
          @click="changeRet(1)"
        >平台</span>
        <span
          :class="['item-retrieval','border-blue',retrieval === 2 ? 'background-blue-active' : '' ]"
          @click="changeRet(2)"
        >学校</span>
      </div>
    </div>
    <div class="chanllege-content">
      <div v-for="(item) in pointList1" :key="item.id" class="content-item" @click="changeDetail(item.id)">
        <div class="item-img">
          <el-image :src="$comm.url(item.badgeUrl)" alt />
        </div>
        <div class="item-text">
          <div class="item-text-title">{{ item.name }}</div>
          <div class="item-text-time"> <el-image :src="require('../../assets/achievement/sun.png')" style="width:20px;height:20px" alt=""> 已有{{ item.numberOfPeople }}人完成</el-image></div>
        </div>
        <el-image class="finish-img" :src="require('../../assets/challenge/finish.png')" alt />
      </div>
    </div>
    <div class="chanllege-content">
      <div v-for="(item) in pointList2" :key="item.id" class="content-item" @click="changeDetail(item.id)">
        <div class="item-img">
          <el-image :src="$comm.url(item.badgeUrl)" alt />
        </div>
        <div class="item-text">
          <div class="item-text-title">{{ item.name }}</div>
          <div class="item-text-time"> <el-image :src="require('../../assets/achievement/sun.png')" style="width:20px;height:20px" alt="" /> 已有{{ item.numberOfPeople }}人完成</div>
        </div>
        <el-image class="finish-img" :src="require('../../assets/challenge/finish.png')" alt />
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
import crumbs from '@/components/crumbs/crumbs.vue'
import { myacList } from '@/api/achievement/achievement'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'Achievement',
  components: {
    crumbs
  },
  data() {
    return {
      retrieval: 1,
      currentPage: 1,
      total: 0,
      pageSize: 8,
      pointList1: [],
      pointList2: []
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
    this.getList()
  },
  methods: {
    changeRet(val) {
      this.retrieval = val
      this.getList()
    },
    changeDetail(id) {
      this.$router.push({ path: '/achievement/achievedetail?id=' + id })
    },
    getList() {
      const params = {
        type: this.retrieval,
        page: this.currentPage - 1,
        size: this.pageSize,
        sort: ''
      }
      myacList(params)
        .then((res) => {
          this.total = res.totalElements
          if (res.content.length < 5) {
            this.pointList1 = res.content
          } else {
            this.pointList1 = res.content.slice(0, 4)
            this.pointList2 = res.content.slice(4)
          }
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

<style rel="stylesheet/scss" lang="scss" scoped>
.achievement-center {
  width: 1366px;
  margin: 0 auto;
  .center-title {
    height: 72px;
    margin-top: 20px;
    background: url("../../assets/achievement/title.png");
    background-size: 100% 100%;
    .select-item {
      padding-top: 25px;
      margin-left: 31px;
      .item-retrieval {
        padding: 8px 12px;
        cursor: pointer;
        margin-left: 5px;
        color: #358DE4;
        border-radius: 10px;
      }
      :nth-child(1) {
        margin-left: 20px;
      }
    }
  }
  .chanllege-content {
    margin-top: 34px;
    display: flex;
    .content-item {
      // flex: 1;
      width: 289px;
      height: 331px;
      border: 1px solid #e6e6e6;
      border-radius: 20px;
      margin-right: 66px;
      overflow: hidden;
      position: relative;
      .item-img {
        img {
          width: 290px;
          height: 204px;
        }
      }
      .item-text {
        padding-left: 14px;
        padding-top: 22px;
        .item-text-title {
          color: #242424;
          font-weight: bold;
          font-size: 22px;
        }
        .item-text-finish {
          margin-top: 6px;
          color: #fff;
          border-radius: 20px;
          font-size: 16px;
          display: inline-block;
          width: 81px;
          padding: 5px 0px;
          text-align: center;
        }
        .item-text-time {
          font-size: 16px;
          color: #242424;
          margin-top: 25px;
          img{
            vertical-align: middle;
            width: 28px;
            height: 28px;
          }
        }
      }
      .finish-img {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    :nth-child(4) {
      margin-right: 0px;
    }
  }
  .paging{
    margin-top: 90px;
    margin-bottom: 63px;
  }
}
</style>
