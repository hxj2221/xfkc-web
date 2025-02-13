<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命上传中"
    class="main"
  >
    <crumbs />
    <el-progress
      v-if="loading"
      text-inside
      class="fix-progress"
      :stroke-width="26"
      :percentage="uploadPercent"
    />
    <div class="main-content">
      <div class="content-text">
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/titile.png')" alt />
          课程标题
        </div>
        <div class="title-input">
          <el-input v-model="lessonDetail.name" placeholder="请输入内容" />
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/list.png')" alt />
          投放类别
        </div>
        <div class="text-select">
          <el-select
            v-model="lessonDetail.type"
            placeholder="选择投放类别"
          >
            <el-option
              v-for="item in courseType"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/head.png')" alt />
          课程封面图
        </div>
        <div class="head-upload">
          <div class="text-img">
            <el-upload
              accept=".jpg, .png"
              :action="baseApi + '/api/localStorage/upload'"
              list-type="picture-card"
              :headers="headers"
              :show-file-list="false"
              :on-success="handelsuccess"
              :auto-upload="true"
              :on-error="handleError"
            >
              <i class="el-icon-plus" />
              <el-image
                v-if="lessonDetail.coverImage"
                class="load"
                type="primary"
                :src="$comm.url(lessonDetail.coverImage)"
                alt
              />
            </el-upload>
          </div>
          <div class="btn">
            <div slot="tip" class="el-upload__tip">
              支持文件格式 .jpg / .png，建议尺寸比例（3：2）
            </div>
          </div>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/introduce.png')" alt />
          课程介绍
        </div>
        <div class="text-introduce">
          <!-- <el-input
            v-model="lessonDetail.briefIntroduction"
            type="textarea"
            :autosize="{ minRows: 9, maxRows: 9 }"
            placeholder="请输入文字"
          /> -->

          <RichText v-model="lessonDetail.briefIntroduction" placeholder="请输入课程介绍" />

        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/class.png')" alt />
          对应年级
        </div>
        <div class="text-select">
          <el-select v-model="lessonDetail.courseCategoryId1" placeholder="选择年级">
            <el-option
              v-for="item in gradeList"
              :key="item.id"
              :label="item.detail"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/list.png')" alt />
          课程板块
        </div>
        <div class="text-select">
          <el-select
            v-model="lessonDetail.courseCategoryId2"
            placeholder="选择板块"
          >
            <el-option
              v-for="item in lessonList"
              :key="item.id"
              :label="item.detail"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/list.png')" alt />
          课程类目
        </div>
        <div class="text-select">
          <el-select
            v-model="lessonDetail.courseCategoryId3"
            placeholder="选择类目"
          >
            <el-option
              v-for="item in courseCategoryList3"
              :key="item.id"
              :label="item.detail"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/download5.png')" alt />
          是否允许下载课程及课件
        </div>
        <div class="text-select">
          <el-select v-model="lessonDetail.download" placeholder="请选择">
            <el-option
              v-for="item in download"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/list.png')" alt />
          是否推荐
        </div>
        <div class="text-select">
          <el-select v-model="lessonDetail.recommendFlag" placeholder="请选择">
            <el-option
              v-for="item in download"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/list.png')" alt />
          类型
        </div>
        <div class="text-select">
          <el-select v-model="lessonDetail.dateType" placeholder="请选择">
            <el-option
              v-for="item in dataTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/lesson.png')" alt />
          课程目录
        </div>
        <course-list :list="lessonDetail.courseList" />

        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/titile.png')" alt />
          保存公开
        </div>
        <div class="text-introduce">
          <div class="bgsize_1">
            <el-radio v-model="radioSave" label="1">{{
              lessonId ? "修改" : "保存"
            }}</el-radio>
          </div>
          <div class="bgsize_1">
            <el-radio v-model="radioSave" label="2">{{
              lessonId ? "修改并公开" : "保存并公开"
            }}</el-radio>
          </div>
        </div>
      </div>
    </div>
    <div class="submit">
      <span
        v-if="!lessonId"
        class="button1"
        @click="toVerify('save')"
      >保存</span>
      <span
        v-if="lessonId"
        class="button1"
        @click="toVerify('edit')"
      >修改</span>
    </div>
    <el-dialog
      title
      :visible.sync="dialogVisible1"
      :center="true"
      width="30%"
      :before-close="handleClose"
    >
      <div style="text-align: center; margin-top: 12px">
        <el-image
          style="height: 158px; width: 158px"
          :src="require('../../assets/challenge/success.png')"
          alt
        />
      </div>
      <div style="text-align: center; margin-top: 12px">{{ saveText }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toQuit">好 的</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import crumbs from '@/components/crumbs/crumbs.vue'
import { getToken } from '@/utils/auth'
import { Notification } from 'element-ui'
import {
  getgrade,
  senLesson,
  publicLesson,
  geDetail,
  updateLesson
} from '@/api/lesson/lesson'
import RichText from '@/components/RichText.vue'
import courseList from '../../components/addClass/courseList.vue'
export default {
  name: 'Releaselesson',
  components: {
    crumbs,
    courseList,
    RichText
  },
  data() {
    return {
      saveText: '保存成功',
      radioSave: '1',
      uploadPercent: 0,
      loading: false,
      dialogVisible1: false,
      add: false,
      lessonId: '',
      lessonList: [],
      courseCategoryList3: [],
      uploadLesson: true,
      uploadCourseware: true,
      url: true,
      dialogImageUrl: '',
      dialogVisible: true,
      lessonDetail: {
        dateType:'',
        recommendFlag:'',
        name: '',
        coverImage: '',
        briefIntroduction: '',
        courseCategoryId1: null,
        courseCategoryId2: null,
        courseCategoryId3: null,
        grade: '',
        courseCategory: '',
        courseCategoryName3: '',
        download: 1,
        courseList: [],
        type: ''
      },
      gradeList: [],
      videoList: [],
      download: [
        {
          id: 0,
          label: '否'
        },
        {
          id: 1,
          label: '是'
        }
      ],
      dataTypeList: [
        {
          id: 1,
          label: '视频课程'
        },
        {
          id: 2,
          label: '图文精华'
        },
        {
          id: 3,
          label: '特色展示'
        },
        {
          id: 4,
          label: '资讯动态'
        },
      ],
      courseType: [
        {
          id: 1,
          label: '精品课程'
        },
        {
          id: 2,
          label: '实践课程'
        }
      ]
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
    this.getData()
  },
  methods: {
    // getLoading(event) {
    //   this.loading = true
    //   this.uploadPercent = Number(event.percent.toFixed(2))
    // },
    handleError(response) {
      if (response.status === 400) {
        Notification.error({
          title: '图片大小不能超过6MB'
        })
      }
    },
    // 上传课程图片
    handelsuccess(file) {
      this.lessonDetail.coverImage = file.path
    },
    // 获取班级列表
    getData() {
      const params = {
        category: 1
      }
      getgrade(params)
        .then((res) => {
          this.gradeList = res
          this.getData1()
          this.getData2()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取板块列表
    getData1() {
      const params = {
        category: 2
      }
      getgrade(params)
        .then((res) => {
          this.lessonList = res
          if (this.$route.query.id) {
            this.lessonId = this.$route.query.id
            this.getDetail(this.lessonId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取科目列表
    getData2() {
      const params = {
        category: 3
      }
      getgrade(params)
        .then((res) => {
          this.courseCategoryList3 = res
          // if (this.$route.query.id) {
          //   this.lessonId = this.$route.query.id
          //   this.getDetail(this.lessonId)
          // }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 编辑课程
    getDetail(val) {
      const params = {
        id: val
      }
      geDetail(params)
        .then((res) => {
          this.lessonDetail.dateType = res.dateType
          this.lessonDetail.recommendFlag = res.recommendFlag
          this.lessonDetail.name = res.name
          this.lessonDetail.coverImage = res.coverImage
          this.lessonDetail.briefIntroduction = res.briefIntroduction
          this.lessonDetail.grade = res.grade
          this.lessonDetail.courseCategory = res.courseCategory
          this.lessonDetail.courseCategoryId1 = res.courseCategoryId1 || this.gradeList.filter(item => item.detail === res.grade)[0]?.id || ''
          this.lessonDetail.courseCategoryId2 = res.courseCategoryId2 || this.lessonList.filter(item => item.detail === res.courseCategory)[0]?.id || ''
          this.lessonDetail.courseCategoryId3 = res.courseCategoryId3 || this.courseCategoryList3.filter(item => item.detail === res.courseCategoryName3)[0]?.id || ''
          this.lessonDetail.courseCategoryName3 = res.courseCategoryName3 || ''
          this.lessonDetail.download = res.download
          this.lessonDetail.courseList = res.courseList
          this.lessonDetail.type = res.type
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 验证
    toVerify(message) {
      if (!this.lessonDetail.name) {
        Notification.error({
          title: '请输入课程标题'
        })
        return
      }
      if (!this.lessonDetail.type) {
        Notification.error({
          title: '请选择投放类别'
        })
        return
      }
      if (!this.lessonDetail.coverImage) {
        Notification.error({
          title: '请上传课程封面图'
        })
        return
      }

      if (!this.lessonDetail.briefIntroduction) {
        Notification.error({
          title: '请输入课程介绍'
        })
        return
      }

      if (!this.lessonDetail.courseCategoryId1) {
        Notification.error({
          title: '请选择对应年级'
        })
        return
      }

      if (!this.lessonDetail.courseCategoryId2) {
        Notification.error({
          title: '请输入课程板块'
        })
        return
      }
      if (!this.lessonDetail.courseCategoryId3) {
        Notification.error({
          title: '请输入课程类目'
        })
        return
      }

      if (this.lessonDetail.courseList.length === 0) {
        Notification.error({
          title: '请输入课程目录'
        })
        return
      }

      let isTpye = false
      this.lessonDetail.courseList.map((res) => {
        if (!res.name || !res.source) {
          Notification.error({
            title: '请添加完整的课程信息'
          })
          isTpye = true
        }
      })

      if (isTpye) {
        console.log(this.lessonDetail)
        return
      }
      if (message === 'save') {
        this.saveLesson()
      } else {
        this.editLesson()
      }
    },
    // 修改课程
    editLesson() {
      this.lessonDetail.id = this.lessonId
      // this.lessonDetail.grade = this.getData
      const grade = this.gradeList.filter(item => item.id === this.lessonDetail.courseCategoryId1)[0]?.detail
      const courseCategory = this.lessonList.filter(item => item.id === this.lessonDetail.courseCategoryId2)[0]?.detail
      const courseCategoryName3 = this.courseCategoryList3.filter(item => item.id === this.lessonDetail.courseCategoryId3)[0]?.detail
      updateLesson({ ...this.lessonDetail, grade, courseCategory, courseCategoryName3 })
        .then((res) => {
          if (this.radioSave === '1') {
            this.saveText = '修改成功!'
            this.dialogVisible1 = true
          } else {
            this.saveText = '修改并公开成功'
            this.publicLesson(this.lessonId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 保存课程
    saveLesson() {
      this.lessonDetail.id = this.lessonId
      const grade = this.gradeList.filter(item => item.id === this.lessonDetail.courseCategoryId1)[0]?.detail
      const courseCategory = this.lessonList.filter(item => item.id === this.lessonDetail.courseCategoryId2)[0]?.detail
      const courseCategoryName3 = this.courseCategoryList3.filter(item => item.id === this.lessonDetail.courseCategoryId3)[0]?.detail
      senLesson({ ...this.lessonDetail, grade, courseCategory, courseCategoryName3 })
        .then((res) => {
          if (res.id) {
            if (this.radioSave === '1') {
              this.saveText = '保存成功!'
              this.dialogVisible1 = true
            } else {
              this.saveText = '保存并公开成功!'
              this.publicLesson(res.id)
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 公开课程
    publicLesson(id) {
      const params = {
        courseTitleId: id
      }
      publicLesson(params)
        .then((res) => {
          this.dialogVisible1 = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleRemovekc(file) {
      // console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = false
    },
    handleRemove33() {
      this.dialogVisible = false
    },
    toQuit() {
      this.dialogVisible1 = false
      this.$router.push({ path: '/lesson/admclass' })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done(this.$router.push({ path: '/lesson/admclass' }))
        })
        .catch((_) => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.main {
  width: 1366px;
  margin: 0 auto;
  .upload-title {
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .upload-demo {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .el-upload-list {
      display: none !important;
    }
  }
  .main-content {
    background-image: linear-gradient(#eaf3fd, #b2d4f5);
    border-radius: 20px;
    margin-top: 12px;
    padding-left: 33px;
    padding-bottom: 41px;
    .content-text {
      padding-left: 72px;
      padding-right: 72px;
      .text-title {
        font-size: 18px;
        padding-top: 24px;
        color: #242424;
        font-weight: bold;
        position: relative;
        .icon {
          position: absolute;
          left: -40px;
        }
        .subline {
          color: #606060;
          font-size: 14px;
        }
      }
      .title-input {
        margin-top: 7px;
        width: 502px;
      }
      .head-upload {
        display: flex;
        .text-img {
          margin-top: 7px;
          position: relative;
          .load {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 148px;
            height: 148px;
          }
        }
        .btn {
          vertical-align: middle;
          padding-top: 50px;
          padding-left: 20px;
          .el-upload__tip {
            margin-bottom: 8px;
          }
          img {
            cursor: pointer;
          }
        }
      }
      .text-introduce {
        margin-top: 7px;
        /deep/ .el-textarea__inner {
          height: 175px;
        }
      }
      .text-select {
        margin-top: 12px;
      }
      .text-class {
        margin-top: 13px;
        width: 1226px;
        background-color: #fff;
        border-radius: 10px;
        .class-list {
          padding: 30px 64px;
          position: relative;
          .icon {
            position: absolute;
            left: 33px;
          }
          .title {
            color: #242424;
            font-weight: bold;
            font-size: 16px;
          }
          .subtitle {
            font-size: 14px;
            color: #606060;
          }
          .form {
            border-radius: 10px;
            border: 1px solid #e6e6e6;
            margin-top: 11px;
            .list-item {
              display: flex;
              color: #242424;
              height: 43px;
              font-size: 16px;
              .div-flex {
                width: 20%;
                text-align: center;
                height: 43px;
                line-height: 43px;
              }
              .upload {
                .el-upload-list {
                  position: relative;
                  top: -43px;
                }
              }
              .button {
                display: inline-block;
                cursor: pointer;
                font-size: 16px;
                border-radius: 10px;
                width: 70px;
                height: 32px;
                line-height: 32px;
                border: 1px solid #358de4;
                text-align: center;
                color: #358de4;
              }
              .add {
                cursor: pointer;
                vertical-align: middle;
              }
              .add-div {
                cursor: pointer;
                display: inline-block;
                text-align: center;
                width: 220px;
              }
            }
          }
        }
      }
    }
  }
  .submit {
    text-align: center;
    .button1 {
      margin-top: 32px;
      display: inline-block;
      border-radius: 30px;
      width: 112px;
      height: 37px;
      line-height: 37px;
      color: #fff;
      background-image: linear-gradient(to bottom, #62b0fb, #2895fc);
      cursor: pointer;
    }
    .button2 {
      margin-top: 32px;
      display: inline-block;
      border-radius: 30px;
      width: 112px;
      height: 37px;
      line-height: 37px;
      color: #fff;
      margin-left: 80px;
      background-image: linear-gradient(to bottom, #0571d9, #054888);
      cursor: pointer;
    }
  }
}
.jishu {
  width: 100px;
}

.fix-progress {
  position: fixed;
  top: 200px;
  left: 0;
  z-index: 99999999;
  width: 400px;
  margin: auto;
  bottom: 0px;
  right: 0;
  height: 40px;
}
.bgsize_1 {
  margin-top: 18px;
}
</style>
