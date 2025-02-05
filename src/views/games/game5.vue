<template>
  <div class="game">
    <crumbs />
    <div class="game-bg">
      <div v-for="(pageItem, index) in pageList" :key="pageItem.id">
        <div v-if="pageIndex === index">
          <el-image v-show="pageList[pageIndex].bg" :class="['bg', pageIndex === 0 || pageIndex === 1 || pageIndex === 12 ? '': 'animat1']" :src="pageList[pageIndex].bg" />
          <div :class="['game-btn', pageIndex === 0 ? 'initbtn' : pageIndex === 3 ? 'btna animat':'animat']" :style="pageList[pageIndex].style" @click="toNext(pageIndex)">{{ pageIndex === 0 ? '开始游戏' : pageIndex === 1 ? '下一步': pageIndex === 3 ? '序厅': pageIndex === 11 ? '结束': '继续游戏' }}</div>
          <div v-if="pageIndex ===0" class="game-btn init2btn" style="width: 364px; height: 72px; left: 37%; top: 54%; font-size: 36px; line-height: 72px; " @click="toNext(2, 'baike')">关于嘉定博物馆</div>
          <div v-if="pageIndex ===3" class="game-btn btnb animat" style="width: 260px; top: 34%; left: 35%" @click="toTs('博物馆管理员不在，请到序厅！')">嘉定历史文物展厅</div>
          <div v-if="pageIndex ===3" class="game-btn btnc animat" style="width: 240px; right: 20%; top: 35%;" @click="toTs('博物馆管理员不在，请到序厅！')">馆藏文物陈列区</div>
          <div v-if="pageIndex ===3" class="game-btn animat" style="right: 20%;bottom: 11%;" @click="toTs('博物馆管理员不在，请到序厅！')">继续游戏</div>
          <div v-if="pageList[pageIndex].list" class="game-select animat1" :style="pageList[pageIndex].listStyle">
            <div v-for="(selectItem, sI) in pageList[pageIndex].list" :key="selectItem.id">
              <div v-if="selectIndex === sI" class="game-select-box">
                <div class="game-select-box-title">{{ sI + 1 }}{{ "、" + selectItem.title }}</div>
                <div v-for="(im, iI) in selectItem.list" :key="im">
                  <div class="game-select-box-btn" @click="changeSelect(sI, iI, pageIndex)">{{ im }} </div>
                </div>
              </div>
            </div>
            <div v-show="pageList[pageIndex].bg" class="game-select-time animat1">
              <p>倒计时</p>
              {{ count }}
            </div>
          </div>
          <div v-if="pageIndex === 1" class="game-text" :style="pageList[pageIndex].titleStyle" v-html="pageList[pageIndex].title" />
          <template v-else>
            <div :class="['game-text', pageIndex === 0 ? '' : 'animat1']" :style="pageList[pageIndex].titleStyle">{{ pageText !== ''? pageText : pageList[pageIndex].title }}</div>
          </template>
        </div>
      </div>
      <div v-if="rightShow || errorShow" class="game-jieguo">
        <el-image v-show="rightShow" class="bg animat2" :src="pageList[13].bg" />
        <el-image v-show="errorShow" class="bg animat2" :src="pageList[14].bg" />
        <div class="game-text animat" :style="pageList[13].titleStyle">{{ rightShow ? '太棒了答对了，让我们继续吧。' : '真遗憾，这道题答错了，同学再来一次吧。' }}</div>
        <div class="game-btn animat" style="z-index: 7;width: 210px; height: 50px; line-height:50px; right: 20%; bottom: 12%" @click="goOn()">继续游戏</div>
      </div>
      <audio ref="audio" :src="BgAudio" loop class="display: none" />
    </div>
    <el-dialog
      title
      :visible.sync="dialogVisible"
      :center="true"
      :show-close="false"
      width="30%"
    >
      <div style="text-align: center; margin-top: 12px">
        <el-image
          style="heigt: 158px; width: 158px"
          :src="require('../../assets/game/mistake.gif')"
          alt
        />
      </div>
      <div style="text-align: center; margin-top: 12px">
        {{ dialogText }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="errorGoon()"
        >好 的</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title
      :visible.sync="dialogVisibleRight"
      :center="true"
      :show-close="false"
      width="30%"
    >
      <div style="text-align: center; margin-top: 12px">
        <el-image
          style="heigt: 160px; width: 120px"
          :src="require('../../assets/game5/child.png')"
          alt
        />
      </div>
      <div style="text-align: center; margin-top: 12px">
        {{ dialogText }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="rightGoon(pageIndex)"
        >继续游戏</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import crumbs from '../../components/crumbs/crumbs.vue'
import BgAudio from '../../assets/video/game5_bgm.mp3'
import { data } from './data5'

export default {
  components: {
    crumbs
  },
  data() {
    return {
      pageIndex: 0,
      oldPageIndex: null,
      selectIndex: 0,
      selectValue: '',
      rightShow: false,
      errorShow: false,
      timer: null,
      count: 0,
      pageList: data,
      dialogVisible: false,
      dialogVisibleRight: false,
      dialogText: '',
      pageText: '',
      isEnd: false,
      BgAudio
    }
  },
  mounted() {
    this.$refs.audio.play()
  },
  methods: {
    toNext(oldIndex, val) {
      if (oldIndex === 5 || oldIndex === 7 || oldIndex === 9) {
        this.selectValue = ''
        this.selectIndex = 0
      }
      if (oldIndex === 2 && val === 'baike') {
        // this.$refs.audio.play()
        this.pageIndex = 1
      } else if (oldIndex === 0 & !val) {
        // this.$refs.audio.play()
        this.pageIndex = 2
      } else if (oldIndex === 11) {
        this.$router.push({ path: '/games/index' })
      // } else if (oldIndex === 12) {
      //   this.oldPageIndex = 12
      //   this.pageIndex = 3
      // } else if (oldIndex === 2) {
      //   this.pageIndex = 12
      } else if ((oldIndex === 6 || oldIndex === 8 || oldIndex === 10) && ((this.selectIndex === 2 && this.selectValue !== '' && ((oldIndex === 6 && this.selectValue !== 1) || (oldIndex === 8 && this.selectValue !== 0) || (oldIndex === 10 && this.selectValue !== 1))) || this.selectIndex !== 2 || this.selectValue === '')) {
        this.$message.error('请完全正确回答三个问题后再继续！')
        return false
      // } else if (oldIndex === 6 && this.oldPageIndex === 6 && this.selectIndex === 2 && this.selectValue === 1) {
      //   this.selectValue = ''
      //   this.selectIndex = 0
      //   this.pageIndex = 7
      // } else if (oldIndex === 8 && this.oldPageIndex === 6 && this.selectIndex === 2 && this.selectValue === 0) {
      //   this.selectValue = ''
      //   this.selectIndex = 0
      //   this.pageIndex = 9
      // } else if (oldIndex === 10 && this.oldPageIndex === 10 && this.selectIndex === 2 && this.selectValue === 1) {
      //   this.selectValue = ''
      //   this.selectIndex = 0
      //   this.pageIndex = 11
      } else {
        ++this.pageIndex
      }
      clearInterval(this.timer)
      this.timer = null
      if ((oldIndex === 5 || oldIndex === 7 || oldIndex === 9) && this.selectIndex === 0) {
        this.getCOUNT(oldIndex)
      }
    },
    start() {
      this.$refs.audio.pause()
    },
    changeSelect(tIndex, newIndex, pageIndex) {
      this.selectIndex = tIndex
      this.selectValue = newIndex
      this.dialogText = ''
      if (pageIndex === 6 && newIndex === 1) {
        this.oldPageIndex = 6
        this.rightShow = true
        if (tIndex === 2) {
          this.isEnd = true
        }
      } else if (pageIndex === 6 && newIndex !== 1) {
        this.oldPageIndex = 6
        this.errorShow = true
      } else if (pageIndex === 8 && ((tIndex === 0 && newIndex === 2) || (tIndex === 1 && newIndex === 1) || (tIndex === 2 && newIndex === 0))) {
        this.oldPageIndex = 8
        this.rightShow = true
        if (tIndex === 2) {
          this.isEnd = true
        }
      } else if (pageIndex === 8) {
        this.oldPageIndex = 8
        this.errorShow = true
      } else if (pageIndex === 10 && ((tIndex === 0 && newIndex === 0) || (tIndex === 1 && newIndex === 1) || (tIndex === 2 && newIndex === 1))) {
        this.oldPageIndex = 10
        this.rightShow = true
      } else if (pageIndex === 10) {
        this.oldPageIndex = 10
        this.errorShow = true
        if (tIndex === 2) {
          this.isEnd = true
        }
      }
    },
    goOn() {
      if (this.errorShow) {
        this.selectValue = ''
        this.errorShow = false
        // if ((this.pageIndex === 6 || this.pageIndex === 8 || this.pageIndex === 10) && this.dialogText === '太遗憾了，时间超时，让我们再来一次吧！') {
        //   this.getCOUNT(this.pageIndex)
        // }
        return false
      }
      if (this.oldPageIndex === 6 && (this.selectIndex !== 2 || (this.selectIndex === 2 && this.selectValue !== 1))) {
        this.selectValue = ''
        this.selectIndex++
      } else if (this.oldPageIndex === 6 && this.oldPageIndex === 6 && this.selectIndex === 2 && this.selectValue === 1) {
        this.toRight('恭喜过关！让我们开始下一个环节问答吧。')
        this.selectValue = ''
        this.selectIndex = 0
        // this.pageIndex = 7
      } else if (this.oldPageIndex === 8 && (this.selectIndex !== 2 || (this.selectIndex === 2 && this.selectValue !== 0))) {
        this.selectValue = ''
        this.selectIndex++
      } else if (this.oldPageIndex === 8 && this.oldPageIndex === 8 && this.selectIndex === 2 && this.selectValue === 0) {
        this.toRight('恭喜过关！让我们开始下一个环节问答吧。')
        this.selectValue = ''
        this.selectIndex = 0
        // this.pageIndex = 9
      } else if (this.oldPageIndex === 10 && (this.selectIndex !== 2 || (this.selectIndex === 2 && this.selectValue !== 1))) {
        this.selectValue = ''
        this.selectIndex++
      } else if (this.oldPageIndex === 10 && this.selectIndex === 2 && this.selectValue === 1) {
        this.selectValue = ''
        this.selectIndex = 0
        this.pageIndex = 11
      }
      this.rightShow = false
    },
    rightGoon(pageIndex) {
      this.dialogVisibleRight = false
      this.pageIndex = pageIndex + 1
      this.isEnd = false
    },
    errorGoon() {
      this.dialogVisible = false
      if ((this.pageIndex === 6 || this.pageIndex === 8 || this.pageIndex === 10) && this.dialogText === '太遗憾了，时间超时，让我们再来一次吧！') {
        this.getCOUNT(this.pageIndex)
      }
    },
    getCOUNT(oldIndex) {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            if (this.isEnd) {
              console.log('完成了对了')
            } else {
              console.log('bbb')
              this.count--
            }
          } else {
            // this.pageIndex = oldIndex
            this.selectIndex = 0
            this.selectValue = ''
            this.rightShow = false
            this.errorShow = false
            this.isEnd = false
            this.toTs('太遗憾了，时间超时，让我们再来一次吧！')
            clearInterval(this.timer)
          }
        }, 1000)
      }
    },
    toTs(val) {
      this.dialogText = val
      this.dialogVisible = true
    },
    toRight(val) {
      this.dialogText = val
      this.dialogVisibleRight = true
    }
  }
}
</script>

