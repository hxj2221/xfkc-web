<template>
  <div class="login-page">
    <div class="login-page-mask">
      <div class="login-window">
        <!--顶部挂件-->
        <div class="top-accessory" />
        <!--  校区  -->
        <div class="school-container">
          <div class="title">校区指引</div>
          <div class="tab-bar">
            <div
              v-for="(item, index) in tabList"
              :key="index + 'tab'"
              class="tab-bar-item"
              :class="{active: currentTab === index}"
              @click="chooseTab(index)"
            >
              {{ item.name }}
            </div>
            <div class="bottom-line" :style="lineStyle" />
          </div>
          <div class="school-list">
            <div v-for="(item, index) in schoolList" :key="index + 'school'" class="school-item">
              <div class="school-info" @click="chooseSchool(item)">
                <div class="icon" />
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <div v-if="schoolList.length === 0 && !loading" class="nodata">
              暂无校区信息
            </div>
          </div>
        </div>
        <!--  登录  -->
        <div class="login-container">
          <div class="mascot">
            <el-image :src="require('@/assets/home/child.png')" alt="" />
          </div>
          <el-form ref="login" label-position="top" label-width="80px" :model="loginForm" :rules="rules" @submit.native.prevent>
            <el-form-item label="账号" prop="username">
              <el-input v-model="loginForm.username" clearable placeholder="请输入账号">
                <i slot="prefix" class="el-input__icon el-icon-user" />
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" clearable show-password placeholder="请输入密码">
                <i slot="prefix" class="el-input__icon el-icon-key" />
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="loginForm.code" clearable placeholder="请输入验证码">
                <i slot="prefix" class="el-input__icon el-icon-unlock" />
                <template slot="append">
                  <img :src="codeUrl" class="code-img" alt="" @click="getCode">
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="btn-form-item" label="">
              <el-button :loading="logining" native-type="submit" type="primary" @click="toLogin(loginForm)">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog title="游客登录" :visible.sync="showLogin" width="500px">
      <el-form ref="touristLogin" label-position="top" label-width="80px" :model="touristForm" :rules="rules">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="touristForm.code" clearable placeholder="请输入验证码">
            <i slot="prefix" class="el-input__icon el-icon-unlock" />
            <template slot="append">
              <img :src="codeUrl" class="code-img" alt="" @click="getCode">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="btn-form-item" label="" style="display: none">
          <el-button :loading="logining" native-type="submit" type="primary" @click="toLogin(touristForm, 'touristLogin')">登录</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeLogin">取 消</el-button>
        <el-button :loading="logining" type="primary" @click="toLogin(touristForm, 'touristLogin')">登 录</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="区游客登录" :visible.sync="showVLogin" width="500px"> -->
    <el-form v-show="false" ref="virtualForm" label-position="top" label-width="80px" :model="virtualForm">
      <el-form-item label="验证码" prop="code">
        <el-input v-model="virtualForm.code" clearable placeholder="请输入验证码">
          <i slot="prefix" class="el-input__icon el-icon-unlock" />
          <template slot="append">
            <img :src="codeVUrl" class="code-img" alt="" @click="getVCode">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="btn-form-item" label="" style="display: none">
        <el-button :loading="logining" native-type="submit" type="primary" @click="toLogin(virtualForm, 'virtualForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="showVLogin = false">取 消</el-button>
        <el-button :loading="logining" type="primary" @click="toLogin(virtualForm, 'virtualForm')">登 录</el-button>
      </div>
    </el-dialog> -->

    <div v-if="!isLoginView" class="before-login-page">
      <div class="mask" />
      <div class="before_logo">
        <img src="../assets/login/head.png">
      </div>
      <div class="before_title">
        <img src="../assets/login/beforetitle.png">
      </div>
      <div class="action-box">
        <div class="before_btn l_btn" @click="showLoginView">登&nbsp;录</div>
        <div class="before_btn v_btn" @click="virtualLogin">游&nbsp;客</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeImg, schoolList, selectShool } from '@/api/login'
import { encrypt } from '@/utils/rsaEncrypt'
import Cookies from 'js-cookie'
import Config from '@/settings'

