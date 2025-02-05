<template>
  <div>
    <!-- 添加按钮 -->
    <button class="text-add" @click="dialog.show = true">添加课件</button>
    <!-- 目录列表 -->
    <div class="table-content">
      <el-table :data="courseList">
        <el-table-column
          prop="episode"
          label="课程序号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="课程名称"
          width="250"
        />
        <el-table-column
          prop="coursewareSource"
          label="课程视频"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.source" class="course-cursor" @click="toVideo(scope.row)">{{ scope.row.source }}</div>
            <div v-else class="">-</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="coursewareTitle"
          label="课程附件"
        >
          <template slot-scope="scope">
            <div class="course-cursor" @click="toCourseware(scope.row)">{{ scope.row.coursewareTitle }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editLesson(scope)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteLesson(scope.$index)">删除</el-button>
            <el-button v-if="courseList.length !== 1 && scope.$index !== 0" type="text" size="small" @click="upMove(scope.$index)">上移</el-button>
            <el-button v-if="courseList.length !== 1 && scope.$index !== courseList.length -1" type="text" size="small" @click="downMove(scope.$index)">下移</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建/编辑表单 -->
    <div>
      <el-dialog
        :visible.sync="dialog.show"
        :title="dialog.edit ? '编辑课程课件' : '创建课程课件'"
        width="600px"
        height="600px"
        @close="closeForm"
      >
        <el-form label-width="100px">
          <el-form-item label="课程名称">
            <div class="warning-text el-icon-warning">课程名称长度不得超过50字</div>
            <el-input v-model="form.name" style="overflow:hidden" />

          </el-form-item>

          <el-form-item label="课程视频" prop="Video">
            <div class="warning-text el-icon-warning">视频文件名长度不得超过50字</div>
            <el-upload
              v-show="!form.videoPath && !dialog.videoFlag"
              ref="uploadVideo"
              class="avatar-uploader el-upload--text"
              accept="video/*"
              :action="baseApi+'/api/localStorage/upload'"
              :show-file-list="false"
              :headers="headers"
              :drag="dialog.isVideo"
              :on-success="handleVideoSuccess"
              :on-progress="uploadVideoProcess"
            >
              <i class="el-icon-video-camera-solid" />
              <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
            </el-upload>

            <el-progress v-if="dialog.videoFlag" type="circle" :percentage="videoUploadPercents" style="margin-top:30px;" />

            <video v-if="form.videoUrl !='' && dialog.videoFlag == false" :src="form.videoUrl" class="video-size" controls="controls">您的浏览器不支持视频播放</video>
            <div v-if="form.videoUrl !='' && dialog.videoFlag == false" class="dialog-btn" @click="chooseFile">
              <el-button size="small" type="primary">重新上传视频</el-button>
            </div>
          </el-form-item>

          <el-form-item label="课程附件">
            <div class="warning-text el-icon-warning">附件文件名长度不得超过50字</div>
            <el-upload
              ref="upload"
              :action="baseApi+'/api/localStorage/upload'"
              accept=".ppt, .docx, .doc, .pptx, .pdf, .PDF, .DOC、.PPT、.DOCX、.PPTX, .zip"
              :headers="headers"
              :on-success="handleAnnexSuccess"
              :on-remove="handleAnnexRemove"
              :limit="1"
              :file-list="dialog.AnnexList"
            >
              <el-button v-if="!form.courseWarePath" size="small" type="primary">选择附件</el-button>
              <div v-else @click="Reselect">
                <el-button size="small" type="primary">重新选择附件</el-button>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogNext(false)">取消</el-button>
          <el-button type="primary" @click="dialogNext(true)">保存</el-button>
        </div>
      </el-dialog>

    </div>
    <!-- 视频预览 -->
    <div>
      <el-dialog
        title="课程视频"
        :visible.sync="videoDialog.show"
        width="800px"
        height="600px"
        :before-close="handleClose"
      >
        <video :src="videoDialog.url" class="dialog-video" controls="controls" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: '',
        videoUrl: '', // 预览需要
        videoPath: '', // 对应 source
        courseWarePath: '', // 对应 coursewareSource
        courseUrl: '', // 预览需要
        courseWareName: '' // 对应 coursewareTitle
      },
      dialog: {
        edit: false, // 是否为编辑模式
        show: false,
        isVideo: true, // 是否拖拽上传
        videoFlag: false, // 是否上传中（显示进度条）
        AnnexList: [], // 编辑时附件显示
        editInfo: {},
        videoUploadPercent: 0 // 视频上传动画
      },
      // 视频预览窗口
      videoDialog: {
        show: false,
        url: ''
      }
    }
  },
  computed: {
    videoUploadPercents() {
      return this.dialog.videoUploadPercent
    },
    ...mapGetters([
      'baseApi',
      'fileUploadApi'
    ]),
    headers() {
      return {
        'Authorization': getToken()
      }
    },
    courseList: {
      get() {
        return this.list
      },

      set(val) {
        this.$emit('update:list', val)
      }
    }
  },

  methods: {
    // dialog取消/确认
    dialogNext(save) {
      if (!save) {
        this.closeForm()
        return
      }

      // 新建保存信息
      if (!this.dialog.edit) {
        const index = this.courseList.length + 1

        if (!this.form.name) {
          alert('请添加课程名称')
          return
        }

        if (!this.form.videoUrl && !this.form.courseUrl) {
          alert('请上传课程视频或课程附件')
          return
        }

        this.courseList.push({
          name: this.form.name, // 课程名称
          source: this.form.videoPath, // 视频URL
          episode: index, // 课程序号
          coursewareSource: this.form.courseWarePath, // 视频名称
          coursewareTitle: this.form.courseWareName // 附件名称
        })
      }

      // 编辑保存信息
      if (this.dialog.edit) {
        this.$set(this.courseList, this.dialog.editInfo.$index, {
          name: this.form.name, // 课程名称
          source: this.form.videoPath, // 视频URL
          episode: this.dialog.editInfo.$index + 1, // 课程序号
          coursewareSource: this.form.courseWarePath, // 附件地址
          coursewareTitle: this.form.courseWareName // 附件名称
        })
      }
      this.closeForm()
    },

    // 移除附件
    handleAnnexRemove(file, fileList) {
      this.form.courseWareName = ''
      this.form.courseWarePath = ''
      this.form.courseUrl = ''
    },

    // 上传附件
    handleAnnexSuccess(response, file, fileList) {
      this.dialog.isAnnex = true
      this.form.courseWareName = response.name
      this.form.courseWarePath = response.path
      this.form.courseUrl = this.$comm.url(response.path)
    },

    // 重新选择附件
    Reselect() {
      this.dialog.isAnnex = true
      this.$refs.upload.clearFiles()
    },

    // 重新上传视频
    chooseFile() {
      this.$refs.uploadVideo.$el.children[0].children[0].click()
    },

    // 视频上传
    handleVideoSuccess(res, file) {
      this.dialog.videoFlag = false
      this.dialog.isVideo = false
      this.dialog.videoUploadPercent = 0
      this.form.videoPath = res.path
      this.form.videoUrl = this.$comm.url(res.path)
    },

    // 视频上传钩子
    uploadVideoProcess(event, file, fileList) {
      this.dialog.videoFlag = true
      this.dialog.videoUploadPercent = Math.floor(event.percent)
    },

    toVideo(item) {
      this.videoDialog.url = this.$comm.url(item.source)
      this.videoDialog.show = true
    },

    toCourseware(row) {
    },

    // 预览视频关闭
    handleClose() {
      this.videoDialog.url = ''
      this.videoDialog.show = false
    },

    // 编辑
    editLesson(item) {
      this.form = {
        name: item.row.name,
        videoUrl: item.row.source ? this.$comm.url(item.row.source) : '',
        videoPath: item.row.source,
        courseWarePath: item.row.coursewareSource,
        courseUrl: item.row.coursewareSource ? this.$comm.url(item.row.coursewareSource) : '',
        courseWareName: item.row.coursewareTitle
      }

      if (item.row.coursewareTitle) {
        this.dialog.AnnexList = []
        this.dialog.AnnexList.push({ name: item.row.coursewareTitle, url: item.row.coursewareUrl })
        this.dialog.isAnnex = true
      }

      this.dialog.editInfo.$index = item.$index
      this.dialog.edit = true
      this.dialog.show = true
    },
    // 删除
    deleteLesson(index) {
      this.$confirm('是否确定要删除此课程课件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.courseList.splice(index, 1)
        this.courseList.forEach((i) => {
          if (i.episode > index) {
            i.episode--
          }
        })
      }).catch(() => {
      })
    },

    // 上移
    upMove(index) {
      if (index === 0) {
        return
      }
      const item = this.courseList[index].episode
      console.log(item)
      this.$set(
        this.courseList[index],
        'episode',
        this.courseList[index - 1].episode
      )
      this.$set(this.courseList[index - 1], 'episode', item)
      this.courseList.sort(this.sortNumber)
      this.$forceUpdate()
    },

    // 下移
    downMove(index) {
      if (index === this.courseList.length - 1) {
        return
      }
      const item = this.courseList[index].episode
      this.$set(
        this.courseList[index],
        'episode',
        this.courseList[index + 1].episode
      )
      this.$set(this.courseList[index + 1], 'episode', item)
      this.courseList.sort(this.sortNumber)
    },
    // 排序
    sortNumber(a, b) {
      return a.episode - b.episode
    },

    closeForm() {
      this.form = {
        name: '',
        videoUrl: '',
        videoPath: '',
        courseWarePath: '',
        courseUrl: '',
        courseWareName: ''
      }

      this.dialog = {
        edit: false,
        show: false,
        isVideo: true,
        videoFlag: false,
        AnnexList: [],
        editInfo: {},
        videoUploadPercent: 0
      }

      this.videoDialog.show = false
      this.$refs.uploadVideo.abort()
      this.$refs.upload.abort()
    }
  }
}
</script>

<style lang="scss" scoped>

.text-add {
  color: #606060;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  margin: 12px 0;
  font-size: 14px;
  cursor: pointer;
  padding: 10px;
}

.table-content {
  width: 100%;
}

/deep/ .el-input {
  width:360px;
}

/deep/ .el-icon-video-camera-solid{
  color: #606060;
  font-size: 50px;
  padding: 30px 0 20px;
}

.dialog-video {
  margin:0 auto;
  text-align: center;
  width: 760px;
  height: 400px;
}

.video-size {
  width: 360px;
  height: 180px;
}

.course-cursor {
  cursor: pointer;
}

.warning-text{
  color: #d1a34f;
  background: #fff3d2;
  padding: 5px 10px;
  border-radius: 3px;
}

</style>
