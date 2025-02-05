<template>
  <div class="login">
    <el-image class="head" :src="require('../assets/login/head.png')" alt />
    <!-- <img class="bottom" src="../assets/login/foot.png" alt> -->
    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        幸福课程
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>-->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <div class="person">
        <!-- <div class="selectSchool">
          <el-select
            v-model="selectSchool"
            placeholder="选择游客学校"
            @change="changeSchool(selectSchool)"
          >
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div> -->
        <div class="visitor" @click="dialogVisible=!dialogVisible">游客入口</div>
        <div class="person-icon">
          账号
          <el-image :src="require('../assets/login/person.png')" alt />
        </div>
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
        </el-input>
      </div>
      <div class="password">
        <div class="person-icon">
          密码
          <el-image :src="require('../assets/login/password.png')" alt />
        </div>
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
        </el-input>
      </div>
      <div class="code">
        <div class="person-icon">
          验证码
          <el-image :src="require('../assets/login/code.png')" alt />
        </div>
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        />
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </div>
      <div class="submit" @click="handleLogin">登录</div>
    </el-form>
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span>⋅</span>
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{
        $store.state.settings.caseNumber
      }}</a>
    </div>
    <div>
      <el-dialog
        title
        :visible.sync="dialogVisible2"
        :center="true"
        width="30%"
        :before-close="handleClose"
      >
        <div style="text-align: center; margin-top: 12px">
          <!-- <img style="heigt:158px;width:158px;" src="../assets/challenge/fail.png" alt /> -->
        </div>
        <div style="text-align: center; font-size: 22px">登录选择</div>
        <div style="text-align: center; margin-top: 12px">
          请选择你想要登陆的首页！
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="qingshao" @click="cl1">青少版</el-button>
          <!-- <el-button
            class="youshao"
            type="primary"
            @click="cl2"
          >幼小版</el-button> -->
        </span>
      </el-dialog>
    </div>
    <el-dialog
      title
      :visible.sync="dialogVisible"
      :center="true"
      width="50%"
      height="100%"
      :before-close="handleClose1"
    >
      <div style="text-align: center;" class="select-shcool">
        <el-select v-model="selectLevel" placeholder="选择游客类型" @change="getSchool(selectLevel)">
          <el-option
            v-for="item in levelList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div style="text-align: center;" class="select-shcool">
        <el-select v-model="selectSchool" placeholder="选择游客" @change="changeSchool(selectSchool)">
          <el-option
            v-for="item in schoolList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </div>
      <!-- <el-button type="primary" @click="dialogVisible = false"
          >好的</el-button
        > -->

    </el-dialog>
  </div>
</template>

