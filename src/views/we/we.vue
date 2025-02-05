<template>
  <div class="aboutUs">
    <crumbs />
    <div class="box_aboutus">
      <div class="box_title">关于我们</div>
      <div class="box_title1">幸福课程欢迎合作！联系方式见下方“客服服务”与“商务合作”。</div>
      <div class="bot_box">
        <div>
          <div class="kefu">客服服务</div>
          <div>联系电话：021-39902142</div>
          <div class="add">联系地址：上海市嘉定区嘉行公路601号</div>
          <div class="hezuo">商务合作</div>
          <div class="mail">联系人：林先生</div>
          <div>E-mail：bd@modao.cc</div>
        </div>
        <el-image class="map" :src="require('../../assets/home/map.png')" alt="" />
      </div>
    </div>
    <el-image class="child" :src="require('../../assets/home/child.png')" alt="" />
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/crumbs.vue'
export default {
  components: {
    crumbs
  }
}
</script>

<style>
.aboutUs{
  width: 1366px;
  margin: 0 auto;
}
.box_aboutus{
  margin-top: 23px;
  padding: 47px 140px 215px 140px;
  background-color: rgba(199, 225, 251, 1);
  border-radius: 20px;
}
.box_title{
  font-size: 22px;
  text-align: center;
}
.box_title1{
  margin-top: 60px;
}
.map{
  width: 578px;
  height: 328px;
}
.bot_box{
  display: flex;
  justify-content:space-between;
  padding-top:90px;
}
.kefu{
  font-size: 22px;
  margin-bottom: 22px;
}
.hezuo{
  font-size: 22px;
}
.add{
  margin-top: 8px;
  margin-bottom: 59px;
}
.mail{
  margin-top: 22px;
  margin-bottom: 8px;
}
.child{
  width: 308px;
  height: 210px;
  margin-top: -127px;
  float:right;
}
</style>
