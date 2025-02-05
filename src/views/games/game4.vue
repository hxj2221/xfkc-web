<template>
  <div class="game">
    <crumbs />
    <div class="game-bg">
      <div v-for="(pageItem, index) in pageList" :key="pageItem.id">
        <div v-show="pageIndex === index">
          <el-image v-show="pageList[pageIndex].bg" :class="['bg', pageIndex === 0 || pageIndex === 1 ? '' : 'animat1']" :src="pageList[pageIndex].bg" />
          <div :class="['game-btn', pageIndex === 0 ? '' : 'animat']" :style="pageList[pageIndex].style" @click="toNext(pageIndex)">{{ pageIndex === 0 ? '【开始游戏】': '继续游戏' }}</div>
          <div v-if="pageIndex === 0" class="game-btn" style="width: 350px; height: 50px; left: 38%; top: 64.6%; background: none; font-size: 46px;font-weight: bold;letter-spacing: 4px;line-height: 50px;" @click="toNext(2, 'baike')">【竹刻小百科】</div>
          <div v-if="pageIndex === 1" class="game-baike">
            <div v-for="(selectItem, bi) in pageList[pageIndex].list" :key="selectItem.title">
              <div class="game-baike-btn" @click="toBaike(bi)">【{{ selectItem.title }}】</div>
              <div v-if="baikeIndex === bi" class="game-baike-box">
                <div class="game-baike-box-title">{{ selectItem.title }}</div>
                <div class="game-baike-box-text">{{ selectItem.text }}</div>
              </div>
            </div>
          </div>
          <div v-if="pageIndex === 14" class="game-btn animat" style="left: 50%;bottom: 6%;" @click="toNext(17)">结束</div>
          <div v-if="pageIndex !== 1 && pageIndex !== 5&& pageList[pageIndex].list" class="game-select animat1" :style="pageList[pageIndex].listStyle">
            <div v-if="pageIndex !== 12" class="game-select-box">
              <div v-for="(selectItem, sI) in pageList[pageIndex].list" :key="selectItem.bg">
                <div class="game-select-box-btn" @click="changeSelect(sI, pageIndex, selectItem.text)">{{ selectItem.title }}</div>
              </div>
            </div>
            <div v-for="(selectItem, sI) in pageList[pageIndex].list" :key="selectItem.bg">
              <el-image v-show="selectIndex === sI || (pageIndex === 12 && page12Index === sI)" class="game-select-img animat2" :style="pageIndex === 12 ? pageList[pageIndex].imgStyle: ''" :src="selectItem.bg" />
            </div>
          </div>
          <div v-if="pageIndex === 5 && pageList[pageIndex].list" class="game-select animat1" :style="pageList[pageIndex].listStyle">
            <div v-for="(selectItem, sI) in pageList[pageIndex].list" :key="selectItem.text" class="game-select-btn" @click="changeSelect(sI, pageIndex, selectItem.text)" />
          </div>
          <div v-if="pageList[pageIndex].title" :class="['game-text', pageIndex === 0 ? '' : 'animat1']" :style="pageList[pageIndex].titleStyle">{{ pageText !== ''? pageText : pageList[pageIndex].title }}</div>
          <div v-if="pageIndex === 11" class="game-text animat" style="right: 54%;left: 25.4%;top: 11%;font-size: 26px;line-height: 44px;">请选择抛光工具的使用先后顺序进行选择：</div>
        </div>
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
          @click="closedialog"
        >知道了</el-button>
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
          @click="goon(pageIndex)"
        >继续游戏</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import crumbs from '../../components/crumbs/crumbs.vue'
import BgAudio from '../../assets/video/game4_bgm.mp3'
import { data } from './data4'

