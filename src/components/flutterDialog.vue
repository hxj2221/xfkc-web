<template>
  <div
    v-if="show"
    class="box"
    :style="{'top':top + 'px','right':right + 'px'}"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <span @click="close">关闭</span>
    <div style="color: #f00" @click="openUrl">
      <el-image
        fit="cover"
        :src="$comm.url(showData.imgUrl)"
        style="width: 189px; height: 254px;"
      />
    </div>
  </div>
</template>

<script>
import { getWindow } from '@/api/home/home'
export default {
  name: 'MoveWindow',
  data() {
    return {
      show: false, // 是否展现飘窗
      showData: {}, // 飘窗内容
      stepX: 1, // 水平方向的步长
      stepY: 1, // 垂直方向的步长
      timer: null, // 定时器
      maxTop: 0, // 最大的 top 值
      maxRight: 0, // 最大的 right 值
      top: 0,
      right: 0
    }
  },
  mounted() {
    this.getInfo()
  },
  beforeDestroy() {
    // dom 销毁前清除定时器
    clearInterval(this.timer)
  },
  methods: {
    getInfo() {
      getWindow().then(res => {
        if (res && res.status === 1) {
          this.showData = res
          this.show = true
          this.init()
        }
      })
        .catch((error) => {
          console.log(error)
        })
    },
    // 初始化飘窗规则
    init() {
      // 设置最大的top和right值：根元素可视区域宽高 - 飘窗的宽高 - 边距
      this.maxTop = document.documentElement.clientHeight - 240 - 20
      this.maxRight = document.documentElement.clientWidth - 280 - 20

      // 设置 top 和 right 的初始值
      this.top = 0
      this.right = 0

      // 创建定时器前清除定时器，避免类似在 onresize 中调用 init() 时，产生多个定时器
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.move()
      }, 20)

      this.onresize()
    },
    // 移动函数
    move() {
      if (this.top >= this.maxTop || this.top < 0) {
        this.stepY = -this.stepY
      }
      if (this.right >= this.maxRight || this.right < 0) {
        this.stepX = -this.stepX
      }

      this.top += this.stepY
      this.right += this.stepX
    },
    // 鼠标悬浮在飘窗时停止移动
    mouseover() {
      clearInterval(this.timer)
    },
    // 鼠标离开飘窗时恢复移动
    mouseout() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.move()
      }, 20)
    },
    openUrl() {
      clearInterval(this.timer)
      window.open(this.showData.linkUrl, '_blank')
    },
    // 关闭飘窗
    close() {
      clearInterval(this.timer)
      this.show = false
    },
    // 窗口大小调整时重置飘窗规则
    onresize() {
      if (this.show) {
        const that = this
        window.onresize = function() {
          that.init()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  background: #fff;
  border-radius: 4px;
  position: fixed;
  text-align: left;
  padding: 0;
  color: #ffffff;
  top: 0;
  right: 0;
  z-index: 10;

  > span {
    text-align: right;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 11;
    color: #999999;
    cursor: pointer;
  }

  > div {
    border-radius: 4px;
    width: 189px;
    height: 254px;
    overflow: hidden;
    cursor: pointer;
    // margin-top: 30px;
  }
}
</style>
