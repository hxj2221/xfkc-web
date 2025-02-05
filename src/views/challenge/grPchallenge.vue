<template>
  <div class="grPchallenge">
    <grcrumbs />
    <div class="big_box">
      <!-- 挑战标题 -->
      <div>
        <div class="box_title">
          <el-image class="title_img" :src="require('../../assets/challenge/grpTitle.png')" alt />
          <div class="p_title">挑战标题</div>
        </div>
        <div>
          <el-input
            v-model="textarea"
            class="inp"
            type="textarea"
            placeholder="请输入标题，不超过50字"
            maxlength="50"
          />
        </div>
      </div>
      <!-- 挑战头图 -->
      <div class="box_1">
        <div class="box_title">
          <el-image class="title_img" :src="require('../../assets/challenge/grpimage.png')" alt />
          <div class="p_title">挑战头图</div>
        </div>
        <div class="upImg">
          <div class="uploadimage">
            <el-upload
              :action="baseApi+'/api/localStorage/upload'"
              list-type="picture-card"
              :headers="headers"
              :show-file-list="false"
              :on-success="getUrl"
              :auto-upload="true"
              :on-error="handleError"
            >
              <i class="el-icon-plus" />
              <el-image
                v-if="dialogImageUrl"
                class="load"
                type="primary"
                :src="$comm.url(dialogImageUrl)"
                alt
              />
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog> -->
          </div>
          <div class="btn">
            <div slot="tip" class="el-upload__tip">支持文件格式 .jpg / .png，建议尺寸比例（3：2）</div>
          </div>
        </div>
      </div>
      <!-- 挑战截止时间 -->
      <div class="box_1">
        <div class="box_title">
          <el-image class="title_img" :src="require('../../assets/challenge/grtime.png')" alt />
          <div class="p_title">挑战截止时间</div>
        </div>
        <div class="checkTime">
          <div class>
            <span class="demonstration" />
            <el-date-picker
              v-model="value1"
              value-format="timestamp"
              type="datetime"
              placeholder="选择日期时间"
              @change="getTime"
            />
          </div>
        </div>
      </div>
      <!-- 挑战奖励 -->
      <div class="box_1">
        <div class="box_title">
          <el-image class="title_img" :src="require('../../assets/challenge/grpReward.png')" alt />
          <div class="p_title">挑战奖励</div>
        </div>
      </div>
      <div class="bgsize">
        <div class="bgsize_1">
          <el-image :src="require('../../assets/challenge/grlist.png')" alt />
          <div class="list_name_1">积分奖励</div>
          <div v-if="getAge>0 || getAge<0" class="list_name_2">积分奖励由校管理员统一设置</div>
          <div v-if="getAge==0" class="list_name_2">积分奖励可自行设置</div>
        </div>
        <div v-if="getAge>0 || getAge<0" class="fen">{{ teacherIntegral }}积分</div>
        <el-input v-model="integral" oninput="value=value.replace(/[^\d]/g,'')" class="jifenkuang" placeholder="请输入整数如5、13等" />
        <div class="bgsize_1">
          <el-image :src="require('../../assets/challenge/grlist.png')" alt />
          <div class="list_name_1">成就奖励</div>
          <div class="list_name_2">成就奖励为非必选项</div>
        </div>
        <div class="chengjiu">
          <el-select v-model="value" placeholder="请选择成就" @change="getId()">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <!-- 挑战权限 -->
      <div class="box_1">
        <div class="box_title">
          <el-image class="title_img" :src="require('../../assets/challenge/grpJurisdiction.png')" alt />
          <div class="p_title">挑战权限</div>
        </div>
      </div>
      <div class="bgsize">
        <!-- <div class="bgsize_1">
          <img src="../../assets/challenge/grlist.png" alt />
          <div class="list_name_1">挑战班级</div>
        </div>
        <div class="Pclass">
          <el-checkbox-group v-model="checkboxGroup1">
            <el-checkbox-button v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox-button>
          </el-checkbox-group>
        </div>-->
        <div class="bgsize_1">
          <el-image :src="require('../../assets/challenge/grlist.png')" alt />
          <div class="list_name_1">挑战审核</div>
        </div>
        <div class="chengjiu">
          <el-select v-model="value3" placeholder="请选择审核者">
            <el-option
              v-for="item in teacherlist"
              :key="item.value"
              :label="item.label3"
              :value="item.value3"
            />
          </el-select>
        </div>
      </div>
      <!-- 任务目录 -->
      <div class="box_1">
        <div class="box_title">
          <el-image class="title_img" :src="require('../../assets/challenge/grtaskDirectory.png')" alt />
          <div class="p_title">任务目录</div>
        </div>
      </div>
      <div class="bgsize">
        <!-- <div class="bgsize_1">
          <img src="../../assets/challenge/grlist.png" alt>
          <div class="list_name_1">挑战目标</div>
        </div> -->
        <!-- <div class="inp_title">
          <el-input
            v-model="textarea2"
            class="inp"
            type="textarea"
            placeholder="请输入标题，不超过50字"
            maxlength="50"
          />
        </div> -->
        <div class="bgsize_1">
          <el-image :src="require('../../assets/challenge/grlist.png')" alt />
          <div class="list_name_1">完成条件</div>
        </div>
        <div class="chengjiu1">
          <el-input
            v-model="textarea3"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            maxlength="255"
          />
        </div>
      </div>
      <!-- 挑战介绍 -->
      <div class="box_1">
        <div class="box_title">
          <el-image class="title_img" :src="require('../../assets/challenge/grpDetial.png')" alt />
          <div class="p_title">挑战介绍</div>
        </div>
      </div>
      <div class="bgsize">
        <div class="chengjiu1">
          <el-input
            v-model="textarea4"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            maxlength="255"
          />
        </div>
      </div>
      <!-- 保存发布 -->
      <div class="box_1">
        <div class="box_title">
          <el-image class="title_img" :src="require('../../assets/challenge/grpTitle.png')" alt />
          <div class="p_title">{{ detailId?'修改发布':'保存发布' }}</div>
        </div>
      </div>
      <div class="bgsize">
        <div class="bgsize_1">
          <el-radio v-model="radioSave" label="1">{{ detailId?'修改':'保存' }}</el-radio>
        </div>
        <div class="bgsize_1">
          <el-radio v-model="radioSave" label="2">{{ detailId?'修改并发布':'保存并发布' }}</el-radio>
        </div>
      </div>

      <div class="bimg">
        <div v-if="!detailId" class="release" @click="toVerify('save')">保存</div>
        <div v-if="detailId" class="release" @click="toVerify('edit')">修改</div>
        <!-- <div class="release" @click="upPchallenge">发布</div> -->
        <!-- <img src="../../assets/challenge/save.png" alt="">
        <img src="../../assets/challenge/release.png" alt="">-->
      </div>
      <el-dialog
        title
        :visible.sync="dialogVisible1"
        :center="true"
        width="30%"
        :before-close="handleClose"
      >
        <div style="text-align: center;margin-top:12px;">
          <el-image style="heigt:158px;width:158px;" :src="require('../../assets/challenge/success.png')" alt />
        </div>
        <div style="text-align: center;margin-top:12px;">{{ saveText }}</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="toQuit">好 的</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
