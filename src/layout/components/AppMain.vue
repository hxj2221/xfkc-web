<template>
  <section class="app-main">
    <div v-if="value === 'old'" class="nav-menu">
      <span :class="activeName === 'home' ? 'nav-menu-item nav-menu-active' : 'nav-menu-item'" activeName @click="changepage('home')">
        首页
      </span>
      <span :class="activeName === 'list' ? 'nav-menu-item nav-menu-active' : 'nav-menu-item'" @click="changepage('list')">
        精品课程
      </span>
      <!-- <span :class="activeName === 'chanllege' ? 'nav-menu-item nav-menu-active' : 'nav-menu-item'" @click="changepage('chanllege')">
        挑战中心
      </span> -->
      <span :class="activeName === 'coursesource' ? 'nav-menu-item nav-menu-active' : 'nav-menu-item'" @click="changepage('coursesource')">
        课程资源
      </span>
      <span :class="activeName === 'games' ? 'nav-menu-item nav-menu-active' : 'nav-menu-item'" @click="changepage('games')">
        交互课程
      </span>
      <span :class="activeName === 'achivement' ? 'nav-menu-item nav-menu-active' : 'nav-menu-item'" @click="changepage('achivement')">
        成就中心
      </span>
      <span :class="activeName === 'point' ? 'nav-menu-item nav-menu-active' : 'nav-menu-item'" @click="changepage('point')">
        积分中心
      </span>
      <span v-if="userId != '2' && userId != '6' && userName !== 'admin445' && userName !== 'admin310'" :class="activeName === 'bigData' ? 'nav-menu-item nav-menu-active' : 'nav-menu-item'" @click="changepage('bigData')">
        幸福课程大数据
      </span>
      <!-- <el-image class="find" :src="require('../../assets/nav/find.png)" alt> -->
    </div>
    <div v-else class="nav-menu-young">
      <div v-for="(item, index) in youngMenu" :key="index" class="nav-menu-young-item" @click="item.click">
        <img :src="item.bg">
        <span>{{ item.label }}</span>
      </div>
    </div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
        <!-- </keep-alive> -->
      </keep-alive></transition>
  </section>
</template>

<script>

import tag1 from '@/assets/home/tag1.png'
import tag2 from '@/assets/home/tag2.png'
import tag3 from '@/assets/home/tag3.png'
import tag4 from '@/assets/home/tag4.png'
import tag5 from '@/assets/home/tag5.png'
import tag6 from '@/assets/home/tag6.png'

