<template>
  <div>
    <router-link
      v-for="(item,index) in newsList"
      :key="index"
      class="item"
      :to="{path:to,query:{id: item.id}}"
    >
      <div class="item">
        <div class="item-left">
          <el-image
            class="item-img"
            :src="$comm.url(item.pic)"
            fit="cover"
          />
        <!-- <img class="item-img" :src="$comm.url(item.pic)" alt> -->
        <!-- <div class="top">TOP1</div> -->
        </div>
        <div class="item-right">
          <div class="right-title">{{ item.title }}</div>
          <div class="right-subtitle" v-html="item.summary" />
          <div class="right-time">{{ item.createTime }}</div>
        </div>
      </div>
    </router-link>
    <div v-if="newsList.length == 0" class="no_date">
      <img src="../../assets/challenge/nopinglun.png" alt="">
      <div class="no_date_title">暂无数据</div>
    </div>
    <div class="paging">
      <div class="myTwo">
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
    </div>
  </div>
</template>

<script>
import { getNews } from '@/api/news/news'

export default {
  name: 'NewsTab',
  props: {
    type: {
      type: Number,
      default: 1,
      require: false
    },
    columnId: {
      type: Number,
      require: true,
      default: 0
    },
    to: {
      type: String,
      default: '/news/newsDetail'
    }
  },
  data() {
    return {
      newsList: [],
      total: 0,
      size: 8,
      currentPage3: 1
    }
  },
  watch: {
    type() {
      this.getNews()
    },
    columnId() {
      this.getNews()
    }
  },
  created() {
    this.getNews()
  },
  methods: {
    timeFormat(timestamp) {
      function add0(m) {
        return m < 10 ? '0' + m : m
      }
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return (
        year +
        '-' +
        add0(month) +
        '-' +
        add0(date) +
        ' ' +
        add0(hours) +
        ':' +
        add0(minutes) +
        ':' +
        add0(seconds)
      )
    },
    getNews() {
      this.newsList = []
      const params = {
        type: this.type,
        page: this.currentPage3 - 1,
        size: this.size,
        sort: 'id,desc',
        specialColumnId: this.columnId
      }
      getNews(params).then((res) => {
        if (res) {
          this.total = res.totalElements
          this.newsList = res.content
          res.content.forEach(i => {
            i.updateTime = this.timeFormat(i.updateTime)
            i.createTime = this.timeFormat(i.createTime)
          })
        }
      })
    },
    handleSizeChange() {
      this.getNews()
    },
    handleCurrentChange() {
      this.getNews()
    },
    gotoDetail(item) {
      this.$router.push({ path: '/news/newsDetail?id=' + item.id })
    }
  }
}
</script>

<style lang="scss" scoped>

.item {
  cursor:pointer;
  height: 150px;
  overflow: hidden;
  display: flex;
  margin-top: 23px;
  .item-left {
    position: relative;
    .item-img {
      width: 299px;
      height: 150px;
      border-radius: 20px;
    }
    .top {
      position: absolute;
      top: 12px;
      width: 77px;
      height: 26px;
      border-radius: 10px 20px 20px 10px;
      background-image: linear-gradient(to bottom, #ff785d, #e43a1f);
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      line-height: 26px;
      margin-left: -8px;
    }
  }
  .item-right {
    margin-left: 27px;
    position: relative;
    .right-title {
      margin-top: 5px;
      font-size: 22px;
      font-weight: bold;
    }
    .right-subtitle {
      margin-top: 10px;
      height: 88px;
      font-size: 18px;
      color: #333;
    }
    .right-time {
      // position: absolute;
      // bottom: 5px;
      color: #8c8c8c;
      font-size: 18px;
    }
  }
}
.item:first-child {
  margin-top: 0px;
}
.paging {
  margin-top: 90px;
  margin-bottom: 63px;
}

.no_date {
  text-align: center;

  .no_date_title {
    font-size: 18px;
    font-weight: 500;
    color: #999;
  }

}
</style>
