<template>
  <div class="reply_ring">
    <div v-for="(item, index) in list" :key="index" class="reply_list_tab">
      <div class="reply_username" :class="theme === 'green'? 'green' : ''">
        <span v-if="commentType === 'COURSE'">{{ item.createBy }}</span>
        <span v-else>{{ item.nickname }}</span>
        <span v-if="item.replyNickname" style="color: #333;">回复</span>
        <span v-if="item.replyNickname">{{ item.replyNickname }}</span>：
      </div>
      <div style="flex: 1" @mouseenter="item.showReplyBtn = true" @mouseleave="item.showReplyBtn = false">
        <!-- {{ item.content }} -->
        <span v-html="item.content" />
        <el-button
          v-if="item.showReplyBtn"
          type="text"
          :class="theme === 'green'? 'green' : ''"
          @click="openReplyBottom(item,commentType)"
        >
          回复
        </el-button>
      </div>
    </div>
    <div v-if="showMore" class="reply_pagination">
      <el-pagination
        small
        :page-size="10"
        layout="prev, pager, next"
        :total="replyNumber"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 回复某个用户 -->
    <div v-if="showReply">
      <el-input
        v-model="textarea4"
        type="textarea"
        :autosize="{ minRows: 4 }"
        placeholder="请输入回复内容..."
      />
      <div class="comment_reply_bottom">
        <el-button @click="closeReplyBottom()">取消</el-button>
        <el-button type="primary" @click="sendReply()">发送</el-button>
      </div>
    </div>

    <!-- 查看更多 -->
    <div class="comment_reply_number">
      <div style="color: #999; margin-right: 10px;">共{{ replyNumber }}条回复</div>
      <div v-if="replyNumber > 3">
        <el-button v-if="showMore" type="text" size="medium" @click="closeMore()">收起</el-button>
        <el-button
          v-else
          :class="theme === 'green'? 'green' : ''"
          type="text"
          size="medium"
          @click="lookOverMore(commentType)"
        >
          点击查看更多
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMaterialCommentList,
  postAComment
} from '@/api/challenge/challengeDetail'
import { getUserComment } from '@/api/lesson/lesson'
import { Notification } from 'element-ui'
export default {
  props: {
    // 默认显示的最多三条评论
    initialReplyList: {
      required: true,
      type: Array
    },
    // 回复的总数
    replyNumber: {
      default: 0,
      required: true,
      type: Number
    },
    // 上传资料的编号
    materialId: {
      default: 0,
      required: true,
      type: Number
    },
    theme: {
      type: String,
      default: 'blue'
    },
    commentType: {
      type: String,
      default: 'CHALLENGE'
    }
  },
  data() {
    return {
      list: [],
      replyValue: {},
      page: 0,
      size: 10,
      showMore: false,
      total: 0,
      textarea4: '',
      showReply: false
    }
  },
  created() {
    this.list = this.initialReplyList
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.page = val - 1
      if (this.commentType === 'COURSE') {
        this.checkVice()
      } else {
        this.getReplyList()
      }
    },
    // 打开回复框
    openReplyBottom(value, type) {
      if (type === 'COURSE') {
        this.$parent.replyDouble(value.rootId, value.id, value.nickname)
      } else {
        this.replyValue = value
        this.showReply = true
        this.textarea4 = ''
      }
    },
    // 关闭回复框
    closeReplyBottom() {
      this.showReply = false
    },
    // 发送回复
    sendReply() {
      var data = {
        associationId: this.materialId,
        replyCommentId: this.replyValue.id,
        rootId: this.replyValue.id,
        content: this.textarea4,
        type: this.commentType
      }
      postAComment(data).then(res => {
        Notification.success({
          title: '回复成功，待管理员审核。'
        })
        this.showReply = false
      })
    },
    // 查看更多
    lookOverMore(type) {
      this.page = 0
      this.showMore = true
      if (type !== 'CHALLENGE') {
        // this.$emit('func', 1111)
        this.checkVice()
      }
      if (type === 'CHALLENGE') {
        this.getReplyList()
      }
    },
    // 课程二级回复
    checkVice() {
      const data = {
        size: this.size,
        page: this.page,
        rootId: this.materialId,
        sort: 'id,desc'
      }
      getUserComment(data).then(res => {
        this.list = res.content
        console.log(this.list)
      })
    },
    // 收起更多
    closeMore() {
      this.showMore = false
      this.list = this.initialReplyList
      this.page = 0
    },
    // 获取回复列表
    getReplyList() {
      var data = {
        associationId: this.materialId,
        page: this.page,
        size: this.size,
        commentType: 'CHALLENGE',
        sort: ['id,asc']
      }

      getMaterialCommentList(data).then(res => {
        this.list = res.content.map(item => {
          var newItem = {
            id: item.id,
            nickname: item.nickname,
            content: item.content,
            replyNickname: item.replyNickname,
            showReplyBtn: false
          }
          return newItem
        })
        this.total = res.numberOfElements
      })
    }
  }
}
</script>

<style lang="scss">
.reply_ring{
  .green {
    color: #2d8815 !important;
  }
  .reply_pagination {
    text-align: right;
    padding: 10px;
  }
  .el-pager li {
    background: none;
  }
  .el-pagination .btn-prev, .el-pagination .btn-next {
    background: none;
  }
  .reply_list_tab {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;

    .el-button--small {
      padding: 0;
    }

    .reply_username {
      color: #1890ff;
    }
  }
  .comment_reply_bottom {
    padding: 10px;
    text-align: right;
  }
  .comment_reply_number {
    display: flex;
    font-size: 14px;
    align-items: center;
  }
}
</style>
