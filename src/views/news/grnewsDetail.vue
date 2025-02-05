<template>
  <div class="newsDetail">
    <grcrumbs />
    <div class="detail-container">
      <!-- 文章详情 -->
      <div class="article">
        <div class="back" @click="$router.go(-1)">&lt; 返回</div>
        <h1 class="title" v-text="title" />
        <div class="date">{{ date }}</div>
        <div class="content" v-html="content" />
      </div>

      <!-- 其他文章列表 -->
      <div class="list">
        <div class="list-container">
          <div v-if="news.areaList.length > 0" class="area">
            <div class="list-title">区课程动态</div>
            <ul class="news-list">
              <li v-for="(item, index) in news.areaList" :key="index" class="item">
                <router-link
                  tag="a"
                  target="_blank"
                  :to="{path:'/grnews/grnewsDetail',query:{id: item.id}}"
                >
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
          </div>
          <div v-if="news.schoolList.length > 0" class="area">
            <div class="list-title">校课程动态</div>
            <ul class="news-list">
              <li v-for="(item, index) in news.schoolList" :key="index" class="item">
                <router-link
                  tag="a"
                  target="_blank"
                  :to="{path:'/grnews/grnewsDetail',query:{id: item.id}}"
                >
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import grcrumbs from '@/components/grcrumbs/grcrumbs'
import { getNewsDetail, getNews } from '@/api/news/news'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  components: {
    grcrumbs
  },
  data() {
    return {
      id: '',
      title: '',
      pic: '',
      content: '',
      news: {
        areaList: [],
        schoolList: []
      }
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
    this.getNewsDetail()

    this.getNews(1)
    this.getNews(2)
  },
  methods: {
    getNews(type = 1) {
      const params = {
        type,
        page: 0,
        size: 5,
        sort: 'updateTime,desc'
      }
      getNews(params).then((res) => {
        if (res.content) {
          if (type === 1) {
            this.news.areaList = res.content
          }

          if (type === 2) {
            this.news.schoolList = res.content
          }
        }
      })
    },
    getNewsDetail() {
      const params = {
        id: this.id
      }
      getNewsDetail(params).then((res) => {
        this.title = res.title
        this.pic = res.pic
        this.content = res.content
        this.date = moment(res.createTime).format('YYYY-MM-DD HH:mm:ss')
      })
    }
  }

}

</script>

<style lang="scss" scoped>
.back{
  background: #2d8815;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  width: 80px;
  line-height: 30px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
}
.newsDetail{
  width: 1366px;
  margin: 0 auto;
  padding-bottom: 360px;
}
.newstitle{
  font-size: 28px;
  margin-top: 32px;
  margin-bottom: 64px;
}
.box_007{
  display: flex;
  background-color:#E4F1D8;
  width: 1366px;
  border-radius: 20px;
  padding: 42px 50px 50px 50px ;
  margin-bottom: 100px;
}
.tu{
  width: 469px;
  height: 331px;
  border-radius: 20px;
  /* background-color: red; */
}
.zi{
  padding-left: 50px;
  color: rgba(112, 112, 112, 1);
  font-size: 18px;
}
.detail-container{
  display: flex;

  .article{
    flex: 1;
    min-width: 0;
    padding-right: 25px;
  }

  .date{
    color: #aaa;
    font-size: 14px;
    padding-bottom: 10px;
  }

  .content{
    padding: 20px 0;
    border-top: 1px solid #eee;
    line-height: 1.5;

    /deep/ img {
      max-width: 100% !important;
    }
  }

  .list{
    width: 330px;
  }

  .list-container{
    background: #e4f8d3;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 5px #dbdcda;
  }

  .area{
    margin-bottom: 20px;
  }

  .list-title{
    color: #2d8815;
    font-size: 20px;
    font-family: lato;
    margin-bottom: 10px;
  }

  .news-list{
    // padding-left: 20px;
  }

  .item{
    color: #666;
    list-style: inside;
    margin: 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