const cityOptions = ['一班', '二班', '三班', '四班']
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import Cookies from 'js-cookie'
import {
  getChallenge,
  getList,
  upPchallenge,
  getChallengeDetail,
  saveChallenge,
  getIntegralList
} from '@/api/challenge/challengeDetail'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { Notification } from 'element-ui'
export default {
  components: {
    grcrumbs
  },
  data() {
    return {
      saveText: '保存成功',
      radioSave: '1',
      detailId: '',
      dialogVisible1: false,
      teacherIntegral: '',
      integral: null,
      id: '',
      achievementId: '',
      label: '',
      endTime: '',
      textarea: '',
      value1: '',
      options: [],
      value: '',
      teacherlist: [
        {
          value3: 0,
          label3: '自己'
        },
        {
          value3: 1,
          label3: '家长'
        }
      ],
      value3: '',
      checkboxGroup1: ['一班'],
      cities: cityOptions,
      textarea2: '',
      textarea3: '',
      textarea4: '',
      dialogVisible: false,
      dialogImageUrl: '',
      getAge: '',
      roleId: 0
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
    this.roleId = Number(this.$store.state.user.userId)
    this.getUser()
    this.detailId = this.$route.query.id
    this.getList()
    if (this.detailId) {
      this.getChallengeDetail()
    }
    if (this.roleId !== 4 && this.roleId !== 1) {
      this.getIntegralList()
    }
  },
  methods: {
    getIntegralList() {
      const params = {
      }
      getIntegralList(params).then((res) => {
        this.teacherIntegral = res
      })
    },
    getUser() {
      this.$store.commit('SET_GRADE', Cookies.get('grade'))
      this.getAge = this.$store.state.user.grade
    },
    getChallengeDetail() {
      const data = {
        id: this.detailId,
        studentId: 0
      }
      getChallengeDetail(data).then(res => {
        if (this.roleId === 1) {
          this.integral = res.challengeDto.rewardPoints
        }
        this.textarea = res.challengeDto.challengeName
        this.dialogImageUrl = res.challengeDto.picUrl
        this.value1 = res.challengeDto.endTime
        this.value3 = res.challengeDto.checkPerson
        this.textarea3 = res.challengeDto.completedCondition
        this.textarea4 = res.challengeDto.introduction
        this.value = res.challengeDto.achievementId
      })
    },
    // 发布
    upPchallenge(id) {
      const params = {
        challengeId: id
      }
      upPchallenge(params).then(res => {
        this.dialogVisible1 = true
      })
    },
    getList() {
      const params = {}
      getList(params).then(res => {
        this.options = res
      })
    },
    getId() {
      this.achievementId = this.value
    },
    getTime() {
      this.endTime = this.value1
    },
    // 验证
    toVerify(mesage) {
      if (!this.textarea) {
        Notification.error({
          title: '请输入挑战标题'
        })
        return
      }
      if (!this.dialogImageUrl) {
        Notification.error({
          title: '请上传挑战头图'
        })
        return
      }
      if (!this.value1) {
        Notification.error({
          title: '请选择挑战截止时间'
        })
        return
      }
      if (!this.integral && this.roleId === 4) {
        Notification.error({
          title: '请设置积分奖励'
        })
        return
      }

      if (this.value3 == null) {
        Notification.error({
          title: '请选择审核者'
        })
        return
      }

      if (!this.textarea3) {
        Notification.error({
          title: '请输入完成条件'
        })
        return
      }
      if (!this.textarea4) {
        Notification.error({
          title: '请输入挑战介绍'
        })
        return
      }

      if (mesage === 'save') {
        this.upChallenge()
      } else {
        this.upChallenge2()
      }
    },
    // 保存
    upChallenge() {
      const params = {
        achievementId: this.achievementId,
        challengeName: this.textarea,
        completedCondition: this.textarea3,
        introduction: this.textarea4,
        picUrl: this.dialogImageUrl,
        rewardPoints: this.integral,
        checkPerson: this.value3,
        endTime: this.endTime
      }
      getChallenge(params).then(res => {
        if (res.id) {
          if (this.radioSave === '1') {
            this.saveText = '保存成功!'
            this.dialogVisible1 = true
          } else {
            this.saveText = '保存并发布成功!'
            this.upPchallenge(res.id)
          }
        } else {
          alert('必填项不能为空')
        }
      })
    },
    // 修改
    upChallenge2() {
      const params = {
        id: this.detailId,
        achievementId: this.value,
        challengeName: this.textarea,
        completedCondition: this.textarea3,
        introduction: this.textarea4,
        picUrl: this.dialogImageUrl,
        rewardPoints: this.integral ? this.integral : null,
        checkPerson: this.value3,
        endTime: this.value1
      }
      saveChallenge(params).then(res => {
        if (this.radioSave === '1') {
          this.saveText = '修改成功!'
          this.dialogVisible1 = true
        } else {
          this.saveText = '修改并发布成功!'
          this.upPchallenge(this.detailId)
        }
      })
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    getUrl(file) {
      this.dialogImageUrl = file.path
      // console.log(file.path)
    },
    handleError(response) {
      if (response.status === 400) {
        Notification.error({
          title: '图片大小不能超过6MB'
        })
      }
    },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url
    //   console.log(file.url)
    //   this.dialogVisible = true
    // },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done(
            this.$router.push({ path: '/grchallenge/gradmchallenge' })
          )
        })
        .catch(_ => {})
    },
    toQuit() {
      this.dialogVisible1 = false
      this.$router.push({ path: '/grchallenge/gradmchallenge' })
    }
  }
}
</script>

