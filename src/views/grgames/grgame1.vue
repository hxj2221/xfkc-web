<template>
  <div class="game">
    <grcrumbs />
    <!-- <video class="video" src="../../assets/video/game.mp4" controls="controls" /> -->
    <el-image class="video" :src="src" alt="" @click="nextPic" />
    <div class="ceng1" @click="cengSelect(1)">{{ ceng.first }}</div>
    <div class="ceng2" @click="cengSelect(2)">{{ ceng.second }}</div>
    <div class="ceng3" @click="cengSelect(3)">{{ ceng.third }}</div>
    <div class="ceng4" @click="cengSelect(4)">{{ ceng.forth }}</div>
    <div class="ceng5" @click="cengSelect(5)">{{ ceng.fifth }}</div>
    <div
      v-if="select === 0"
      class="brush"
      @click="addSelect"
      @mouseover="mouseOver"
      @mouseleave="mouseLeave"
    />
    <div
      v-if="select === 15 || select === 17 || select === 21 || select === 30"
      class="brush1"
      @click="addSelect(1)"
      @mouseover="mouseOver1"
      @mouseleave="mouseLeave1"
    />
    <div
      v-if="select === 15 || select === 17"
      class="brush2"
      @click="addSelect(2)"
      @mouseover="mouseOver2"
      @mouseleave="mouseLeave2"
    />

    <template>
      <img v-if="select === 1" class="gif-image select1" :src="require('@/assets/game/04.gif')" alt="">
      <img v-if="select === 22" class="gif-image select2" :src="require('@/assets/game/03s.gif')" alt="">
      <img v-if="select === 31" class="gif-image select3" :src="require('@/assets/game/06s.gif')" alt="">
    </template>

    <transition name="fade">
      <el-image
        v-if="firstPage"
        class="pen"
        :src="require('../../assets/game/select.png')"
        alt=""
        @click="addSelect"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
      />
    </transition>
    <transition name="fade">
      <el-image
        v-if="secondPage"
        class="pen1"
        :src="require('../../assets/game/select.png')"
        alt=""
        @click="addSelect(1)"
        @mouseover="mouseOver1"
        @mouseleave="mouseLeave1"
      />
    </transition>
    <transition name="fade">
      <el-image
        v-if="thirdPage"
        class="pen2"
        :src="require('../../assets/game/select.png')"
        alt=""
        @click="addSelect(2)"
        @mouseover="mouseOver2"
        @mouseleave="mouseLeave2"
      />
    </transition>
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
      <div style="text-align: center; margin-top: 12px">已获得游戏成就</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisible1 = false"
        >好 的</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title
      :visible.sync="dialogVisible"
      :center="true"
      width="30%"
      :before-close="handleClose1"
    >
      <div style="text-align: center; margin-top: 12px">
        <el-image
          style="heigt: 158px; width: 158px"
          :src="require('../../assets/game/mistake.gif')"
          alt
        />
      </div>
      <div style="text-align: center; margin-top: 12px">
        选错了哦，请重新选择！
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >好 的</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import { finishGame } from '@/api/game/game'
export default {
  components: {
    grcrumbs
  },
  data() {
    return {
      select: 0,
      ceng: {
        first: '',
        second: '',
        third: '',
        forth: '',
        fifth: ''
      },
      src: require('../../assets/game/0.jpg'),
      dialogVisible: false,
      dialogVisible1: false,
      brush: 'brush',
      firstPage: false,
      secondPage: false,
      thirdPage: false,
      num: 1
    }
  },
  methods: {
    cengSelect(val) {
      if (this.num < 6) {
        switch (val) {
          case 1:
            this.ceng.first = this.num
            break
          case 2:
            this.ceng.second = this.num
            break
          case 3:
            this.ceng.third = this.num
            break
          case 4:
            this.ceng.forth = this.num
            break
          case 5:
            this.ceng.fifth = this.num
            break
        }
        this.num++
      }
    },
    addSelect(val) {
      if (this.select === 15) {
        if (val === 2) {
          this.dialogVisible = true
          return
        }
      }
      if (this.select === 17) {
        if (val === 1) {
          this.dialogVisible = true
          return
        }
      }
      this.select++
      this.firstPage = false
      this.secondPage = false
      this.thirdPage = false
      this.nextPic(1)
    },
    nextPic(val) {
      if (
        this.select === 0 ||
        this.select === 15 ||
        this.select === 17 ||
        this.select === 21 ||
        this.select === 30
      ) {
        return
      }
      if (val === 1) {
        this.src = require('../../assets/game/' + this.select + '.jpg')
        this.ceng.first = this.ceng.second = this.ceng.third = this.ceng.forth = this.ceng.fifth =
          ''
      } else {
        if (this.select !== 31) {
          this.src = require('../../assets/game/' + ++this.select + '.jpg')
          this.ceng.first = this.ceng.second = this.ceng.third = this.ceng.forth = this.ceng.fifth =
            ''
        } else {
          this.finishGame()
        }
      }
    },
    finishGame() {
      finishGame().then((res) => {
        if (res.id) {
          this.dialogVisible1 = true
        }
      })
    },
    mouseOver() {
      this.firstPage = true
    },
    mouseLeave() {
      this.firstPage = false
    },
    mouseOver1() {
      this.secondPage = true
    },
    mouseLeave1() {
      this.secondPage = false
    },
    mouseOver2() {
      this.thirdPage = true
    },
    mouseLeave2() {
      this.thirdPage = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleClose1(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<style lang="scss">
.game {
  position: relative;
  width: 1366px;
  margin: 0 auto;
}
.ceng1 {
  position: absolute;
  top: 58%;
  left: 41.8%;
  width: 32px;
  height: 32px;
  /* background-color: red; */
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 32px;
}
.ceng2 {
  position: absolute;
  top: 30.5%;
  left: 56.1%;
  width: 32px;
  height: 32px;
  /* background-color: red; */
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 32px;
}
.ceng3 {
  position: absolute;
  top: 50%;
  left: 68.2%;
  width: 32px;
  height: 32px;
  /* background-color: red; */
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 32px;
}
.ceng4 {
  position: absolute;
  top: 70.2%;
  left: 67%;
  width: 32px;
  height: 32px;
  /* background-color: red; */
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 32px;
}
.ceng5 {
  position: absolute;
  top: 63.2%;
  right: 12.3%;
  width: 32px;
  height: 32px;
  /* background-color: red; */
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 32px;
}
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
} */
.brush {
  position: absolute;
  width: 300px;
  height: 70px;
  top: 63%;
  left: 50%;
  /* background: red; */
  z-index: 999;
}
.brush1 {
  position: absolute;
  width: 400px;
  height: 150px;
  top: 72%;
  left: 26%;
  /* background-color: red; */
}
.brush2 {
  position: absolute;
  width: 380px;
  height: 150px;
  top: 72%;
  right: 7%;
  /* background-color: red; */
}
.pen {
  position: absolute;
  top: 65%;
  left: 65%;
  z-index: 999;
}
.pen1 {
  position: absolute;
  top: 75%;
  left: 40%;
}
.pen2 {
  position: absolute;
  top: 75%;
  right: 15%;
}
.video {
  margin-top: 15px;
  width: 100%;
  /* height: 100%; */
}

.gif-image{
  position: absolute;

  &.select1{
    width: 382px;
    left: 268px;
    right: 0;
    top: 349px;
    margin: auto;
  }

  &.select2{
    width: 180px;
    right: 149px;
    top: 476px;
    margin: auto;
  }

  &.select3{
    width: 502px;
    left: 268px;
    right: 0;
    top: 310px;
    margin: auto;
  }
}
</style>
