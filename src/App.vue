<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route': {
      handler(to, from) {
        setTimeout(() => { // 避免首次获取不到window._czc
          if (window._czc) {
            const location = window.location
            const contentUrl = location.pathname + location.hash
            const refererUrl = '/'
            // 用于发送某个URL的PV统计请求，
            window._czc.push(['_trackPageview', contentUrl, refererUrl])
            window._czc.push(['_setAutoPageview', false])
          }
        }, 300)
      },
      immediate: true // 首次进入页面即执行
    }
  },
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://hm.baidu.com/hm.js?fc7ec87244382166abcc1618bdbc2e99'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  }
}
</script>
<style>
#app {
  min-width: 1366px;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}
</style>
