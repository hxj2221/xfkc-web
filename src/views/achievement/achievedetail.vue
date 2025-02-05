<template>
  <div class="achivement-main">
    <crumbs />
    <div class="achivement-main-title">
      <div class="title-name">
        {{ itemDetail.name }}
        <el-image :src="require('../../assets/achievement/share.png')" alt @click="share" />
      </div>
      <!-- <div class="title-condition">
        <el-image :src="require('../../assets/achievement/pen.png')" alt />
        <span class="condition-title">获得条件</span>
        <span>{{ itemDetail.conditionjiqinghu }}</span>
      </div> -->
      <div class="title-condition">
        <el-image :src="require('../../assets/achievement/sun.png')" alt />
        <span class="condition-gray">已有{{ itemDetail.numberOfPeople }}人完成任务</span>
      </div>
    </div>
    <div class="achivement-main-img">
      <el-image class="img-main" :src="$comm.url(itemDetail.badgeUrl)" alt />
      <el-image v-if="itemDetail.isOwned" class="img-success" :src="require('../../assets/achievement/success.png')" alt />
    </div>
    <div class="achivement-main-introduce">
      <div class="introduce-title">
        <el-image :src="require('../../assets/achievement/intro.png')" alt />
        成就介绍
      </div>
      <div class="introduce-content">
        {{ itemDetail.introduction }}
      </div>
      <div class="user-title">
        <el-image :src="require('../../assets/achievement/user.png')" alt />
        完成用户
      </div>
      <div class="user-list">
        <div v-for="(item) in user1" :key="item.id" class="user-item">
          <avatar :src="$comm.url(item.avatarName, 'avatar')" />
          <div class="user-item-name">{{ item.nickName }}</div>
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
import crumbs from '@/components/crumbs/crumbs.vue'
import { getDetail, getUser } from '@/api/achievement/achievement'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'Achievedetail',
  components: {
    crumbs
  },
  data() {
    return {
      id: '',
      itemDetail: {},
      total: 0,
      currentPage: 1,
      pageSize: 16,
      user1: [],
      user2: [],
      twoCodes: ''
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
    this.getDtail()
    this.getUser()
  },
  methods: {
    getDtail() {
      const params = {
        id: this.id
      }
      getDetail(params)
        .then((res) => {
          this.itemDetail = res
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getUser() {
      const params = {
        id: this.id,
        page: this.currentPage - 1,
        size: this.pageSize
      }
      getUser(params)
        .then((res) => {
          this.total = res.totalElements
          if (res.content.length < 11) {
            this.user1 = res.content
          } else {
            this.user1 = res.content.slice(0, 10)
            this.user2 = res.content.slice(10)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.getUser()
    },
    handleCurrentChange() {
      this.getUser()
    },
    share() {
      this.twoCodes = window.location.href
      alert('已复制连接，快去分享吧')
      this.$copyText(this.twoCodes).then(
      )
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.achivement-main {
  width: 1366px;
  margin: 0 auto;
  .achivement-main-title {
    padding-left: 36px;
    height: 126px;
    margin-top: 20px;
    background: url("../../assets/achievement/detailtitle.png");
    background-size: 100% 100%;
    .title-name {
      padding-top: 12px;
      color: #242424;
      font-size: 28px;
      font-weight: bold;
      img {
        vertical-align: middle;
        cursor: pointer;
        margin-left: 50px;
      }
    }
    .title-condition {
      padding-top: 10px;
      font-size: 18px;
      display: flex;
      align-items: center;
      img {
        vertical-align: middle;
        width: 24px;
        height: 24px;
      }
      .condition-title {
        font-weight: bold;
        margin-left: 3px;
        margin-right: 6px;
      }
      .condition-gray {
        margin-left: 10px;
        color: #707070;
      }
    }
  }
  .achivement-main-img {
    padding-top: 34px;
    padding-bottom: 86px;
    text-align: center;
    position: relative;
    .img-main {
      // width: 469px;
      height: 331px;
    }
    .img-success {
      position: absolute;
      width: 174px;
      height: 174px;
      top: 240px;
      right: 390px;
    }
  }
  .achivement-main-introduce {
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 0 6px #eaeaea;
    border-radius: 20px;
    background-image: linear-gradient(to bottom,#C7E1FB,#F3F9FF);
    .introduce-title {
      color: #0554a0;
      font-weight: bold;
      font-size: 22px;
      text-align: center;
      padding-top: 24px;
      img {
        vertical-align: middle;
      }
    }
    .introduce-content {
      padding: 17px 33px;
      color: #707070;
      letter-spacing: 1px;
    }
    .user-title {
      color: #0554a0;
      font-weight: bold;
      font-size: 22px;
      text-align: center;
      padding-top: 24px;
      img {
        vertical-align: middle;
      }
    }
    .user-img{
      padding: 45px 75px 30px;
      display: flex;
      .user-img-item{
        flex: 1;
        width: 109px;
        text-align: center;
        .item-name{
          text-align: center;
          font-size: 22px;
          color: #242424;
          margin-top: 21px;
        }
        img{
        width: 109px;
        height: 109px;
        }
      }
    }
  }
  .achivement-main-user {
    width: 1400px;
    height: 518px;
    margin: 0 auto;
    margin-top: 33px;
    box-shadow: 0 0 6px #eaeaea;
    border-radius: 20px;
    .user-title {
      color: #0554a0;
      font-weight: bold;
      font-size: 22px;
      text-align: center;
      padding-top: 24px;
      img {
        vertical-align: middle;
      }
    }
    .user-img{
      padding: 45px 75px 0px;
      display: flex;
      .user-img-item{
        flex: 1;
        width: 109px;
        text-align: center;
        .item-name{
          text-align: center;
          font-size: 22px;
          color: #242424;
          margin-top: 21px;
        }
        img{
        width: 109px;
        height: 109px;
        }
      }
    }
  }
  .paging{
    margin-top: 90px;
    margin-bottom: 63px;
  }
}

.user-list{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 0;

  .user-item{
    width: 170px;
    padding: 20px 0;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .user-item-name{
    margin-top: 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
