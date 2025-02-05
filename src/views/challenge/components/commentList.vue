<template>
  <div class="comment_ring">
    <div class="comment_title" :class="theme === 'green'? 'green' : ''">挑战圈</div>
    <!-- 上传资料 -->
    <!-- 未报名 -->
    <div v-if="enterStatus === 0">
      <div v-if="ykId === 2">
        <div>您还未报名挑战，请点击挑战报名后上传资料</div>
      </div>
    </div>

    <!-- 报名成功 -->
    <div v-if="enterStatus === 1" class="comment_release">
      <div class="textarea">
        <el-input
          v-model="textarea4"
          type="textarea"
          :autosize="{ minRows: 4 }"
          placeholder="可以输入255字呢，尽量描述的详细一点哦..."
        />
      </div>
      <div style="height:19px;" />
      <div style="display: flex; align-items: flex-end;">
        <el-upload
          style="flex: 1"
          :action="baseApi+'/api/localStorage/upload'"
          :headers="headers"
          list-type="picture-card"
          :show-file-list="true"
          :auto-upload="true"
          :on-success="getUrl"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <div class="up">
          <el-button type="primary" @click="release">发布</el-button>
        </div>
      </div>
    </div>

    <!-- 待审核 -->
    <div v-if="enterStatus === 2">
      <div>资料已经上传成功啦，请等待审核...</div>
    </div>

    <!-- 审核失败 -->
    <div v-if="enterStatus === 3">
      <div style="text-align: center;font-size:22px">挑战失败</div>
      <div style="text-align: center;margin-top:12px;">您上传的资料被驳回了，下次再来吧！</div>
    </div>

    <!-- 审核成功 -->
    <div v-if="enterStatus === 4">
      <div style="text-align: center;margin-top:12px;">您上传的资料审核通过，请查看您获得的奖励！</div>
    </div>

    <!-- 评论列表 -->
    <div v-for="(item, index) in commentList" :key="index" class="comment_list">
      <div class="comment_avatar">
        <el-avatar shape="circle" :size="100" :src="item.avatarUrl" />
      </div>
      <div class="comment_list_right">
        <div class="comment_list_title">{{ item.name }}</div>
        <div class="comment_list_content">{{ item.content }}</div>
        <div class="comment_list_img">
          <el-image
            v-for="(item2, index2) in item.imgList"
            :key="index2"
            :src="item2"
            class="comment_img"
            fit="cover"
            @click="openImg(item2)"
          />
        </div>
        <el-button type="text" size="medium" :class="theme === 'green'? 'green' : ''" @click="openReply(index)">回复</el-button>

        <!-- 回复框 -->
        <div v-if="item.showReply">
          <el-input
            v-model="textarea"
            style="border: 1px solid #333"
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder="可以输入255字呢，尽量描述的详细一点哦..."
          />
          <div class="comment_reply_bottom">
            <el-button @click="closeReply(index)">取消</el-button>
            <el-button type="primary" @click="sendComment(index)">发送</el-button>
          </div>
        </div>

        <!-- 回复列表 -->
        <div v-if="item.replyList.length > 0" class="reply_list">
          <comment-reply-list
            :theme="theme"
            :initial-reply-list="item.replyList"
            :reply-number="item.replyNumber"
            :material-id="item.id"
          />
        </div>
      </div>
    </div>

    <div v-if="commentList.length > 0" class="comment_pagination">
      <el-pagination
        :page-size="10"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <div v-else class="no_date">
      <el-image :src="require('../../../assets/challenge/nopinglun.png')" />
      <div>暂无评论</div>
    </div>

    <el-dialog :visible.sync="dialogVisible" :before-close="closeImage">
      <el-image width="100%" :src="imageUrlDetail" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import commentReplyList from '../components/commentReplyList.vue'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { Notification } from 'element-ui'