<script>
import { encrypt } from '@/utils/rsaEncrypt'
import Config from '@/settings'
import { getCodeImg, schoolList, selectShool } from '@/api/login'
import Cookies from 'js-cookie'
// import Background from '@/assets/images/background.jpg'
export default {
  name: 'Login',
  data() {
    return {
      selectLevel: '',
      levelList: [
        { id: 0, name: '幼儿园' },
        { id: 1, name: '小学' },
        { id: 2, name: '初中' },
        { id: 3, name: '高中' }
      ],
      selectSchool: '',
      schoolList: [],
      dialogVisible: false,
      dialogVisible2: false,
      // Background: Background,
      codeUrl: '',
      cookiePass: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ],
        code: [
          { required: true, trigger: 'change', message: '验证码不能为空' }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // 获取验证码
    this.getCode()
    // 获取用户名密码等Cookie
    this.getCookie()
    // token 过期提示
    this.point()
    // 获取游客列表
    // this.getSchool()
  },
  methods: {
    getSchool(val) {
      const params = {
        level: val
      }
      schoolList(params).then((res) => {
        this.schoolList = res
      })
    },
    changeSchool(val) {
      this.dialogVisible = false
      const params = {
        deptId: val
      }
      selectShool(params).then((res) => {
        this.loginForm.username = res.username
        this.loginForm.password = res.password
      })
    },
    cl1() {
      var signUsera = String(Cookies.set('signUser', 1))
      signUsera.toString()
      this.$router.push({ path: '/' })
    },
    cl2() {
      var signUsera = String(Cookies.set('signUser', 2))
      signUsera.toString()
      this.$router.push({ path: '/grhome' })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleClose1(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = res.img
        this.loginForm.uuid = res.uuid
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password)
        }
        if (valid) {
          this.loading = true
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
              if (res.role1.id === 5) {
                this.$message({
                  message: '亲爱的家长，只有小朋友可以登录呦！',
                  type: 'warning'
                })
                // break;
              } else {
                Cookies.set('grade', res.grade)
                Cookies.set('userid', res.role1.id)
                if (this.redirect) {
                  this.$router.push(this.redirect)
                  return
                }
                if (res.grade < 4 && res.grade !== 0) {
                  this.$router.push({ path: '/grhome' })
                } else if (res.grade > 4) {
                  this.$router.push({ path: '/' })
                } else if (res.grade === 0) {
                  this.dialogVisible2 = true
                }
              }
            })
            .catch(() => {
              this.loading = false
              this.getCode()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    point() {
      const point = Cookies.get('point') !== undefined
      if (point) {
        this.$notify({
          title: '提示',
          message: '当前登录状态已过期，请重新登录！',
          type: 'warning',
          duration: 5000
        })
        Cookies.remove('point')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  position: relative;
  height: 100%;
  background: url("../assets/login/login.png");
  background-size: cover;
  // .selectSchool {
  //   text-align: center;
  //   padding-bottom: 25px;
  // }
  .select-shcool {
    text-align: center;
    padding-bottom: 25px;
    .el-input__inner {
      width: 445px;
      height: 44px;
      border: 1px solid #358de4;
      border-radius: 10px;
      padding-left: 80px;
    }
  }
  .visitor {
    margin: 0 auto 30px;
    color: #fff;
    width: 100px;
    padding: 15px 3px;
    border-radius: 10px;
    background-color: rgb(0, 97, 208);
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  .head {
    position: absolute;
    width: 130px;
    height: 70px;
    top: 20px;
    left: 40px;
  }
  .person {
    width: 445px;
    margin: 0 auto;
    text-align: center;
    padding-top: 441px;
    position: relative;
    z-index: 2;
    .person-icon {
      position: absolute;
      bottom: 13px;
      left: 17px;
      z-index: 2;
      font-size: 16px;
      font-weight: bold;
      color: #04509b;
      img {
        width: 16px;
        height: 13px;
        vertical-align: middle;
      }
    }
    .el-input__inner {
      width: 445px;
      height: 44px;
      border: 1px solid #358de4;
      border-radius: 10px;
      padding-left: 80px;
    }
  }
  .password {
    width: 445px;
    margin: 0 auto;
    text-align: center;
    margin-top: 24px;
    position: relative;
    z-index: 2;
    .person-icon {
      position: absolute;
      bottom: 13px;
      left: 17px;
      z-index: 2;
      font-size: 16px;
      font-weight: bold;
      color: #04509b;
      img {
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
    }
    .el-input__inner {
      width: 445px;
      height: 44px;
      border: 1px solid #358de4;
      border-radius: 10px;
      padding-left: 80px;
    }
  }
  .code {
    margin: 0 auto;
    margin-top: 24px;
    width: 445px;
    display: flex;
    position: relative;
    z-index: 2;
    .person-icon {
      position: absolute;
      bottom: 13px;
      left: 17px;
      z-index: 2;
      font-size: 16px;
      font-weight: bold;
      color: #04509b;
      img {
        width: 16px;
        height: 13px;
        vertical-align: middle;
      }
    }
    .el-input__inner {
      width: 299px;
      height: 44px;
      border: 1px solid #358de4;
      border-radius: 10px;
      padding-left: 95px;
    }
    .login-code {
      width: 164px;
      display: inline-block;
      text-align: right;
    }
  }
  .submit {
    position: relative;
    width: 248px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 18px;
    background-image: linear-gradient(#0453a0, #044480);
    border-radius: 20px;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    margin-top: 54px;
    cursor: pointer;
    z-index: 3;
  }
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.qingshao {
  background-color: #0453a0 !important;
  color: white;
}
.youshao {
  background-color: #2d8814 !important;
  border-color: #2d8814 !important;
}
</style>
