<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <div class="navbar_center">

      <template v-if="userId == 6">
        <div class="left-menu">
          <span class="ykColor" @click="open">亲爱的游客</span>
        </div>
        <div class="menu-right">
          <div class="visitor-to-login" @click="logout">
            <i class="el-icon-user-solid" />
            登录
          </div>
        </div>
      </template>
      <template v-else>
        <!-- <sidebar class="sidebar-container" /> -->
        <div v-if="userId != 6" class="left-menu">
          <el-dropdown
            class="avatar-container left-menu-item hover-effect"
            trigger="click"
          >
            <div class="avatar-wrapper">
              <div class="avatar-left-text">亲爱的，</div>
              <!-- <el-image
                :src="
                  user.avatarName
                    ? baseApi + '/avatar/' + user.avatarName
                    : Avatar
                "
                class="user-avatar"
              /> -->
              <el-avatar class="user-avatar" shape="circle" icon="el-icon-user-solid" :size="25" :src="user.avatarName ? baseApi + '/avatar/' + user.avatarName : Avatar" />
              <!-- <i class="el-icon-caret-bottom" /> -->
              <div class="avatar-left-text">{{ user.nickName }}</div>
              <el-image
                v-if="$store.getters.theme === 'old'"
                class="ring"
                :src="require('../../assets/nav/ring.png')"
                alt
                @click.stop="changeUrl('message')"
              />
              <el-image
                v-if="$store.getters.theme === 'young'"
                class="ring"
                :src="require('../../assets/nav/ring.png')"
                alt
                @click.stop="changeUrl('grmessage')"
              />
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link v-if="$store.getters.theme === 'old' && userId === '2'" to="/user/time">
                <el-dropdown-item>时光机</el-dropdown-item>
              </router-link>
              <router-link v-if="$store.getters.theme === 'young' && userId === '2'" to="/user/grtime">
                <el-dropdown-item>时光机</el-dropdown-item>
              </router-link>
              <router-link to="/user/center">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <span style="display: block" @click="open">
                <el-dropdown-item divided>退出登录0</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 区管理员、校管理员、老师才会有切换功能 -->
          <div v-if="showSwitchBtn" class="switch-action">
            <div>切换至</div>
            <!-- <div v-if="theme === 'old'" class="switch-btn green" @click="switchTheme('young')">幼小版</div> -->
            <div v-if="theme === 'young'" class="switch-btn blue" @click="switchTheme('old')">青少版</div>
          </div>
        </div>

        <div v-if="$store.getters.theme === 'old'" class="menu-right">
          <ul class="menu-list">
            <li v-if="userId === '2'" @click="changeUrl('mylesson')">
              <el-image :src="require('../../assets/nav/admlesson.png')" style="height:15px" alt /> 我的课程
            </li>
            <li v-if="userId === '2'" @click="changeUrl('mychanlenge')">
              <el-image :src="require('../../assets/nav/admchallen.png')" style="height:15px" alt /> 我的挑战
            </li>
            <li v-if="userId === '2'" @click="changeUrl('achievement')">
              <el-image :src="require('../../assets/nav/achiv.png')" style="height:15px" alt /> 我的成就
            </li>
            <li v-if="userId === '3'" @click="changeUrl('myclass')">
              <el-image :src="require('../../assets/nav/myclass.png')" style="height:15px" alt /> 我的班级
            </li>
            <li
              v-if="showTopRightBtn"
              @click="changeUrl('chanlange')"
            >
              <el-image :src="require('../../assets/nav/admchallen.png')" alt style="height:15px" /> 挑战管理
            </li>
            <li
              v-if="showTopRightBtn"
              @click="changeUrl('lesson')"
            >
              <el-image :src="require('../../assets/nav/admlesson.png')" style="height:15px" alt /> 课程管理
            </li>
          <!-- <li
          v-if="userId === '1' || userId === '4'"
          @click="changeUrl('mylesson')"
        >
          <el-image :src="require('../../assets/nav/enter.png')" style="height:15px" alt/> 进入后台
        </li> -->
          </ul>
        </div>
        <div v-if="$store.getters.theme === 'young'" class="menu-right">
          <ul class="menu-list">
            <li v-if="userId === '2'" @click="changeUrl('grmylesson')">
              <el-image :src="require('../../assets/nav/admlesson.png')" style="height:15px" alt /> 我的课程
            </li>
            <li v-if="userId === '2'" @click="changeUrl('grmychanlenge')">
              <el-image :src="require('../../assets/nav/admchallen.png')" style="height:15px" alt /> 我的挑战
            </li>
            <li v-if="userId === '2'" @click="changeUrl('grachievement')">
              <el-image :src="require('../../assets/nav/achiv.png')" style="height:15px" alt /> 我的成就
            </li>
            <li v-if="userId === '3'" @click="changeUrl('grmyClass')">
              <el-image :src="require('../../assets/nav/myclass.png')" style="height:15px" alt /> 我的班级
            </li>
            <li
              v-if="showTopRightBtn"
              @click="changeUrl('admchanlenge')"
            >
              <el-image :src="require('../../assets/nav/admchallen.png')" style="height:15px" alt /> 挑战管理
            </li>
            <li
              v-if="showTopRightBtn"
              @click="changeUrl('admlesson')"
            >
              <el-image :src="require('../../assets/nav/admlesson.png')" style="height:15px" alt /> 课程管理
            </li>
          <!-- <li
          v-if="userId === '1' || userId === '4'"
          @click="changeUrl('mylesson')"
        >
          <el-image :src="require('../../assets/nav/enter.png')" style="height:15px" alt/> 进入后台
        </li> -->
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import Avatar from '@/assets/images/avatar.png'
// import Sidebar from './Sidebar'

