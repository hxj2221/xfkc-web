<template>
  <div>
    <div class="grachievement">
      <grcrumbs />
      <div class="top">
        <div class="one">
          <div class="name_1">检索类型</div>
          <div>
            <el-radio-group v-model="radio3" @change="selectChange">
              <el-radio-button label="1" class="tag">平台</el-radio-button>
              <el-radio-button label="2" class="tag">学校</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="box">
        <el-row :gutter="68">
          <el-col v-for="(item) in pointList" :key="item.id" :span="6">
            <div class="mar_bottom" @click="changeDetail(item.id)">
              <el-image
                class="one1"
                :src="require('../../assets/achievement/one.png')"
                :style="{'backgroundImage': 'url(' + $comm.url(item.badgeUrl) + ')'}"
                alt
              />
              <div class="one2">
                <div class="box_txt">{{ item.name }}</div>
                <div class="box_txt2">
                  <el-image class="sun" :src="require('../../assets/achievement/sun.png')" alt />
                  <div>已有{{ item.numberOfPeople }}人完成</div>
                  <el-image
                    class="success"
                    :src="require('../../assets/achievement/success.png')"
                    alt
                  />
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="height:100px" />
      <div class="myTwo2">
        <div class="block">
          <el-pagination
            :slot="33"
            :current-page.sync="currentPage3"
            :page-size="pageSize"
            :prev-text="'上一页'"
            :next-text="'下一页'"
            layout="slot,prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div style="height:69px" />
    </div>
    <!-- <img class="bottomimage" src="../../assets/achievement/bottomimage.png" alt=""> -->
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
// import grPagination from '@/components/Pagination/grPagination.vue'
import { myacList } from '@/api/achievement/achievement'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  components: {
    grcrumbs
    // grPagination
  },
  data() {
    return {
      radio3: 1,
      pointList: [],
      total: 0,
      currentPage3: 1,
      pageSize: 8
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi']),
    headers() {
      return {
        Authorization: getToken()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeDetail(id) {
      this.$router.push({ path: '/grachievement/grachievedetail?id=' + id })
    },
    selectChange() {
      this.radio3 = Number(this.radio3)
      console.log(this.radio3)
      this.getList()
    },
    getList() {
      const params = {
        type: this.radio3,
        page: this.currentPage3 - 1,
        size: this.pageSize,
        sort: ''
      }
      myacList(params)
        .then(res => {
          console.log(res)
          this.pointList = res.content
          console.log(this.pointList)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSizeChange() {
      this.getAchive()
    },
    handleCurrentChange() {
      this.getAchive()
    }
  }
}
</script>

<style lang="scss" scoped>
.grachievement {
  width: 1366px;
  margin: 0 auto;
  overflow: hidden;
}
.top {
  margin-bottom: 42px;
  margin-top: 20px;
  width: 1366px;
  height: 72px;
  background-image: url("../../assets/achievement/grbg.png");
  background-repeat: no-repeat;
}
.one {
  display: flex;
  align-items: center;
  position: relative;
  top: 25px;
  left: 22px;
}

.name_1 {
  font-size: 16px;
}
/deep/ .el-radio-button__inner {
  color: rgba(45, 136, 21, 1);
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  background-color: rgba(45, 136, 21, 1);
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 10px;
  width: 87px;
  padding: 9px 16px;
  text-align: center;
  margin-left: 17px;
}
/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-button--mini {
  width: 83px;
  height: 34px;
  font-size: 16px;
  color: #358de4;
  background-color: rgba(255, 255, 255, 0);
  border: 1px rgba(45, 136, 21, 1) solid;
  border-radius: 10px;
}
/deep/ .el-table .cell {
  height: 114px;
  line-height: 114px;
  font-size: 18px;
}
.one1 {
  width: 287px;
  height: 160px;
  // background-image: url("../../assets/achievement/detail.png");
  background-size: 287px 160px;
  background-repeat: no-repeat;
}
.one2 {
  width: 288px;
  height: 90px;
  background-image: url("../../assets/achievement/two.png");
}
.box_txt {
  font-size: 21px;
  margin-left: 23px;
}
.sun {
  width: 26px;
  height: 26px;
  margin: 0 4px 0 20px;
}
.box_txt2 {
  display: flex;
  // align-items: center;
  margin-top: 8px;
}
.success {
  width: 68px;
  height: 68px;
  margin-top: -40px;
  margin-left: 20px;
}
.box_txt2 div {
  font-size: 15px;
  color: rgba(36, 36, 36, 1);
}
.mar_bottom {
  margin-bottom: 72px;
}
.bottomimage {
  width: 1920px;
  position: absolute;
  bottom: 0;
  z-index: -1;
}
</style>
