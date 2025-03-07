<template>
  <div class="main">
    <grcrumbs />
    <div class="main-content">
      <div class="content-text">
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/tzbt.png')" alt />
          课程标题
        </div>
        <div class="title-input">
          <el-input v-model="lessonDetail.name" placeholder="请输入内容" />
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/tztt.png')" alt />
          课程图片
        </div>
        <div class="head-upload">
          <div class="text-img">
            <el-upload
              ref="upload"
              :action="baseApi + '/api/localStorage/upload'"
              list-type="picture-card"
              :show-file-list="false"
              :headers="headers"
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
              <!-- <div  class="upload-img" @click="upload">上传图片</div> -->
              <!-- <img v-if="dialogVisible" class="load" type="primary" src="../../assets/challenge/up.png" alt> -->
            </el-upload>
          </div>
          <div class="btn">
            <div slot="tip" class="el-upload__tip">
              支持文件格式 .jpg / .png，建议尺寸比例（3：2）
            </div>
          </div>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/kcjs.png')" alt />
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
          <el-image class="icon" :src="require('../../assets/lesson/dynj.png')" alt />
          对应年级
        </div>
        <div class="text-select">
          <el-select v-model="lessonDetail.grade" placeholder="选择年级">
            <el-option
              v-for="item in gradeList"
              :key="item.id"
              :label="item.detail"
              :value="item.detail"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/kclm.png')" alt />
          课程类目
        </div>
        <div class="text-select">
          <el-select
            v-model="lessonDetail.courseCategory"
            placeholder="选择类目"
          >
            <el-option
              v-for="item in lessonList"
              :key="item.id"
              :label="item.detail"
              :value="item.detail"
            />
          </el-select>
        </div>
        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/xzkj.png')" alt />
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
          <el-image class="icon" :src="require('../../assets/lesson/kcml.png')" alt />
          课程目录
          <!-- <span class="subline">（必须先输入课程目录才可以在对应的课程内上传视频和课件）</span> -->
        </div>
        <course-list :list="lessonDetail.courseList" />

        <div class="text-title">
          <el-image class="icon" :src="require('../../assets/lesson/tzbt.png')" alt />
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
          style="heigt: 158px; width: 158px"
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
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
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
  name: 'Grreleaselesson',
  components: {
    grcrumbs,
    courseList,
    RichText
  },
  data() {
    return {
      saveText: '保存成功',
      radioSave: '1',
      dialogVisible1: false,
      add: false,
      lessonId: '',
      lessonList: [],
      uploadLesson: true,
      uploadCourseware: true,
      url: true,
      dialogImageUrl: '',
      dialogVisible: true,
      lessonDetail: {
        name: '',
        coverImage: '',
        briefIntroduction: '',
        grade: '',
        courseCategory: '',
        download: 1,
        courseList: [],
        type: 1
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
    // showChild(data) {
    //   this.lessonDetail.courseList = data.courseList
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
          console.log(res)
          this.gradeList = res
          this.getData1()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取科目列表
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
    // 编辑课程
    getDetail(val) {
      const params = {
        id: val
      }
      geDetail(params)
        .then((res) => {
          this.lessonDetail.name = res.name
          this.lessonDetail.coverImage = res.coverImage
          this.lessonDetail.briefIntroduction = res.briefIntroduction
          this.lessonDetail.grade = res.grade
          this.lessonDetail.courseCategory = res.courseCategory
          this.lessonDetail.download = res.download
          this.lessonDetail.courseList = res.courseList
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

      if (!this.lessonDetail.grade) {
        Notification.error({
          title: '请选择对应年级'
        })
        return
      }

      if (!this.lessonDetail.courseCategory) {
        Notification.error({
          title: '请输入课程类目'
        })
        return
      }

      // 课程目录不再是必填项
      // if (this.lessonDetail.courseList.length === 0) {
      //   Notification.error({
      //     title: '请输入课程目录'
      //   })
      //   return
      // }

      let isTpye = false
      // 如果有课程目录项，则验证其完整性
      if (this.lessonDetail.courseList.length > 0) {
        this.lessonDetail.courseList.map((res) => {
          if (!res.name) {
            Notification.error({
              title: '请添加课程名称'
            })
            isTpye = true
          }
          // 视频和附件不再是必填项，已在courseList.vue中设置默认值
        })
      }

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
      updateLesson(this.lessonDetail)
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
      senLesson(this.lessonDetail)
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
      this.$router.push({ path: '/grlesson/gradmlesson' })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
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
    background-color: #e4f1d8;
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
          .upload-img {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 30px;
            font-weight: bold;
            width: 112px;
            text-align: center;
            height: 37px;
            background-color: #2d8815;
            color: #fff;
            position: absolute;
            right: -130px;
            top: 80px;
          }
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
                // border: 1px solid #2d8815;
                text-align: center;
                color: #2d8815;
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
      background-color: #80ba4f;
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
      background-color: #2d8815;
      cursor: pointer;
    }
  }
}
.jishu {
  width: 100px;
}
.text-add {
  display: flex;
  align-items: center;
}
.bgsize_1 {
  margin-top: 18px;
}
</style>