import {
  lookOverCommentList,
  uploadSuccessList,
  postAComment
} from '@/api/challenge/challengeDetail'
export default {
  components: {
    commentReplyList
  },
  props: {
    // 关联的ID
    challengeId: {
      default: 0,
      type: Number
    },
    // 挑战状态
    // 0~4
    enterStatus: {
      default: 0,
      type: Number
    },
    // 用户角色
    // 2时为学生
    ykId: {
      default: 0,
      type: Number
    },
    theme: {
      type: String,
      default: 'blue'
    },
    // 评论类型
    // COURSE：课程、CHALLENGE：挑战、HARD_WARE：硬件资源
    typeNumber: {
      default: 'CHALLENGE',
      type: String
    }
  },
  data() {
    return {
      page: 0,
      size: 10,
      imageList: [],
      total: 0,
      circleUrl: '',
      textarea4: '',
      textarea: '',
      showReply: false,
      showReplyBtn: false,
      showReplyBottom: false,
      dialogVisible: false,
      imageUrlDetail: '',
      dialogImageUrl: '',
      chanllageList: [],
      commentList: []
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
    this.messagetiazhanId = this.challengeId
    this.getCommentList()
  },
  methods: {
    // 分页修改
    handleCurrentChange(val) {
      this.page = val - 1
      this.getCommentList()
    },
    // 上传成功
    getUrl(file) {
      this.imageList.push(file.path)
      this.dialogImageUrl = file.path
      console.log(this.imageList)
    },
    // 上传图片失败
    handleError(response) {
      if (response.status === 400) {
        Notification.error({
          title: '图片大小不能超过6MB'
        })
      }
    },
    // 查看大图
    handlePictureCardPreview(file) {
      this.imageUrlDetail = file.url
      this.dialogVisible = true
    },
    openImg(url) {
      this.imageUrlDetail = url
      this.dialogVisible = true
    },
    //
    closeImage() {
      this.dialogVisible = false
    },
    // 删除数组中一个图片
    handleRemove(file) {
      this.imageList.splice(this.imageList.indexOf(file.response.path), 1)
      console.log(this.imageList)
    },
    // 获取评论列表
    getCommentList() {
      if (this.typeNumber === 'CHALLENGE') {
        var parmas = {
          challengeId: this.messagetiazhanId,
          page: this.page,
          size: this.size,
          sort: ['id,asc']
        }
        uploadSuccessList(parmas).then(res => {
          this.total = res.numberOfElements
          this.commentList = res.content.map((item, index) => {
            var newItem = {
              id: item.usersChallenges.id,
              name: item.usersChallenges.name,
              avatarUrl: this.$comm.url(item.usersChallenges.avatarName, 'avatar'),
              content: item.usersChallenges.fileIntroduction,
              imgList: [],
              showReply: false,
              showReplyBottom: false,
              replyNumber: item.totalCommentsNum,
              replyList: []
            }
            console.log(item.usersChallenges.avatarName)

            if (item.usersChallenges.filePath) {
              newItem.imgList = item.usersChallenges.filePath.split(',').map(item2 => {
                return this.$comm.url(item2)
              })
            }
            newItem.replyList = item.threeComments.map(item3 => {
              var newItem3 = {
                id: item3.id,
                nickname: item3.nickname,
                content: item3.content,
                replyNickname: item3.replyNickname,
                showReplyBtn: false
              }
              return newItem3
            })

            return newItem
          })
          console.log(this.commentList)
        })
      } else {
        var data = {
          associationId: this.challengeId,
          page: this.page,
          size: this.size,
          sort: ['id,asc'],
          type: this.typeNumber
        }
        lookOverCommentList(data).then(response => {
          console.log(response)
        })
      }
    },
    // 提交
    release() {
      this.dialogImageUrl = this.imageList.join(',')

      if (!this.textarea4) {
        Notification.error({
          title: '请输入文字描述'
        })
        return
      }

      if (!this.dialogImageUrl) {
        Notification.error({
          title: '请上传图片'
        })
        return
      }

      var params = {
        id: this.challengeId,
        fileIntroduction: this.textarea4,
        filePath: this.dialogImageUrl
      }

      this.$emit('submit-Information', params)
    },
    // 打开回复弹窗
    openReply(index) {
      this.commentList[index].showReply = true
      this.textarea = ''
    },
    // 关闭回复弹窗
    closeReply(index) {
      this.commentList[index].showReply = false
    },
    // 发送评论
    sendComment(index) {
      var data = {
        associationId: this.commentList[index].id,
        content: this.textarea,
        type: this.typeNumber
      }
      postAComment(data).then(res => {
        Notification.success({
          title: '评论发送成功，待管理员审核。'
        })
        this.commentList[index].showReply = false
      })

      this.getCommentList()
    }
  }
}
</script>

<style lang="scss">
.comment_ring {
  padding: 20px 60px 20px 30px;

  .green {
    color: #2d8815 !important;
  }

  .no_date {
    font-size: 18px;
    font-weight: 600;
    color: #999;
    padding: 20px;
    text-align: center;
  }

  .comment_title {
    font-size: 25px;
    font-weight: 600;
    color: #0554a0;
    margin-bottom: 20px;
  }

  .el-avatar {
    border-radius: 50%;
  }

  .comment_list {
    display: flex;
    align-items: flex-start;
    margin-top: 30px;

    .comment_avatar {
      padding: 10px 20px;
    }

    .comment_list_right {
      flex: 1;
      padding: 10px 20px;

      .comment_list_title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .comment_list_content {
        margin-bottom: 10px;
      }

      .comment_list_img {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;

        .comment_img {
          width: 80px;
          height: 80px;
          margin-right: 5px;
          margin-bottom: 5px;
        }
      }

      .comment_list_time {
        color: #999;
        font-size: 14px;
      }

      .comment_reply_bottom {
        padding: 10px;
        text-align: right;
      }

      .reply_list {
        background: #efefef;
        padding: 20px 20px 10px;
      }
    }
  }

  .el-textarea__inner{
    border: none;
    width: 100% !important;
    resize: initial;
  }

  .comment_release {
    padding: 20px;
    border: 1px solid #0554a0;
    border-radius: 10px;

    .el-upload--picture-card {
      height: 100px;
      width: 100px;
      line-height: 110px
    }

    .el-upload-list--picture-card .el-upload-list__item {
      height: 100px;
      width: 100px;
      line-height: 110px;
    }

    .el-upload-list__item-status-label{
        i {
          position: absolute;
          top: -2px;
          right: 12px;
        }
      }
  }

  .comment_pagination {
    text-align: center;
  }

}
</style>
