<template>
  <el-container class="container" :style="$route.fullPath === '/grhome' ? 'height: 3900px' : ''">
    <el-header height="64px">
      <el-row>
        <el-col :span="2" style="text-align: right">
          <img :src="headerIcon" style="height: 64px">
        </el-col>
        <el-col :span="8">
          <div :class="`${value === 'old' ? `home_page_title${!isHome ? ' home_page_title-not_select' : ''}` : `home_page_title_young${!isHome ? ' home_page_title_young-not_select' : ''}`}`" @click="$router.push({ path: value === 'young' ? '/grhome' : '/' })">首页</div>
        </el-col>
        <el-col :span="14" style="float: right">
          <div :class="`${value === 'old' ? 'home_page_select' : 'home_page_select_young'}`">
            <!-- <el-button
              v-if="showTopRightBtn"
              @click="$router.push(value === 'old' ? '/challenge/admchallenge' : '/grchallenge/gradmChallenge')"
            >
              挑战管理
            </el-button> -->
            <el-button
              v-if="showTopRightBtn"
              style="margin-right: 10px;"
              @click="$router.push(value === 'old' ? '/lesson/admclass' : '/grlesson/gradmlesson')"
            >
              课程管理
            </el-button>
            <el-select v-if="showSwitchBtn" v-model="value" placeholder="请选择" @change="switchTheme">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :style="`color: ${value === 'young' && value === item.value ? 'rgba(41, 198, 119, 1)' : ''}`"
              />
            </el-select>
            <img
              class="notify"
              :src="value === 'old' ? alert : alert2Icon"
              @click="$router.push({
                path: '/grmessage/grmessage'
              })"
            >
            <div class="notify-point" />
            <el-dropdown placement="bottom-end">
              <el-avatar class="user-avatar" shape="circle" icon="el-icon-user-solid" :size="40" :src="user.avatarName ? baseApi + '/avatar/' + user.avatarName : avatar" />
              <el-dropdown-menu slot="dropdown">
                <router-link v-if="$store.getters.theme === 'old' && userId === '2'" to="/user/time">
                  <el-dropdown-item style="width: 84px">时光机</el-dropdown-item>
                </router-link>
                <router-link v-if="$store.getters.theme === 'young' && userId === '2'" to="/user/grtime">
                  <el-dropdown-item style="width: 84px">时光机</el-dropdown-item>
                </router-link>
                <router-link to="/user/center">
                  <el-dropdown-item style="width: 84px">个人中心</el-dropdown-item>
                </router-link>
                <span style="display: block" @click="open">
                  <el-dropdown-item style="width: 84px" divided>退出登录</el-dropdown-item>
                </span>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main :style="`${value === 'young' ? 'background-color:#fef9ea' : ''}`">
      <el-carousel v-if="imgUrls && imgUrls[0]" style="width: 100%" indicator-position="none">
        <el-carousel-item v-for="(item, i) in imgUrls" :key="i">
          <el-image
            style="width: 100%; height: 100%"
            fit="fill"
            :src="$comm.url(item.picUrl)"
            @click="item.hyperlink && openBanner(item.hyperlink)"
          />
        </el-carousel-item>
      </el-carousel>
      <app-main :value="value" />
    </el-main>
    <el-footer height="100px">
      <div
        class="footer"
        :style="value === 'young' ? 'background: #fbefca;color: #646464' : ''"
      >
        <span>幸福课程 开启幸福之旅</span>
        <span>联系电话：021-39902142 学校地址：嘉定区嘉行公路601号 copyright©2017上海市嘉定区教育学院</span>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

import { mapGetters } from 'vuex'
import { AppMain } from './components'
import headerIcon from '@/assets/home/headerIcon.png'
import alert from '@/assets/home/alert.png'
import alert2Icon from '@/assets/home/alert2Icon.png'
import avatar from '@/assets/home/defaultAvatar.png'
import { getBanner } from '@/api/home/home'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'

