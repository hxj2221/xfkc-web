<template>
  <div class="game">
    <crumbs />
    <div class="game">
      <template v-if="cur.bg">
        <el-image class="bg" :src="cur.bg" alt="" @click="bgNext" />
        <div v-if="cur.chats && chatIndex < cur.chats.length">
          <div class="chat" @click="chatClick">
            <el-image v-if="cur.chats[chatIndex].avatar" :src="cur.chats[chatIndex].avatar" class="chat-avatar" />
            <div class="chat-message">{{ cur.chats[chatIndex].message }}</div>
          </div>
        </div>
        <div v-else-if="cur.text" class="text" @click="bgNext">
          {{ cur.text }}
          <el-button type="primary" class="btn">继续游戏</el-button>
        </div>
        <div v-else-if="cur.selects && !showTip" class="select_box">
          <el-button v-for="select in cur.selects" :key="select.title" :style="{width: select.title.length + 'em'}" class="select" @click="btnNext(select)">
            <el-image class="select-img" :src="ButtonIcon" mode="fill" />
            <span class="select-title">{{ select.title }}</span>
          </el-button>
        </div>
        <div v-if="showTip" class="text">{{ showTip }}</div>
      </template>
      <video v-else-if="cur.cg" class="video" :src="cur.cg" autoplay @play="start" @ended="next" />
      <audio ref="audio" :src="BgAudio" class="display: none" />
    </div>
  </div>
</template>

<script>
import crumbs from '../../components/crumbs/crumbs.vue'
import { finishGame } from '@/api/game/game'
import ButtonIcon from '../../assets/koutu/按钮.png'
import BgAudio from '../../assets/video/背景音乐1 56号小老大.mp3'
import { data } from './data2'

export default {
  components: {
    crumbs
  },
  data() {
    return {
      last: null,
      cur: data,
      chatIndex: 0,
      showTip: '',
      ButtonIcon,
      BgAudio
    }
  },
  watch: {
    cur() {
      this.chatIndex = 0
    }
  },
  mounted() {
    this.$refs.audio.play()
  },
  methods: {
    btnNext(select) {
      if (select.title === '获得成就') {
        this.$message.success('恭喜获得成就')
        return
      }

      if (select.tip) {
        this.showTip = select.tip
      } else {
        this.last = this.cur
        this.cur = select.next
      }
    },
    next() {
      this.last = this.cur
      this.cur = this.cur.next
      this.$refs.audio.play()
    },
    bgNext() {
      if (this.cur.back) {
        this.cur = this.last
        this.chatIndex = this.chats?.length
        return
      }
      if (!this.cur.selects && !this.showTip && !this.cur.video && (!this.cur.chats || (this.chatIndex >= this.cur.chats.length))) {
        this.last = this.cur
        this.cur = this.cur.next
      }
      if (this.showTip) {
        this.showTip = ''
      }
    },
    chatClick() {
      if (this.cur.back && this.chatIndex >= this.cur.chats?.length - 1) {
        this.cur = this.last
        this.$nextTick(() => {
          this.chatIndex = this.cur.chats?.length
        })

        return
      }
      ++this.chatIndex
    },
    start() {
      this.$refs.audio.pause()
    }
  }
}
</script>

<style lang="scss">

.game {
  position: relative;
  margin: 32px 0;
  min-height: 768px;

  .bg {
    width: 1366px;
    height: 768px;
  }
  .video {
    width: 1366px;
    height: 768px;
  }
  .text {
    position: absolute;
    bottom: 20px;
    width: 80%;
    word-break: break-all;
    left: 10%;
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 16px;
    font-size: 28px;
    color: #fff;
    padding: 12px;
    line-height: 40px;
    user-select: none;
    padding-bottom: 40px;

    .btn {
      position: absolute;
      bottom: 10px;
      right: 22px;
      font-size: 16px;
    }
  }
  .chat {
    position: absolute;
    bottom: 20px;
    width: 80%;
    left: 10%;
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 16px;
    padding: 36px;
    display: flex;
    height: 200px;
    gap: 24px;

    &-avatar {
      width: 101px;
      height: 129px;
    }
    &-message {
      word-break: break-all;
      font-size: 28px;
      color: #fff;
      line-height: 40px;
      user-select: none;
    }
  }

  .select_box {
    position: absolute;
    bottom: 80px;
    width: 100%;
    display: flex;
    justify-content: space-around;

    .select {
      min-width: 212px;
      height: 75px;
      color: rgb(255, 192, 68);
      font-size: 20px;
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &-img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 100px);
        height: 75px;
      }

      &-title {
        position: relative;
        z-index: 100;
        top: 4px;
      }
    }
  }
}

</style>
