import { login, getInfo, logout, loginCode, getPasswordRemind } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Notification } from 'element-ui'
// import { startState } from 'codemirror'

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    roleId: 0,
    userId: '',
    grade: '',
    // 第一次加载菜单时用到
    loadMenus: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, user) => {
      state.userId = user
    },
    SET_GRADE: (state, grade) => {
      state.grade = grade
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLEID: (state, roleid) => {
      state.roleId = +roleid
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid, userInfo.noCode).then(res => {
          setToken(res.token, rememberMe)
          commit('SET_TOKEN', res.token)
          setUserInfo(res.user, commit)
          // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          commit('SET_LOAD_MENUS', true)
          if (res.role1.id !== 5) {
            getPasswordRemind().then((pwdRes) => {
              if (pwdRes && pwdRes.flag) {
                Notification.warning({
                  title: pwdRes.msg
                })
              }
            })
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登陆code
    LoginCode({ commit }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        loginCode(userInfo.code, userInfo.appId).then(res => {
          setToken(res.token, rememberMe)
          commit('SET_TOKEN', res.token)
          setUserInfo(res.user, commit)
          // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          commit('SET_LOAD_MENUS', true)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          setUserInfo(res, commit)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          logOut(commit)
          resolve()
        }).catch(error => {
          logOut(commit)
          reject(error)
        })
      })
    },

    updateLoadMenus({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res.user)
}

export default user
