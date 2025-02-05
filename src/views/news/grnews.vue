<template>
  <div class="news">
    <grcrumbs />
    <div class="newsType">
      <div class="tabs">
        <!-- <div v-if="$store.getters.roleID !== 1" class="newsTabItem" :class="{active: curTab === 1}" @click="challenge">校课程动态</div> -->
        <div v-for="tab in tabList" :key="tab.id" :class="`newsTabItem ${curTab === tab.id ? 'active' : ''}`" @click="curTab=tab.id">
          {{ tab.title }}
        </div>
      </div>
    </div>

    <div class="news-main">
      <div class="news-description">{{ tabList.find(tab => tab.id === curTab)?.introduce }}</div>
      <div v-for="tab in tabList" :key="tab.id">
        <news-tab
          v-show="tab.id === curTab"
          :type="type"
          :column-id="tab?.id"
          to="/grnews/grnewsDetail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
// import grPagination from '@/components/Pagination/grPagination.vue'
import { getTabs } from '@/api/news/news'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import NewsTab from './newsTab.vue'

export default {
  name: 'News',
  components: {
    grcrumbs,
    NewsTab
  },
  data() {
    return {
      type: 1,
      curTab: 0,
      tabList: []
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
  async created() {
    await this.getTabs()
  },

  methods: {
    getTabs() {
      getTabs({
        type: this.type
      }).then(res => {
        const type = this.$route.query.type

        if (type == 1) {
          this.tabList = res.slice(0, 2)
        } else if (type == 2) {
          this.tabList = res.slice(2, 6)
        } else {
          this.tabList = res
        }
        this.curTab = +this.tabList[0].id
      })
    },
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
    gotoDetail(item) {
      this.$router.push({ path: '/grnews/grnewsDetail?id=' + item.id })
    }
  }
}
</script>

<style lang="scss" scoped >
.news {
  width: 1366px;
  margin: 0 auto;

  .news-main {
    margin-top: 23px;
    background-image: linear-gradient(
    to bottom,
    rgba(228, 241, 216, 1),
    rgba(228, 241, 216, 1)
  );
    border-radius: 20px;
    padding: 20px;

    .news-description {
      width: 100%;
      word-break: break-all;
      line-height: 24px;
      text-indent: 2em;
      margin-bottom: 32px;
      white-space: pre-line;
    }
  }
}

.newsType{
  display: flex;
  margin-top: 20px;
}

.active1{
  height: 40px;
  margin-left: 20px;
  color: #358b3a;
  font-size: 24px;
  border-bottom: 3px solid #358b3a;
  cursor:pointer;
}

.active2{
  height: 40px;
  margin-left: 20px;
  color: #8c8c8c;
  font-size: 24px;
  border-bottom: 3px solid rgba($color: #8c8c8c, $alpha: 0);
  cursor:pointer;
}

.tabs {
  display: flex;
  width: 100%;
  overflow-x: auto;
  flex-flow: row;
  align-items: center;

  .newsTabItem{
    height: 40px;
    margin-left: 20px;
    color: #8c8c8c;
    font-size: 24px;
    border-bottom: 3px solid rgba($color: #8c8c8c, $alpha: 0);
    cursor:pointer;

    &.active{
    color: #0553a2;
    border-bottom: 3px solid #0553a2;
    }
  }
}
</style>