export default {
  components: {
    'app-main': AppMain
  },
  data() {
    return {
      headerIcon,
      alert,
      alert2Icon,
      avatar,
      options: [{
        value: 'old',
        label: '青少版'
      // }, {
      //   value: 'young',
      //   label: '幼小版'
      }],
      value: 'old',
      imgUrls: [],
      isHome: true,
      userId: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'device', 'user', 'baseApi', 'roleID', 'theme']),
    showSwitchBtn() {
      const trueUserID = this.$store.getters.user.id
      if (this.$route.fullPath.includes('/activity') && !trueUserID) {
        return false
      } else {
        return this.user.roles.some(role => role.id === 1 || role.id === 2 || role.id === 3 || role.id === 4)
      }
    },
    showTopRightBtn() {
      const trueUserID = this.$store.getters.user.id
      if (this.$route.fullPath.includes('/activity') && !trueUserID) {
        return false
      } else {
      // return (this.userId == '1' && trueUserID == 1) || this.userId == '4' || this.userId == '3'
        return this.user.roles.some(role => role.id === 1 || role.id === 2 || role.id === 3 || role.id === 4)
      }
    }
  },
  watch: {
    $route: {
      handler(val, oldval) {
        console.log(val)
        if (val.fullPath === '/dashboard' || val.fullPath === '/grhome') {
          this.isHome = true
        } else {
          this.isHome = false
        }
        // if (val.fullPath === '/dashboard') {
        //   this.value = 'old'
        // } else if (val.fullPath === '/grhome') {
        //   this.value = 'young'
        // }
      },
      deep: true
    }
  },
  mounted() {
    this.getBanner()
  },
  created() {
    // 先检查是否在登录页
    if (this.$route.path.includes('/login')) {
      return
    }

    // 检查 token
    const token = getToken()
    if (!token) {
      location.href = '/login'
      return
    }

    // 初始化基本设置
    this.init()

    // 如果没有用户信息，则获取用户信息
    if (!this.$store.getters.user || !this.$store.getters.user.username) {
      this.$store.dispatch('GetInfo').catch(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.deleteAllCookies()
          location.href = '/login'
        })
      })
    }
  },
  methods: {
    init() {
      // 设置页面状态
      if (this.$route.fullPath === '/dashboard' || this.$route.fullPath === '/grhome') {
        this.isHome = true
      } else {
        this.isHome = false
      }

      // 获取用户信息并设置主题
      this.getUser()

      // 设置页面风格
      if (this.$route.fullPath.includes('/gr')) {
        this.value = 'young'
      } else {
        this.value = 'old'
      }
    },
    getBanner() {
      if (this.$route.fullPath.includes('/activity')) {
        return false
      }
      const params = {
        type: 1,
        pcPhone: 1
      }
      getBanner(params).then((res) => {
        this.imgUrls = res
      })
    },
    open() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.deleteAllCookies()
        localStorage.removeItem('touristUsername')
        location.href = '/login'
      })
    },
    getUser() {
      const user = this.$store.getters.user
      if (!user) {
        return
      }

      this.userId = user.id
      this.grade = user.grade

      // 设置主题
      const userid = Cookies.get('userid')
      const signUser = Cookies.get('signUser')

      if (userid === '1' || userid === '4') {
        if (signUser) {
          this.value = signUser === '1' ? 'old' : 'young'
        }
      } else {
        this.value = this.grade < 4 ? 'young' : 'old'
      }
    },
    switchTheme(theme) {
      if (theme === 'old') {
        Cookies.set('signUser', 1)
        this.$router.push('/', () => {
          location.reload()
        })
      } else {
        Cookies.set('signUser', 2)
        this.$router.push('/grhome', () => {
          location.reload()
        })
      }
    },
    openBanner(url) {
      location.href = url
    },
    deleteAllCookies() {
      const cookies = ['token', 'grade', 'userid', 'roleid', 'signUser', 'point']
      cookies.forEach(cookie => {
        Cookies.remove(cookie)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.home_page_title {
  height: 64px;
  font-weight:500;
  color:#49b1ef;
  font-size:16px;
  position: relative;
  line-height: 64px;
  text-align: center;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 32px;
    height: 4px;
    background-color:#49b1ef;
    border-radius:2px;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.home_page_title-not_select {
  color: #333;

  &::after {
    display: none;
  }
}

.home_page_title_young {
  height: 64px;
  font-weight:500;
  color:rgba(41, 198, 119, 1);
  font-size:16px;
  position: relative;
  line-height: 64px;
  text-align: center;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 32px;
    height: 4px;
    background-color:rgba(41, 198, 119, 1);
    border-radius:2px;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.home_page_title_young-not_select {
  color: #333;

  &::after {
    display: none;
  }
}

.home_page_select {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
  position: relative;

  .notify {
    height: 20px;
    margin: 0 20px;
    cursor: pointer;
  }

  .notify-point {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 52, 58, 1);
    position: absolute;
    top: calc(50% - 12px);
    right: 60px;
  }

  /deep/ .el-select {
    input {
      background: rgba(73, 177, 239, 0.1);
      color: rgba(73, 177, 239, 1);
      border-color: rgba(73, 177, 239, 1);
      font-size: 16px;
      padding-left: 12px;
    }
    width: 92px;
    border-radius:4px;
    height: 32px;

    .el-icon-arrow-up {
      color: rgba(73, 177, 239, 1);
    }
    .el-input__suffix {
      right: 0;
    }
  }

  .user-avatar {
    border-radius: 20px;
  }
}

.home_page_select_young {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
  position: relative;

  /deep/.el-button:hover {
    color: #29c677;
    background: rgba(41, 198, 119, 0.1);
    border-color:#29c677 !important;
  }
  /deep/.el-button:active {
    color: #29c677;
    background: rgba(41, 198, 119, 0.1);
    border-color:#29c677 !important;
  }
  /deep/.el-button:focus {
    color: #29c677;
    background: rgba(41, 198, 119, 0.1);
    border-color:#29c677 !important;
  }

  .notify {
    height: 20px;
    margin: 0 20px;
    cursor: pointer;
  }

  .notify-point {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 52, 58, 1);
    position: absolute;
    top: calc(50% - 12px);
    right: 60px;
  }

  /deep/ .el-select {
    input {
      background: rgba(41, 198, 119, 0.1);
      color: rgba(41, 198, 119, 1);
      border-color: rgba(41, 198, 119, 1) !important;
      font-size: 16px;
      padding-left: 12px;
    }
    width: 92px;
    border-radius:4px;
    height: 32px;

    .el-icon-arrow-up {
      color: rgba(41, 198, 119, 1);
    }
    .el-input__suffix {
      right: 0;
    }
  }

  .user-avatar {
    border-radius: 20px;
  }
}

.container {
  /deep/ .el-main {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0;
    min-height: calc(100vh - 164px);
    overflow: hidden;

    .el-carousel__arrow--right {
      right: 340px;
      background: rgba(0, 0, 0, 0.4);
    }
    .el-carousel__arrow--left {
      left: 340px;
      background: rgba(0, 0, 0, 0.4);
    }
  }
  /deep/ .el-footer {
    padding: 0;
    .footer {
      width: 100%;
      background: rgba(40, 44, 47, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      color:#ffffff;
      font-size:14px;
      gap: 21px;
      flex-direction: column;
      height: 100%;
    }
  }
}

</style>

<style lang="scss" >
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

* {
  margin: 0;
  padding: 0;
  list-style: none;
}

//分页公共样式
.myTwo {
  .el-pager li.active {
    color: #0552a0;
  }
  .el-pager li:hover {
    color: #0552a0;
  }
  .el-pager li {
    color: #358de4;
  }
  .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev {
    color: #358de4;
  }
  .el-pagination span:not([class*="suffix"]),
  .el-pagination button {
    color: #358de4;
  }
  .el-pagination__editor.el-input .el-input__inner {
    border-color: #358de4;
    color: #358de4;
  }
  .el-pagination .btn-prev,
  .el-pagination .btn-next {
    border: solid 1px #358de4;
    text-align: center;
    border-radius: 4px;
    height: 28px;
    padding: 0 8px;
    background-color: #d2e9ff;
  }
  .myTwo {
    text-align: center;
    width: 1366px;
    height: 73px;
  }
  .el-pagination {
    text-align: center;
  }
  .block {
    margin: 0 auto;
    width: 720px;
    height: 73px;
    background-color: #d2e9ff;
    border-radius: 20px;
    padding: 20px 0;
  }
  .el-pager li {
    background-color: #d2e9ff;
  }
  .el-pagination__editor.el-input .el-input__inner {
    background-color: #d2e9ff;
  }
  .el-pagination span:not([class*="suffix"]),
  .el-pagination button {
  }
}
//幼少版分页
.myTwo2 {
  .el-pager li.active {
    color: rgb(72, 116, 41);
  }
  .el-pager li:hover {
    color: rgb(72, 116, 41);
  }
  .el-pager li {
    color: rgba(128, 188, 86, 1);
  }
  .el-pager li.btn-quicknext,
  .el-pager li.btn-quickprev {
    color: rgba(128, 188, 86, 1);
  }
  .el-pagination span:not([class*="suffix"]),
  .el-pagination button {
    color: rgba(128, 188, 86, 1);
  }
  .el-pagination__editor.el-input .el-input__inner {
    border-color: rgba(128, 188, 86, 1);
    color: rgba(128, 188, 86, 1);
  }
  .el-pagination .btn-prev,
  .el-pagination .btn-next {
    border: solid 1px rgba(128, 188, 86, 1);
    text-align: center;
    border-radius: 4px;
    height: 28px;
    padding: 0 8px;
    background-color: rgb(210, 238, 190);
  }
  .myTwo2 {
    text-align: center;
    width: 1366px;
    height: 73px;
  }
  .block {
    margin: 0 auto;
    width: 720px;
    height: 73px;
    background-color: rgb(210, 238, 190);
    border-radius: 20px;
    padding: 20px 0;
  }
  .el-pager li {
    background-color: rgb(210, 238, 190);
  }
  .el-pagination__editor.el-input .el-input__inner {
    background-color: rgb(210, 238, 190);
  }
  .el-pagination {
    text-align: center;
  }
}
//蓝色选中
.background-blue-active {
  background-color: #358de4 !important;
  color: #fff !important;
}

//蓝色边框
.border-blue {
  border: 1px solid #358de4;
}

//浅蓝背景
.background-short-blue {
  background-color: #429cf5 !important;
}

//分页蓝色调

.background-page-blue {
  background-color: #d2e9ff;
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  width: 100%;
  transition: width 0.28s;
  padding: 0;
}

.hideSidebar .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
.el-radio-button__inner {
  background-color: rgba(255, 255, 255, 0);
}

</style>
