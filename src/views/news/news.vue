<template>
  <div class="news">
    <crumbs />
    <div class="newsType">
      <div class="tabs">
        <!-- <div v-if="$store.getters.roleID !== 1" class="newsTabItem" :class="{active: curTab === 1}" @click="challenge">校课程动态</div> -->
        <div v-for="(tab) in tabList" :key="tab.id" :class="`newsTabItem ${tab.id === curTab ? 'active' : ''}`" @click="curTab=tab.id">
          {{ tab.title }}
        </div>
      </div>
      <div class="news-main">
        <div class="news-description">{{ tabList.find(tab => tab.id === curTab)?.introduce }}</div>
        <div v-for="(tab) in tabList" :key="tab.id">
          <news-tab
            v-show="tab.id === curTab"
            :type="type"
            :column-id="tab?.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/crumbs.vue'
// import Pagination from '@/components/Pagination/Pagination.vue'
import { getTabs } from '@/api/news/news'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import NewsTab from './newsTab.vue'

export default {
  name: 'News',
  components: {
    crumbs,
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
    ...mapGetters(['baseApi', 'fileUploadApi', 'theme']),
    headers() {
      return {
        Authorization: getToken()
      }
    }
  },
  async created() {
    // if (this.$store.getters.roleID !== 1) {
    //   this.type = 2
    // } else {
    //   this.type = 1
    // }
    // this.type = 2
    this.type = 1
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
    }
  }
}
</script>

<style lang="scss">
.news {
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;

  .news-main {
    margin-top: 23px;
    min-height: 300px;
    background-image: linear-gradient(to bottom, #c7e1fb, #f3f9ff);
    border-radius: 20px;
    padding: 41px 33px;

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
  flex-direction: column;
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
