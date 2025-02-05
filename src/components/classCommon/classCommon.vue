<template>
  <div class="comment_ring">
    <div class="personal box-flex">
      <el-avatar shape="circle" icon="el-icon-user-solid" :size="40" :src="user.avatarName ? baseApi + '/avatar/' + user.avatarName : Avatar" />
      <div style="margin-left: 10px">{{ user.nickName }}</div>
    </div>
    <div class="comment">
      <el-input
        id="add"
        v-model="commentContent"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 4 }"
        :placeholder="placeholder"
      />
      <div class="expression">
        <span class="expression-submit" :class="userType === 'blue' ? 'blue_back' : ''" @click="sentComment">发布</span>
        <span class="expression-content" :class="userType === 'blue' ? 'blue-type' : ''">
          <span class="box-flex">
            <el-image v-if="userType === 'blue'" :src="require('../../assets/lesson/biaoqing.png')" alt style="height:30px;width:30px" @click="showMoji" />
            <el-image v-else :src="require('../../assets/lesson/grsmile.png')" alt style="height:30px;width:30px" @click="showMoji" />
            <div style="" @click="changeExpression">表情</div>
          </span>
          <VEmojiPicker v-show="showFace" class="face" @select="selectEmoji" />
          <div v-show="moji" class="moji">
            <el-image
              v-for="item in mojiList"
              :key="item.id"
              class="moji-item"
              :src="baseApi + '/file/' + item.emojiUrl"
              alt=""
              @click="selectemoji(item.emojiUrl)"
            />
            <div class="mojiPage">
              <el-pagination
                :current-page.sync="currentPage"
                :page-size="size"
                :prev-text="'上一页'"
                :next-text="'下一页'"
                layout="slot,prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </span>
      </div>
    </div>
    <div v-for="(item, index) in commentList" :key="index" class="content">
      <div class="content-person box-flex">
        <el-image
          :src="
            item.mainComment.avatarName
              ? baseApi + '/avatar/' + item.mainComment.avatarName
              : Avatar
          "
          alt
        />
        <span class="name">{{ item.mainComment.nickname }}</span>
        <a
          class="reply"
          @click="replyComment(item.mainComment.id, item.mainComment.nickname)"
        >回复</a>
        <span class="time">{{ item.mainComment.updateTime }}</span>
      </div>
      <div class="content-text">
        <span class="content-text-img" v-html="item.mainComment.content" />
        <comment-reply-list
          v-if="item.subComments.length> 0"
          style="margin-top:10px"
          :initial-reply-list="item.subComments"
          :reply-number="item.totalCommentsNum"
          :material-id="item.mainComment.id"
          :comment-type="typeNumber"
          @func="getMsgFormSon"
        />
      </div>
    </div>
    <el-pagination
      style="text-align:right"
      :current-page.sync="currentPageHost"
      :page-size="hostSize"
      :prev-text="'上一页'"
      :next-text="'下一页'"
      layout="slot,prev, pager, next, jumper"
      :total="hostTotal"
      @size-change="hostSizeChange"
      @current-change="hostCurrentChange"
    />
    <!-- dialog -->
    <el-dialog
      title
      :visible.sync="dialogVisible2"
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
      <div style="text-align: center; margin-top: 12px">请等待管理员审核!</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="closeDialog"
        >好 的</el-button>
      </span>
    </el-dialog>
    <!-- 不能为空 -->
    <el-dialog
      title
      :visible.sync="dialogVisible3"
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
      <div style="text-align: center; margin-top: 12px">评论不能为空哦</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="closeDialog"
        >好 的</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { VEmojiPicker } from 'v-emoji-picker'