export default {
  components: {
    crumbs
  },
  data() {
    return {
      pageIndex: 0,
      selectIndex: -1,
      selectList: [],
      page12Index: null,
      baikeIndex: null,
      pageList: data,
      dialogVisible: false,
      dialogVisibleRight: false,
      dialogText: '',
      pageText: '',
      BgAudio
    }
  },
  mounted() {
    this.$refs.audio.play()
  },
  methods: {
    toNext(oldIndex, val) {
      if (oldIndex === 2 && val === 'baike') {
        this.pageIndex = 1
        // this.$refs.audio.play()
      } else if (oldIndex === 0 && !val) {
        // this.$refs.audio.play()
        this.pageIndex = 2
      } else if (oldIndex === 1 && this.baikeIndex === 0 || this.baikeIndex) {
        this.baikeIndex = null
      } else if (oldIndex === 5 && this.selectIndex !== 2) {
        this.$message.error('请选择合适的毛竹再继续！')
        return false
      } else if (oldIndex === 5 && this.selectIndex === 2) {
        this.pageText = ''
        ++this.pageIndex
      } else if (oldIndex === 7 && this.selectIndex < 0) {
        this.$message.error('请选择答案后再继续！')
        return false
      } else if (oldIndex === 7 && this.selectIndex === 1 && !this.dialogVisibleRight) {
        this.dialogText = '时间正好！让我们继续吧!'
        this.dialogVisibleRight = true
      } else if (oldIndex === 7 && (this.selectIndex === 0 || this.selectIndex === 2)) {
        this.dialogText = this.selectIndex === 0 ? '煮的太久了，竹子变得太软了' : '煮的时间不够，竹子还太硬'
        this.dialogVisible = true
      } else if (oldIndex === 8 && this.selectIndex === 2) {
        this.dialogText = '这一次用刀不深不浅，正合适！让我们继续吧!'
        this.dialogVisibleRight = true
      } else if (oldIndex === 8 && this.selectIndex !== 2) {
        this.dialogText = this.selectIndex === 0 ? '大力雕刻，用力过度，竹子裂开了！' : '轻轻入刀，痕迹太浅，一点都不立体。'
        this.dialogVisible = true
      } else if (oldIndex === 15 && this.oldPageIndex === 8) {
        this.pageIndex = 9
      } else if (oldIndex === 16 && this.oldPageIndex === 8) {
        this.pageIndex = 8
      } else if (oldIndex === 9 && this.selectIndex < 0) {
        this.$message.error('请选择你的工艺手法！')
        return false
      } else if (oldIndex === 9 && this.selectIndex > -1) {
        this.pageIndex = 10
        this.page12Index = this.selectIndex
      } else if (oldIndex === 11 && this.selectIndex < 0) {
        this.$message.error('请选择抛光工具的使用顺序！')
        return false
      } else if (oldIndex === 11 && this.selectIndex === 1 && this.selectList.join('') === '201') {
        this.dialogText = '恭喜选择正确，让我们继续吧!'
        this.dialogVisibleRight = true
      } else if (oldIndex === 11 && (this.selectIndex !== 1 || (this.selectIndex === 1 && this.selectList.join('') !== '201'))) {
        this.dialogText = '使用顺序选择有误，请重新选择哦！'
        this.dialogVisible = true
      } else if (oldIndex === 14) {
        this.pageIndex = 0
        this.start()
      } else if (oldIndex === 17) {
        this.$router.push({ path: '/games/index' })
      } else {
        ++this.pageIndex
      }
      if (oldIndex === 7 && this.selectIndex === 1) {
        console.log('保留答案')
      } else {
        this.selectIndex = -1
      }
    },
    start() {
      this.$refs.audio.pause()
    },
    changeSelect(newIndex, pageIndex, text) {
      this.selectIndex = newIndex
      if (pageIndex === 5 || pageIndex === 7 || pageIndex === 8 || pageIndex === 11) {
        this.pageText = text
      }
      if (pageIndex === 11) {
        this.selectList.push(newIndex)
      }
    },
    toBaike(index) {
      this.baikeIndex = index
      console.log('this.baikeIndex', this.baikeIndex)
    },
    closeBaike() {
      this.baikeIndex = null
    },
    closedialog() {
      if (this.pageIndex === 11) {
        this.selectList = []
      }
      this.selectIndex = -1
      this.dialogVisible = false
    },
    goon() {
      this.dialogVisibleRight = false
      this.dialogText = ''
      this.pageText = ''
      this.selectIndex = -1
      this.pageIndex++
    }
  }
}
</script>

<style lang="scss">
.animat{
    animation: zoom-in 4s cubic-bezier(0.42, 0, 0.21, 1) forwards;
    transform-origin: center center;
}
/* 缩小进入动画 */
.animat1 {
  animation: zoomin 3s ease-in-out;
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
  font-family: '华文楷体', 'STKaiti';
  .bg {
    width: 1366px;
    height: 768px;
  }
  &-bg{
    position: relative;
    margin: 32px 0;
    min-height: 768px;
    width: 1366px;
    background: url(../../assets/game4/bg.jpg) no-repeat center;
    background-size: 100%;
    overflow: hidden;
    z-index: 1;
  }
  &-btn{
    position: absolute;
    width: 204px;
    height: 68px;
    cursor: pointer;
    z-index: 4;
    background: url(../../assets/game4/btn.png) no-repeat center;
    background-size: auto 64px;
    text-align: center;
    line-height: 60px;
    font-size: 32px;
  }
  &-btn:hover{
    background: url(../../assets/game4/btnon.png) no-repeat center;
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
    background-size: 100% auto;
    margin-top:-23px;
  }
  &-select{
    position: absolute;
    left: 25%;
    top: 15%;
    right: 17.5%;
    &-box{
      width:280px;
      &-btn{
        height: 54px;
        margin-top: 6px;
        cursor: pointer;
        position: relative;
        background: url(../../assets/game5/btn.png) no-repeat center;
        background-size: auto 100%;
        text-align: center;
        line-height: 50px;
        font-size: 26px;
      }
      &-btn:hover{
        background: url(../../assets/game5/btnon.png) no-repeat center;
        background-size: auto 100%;
      }
    }
    &-img{
      position: absolute;
      right: 0;
      top: 0;
      width: 298px;
      height: 308px;
    }
    &-btn{
      display: inline-block;
      width: 280px;
      height: 350px;
      cursor: pointer;
      position: relative;
      box-sizing: border-box;
    }
    &-btn + &-btn {
      margin-left: 120px;
    }
    &-btn:hover::after{
      position: absolute;
      right: -40px;
      top: 50%;
      content: '';
      width: 60px;
      height: 45px;
      background: url(../../assets/game5/mouse.png) no-repeat right center;
      background-size: 100% auto;
      margin-top:-23px;
    }
  }
  &-text{
    position: absolute;
    z-index: 3;
    top: 68%;
    line-height: 52px;
    font-size: 30px;
  }
  &-baike{
    position: absolute;
    top: 20%;
    left: 27%;
    right: 22%;
    bottom: 13%;
    &-btn{
      display: block;
      width: 260px;
      height: 54px;
      margin: 0 auto 52px;
      cursor: pointer;
      font-size: 38px;
      font-weight: bold;
      line-height: 54px;
      letter-spacing: 4px;
    }
    &-box{
      position: absolute;
      width: 100%;
      height: 100%;
      top: -6%;
      left: 0;
      background: url(../../assets/game4/page1-bg.jpg) no-repeat top;
      background-size: 100%;
      &-title{
        text-align: center;
        padding: 20px;
        font-size: 30px;
        font-weight: bold;
      }
      &-text{
        text-align: justify;
        font-size: 18px;
        line-height: 36px;
        text-indent: 2em;
        height: 470px;
        border: 1px solid #f00;
      }
    }
  }
}

</style>