export default {
  // components: {
  //   Sidebar
  // },
  data() {
    return {
      Avatar: Avatar,
      dialogVisible: false,
      userId: '',
      grade: '',
      selectAge: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'device', 'user', 'baseApi', 'roleID', 'theme']),
    showSwitchBtn() {
      return this.roleID === 1 || this.roleID === 3 || this.roleID === 4
    },
    showTopRightBtn() {
      const trueUserID = this.$store.getters.user.id
      return (this.userId === '1' && trueUserID === 1) || this.userId === '4' || this.userId === '3'
    },
    show: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.userId = this.$store.state.user.userId
      this.grade = this.$store.state.user.grade
      if (this.grade < 4) {
        this.selectAge = 'young'
      } else {
        this.selectAge = 'old'
      }
      if (Cookies.get('userid') === '1' || Cookies.get('userid') === '4') {
        if (Cookies.get('signUser')) {
          var signUser = Cookies.get('signUser')
          switch (signUser) {
            case '1':
              this.selectAge = 'old'
              break
            case '2':
              this.selectAge = 'young'
              break
          }
        }
      }
    },
    changeUrl(val) {
      switch (val) {
        case 'mylesson':
          this.$router.push({
            path: '/lesson/mylesson'
          })
          break
        case 'mychanlenge':
          this.$router.push({
            path: '/challenge/challenge'
          })
          break
        case 'achievement':
          this.$router.push({
            path: '/myAchievement/myAchievement'
          })
          break
        case 'grachievement':
          this.$router.push({
            path: '/grmyAchievement/grmyAchievement'
          })
          break
        case 'chanlange':
          this.$router.push({
            path: '/challenge/admchallenge'
          })
          break
        case 'admchanlenge':
          this.$router.push({
            path: '/grchallenge/gradmChallenge'
          })
          break
        case 'myclass':
          this.$router.push({
            path: '/lesson/myclass'
          })
          break
        case 'grmyClass':
          this.$router.push({
            path: '/grlesson/grmyClass'
          })
          break
        case 'lesson':
          this.$router.push({
            path: '/lesson/admclass'
          })
          break
        case 'message':
          this.$router.push({
            path: '/message/message'
          })
          break
        case 'admlesson':
          this.$router.push({
            path: '/grlesson/gradmlesson'
          })
          break
        case 'grmychanlenge':
          this.$router.push({
            path: '/grchallenge/grchallenge'
          })
          break
        case 'grmessage':
          this.$router.push({
            path: '/grmessage/grmessage'
          })
          break
        case 'grmylesson':
          this.$router.push({
            path: '/grmylesson/grmylesson'
          })
          break
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    open() {
      console.log('this.$route.fullPath', this.$route)
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
        location.reload()
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #304156;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .navbar_center {
    max-width: 1366px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .menu-right {

      .menu-list {
        // float: right;
        // display: inline-block;
        vertical-align: top;
        li {
          // margin-left: auto;
          height: 50px;
          line-height: 50px;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          margin-left: 52px;
          cursor: pointer;
          display: inline-block;
          img {
            vertical-align: middle;
          }
        }
      }
    }
  }

  .sidebar-container {
    float: right;
    font-weight: 700;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .left-menu {
    display: inline-flex;
    align-items: center;
    height: 100%;

    &:focus {
      outline: none;
    }

    .left-menu-item {
      height: 100%;
      display: inline-block;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      font-weight: 700;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;

        .ring {
          width: 28px;
          height: 34px;
        }

        .user-avatar {
          cursor: pointer;
          width: 25px;
          height: 25px;
          margin-top: 8px;
          border-radius: 10px;
        }

        .avatar-left-text {
          color: #fff;
          font-size: 14px;
          line-height: 40px;
          margin: 0 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.ykColor {
  color: white;
  cursor: pointer;
}

.switch-action{
  color: #fff;
  display: inline-flex;

  .switch-btn{
    padding-left: 5px;
    font-weight: bold;
    cursor: pointer;

    &.green{
      color: #7ddc55;
      text-decoration: underline;
    }

    &.blue{
      color: #83c6ff;
      text-decoration: underline;
    }
  }

}

.visitor-to-login{
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}
</style>