export default {
  name: 'LoginPage',
  data() {
    return {
      showLogin: false,
      showVLogin: false,
      tabList: [
        { id: 0, name: '幼儿园' },
        { id: 1, name: '小学' },
        { id: 2, name: '初中' },
        { id: 3, name: '高中' }
      ],
      currentTab: 1,
      schoolList: [],
      touristForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      virtualForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      cookiePass: '',
      logining: false, // 登录中...
      loading: false, // 加载中...
      rules: {
        username: { required: true, message: '请输入账号', trigger: [] },
        password: { required: true, message: '请输入密码', trigger: [] },
        code: { required: true, message: '请输入图形验证码', trigger: [] }
      },
      touristRules: {
        code: { required: true, message: '请输入图形验证码', trigger: [] }
      },
      codeUrl: '',
      codeVUrl: '',
      redirect: '',
      isLoginView: false
    }
  },
  computed: {
    lineStyle() {
      const positionX = this.currentTab * 100 + this.currentTab * 20
      return {
        transform: `translateX(${positionX}px)`
      }
    }
  },
  created() {
    this.redirect = this.$route.query.redirect || ''
    const code = this.$route.query.code || ''
    const appId = this.$route.query.appId || ''

    if (code && appId) {
      this.$store.dispatch('LoginCode', {
        code,
        appId
      }).then(res => {
        this.logining = false
        if (res.role1.id === 5) {
          this.$message({
            message: '亲爱的家长，只有小朋友可以登录呦！',
            type: 'warning'
          })
          // break;
        } else {
          Cookies.set('grade', res.grade)
          Cookies.set('userid', res.role1.id)
          Cookies.set('roleid', res.role1.id) // 由于userid命名不合理导致的历史遗留问题，在此声明roleid 方便以后的角色逻辑判断

          if (this.redirect) {
            this.$router.push(this.redirect)
            return
          }

          // 管理员账号登录
          if (res.role1.id === 1) {
            Cookies.set('signUser', 1)
            this.$router.push({ path: '/' })
            return
          }

          // 游客登录
          if (res.role1.level === 6) {
            if (this.currentTab < 2) {
              Cookies.set('signUser', 2)
              this.$router.push({ path: '/grhome' })
            } else {
              Cookies.set('signUser', 1)
              this.$router.push({ path: '/' })
            }
            return
          }

          if (res.grade < 4) {
            Cookies.set('signUser', 2)
            this.$router.push({ path: '/grhome' })
          } else {
            Cookies.set('signUser', 1)
            this.$router.push({ path: '/' })
          }
        }
      })

      return
    }

    // 获取验证码
    this.getCode()
    // 获取学校列表
    this.getSchoolList()
  },
  methods: {
    showLoginView() {
      this.isLoginView = true
    },
    // 区游客登录（实际是拥有管理员角色的用户，除总管理员）
    async virtualLogin() {
      await this.getVCode()
      // this.showVLogin = true
      if (process.env.NODE_ENV === 'production') {
        this.virtualForm.username = 'admin445'
      } else {
        this.virtualForm.username = 'admin445'
      }
      this.virtualForm.password = 'xfkc_123456AA'
      this.toLogin(this.virtualForm, 'virtualForm')
    },
    closeLogin() {
      this.showLogin = false
      this.touristForm.username = ''
      this.touristForm.password = ''
      this.touristForm.code = ''
    },
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = res.img
        this.loginForm.uuid = res.uuid
        this.touristForm.uuid = res.uuid
      })
    },

    async getVCode() {
      await getCodeImg().then((res) => {
        this.codeVUrl = res.img
        this.virtualForm.uuid = res.uuid
      })
    },

    toLogin(form, fromName = 'login') {
      this.$refs[fromName].validate((valid) => {
        const user = {
          username: form.username,
          password: form.password,
          rememberMe: form.rememberMe,
          code: form.code,
          uuid: form.uuid
        }

        if (fromName === 'virtualForm') {
          user.noCode = true
        }

        if (fromName === '') {
          user.noCode = true
        }
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password)
        }
        if (valid) {
          this.logining = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, {
              expires: Config.passCookieExpires
            })
            Cookies.set('password', user.password, {
              expires: Config.passCookieExpires
            })
            Cookies.set('rememberMe', user.rememberMe, {
              expires: Config.passCookieExpires
            })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store
            .dispatch('Login', user)
            .then((res) => {
              this.logining = false
              if (res.role1.id === 5) {
                this.$message({
                  message: '亲爱的家长，只有小朋友可以登录呦！',
                  type: 'warning'
                })
                // break;
              } else {
                Cookies.set('grade', res.grade)
                Cookies.set('userid', res.role1.id)
                Cookies.set('roleid', res.role1.id) // 由于userid命名不合理导致的历史遗留问题，在此声明roleid 方便以后的角色逻辑判断

                if (this.redirect) {
                  this.$router.push(this.redirect)
                  return
                }

                // 管理员账号登录
                if (res.role1.id === 1) {
                  Cookies.set('signUser', 1)
                  this.$router.push({ path: '/' })
                  return
                }

                // 游客登录
                if (res.role1.level === 6) {
                  if (this.currentTab < 2) {
                    Cookies.set('signUser', 2)
                    this.$router.push({ path: '/grhome' })
                  } else {
                    Cookies.set('signUser', 1)
                    this.$router.push({ path: '/' })
                  }
                  return
                }

                if (res.grade < 4) {
                  Cookies.set('signUser', 2)
                  this.$router.push({ path: '/grhome' })
                } else {
                  Cookies.set('signUser', 1)
                  this.$router.push({ path: '/' })
                }
              }
            })
            .catch(() => {
              this.logining = false
              this.getCode()
            })
        } else {
          return false
        }
      })
    },

    chooseTab(index) {
      this.currentTab = index
      this.schoolList = []
      this.getSchoolList()
    },

    getSchoolList() {
      const params = {
        level: this.currentTab
      }
      this.loading = true
      schoolList(params).then((res) => {
        this.loading = false
        this.schoolList = res.filter(item => item.enabled)
      }).catch(() => {
        this.loading = false
      })
    },

    chooseSchool(schoolInfo) {
      this.touristForm.username = ''
      this.touristForm.password = ''

      const params = {
        deptId: schoolInfo.id
      }
      selectShool(params).then((res) => {
        if (res) {
          // 后期接口实现无需验证码直接登录
          this.touristForm.username = res.username
          this.touristForm.password = res.password
          this.showLogin = true
          this.getCode()
          return
        }

        this.$message({
          type: 'info',
          message: '该学校未对外开放'
        })
      })
    },

    handleTouristLogin(schoolInfo) {
      const params = {
        deptId: schoolInfo.id
      }
      
      selectShool(params).then((res) => {
        // 存储游客用户名
        localStorage.setItem('touristUsername', res.username)
        
        // 如果是 admin445 且访问大数据页面,拒绝访问
        if (res.username === 'admin445' && 
            (this.$route.path === '/bigData/bigData' || 
             this.$route.path === '/bigData/grbigData' ||
             this.$route.path === '/grbigData/grbigData')) {
          this.$router.push('/403')
          return
        }

        // 其他正常游客登录逻辑
        if (res.grade < 4) {
          Cookies.set('signUser', 2)
          this.$router.push({ path: '/grhome' })
        } else {
          Cookies.set('signUser', 1)
          this.$router.push({ path: '/' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

$mainColor: #0061d0;

$windowBorderRadius: 10px;

.login-page{
  position: relative;
  height: 100%;
  background: url("~@/assets/login/login.png") center;
  background-size: cover;
  width: 100%;
  overflow: auto;

  .login-page-mask{
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba($color: #000000, $alpha: 0.1);
  }

  .login-window{
    position: absolute;
    width: 800px;
    height: 450px;
    display: flex;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 10px #aaa;
    border-radius: $windowBorderRadius;
  }

  .top-accessory{
    background: #fff;
    width: 300px;
    height: 90px;
    position: absolute;
    top: -90px;
    left: 20px;
    background: url("~@/assets/login/head-white.png") no-repeat;
    background-size: contain;
  }
}

.school-container{
  flex: 1;
  background: #ffff;
  border-radius: $windowBorderRadius 0 0 $windowBorderRadius;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .title{
    padding-left: 40px;
    padding-bottom: 20px;
    line-height: 26px;
    text-align: left;
    font-size: 20px;
    color: #92b3da;
    background: url("~@/assets/login/guide.png") left top no-repeat;
    background-size: auto 26px;
  }

  .tab-bar{
    display: flex;
    justify-content: space-between;
    padding:0 10px 10px;
    border-bottom: 2px solid #f7f9fb;
    position: relative;

    .bottom-line{
      position: absolute;
      bottom: 0;
      left: 10px;
      width: 100px;
      height: 3px;
      background-color: $mainColor;
      z-index: 1;
      transition: transform .3s cubic-bezier(.645,.045,.355,1)
    }
  }

  .tab-bar-item{
    width: 100px;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    color: #d0d6de;

    &.active{
      color: $mainColor;
      font-weight: bold;
    }
  }

  .school-list{
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    .nodata{
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ff8c3a;
    }
  }

  .school-item{
    width: 50%;
    padding: 10px;
  }

  .school-info{
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #f3f3f3;
    border: 1px solid #f3f3f3;
    padding: 10px;
    background: #fcfcfc;

    .icon{
      width: 40px;
      height: 40px;
      background: url("~@/assets/login/school_icon.png");
      background-size: cover;
    }

    .name{
      padding-left: 15px;
      color: #839ab5;
    }
  }
}

.login-container{
  width: 280px;
  background: rgba($color: #f6fbff, $alpha: 0.85);
  border-radius: 0 $windowBorderRadius $windowBorderRadius 0;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  justify-content: space-between;

  .mascot{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    img{
      height: 135px;
    }
  }

  /deep/ .el-form-item{
    margin-bottom: 14px !important;
  }

  /deep/ .el-form-item__label{
    line-height: 26px;
    padding: 0;
    font-weight: normal;
    font-size: 12px;
    color: $mainColor;

    &:before{
      content: '' !important;
    }
  }

  /deep/ .el-input-group__append{
    padding: 0;
    background-color: #fff;
    .code-img{
      height: 27px;
    }
  }

  /deep/ .el-input__icon{
    color: $mainColor;
    font-size: 18px;
  }

  /deep/ .el-button--primary{
    color: #fff;
    background-color: $mainColor;
    border-color: $mainColor;
    width: 100%;
  }

  .btn-form-item{
    margin: 20px 0 !important;
  }

}

/deep/::-webkit-input-placeholder {
  color: #999;
  font-size: 12px;
}

$scrollbar: #e5f0f7;

/deep/ ::-webkit-scrollbar-thumb {
  border: none;
  background: $scrollbar;
  border-radius: 10px;
}

/deep/ ::-webkit-scrollbar-thumb:hover {
  background: $scrollbar;
}

/deep/ ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: lighten($scrollbar,85%);
  z-index: 999;
}

/deep/ ::-webkit-scrollbar-track {
  border-radius: 10px;
  background: lighten($scrollbar,85%);
}

.el-input-group__append{
  padding: 0;
  background-color: #fff;
  .code-img{
    height: 27px;
  }
}

.before-login-page{
  position: fixed;
  background: url(~@/assets/login/beforelogin.jpg) no-repeat center bottom;
  background-size: cover;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  overflow: auto;

  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    // background: rgba($color: #000000, $alpha: 0.45);
  }

  .before_logo{
    position: absolute;
    top: 10px;
    left: 10px;
    img{
      height: 60px;
    }
  }

  .before_title{
    position: absolute;
    width: 1200px;
    left: 0;
    right: 0;
    margin: auto;
    top: 50px;
    img{
      width: 1200px;
    }
  }

  .action-box{
    z-index: 2;
    position: absolute;
    border-radius: 10px;
    width: 500px;
    margin: auto;
    bottom: 100px;
    left: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 30px;

    img{
      max-width: 100%;
    }

    .before_btn{
      background: #0061d0;
      background-image: linear-gradient(180deg, #2d75c7, #0061d0);
      color: #fff;
      font-size: 14px;
      text-align: center;
      margin-bottom: 20px;
      height: 55px;
      line-height: 55px;
      border-radius: 5px;
      width: 160px;
      cursor: pointer;
      box-shadow: 0 0 15px #3c546e;
      border: 1px solid #7dabdf;
      font-size: 18px;

      &:hover{
        background-image: linear-gradient(180deg, #83b8f5, #2b84eb);
      }

      &.v_btn{
        background: #FFF;
        color: #0061d0;
        &:hover{
          background-image: linear-gradient(180deg, #f0f7ff, #b5cae2);
        }
      }
    }
  }
}
</style>
