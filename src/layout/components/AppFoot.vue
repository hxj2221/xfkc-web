<template>
  <div class="foot-main">
    <div class="inbox">
      <div class="title">幸福课程 开启幸福之旅</div>
      <div style="display:flex;align-items:center;margin-top:30px;">
        <ul v-if="false" class="ul1">
          关于幸福课程
          <li @click="aboutUs">
            <a href="#">关于我们</a>
          </li>
          <li @click="telUs">
            联系我们
          </li>
          <li @click="helpCenter">
            帮助中心
          </li>
        </ul>
        <div v-if="false" class="ul2">
          <div style="font-size:26px">合作单位</div>
          <div class="cooperate">
            <div>
              <a href="#">嘉定区教育学院</a>
            </div>
            <div>
              <a href="#">嘉定区教育学院</a>
            </div>
            <div>
              <a href="#">嘉定区教育学院</a>
            </div>
            <div>
              <a href="#">嘉定区教育学院</a>
            </div>
            <div>
              <a href="#">嘉定区教育学院</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footimg">
        <el-image style="margin-right:18px;" :src="require('../../assets/nav/erweima.png')" alt />
        <el-image style="margin-right:18px;" :src="require('../../assets/nav/weixin.png')" alt @click="weChartShare()" />
        <el-image style="margin-right:18px;" :src="require('../../assets/nav/weibo.png')" alt @click="weiboShare()" />
        <el-image :src="require('../../assets/nav/icon.png')" alt />
      </div>
      <div class="last">联系电话：021-39902142 学校地址：嘉定区嘉行公路601号 copyright©2017上海市嘉定区教育学院</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFoot',
  data() {
    return {}
  },
  methods: {
    aboutUs() {
      this.$router.push({ path: 'we/we' })
    },
    telUs() {
      this.$router.push({ path: 'telUs/telUs' })
    },
    helpCenter() {
      this.$router.push({ path: 'helpCenter/helpCenter' })
    },
    weChartShare() {
      // 自定义内容
      var title = encodeURIComponent(document.title)
      var url = encodeURIComponent(window.location.href)
      // 跳转地址
      window.open(
        'http://service.weibo.com/share/share.php?url=' + url + '&title=' + title,
      )
    },
    weiboShare() {
      // 自定义内容
      var title = encodeURIComponent(document.title)
      var url = encodeURIComponent(window.location.href)
      // 跳转地址
      window.open(
        'http://service.weibo.com/share/share.php?url=' + url + '&title=' + title,
      )
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.foot-main {
  margin-top: 67px;
  min-width: 1366px;
  min-height: 404px;
  // height: 476px;
  background: url("../../assets/nav/foot.png") no-repeat;
  background-size: 100% auto;
  margin: 0 auto;
  color: white;
  overflow: hidden;
}
li{
  cursor:pointer;
}
.inbox{
  width: 1366px;
  margin: 0 auto;
}
.title {
  color: white;
  font-size: 28px;
  margin-top: 105px;
  // left: 15.48%;
}
.ul1 {
  // margin-left: -40px;
  // left: 17.48%;
  font-size: 26px;
}
li {
  font-size: 22px;
  padding: 0;
  margin-top: 10px;
  list-style: none;
}
.cooperate {
  width: 560px;
  display: flex;
  flex-wrap: wrap;
}
.cooperate div {
  margin: 10px 32px 0 0;
  font-size: 22px;
}
.ul2 {
  position: relative;
  left:74px;
  top: -18px;
}
.footimg {
  float: right;
  // margin-right: 302px;
  margin-top: -111px;
}
.last {
  margin-top: 35px;
  font-size: 22px;
  text-align: center;
}
</style>
