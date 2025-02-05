<template>
  <div class="myOne">
    <div class="ball" />
    <el-breadcrumb style="margin-left:13px;" class="app-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item) in levelList" :key="item.path">
        <router-link :to="item.redirect||item.path">{{ navtitle(item.meta) }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    navtitle() {
      return function(meta) {
        console.log(meta)
        let viewTitle = meta.title
        if (meta.title === '领衔校') {
          const schoolmap = ['基地校', '领衔校', '一般项目校', '重点校']
          const index = isNaN(+this.$route.query.id) ? 1 : +this.$route.query.id
          viewTitle = schoolmap[index]
        }
        return viewTitle
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb()
    }
  },
  mounted() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== '首页') {
        matched = [{ path: '/grhome', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ball {
  width: 9px;
  height: 9px;
  background-color: rgba(45, 136, 21, 1);
  border-radius: 50%;
  .el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
 .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover{
   color: rgba(45, 136, 21, 1);
 }
}
.myOne {
  display: flex;
  align-items: center;
}
</style>