export default {
  name: 'AppMain',
  props: {
    value: {
      type: String,
      default: 'old'
    }
  },
  data() {
    return {
      userId: '',
      userName: '',
      grade: '',
      activeName: '',
      youngMenu: [{
        label: '精品课程',
        bg: tag1,
        click: () => this.changeGr('grlist')
      }, {
        label: '挑战中心',
        bg: tag2,
        click: () => this.changeGr('chanllege')
      // }, {
      //   label: '课程资源',
      //   bg: tag2,
      //   click: () => this.changeGr('coursesource')
      }, {
        label: '交互课程',
        bg: tag3,
        click: () => this.changeGr('grgames')
      }, {
        label: '成就中心',
        bg: tag4,
        click: () => this.changeGr('achivement')
      }, {
        label: '积分中心',
        bg: tag5,
        click: () => this.changeGr('point')
      }, {
        label: '幸福课程大数据',
        bg: tag6,
        click: () => this.changeGr('grbigData')
      }]
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.userId = this.$store.getters.user?.id
      this.userName = this.$store.getters.user.username
      // this.activeName = this.$router.path
    },
    // setActiveName(){
    //   switch (val) {
    //     case 'school':
    //       this.$router.push({ path: '/school/school' })
    //       break
    //     case 'list':
    //       this.$router.push({ path: '/excellentCourse/excellentCourse' })
    //       break
    //     case 'coursesource':
    //       this.$router.push({ path: '/coursesource/index' })
    //       break
    //     case 'chanllege':
    //       this.$router.push({ path: '/challenge/index' })
    //       break
    //     case 'achivement':
    //       this.$router.push({ path: '/achievement/achievement' })
    //       break
    //     case 'point':
    //       this.$router.push({ path: '/lesson/point' })
    //       break
    //     case 'home':
    //       this.$router.push({ path: '/' })
    //       break
    //     case 'games':
    //       this.$router.push({ path: '/games/index' })
    //       break
    //     case 'bigData':
    //       this.$router.push({ path: '/bigData/bigData' })
    //       break
    //   }
    // }
    changepage(val) {
      this.activeName = val

      switch (val) {
        case 'school':
          this.$router.push({ path: '/school/school' })
          break
        case 'list':
          this.$router.push({ path: '/excellentCourse/excellentCourse' })
          break
        case 'coursesource':
          this.$router.push({ path: '/coursesource/index' })
          break
        case 'chanllege':
          this.$router.push({ path: '/challenge/index' })
          break
        case 'achivement':
          this.$router.push({ path: '/achievement/achievement' })
          break
        case 'point':
          this.$router.push({ path: '/lesson/point' })
          break
        case 'home':
          this.$router.push({ path: '/' })
          break
        case 'games':
          this.$router.push({ path: '/games/index' })
          break
        case 'bigData':
          this.$router.push({ path: '/bigData/bigData' })
          break
      }
    },
    changeGr(val) {
      switch (val) {
        case 'grlist':
          this.$router.push({ path: '/grlesson/grlessonlist' })
          break
        case 'point':
          this.$router.push({ path: '/grlesson/grpoint' })
          break
        case 'achivement':
          this.$router.push({ path: '/grachievement/grachievement' })
          break
        case 'detail':
          // this.$router.push({ path: '/grlesson/grlessondetail' })
          break
        case 'grhome':
          this.$router.push({ path: '/grhome' })
          break
        case 'grschool':
          this.$router.push({ path: '/grschool/grschool' })
          break
        case 'chanllege':
          this.$router.push({ path: '/challenge/grchallengecenter' })
          break
        // case 'coursesource':
        //   this.$router.push({ path: '/coursesource/index' })
        //   break
        case 'grgames':
          this.$router.push({ path: '/grgames/grindex' })
          break
        case 'grbigData':
          this.$router.push({ path: '/grbigData/grbigData' })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "lato";
  // src: url("../../assets/font_family/HYShangWeiMoFaTiOriginalW.ttf");
  src: url("../../assets/font_family/HYShangWeiMoFaTiOriginalWsimple.ttf");
	font-weight: normal;
	font-style: normal;
	font-display: swap;
}
@font-face {
  font-family: "ali";
  src: url("../../assets/font_family/ALiHanYiZhiNengHeiTi-2.ttf");
}
.app-main {
  width: 1366px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  .nav-menu {
    height: 64px;
    width: 100%;
    font-weight:700;
    color:#ffffff;
    font-size:20px;
    font-weight: bold;
    // display: flex;
    // align-items: left;
    background: rgba(73, 177, 239, 1);
    margin-top: 16px;
    // justify-content: space-around;
    // padding: 0 163px;
    margin-bottom: 16px;
    line-height: 64px;

    .nav-menu-item {
      display: inline-block;
      cursor: pointer;
      // flex: 1;
      padding: 0 30px;
      // text-align: center;
    }
    .nav-menu-active{
      // background: #FFA348;
    }
    .find {
      float: right;
      margin-top: 19px;
      cursor: pointer;
    }
  }
  .nav-grmenu {
    height: 90px;
    width: 1366px;
    margin: 0 auto;
    color: #0453a0;
    font-weight: bold;
    .nav-menu-img {
      width: 96px;
      margin-top: 15px;
      height: 52px;
    }
    .nav-menu-item {
      font-size: 20px;
      font-family: lato;
      line-height: 25px;
      color: #2d8815;
      margin-left: 27px;
      vertical-align: top;
      display: inline-block;
      margin-top: 30px;
      cursor: pointer;
      img {
        width: 21px;
        height: 21px;
        vertical-align: middle;
      }
    }
    .find {
      float: right;
      margin-top: 19px;
      cursor: pointer;
    }
  }
}
.young-bottom {
  background: url("../../assets/achievement/bottomimage.png") no-repeat center
    bottom;
    background-size: cover;
}
.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}

.nav-menu-young {
  height: 64px;
  width: 100%;
  font-weight:700;
  color:#ffffff;
  font-size:20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-top: 16px;
  justify-content: space-around;
  padding: 0 163px;
  margin-bottom: 16px;
  gap: 20px;
  font-weight:700;
  font-size:20px;

  &-item {
    position: relative;
    min-width: 202px;
    cursor: pointer;
    img {
      width: 100%;
      height: 66px;
    }

    > span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    }
  }
}

</style>

<style lang="scss" scoped>
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
/deep/.el-image {
  overflow: visible ;

}
</style>