<style>
.grPchallenge {
  width: 1366px;
  margin: 0 auto;
  overflow: hidden;
}
.tutu {
  margin-top: 8px;
  margin-left: 8px;
  width: 148px;
  height: 148px;
  /* margin-top: -148px; */
}
.big_box {
  width: 1366px;
  background: rgba(228, 241, 216, 1);
  margin-bottom: 45px;
  margin-top: 12px;
  padding: 15px 0 45px 0;
  border-radius: 20px;
}
.box_title {
  display: flex;
  align-items: center;
}
.p_title {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
}
.title_img {
  margin-left: 33px;
}
.inp {
  margin-left: 72px;
  width: 502px;
  margin-top: 8px;
}
.box_1 {
  margin-top: 26px;
}
.uploadimage {
  margin-top: 10px;
  margin-left: 72px;
}
.upImg {
  display: flex;
  align-items: center;
}
.btn {
  margin-left: 21px;
}
.checkTime {
  display: flex;
  margin-left: 72px;
  margin-top: 17px;
}
.bgsize {
  width: 1226px;
  /* height: 175px; */
  border-radius: 10px;
  background-color: white;
  margin: 0 auto;
  padding: 10px 0 20px 0;
  margin-top: 10px;
}
.bgsize_1 {
  display: flex;
  align-items: center;
}
.bgsize_1 {
  margin-top: 18px;
  margin-left: 33px;
}
.list_name_1 {
  margin-left: 14px;
  font-size: 16px;
  font-weight: bold;
}
.list_name_2 {
  margin-left: 15px;
  font-size: 14px;
  color: #606060;
}
.fen {
  margin-top: 6px;
  margin-left: 62px;
  color: rgba(45, 136, 21, 1);
  font-size: 18px;
}
.chengjiu {
  margin-top: 7px;
  margin-left: 64px;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: rgba(45, 136, 21, 1);
  box-shadow: none;
}
.el-checkbox-button:first-child .el-checkbox-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 4px;
  box-shadow: none;
}
.el-checkbox-button:last-child .el-checkbox-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 4px;
  box-shadow: none;
}
.el-checkbox-button--small .el-checkbox-button__inner {
  border: 1px solid rgba(45, 136, 21, 1);
  border-radius: 4px;
  color: rgba(45, 136, 21, 1);
  margin: 0 8px 0 0;
}
.Pclass {
  margin-top: 8px;
  margin-left: 64px;
}
.el-textarea__inner {
  margin-left: -8px;
}
.chengjiu1 {
  width: 500px;
  margin-top: 7px;
  margin-left: 72px;
}
.bimg {
  margin-top: 46px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.bimg div {
  margin: 0 40px;
}
.clickup {
  line-height: 37px;
  color: white;
  text-align: center;
  font-size: 14px;
  border-radius: 30px;
  width: 112px;
  height: 37px;
  background-color: rgba(45, 136, 21, 1);
  margin-left: 166px;
  margin-top: -81px;
}
.el-upload__tip {
  margin-top: -36px;
}
.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner {
  background-color: rgba(45, 136, 21, 1);
}
.el-checkbox-button.is-focus .el-checkbox-button__inner {
  border-color: rgba(45, 136, 21, 1);
}
.save {
  cursor: pointer;
  line-height: 37px;
  color: white;
  text-align: center;
  font-size: 14px;
  border-radius: 30px;
  width: 112px;
  height: 37px;
  background-color: rgba(128, 186, 79, 1);
}
.release {
  cursor: pointer;
  line-height: 37px;
  color: white;
  text-align: center;
  font-size: 14px;
  border-radius: 30px;
  width: 112px;
  height: 37px;
  background-color: rgba(45, 136, 21, 1);
}
.jifenkuang {
  width: 200px;
  margin-top: 6px;
  margin-left: 62px;
  /* color: #0453a0;
  font-size: 18px; */
}
.load {
  position: relative;
  right: 1px;
  top: -147px;
  width: 148px;
  height: 148px;
}
</style>
