<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <!-- <div class="nav-menu"></div> -->
      <app-main />
      <AppFoot v-if="getAge === 'old'" />
      <grAppFoot v-if="getAge === 'young'" />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, AppFoot, grAppFoot } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    AppFoot,
    grAppFoot,
    RightPanel,
    Settings
    // TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      getAge: ''
    }
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader
    }),
    classObj() {
      return {
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    this.getuser()
  },
  mounted() {
    if (Cookies.get('theme')) {
      this.$refs.theme.theme = Cookies.get('theme')
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: Cookies.get('theme')
      })
    }
  },
  methods: {
    getuser() {
      this.$store.commit('SET_USERID', Cookies.get('userid'))
      this.$store.commit('SET_GRADE', Cookies.get('grade'))
      this.$store.commit('SET_ROLEID', Cookies.get('roleid'))
      const theme = Cookies.get('signUser') !== '1' ? 'young' : 'old'
      this.$store.commit('app/SET_THEME', theme)
      this.getAge = this.$store.state.user.grade
      if (this.getAge < 4) {
        this.getAge = 'young'
      } else {
        this.getAge = 'old'
      }
      if (Cookies.get('userid') === '1' || Cookies.get('userid') === '4' || Cookies.get('userid') === '6') {
        if (Cookies.get('signUser')) {
          var signUser = Cookies.get('signUser')
          switch (signUser) {
            case '1':
              this.getAge = 'old'
              break
            case '2':
              this.getAge = 'young'
              break
          }
        }
      }
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

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