<style lang="scss">
.animat{
    animation: zoom-in 3s cubic-bezier(0.42, 0, 0.21, 1) forwards;
    transform-origin: center center;
}
/* 缩小进入动画 */
.animat1 {
  animation: zoomin 2s ease-in-out;
  transform-origin: center center;
}
/* 缩小进入动画 */
.animat2 {
  animation: jieguo 1s ease-in-out;
  transform-origin: center center;
}
/* 缩小进入动画keyframes */
@keyframes zoom-in {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes zoomin {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes jieguo {
  from {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}
.game {
  position: relative;
  margin: 32px 0;
  min-height: 768px;
  .bg {
    width: 1366px;
    height: 768px;
  }
  &-bg{
    position: relative;
    margin: 32px 0;
    min-height: 768px;
    width: 1366px;
    z-index: 1;
  }
  &-btn{
    position: absolute;
    width: 200px;
    height: 64px;
    cursor: pointer;
    text-align: center;
    line-height: 64px;
    z-index: 3;
    background: url(../../assets/game5/pagebtn.png) no-repeat center;
    background-size: auto 64px;
    font-size: 28px;
    color: #314054;
    // border: 1px solid #f00;
  }
  &-btn:hover{
    background: url(../../assets/game5/pagebtnon.png) no-repeat center;
    background-size: auto 64px;
  }
  &-btn:hover::after{
    position: absolute;
    left: -60px;
    top: 50%;
    content: '';
    width: 60px;
    height: 45px;
    background: url(../../assets/game5/mouse.png) no-repeat right center;
    background-size: 100%;
    margin-top:-23px;
  }
  .btna{
    background: url(../../assets/game5/page3-btn.png) no-repeat center;
    background-size: auto 64px;
  }
  .btna:hover{
    background: url(../../assets/game5/page3-btnon.png) no-repeat center;
    background-size: auto 64px;
  }
  .btnb{
    background: url(../../assets/game5/page3-btn2.png) no-repeat center;
    background-size: auto 64px;
  }
  .btnb:hover{
    background: url(../../assets/game5/page3-btn2on.png) no-repeat center;
    background-size: auto 64px;
  }
  .btnc{
    background: url(../../assets/game5/page3-btn3.png) no-repeat center;
    background-size: auto 64px;
  }
  .btnc:hover{
    background: url(../../assets/game5/page3-btn3on.png) no-repeat center;
    background-size: auto 64px;
  }
  .initbtn{
    background: url(../../assets/game5/btn.png) no-repeat center;
    background-size: auto 72px;
  }
  .initbtn:hover{
    background: url(../../assets/game5/btnon.png) no-repeat center;
    background-size: auto 72px;
  }
  .init2btn{
    background: url(../../assets/game5/initbtn.png) no-repeat center;
    background-size: auto 72px;
  }
  .init2btn:hover{
    background: url(../../assets/game5/initbtnon.png) no-repeat center;
    background-size: auto 72px;
  }
  &-select{
    position: absolute;
    left: 30.4%;
    top: 15%;
    right: 17.5%;
    // border: 1px solid #f00;
    height: 300px;
    overflow: hidden;
    &-box{
      position: relative;
      width: 300px;
      font-size: 28px;
      &-title{
        line-height: 30px;
        font-size: 18px;
        margin-top: 20px;
      }
      &-btn{
        height: 48px;
        line-height: 48px;
        margin-top: 20px;
        background: url(../../assets/game5/btn.png) no-repeat center;
        background-size: auto 100%;
        cursor: pointer;
        // border: 1px solid #f00;
        color: #555555;
        text-align: center;
      }
      &-btn:hover{
        background: url(../../assets/game5/btnon.png) no-repeat center;
        background-size: auto 100%;
      }
    }
    &-time{
      position: absolute;
      right: 0;
      top: 140px;
      width: 262px;
      height: 100px;
      // border: 1px solid #f00;
      text-align: center;
      font-weight: bold;
      font-size: 40px;
    }
  }
  &-text{
    position: absolute;
    z-index: 2;
    top: 65%;
    line-height: 52px;
    font-size: 30px;
    p{
      text-indent: 2em;
    }
  }
  &-jieguo{
    position: absolute;
    left: 0;
    top:0;
    z-index: 6;
  }
}

</style>
