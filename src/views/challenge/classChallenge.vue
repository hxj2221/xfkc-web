<template>
  <div class="lesson-main">
    <crumbs />
    <div class="box">
      <div class="top">
        <div class="one">
          <div class="name_2">
            年
            <span class="zhanwei">级</span>
          </div>
          <div>
            <el-radio-group v-model="radio3">
              <el-radio-button label="全部" class="tag" />
              <el-radio-button label="一年级" class="tag" />
              <el-radio-button label="二年级" class="tag" />
            </el-radio-group>
          </div>
        </div>
        <div class="two">
          <div class="name_2">
            教
            <span class="zhanwei">师</span>
          </div>
          <div>
            <el-radio-group v-model="radio4">
              <el-radio-button label="全部" />
              <el-radio-button label="教师名1" />
              <el-radio-button label="教师名2" />
              <el-radio-button label="教师名3" />
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="box_1">
      <el-row :gutter="66">
        <el-col :span="6">
          <div class="box_01">
            <div class="topimg" />
            <div class="bottom_1">
              <div class="children">
                <div class="integral">
                  <el-image class="cup" :src="require('../../assets/challenge/good.png')" alt />
                  <div class="txt_4">{{}}</div>
                  <div class="txt_5">积分</div>
                </div>
              </div>
              <div class="title">嘉兴区八校联合挑战赛</div>
              <el-image class="lasttime" :src="require('../../assets/home/timebtn.png')" alt />
              <div class="txt">
                <div class="schoolName">2020-08-27</div>
                <div class="teacherName">12:00:00</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box_01">
            <div class="topimg" />
            <div class="bottom_1">
              <div class="children">
                <div class="integral">
                  <el-image class="cup" :src="require('../../assets/challenge/good.png')" alt />
                  <div class="txt_4">{{}}</div>
                  <div class="txt_5">积分</div>
                </div>
              </div>
              <div class="title">嘉兴区八校联合挑战赛</div>
              <el-image class="lasttime" :src="require('../../assets/home/timebtn.png')" alt />
              <div class="txt">
                <div class="schoolName">2020-08-27</div>
                <div class="teacherName">12:00:00</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box_01">
            <div class="topimg" />
            <div class="bottom_1">
              <div class="children">
                <div class="integral">
                  <el-image class="cup" :src="require('../../assets/challenge/good.png')" alt />
                  <div class="txt_4">{{}}</div>
                  <div class="txt_5">积分</div>
                </div>
              </div>
              <div class="title">嘉兴区八校联合挑战赛</div>
              <el-image class="lasttime" :src="require('../../assets/home/timebtn.png')" alt />
              <div class="txt">
                <div class="schoolName">2020-08-27</div>
                <div class="teacherName">12:00:00</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box_01">
            <div class="topimg" />
            <div class="bottom_1">
              <div class="children">
                <div class="integral">
                  <el-image class="cup" :src="require('../../assets/challenge/good.png')" alt />
                  <div class="txt_4">{{}}</div>
                  <div class="txt_5">积分</div>
                </div>
              </div>
              <div class="title">嘉兴区八校联合挑战赛</div>
              <el-image class="lasttime" :src="require('../../assets/home/timebtn.png')" alt />
              <div class="txt">
                <div class="schoolName">2020-08-27</div>
                <div class="teacherName">12:00:00</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box_01">
            <div class="topimg" />
            <div class="bottom_1">
              <div class="children">
                <div class="integral">
                  <el-image class="cup" :src="require('../../assets/challenge/good.png')" alt />
                  <div class="txt_4">{{}}</div>
                  <div class="txt_5">积分</div>
                </div>
              </div>
              <div class="title">嘉兴区八校联合挑战赛</div>
              <el-image class="lasttime" :src="require('../../assets/home/timebtn.png')" alt />
              <div class="txt">
                <div class="schoolName">2020-08-27</div>
                <div class="teacherName">12:00:00</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <Pagination />
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/crumbs.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
export default {
  name: 'MyLesson',
  components: {
    crumbs,
    Pagination
  },
  data() {
    return {
      radio3: '全部',
      radio4: '全部',
      radio5: '全部'
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.lesson-main {
  width: 1366px;
  margin: 0 auto;
}
.box {
  margin-top: 20px;
}
.top {
  width: 1366px;
  height: 126px;
  background-image: url("../../assets/achievement/top_background.png");
}
.one {
  display: flex;
  align-items: center;
  position: relative;
  top: 25px;
  left: 22px;
}
.two {
  display: flex;
  align-items: center;
  position: relative;
  top: 36px;
  left: 22px;
}
.three {
  display: flex;
  align-items: center;
  position: relative;
  top: 46px;
  left: 22px;
}
.name_1 {
  font-size: 16px;
}
.name_2 {
  font-size: 16px;
}
.zhanwei {
  margin-left: 28px;
}
/deep/ .el-radio-button__inner {
  color: #358de4;
  border: 1px solid #358de4;
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: 1px solid #358de4;
  background-color: #358de4;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #358de4;
  border-radius: 10px;
  width: 65px;
  padding: 9px 16px;
  text-align: center;
  margin-left: 17px;
}
/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 1px solid #358de4;
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
.box_1 {
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
  flex-wrap: wrap;
}
.bottom_1 {
  width: 289px;
  height: 127px;
  border: 1px solid #e6e6e6;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.children {
  margin-left: 165px;
  margin-top: -14px;
}
.title {
  font-size: 22px;
  // font-weight: bold;
  margin-left: 14px;
  margin-top: 8px;
  color: black;
}
.box_01 {
  margin-bottom: 8px;
}
.txt {
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-left: 11px;
}
.schoolName {
  font-size: 18px;
  margin-left: 5px;
  color: #242424;
}
.teacherName {
  font-size: 18px;
  margin-left: 16px;
  color: #242424;
}
.con {
  margin-top: 14px;
  margin-left: 247px;
}
.cup {
  widows: 16px;
  height: 16px;
}
.txt_4 {
  margin-left: 2px;
  color: white;
  font-size: 18px;
  line-height: 30px;
}
.txt_5 {
  margin-left: 2px;
  color: white;
  font-size: 12px;
  line-height: 30px;
}

.integral {
  padding: 0 4px;
  display: flex;
  align-items: center;
  width: 97px;
  height: 30px;
  background: linear-gradient(
    225deg,
    rgba(66, 156, 245, 1) 0%,
    rgba(0, 117, 235, 1) 100%
  );
  border-radius: 20px;
}
.topimg {
  width: 289px;
  height: 204px;
  background-image: url("../../assets/challenge/content.png");
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.lasttime {
  margin-top: 10px;
  margin-left: 11px;
}
</style>
