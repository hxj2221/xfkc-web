<template>
  <div class="main">
    <grcrumbs />
    <div class="main-content">
      <el-image class="line" :src="require('../../assets/time/line.png')" alt />
      <el-image class="light light1" :src="require('../../assets/time/light.png')" alt />
      <div class="item item1">获得校积分{{ items.schoolScore }}</div>
      <el-image class="light light2" :src="require('../../assets/time/light.png')" alt="" />
      <div class="item item2">获得区积分{{ items.areaScore }}</div>
      <el-image class="light light3" :src="require('../../assets/time/light.png')" alt="" />
      <div class="item item3">第一次注册时间 {{ items.regDate }}</div>
      <el-image class="light light4" :src="require('../../assets/time/light.png')" alt="" />
      <div class="item item4">第一次获得区成就的时间 {{ items.schoolOpDate }}</div>
      <el-image class="light light5" :src="require('../../assets/time/light.png')" alt="" />
      <div class="item item5">第一次获得校成就的时间 {{ items.areaOpDate }}</div>
    </div>
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { timeline } from '@/api/time/time'
export default {
  name: 'GrTimemachine',
  components: {
    grcrumbs
  },
  data() {
    return {
      list: [],
      items: {
        schoolScore: 0,
        areaScore: 0,
        regDate: '',
        schoolOpDate: '',
        areaOpDate: ''
      }
    }
  },
  mounted() {
    timeline()
      .then((res) => {
        res[''] = this.timeFormat(res[''])
        this.list = res

        const regDate = res['第一次注册时间']
        this.items.regDate = typeof (regDate) === 'string' ? regDate : this.timeFormat(regDate)

        const schoolOpDate = res['第一次获得校成就的时间']
        this.items.schoolOpDate = typeof (schoolOpDate) === 'string' ? schoolOpDate : this.timeFormat(schoolOpDate)

        const areaOpDate = res['第一次获得区成就的时间']
        this.items.areaOpDate = typeof (areaOpDate) === 'string' ? areaOpDate : this.timeFormat(areaOpDate)

        this.items.schoolScore = res['获得校积分']

        this.items.areaScore = res['获得区积分']
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    timeFormat(timestamp) {
      function add0(m) {
        return m < 10 ? '0' + m : m
      }
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return (
        year +
        '-' +
        add0(month) +
        '-' +
        add0(date) +
        ' ' +
        add0(hours) +
        ':' +
        add0(minutes) +
        ':' +
        add0(seconds)
      )
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.main {
  width: 1366px;
  margin: 0 auto;
  .main-content {
    position: relative;
    margin: 20px auto 49px;
    width: 1307px;
    height: 1646px;
    background: url("../../assets/time/time.png");
    background-size: 100% 100%;
    .line {
      position: absolute;
      width: 684px;
      height: 1215px;
      top: 45px;
      left: 355px;
    }
    .light1 {
      position: absolute;
      right: 264px;
      top: 241px;
      animation: scales 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
    }
    .light2 {
        position: absolute;
        right: 319px;
        top: 403px;
        animation: scales 2s infinite 0.5s cubic-bezier(0, 0, 0.49, 1.02);
    }
    .light3 {
        position: absolute;
        right: 390px;
        top: 638px;
        animation: scales 2s infinite 1s cubic-bezier(0, 0, 0.49, 1.02);
    }
    .light4 {
        position: absolute;
        right: 309px;
        top: 850px;
        animation: scales 2s infinite 1.5s cubic-bezier(0, 0, 0.49, 1.02);
    }
    .light5 {
        position: absolute;
        top: 1245px;
        right: 439px;
        animation: scales 2s infinite 2s cubic-bezier(0, 0, 0.49, 1.02);
    }
    @keyframes scales {
      0% {
        transform: scale(1);
      }
      50%,
      75% {
        transform: scale(1.2);
      }
      78%,
      100% {
        opacity: 0;
      }
    }
    .item{
        width: 200px;
        text-align: center;
        padding: 7px 15px;
        line-height: 30px;
        border-radius: 10px;
        background-color: #fff;
        opacity: 0.5;
        font-weight: bold;
        color: #002550;
    }
    .item1{
        position: absolute;
        right: 310px;
        top: 241px;
    }
    .item2{
        position: absolute;
        right: 100px;
        top: 403px;
    }
    .item3{
        position: absolute;
        right: 440px;
        top: 638px;
    }
    .item4{
        position: absolute;
        right: 359px;
        top: 850px;
    }
    .item5{
        position: absolute;
        top: 1245px;
        right: 487px;
    }
  }
}
</style>
