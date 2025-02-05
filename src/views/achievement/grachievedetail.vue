<template>
  <div class="achivement-main">
    <grcrumbs />
    <div class="achivement-main-title">
      <div class="title-name">
        {{ itemDetail.name }}
        <div @click="share">
          <el-image style="height: 18px" :src="require('../../assets/achievement/shar.png')" alt />
          <span>分享</span>
        </div>
      </div>
      <!-- <div class="title-condition">
        <el-image :src="require('../../assets/achievement/grpen.png')" alt />
        <span class="condition-title">获得条件</span>
        <span>{{ itemDetail.condition }}</span>
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
        <el-image :src="require('../../assets/achievement/grintro.png')" alt />
        成就介绍
      </div>
      <div class="introduce-content">
        {{ itemDetail.introduction }}
      </div>
      <div class="user-title">
        <el-image :src="require('../../assets/achievement/gruser.png')" alt />
        完成用户
      </div>
      <div class="user-list">
        <div v-for="(item) in user1" :key="item.id" class="user-item">
          <avatar :src="$comm.url(item.avatarName, 'avatar')" />
          <div class="user-item-name">{{ item.nickName }}</div>
        </div>
      </div>

      <!-- <div class="user-list">
        <div v-for="(item) in user1" :key="item.id" class="user-img user-item">
          <div class="user-img-item">
            <avatar :src="$commactive.url(item.avatarName)" />
            <div class="item-name">{{ item.nickName }}</div>
          </div>
        </div>
      </div> -->

    </div>
    <!-- <div class="achivement-main-user">
      <div class="user-title">
        <img src="../../assets/achievement/user.png" alt>
        完成用户
      </div>
      <div class="user-img">
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
      </div>
      <div class="user-img">
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
        <div class="user-img-item">
          <img src="../../assets/achievement/head.png" alt>
          <div class="item-name">野青惠</div>
        </div>
      </div>
    </div>-->
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
import { getDetail, getUser } from '@/api/achievement/achievement'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'Achievedetail',
  components: {
    grcrumbs
  },
  data() {
    return {
      id: '',
      itemDetail: {},
      currentPage: 1,
      pageSize: 16,
      total: 0,
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
          this.user1 = res.content
          // if (res.content.length < 11) {
          //   this.user1 = res.content
          // } else {
          //   this.user1 = res.content.slice(0, 10)
          //   this.user2 = res.content.slice(10)
          // }
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
    background: url("../../assets/achievement/grtop_background.png");
    background-size: 100% 100%;
    .title-name {
      display: flex;
      align-items: center;
      padding-top: 12px;
      color: #242424;
      font-size: 28px;
      font-weight: bold;
      // img {
      //   vertical-align: middle;
      //   cursor: pointer;
      //   margin-left: 50px;
      // }
    }
    .title-name span {
      color: rgba(45, 136, 21, 1);
      font-size: 16px;
      margin-left: 3px;
    }
    .title-name > div {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-left: 50px;
      border: 1px rgba(45, 136, 21, 1) solid;
      padding: 6px 18px;
      border-radius: 20px;
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
    padding: 30px 0;
    text-align: center;
    position: relative;

    .img-main {
      width: 469px;
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
    background-image: linear-gradient(
      to bottom,
      rgba(228, 241, 216, 1),
      rgba(228, 241, 216, 1)
    );

    .introduce-title {
      color: rgba(45, 136, 21, 1);
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
      color: rgba(45, 136, 21, 1);
      font-weight: bold;
      font-size: 22px;
      text-align: center;
      padding-top: 24px;

      img {
        vertical-align: middle;
      }
    }

    .user-img {
      // padding: 45px 75px 0px;
      // display: flex;

      .user-img-item {
        flex: 1;
        width: 109px;
        text-align: center;

        .item-name {
          text-align: center;
          font-size: 22px;
          color: #242424;
          margin-top: 21px;
        }

        img {
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

    .user-img {
      padding: 45px 75px 0px;
      display: flex;

      .user-img-item {
        flex: 1;
        width: 109px;
        text-align: center;

        .item-name {
          text-align: center;
          font-size: 22px;
          color: #242424;
          margin-top: 21px;
        }

        img {
          width: 109px;
          height: 109px;
        }
      }
    }
  }

  .paging {
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