import Avatar from '@/assets/images/avatar.png'
import commentReplyList from '@/views/challenge/components/commentReplyList.vue'
import { getAllComment, sentComment, getMoji } from '@/api/lesson/lesson'
// import { Notification } from 'element-ui'
export default {
  name: 'ClassCommon',
  components: {
    VEmojiPicker,
    commentReplyList
  },
  props: {
    // 关联的ID
    associationId: {
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
    userType: {
      default: 'green',
      type: String
    },
    // 评论类型
    // COURSE：课程、CHALLENGE：挑战、HARD_WARE：硬件资源
    typeNumber: {
      default: 'COURSE',
      type: String
    }
  },
  data() {
    return {
      dialogVisible3: false,
      dialogVisible2: false,
      Avatar: Avatar,
      commentContent: '', // 评论内容
      showFace: false,
      moji: false, // 表情
      mojiList: [],
      currentPage: 1,
      placeholder: '沟通是进步的源泉，开始讨论的第一步吧!',
      commentList: [], // 评论列表
      size: 5,
      total: 0,
      currentPageHost: 1, // 主回复页码
      hostSize: 3,
      hostTotal: 0,
      // viceList: {}, // 二级评论
      showVice: false // 是否显示二级评论
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'user']),
    headers() {
      return {
        Authorization: getToken()
      }
    }
  },
  created() {
    this.lessonId = this.$route.query.id
    this.roleId = Number(this.$store.state.user.roleId)
    this.getAllComment()
    this.getMoji()
  },
  methods: {
    getMsgFormSon(data) {
      console.log(data)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 时间戳转换
    timeFormat(timestamp) {
      function add0(m) {
        return m < 10 ? '0' + m : m
      }
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return (
        year +
        '-' +
        add0(month) +
        '-' +
        add0(date) +
        ' ' +
        add0(hours) +
        ':' +
        add0(minutes) +
        ':' +
        add0(seconds)
      )
    },
    // 回复评论
    replyComment(id, user) {
      this.commentContent = ''
      window.scrollTo(0, 1000)
      this.placeholder = '@' + user
      this.genComment = id
    },
    // 回复回复
    replyDouble(genid, id, user) {
      this.commentContent = ''
      window.scrollTo(0, 1000)
      this.placeholder = '@' + user
      this.genComment = genid
      this.goalComment = id
    },
    // 获取一级评论列表
    getAllComment() {
      const params = {
        associationId: this.lessonId,
        type: this.typeNumber,
        page: this.currentPageHost - 1,
        size: this.hostSize
        // sort: 'id,desc'
      }
      getAllComment(params)
        .then((res) => {
          this.hostTotal = res.totalElements
          this.commentList = res.content
          this.commentList.forEach((i) => {
            // i.subComments = i.subComments.reverse()
            i.mainComment.updateTime = this.timeFormat(
              i.mainComment.updateTime
            )
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 获取表情包
    getMoji() {
      const params = {
        page: this.currentPage - 1,
        size: this.size,
        sort: ''
      }
      getMoji(params).then((res) => {
        this.mojiList = res.content
        this.total = res.totalElements
        console.log(this.mojiList)
      })
    },
    selectEmoji(emoji) {
      this.commentContent = this.commentContent + emoji.data
    },
    selectemoji(val) {
      this.commentContent1 =
        '<el-image :src="' + this.baseApi + '/file/' + val + '" alt />'
      this.sentComment(1)
      // this.commentContent + (this.baseApi + '/file/' + val)
    },
    // 发表评论
    sentComment(val) {
      const commonetContentBody = {
        replyCommentId: this.goalComment ? this.goalComment : null,
        rootId: this.genComment ? this.genComment : null,
        associationId: this.lessonId,
        content: this.commentContent,
        type: this.typeNumber
      }
      if (val === 1) {
        commonetContentBody.content = this.commentContent1
      }
      if (this.commentContent === '' && this.commentContent1 === '') {
        this.dialogVisible3 = true
        return
      }
      sentComment(commonetContentBody)
        .then((res) => {
          this.getAllComment() // 一级评论
          this.dialogVisible2 = true
          this.showFace = false
          this.emoji = false
          this.placeholder = '沟通是进步的源泉，开始讨论的第一步吧!'
          this.commentContent1 = ''
        })
        .catch((error) => {
          console.log(error)
          this.placeholder = '沟通是进步的源泉，开始讨论的第一步吧!'
          this.commentContent1 = ''
          this.showFace = false
          this.emoji = false
        })
    },
    // 打开小黄脸
    showMoji() {
      this.moji = false
      this.showFace = !this.showFace
    },
    // 表情弹出
    changeExpression() {
      this.showFace = false
      this.moji = !this.moji
    },

    handleSizeChange() {
      this.getMoji()
    },
    handleCurrentChange() {
      this.getMoji()
    },
    closeDialog() {
      this.commentContent = ''
      this.dialogVisible2 = false
      this.dialogVisible3 = false
    },
    // 分页
    hostSizeChange() {
      this.getAllComment()
    },
    hostCurrentChange() {
      this.getAllComment()
    }
  }
}
</script>

<style lang="scss">
.personal {
  color: #242424;
  font-size: 18px;
  font-weight: bold;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }
}
.blue-type {
  color: #0353a1 !important;
}
.blue_back {
  background: #0353a1 !important;
}
.comment {
  margin-top: 16px;
  .expression {
    margin-top: 17px;
    padding-bottom: 22px;
    border-bottom: 1px solid #cfcfcf;
    .expression-content {
      position: relative;
      float: right;
      margin-top: 8px;
      color: #2d8815;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      .face {
        z-index: 999;
        position: absolute;
        right: -40px;
        top: 34px;
      }
      .moji {
        position: absolute;
        padding: 25px 22px;
        width: 500px;
        height: 180px;
        border-radius: 10px;
        box-shadow: 0 0 10px #eee;
        left: -150px;
        top: 40px;
        background-color: #f4f4f4;
        .mojiPage {
          margin-top: 20px;
          text-align: center;
        }
        .moji-item {
          width: 80px;
          height: 80px;
        }
      }
      img {
        vertical-align: middle;
        margin-right: 11px;
      }
    }
    .expression-submit {
      float: right;
      margin-left: 20px;
      width: 125px;
      height: 42px;
      background-color: #2d8815;
      text-align: center;
      color: #fff;
      font-size: 18px;
      line-height: 42px;
      border-radius: 20px;
      cursor: pointer;
    }
    &:after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
}
.content {
  border-top: 1px solid #e6e6e6;

  .content-person {
    padding-top: 24px;
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin-right: 10px;
      border-radius: 50%;
    }
    .name {
      color: #242424;
      font-size: 18px;
      font-weight: bold;
    }
    .time {
      margin-left: auto;
      color: #b4b4b4;
      line-height: 41px;
      font-size: 16px;
    }
    .reply {
      font-size: 16px;
      color: #707070;
      cursor: pointer;
      margin-left: 6px;
      &:hover {
        color: #1890ff;
      }
    }
    // .reply:hover {
    //     color: #1890ff;
    // }
  }
  .content-text {
    margin-top: 1px;
    margin-left: 60px;
    margin-bottom: 24px;
    font-size: 16px;
    color: #707070;
    .content-text-img {
      /deep/ img {
        height: 80px;
        width: 80px;
      }
    }
    .reply {
      margin-top: 17px;
      background: #f8f8f8;
      padding: 10px;

      .reply-title {
        img {
          width: 47px;
          height: 47px;
          vertical-align: middle;
        }
        .name {
          font-size: 16px;
          margin: 0 15px;
          color: #242424;
          font-weight: bold;
          vertical-align: middle;
        }
      }
      .reply-content {
        color: #707070;
        margin-top: 12px;
        margin-left: 65px;
        font-size: 16px;
        .reply-content-img {
          /deep/ img {
            height: 80px;
            width: 80px;
          }
        }
      }
    }
  }
}
.box-flex {
   display: flex;
   align-items: center;
}
</style>
