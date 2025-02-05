<template>
  <div class="helpCenter">
    <crumbs />
    <div class="help_box">
      <div class="box_title">帮助中心</div>
      <!-- <div class="nav">
          <div :class="help1===0? 'sty1' : 'sty2'" @click="help(v)">帮助中心</div>
          <div :class="help2===1? 'sty1' : 'sty2'" @click="help(v)">我要咨询</div>
      </div> -->
      <div class="box_title1">1.如何联系幸福课程？</div>
      <div class="box_title2">幸福课程联系电话123544588</div>
      <div class="box_title1">2.如何加入幸福课程？</div>
      <div class="box_title2">入幸福课程方法</div>
    </div>
    <el-image class="child" :src="require('../../assets/home/child.png')" alt="" />
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/crumbs.vue'
export default {
  components: {
    crumbs
  },
  data() {
    return {
      help1: 0,
      help2: 0
    }
  },
  methods: {

  }
}
</script>

<style>
.helpCenter {
  width: 1366px;
  margin: 0 auto;
}
.help_box {
  text-align: center;
  margin-top: 23px;
  padding: 47px 140px 215px 140px;
  background-color: rgba(199, 225, 251, 1);
  border-radius: 20px;

}
.box_title{
  font-size: 22px;
  text-align: center;
  margin-bottom: 50px;
}
.box_title1{
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 20px;
}
.box_title2{
  margin-bottom: 40px;
}
.sty1{
  width: 90px;
  font-size: 22px;
  /* border-bottom:2px solid rgba(4, 83, 160, 1); */
}
.sty2{
  width: 90px;
  font-size: 22px;
  border-bottom:2px solid rgba(4, 83, 160, 1);
}
.child{
  width: 308px;
  height: 210px;
  margin-top: -127px;
  float:right;
}
</style>
