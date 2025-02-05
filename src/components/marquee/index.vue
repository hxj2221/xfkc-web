<template>
  <div id="vue-rolling-marquee" ref="rolling-marquee-container">
    <div v-if="inited" ref="rolling-marquee-content" class="rolling-content" :style="{ transform, animationName: `vue-rolling-marquee${rid}`,...(animationPlayS ? {} : {animationDuration, animationDelay: (prompt ? (delayT + promptDelay) : 0 ) + 's', animationPlayState })}">
      <slot />
    </div>
    <div v-if="shadow && inited" v-show="!animationPlayS" class="rolling-content shadow" :style="{ transform: `translate(${startPoint.x}px,${startPoint.y}px)`, animationName: `vue-rolling-marquee${rid}`, animationDuration, animationPlayState }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueRollingMarquee',
  props: {
    rid: {
      type: [String, Number],
      default: () => Math.random().toString(16).slice(2)
    },
    direction: {
      type: String,
      validator: val => ['top', 'right', 'bottom', 'left'].includes(val) || /(?<=^\s*)[+-]?\d*\.?\d+deg(?=\s*)/.test(val),
      default: 'left'
    },
    speed: {
      type: [Number, String],
      validator: val => typeof val === 'number' || val == '30s',
      default: '30s'
    },
    duration: Number,
    shadow: {
      type: Boolean,
      default: true
    },
    prompt: {
      type: Boolean,
      default: false
    },
    promptGap: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      W: undefined,
      w: undefined,
      H: undefined,
      h: undefined,
      absX: undefined,
      absY: undefined,
      absZ: undefined,
      style: null,
      listener: null,
      timer: null,
      inited: false
    }
  },
  computed: {
    localDirection() {
      let dir = this.direction
      if (!this.regVal('deg').test(dir)) {
        switch (dir) {
          case 'top':
            dir = '0deg'
            break
          case 'right':
            dir = '90deg'
            break
          case 'bottom':
            dir = '180deg'
            break
          case 'left':
            dir = '270deg'
        }
      }
      const reg = this.regVal('', 'deg')
      let num = 90 - Number(dir.match(reg)[0])
      num = num >= 0 ? num % 360 : 360 + (num % 360)
      const quadrant = (Math.ceil(num / 90) || 1) - 1

      return {
        x: (0b1001 >> quadrant) & 1 || -1,
        y: (0b1100 >> quadrant) & 1 || -1,
        angle: (Math.PI * 2 * num) / 360
      }
    },
    startPoint() {
      return {
        x: 0,
        y: 0
      }
    },
    endPoint() {
      return {
        x: this.absX,
        y: 0
      }
    },
    animationT() {
      if (this.speed != '30s') return (2 * this.absZ) / this.speed
      else if (this.duration) return this.duration / 1000
      return this.absZ / 15
    },
    animationDuration() {
      return (this.shadow ? 2 * this.delayT : this.animationT) + 's'
    },
    delayT() {
      const angle = this.localDirection.angle
      const radian = Math.atan(this.H / this.W)
      if ((angle >= radian && angle <= Math.PI - radian) || (angle >= Math.PI + radian && angle <= 2 * Math.PI - radian)) { return this.animationT * this.H / (this.H + this.h) + this.promptDelay } else { return this.animationT * this.W / (this.W + this.w) + this.promptDelay }
    },
    animationDelay() {
      return (this.prompt ? this.promptDelay : this.delayT) + 's'
    },
    transitionT() {
      if (this.prompt && Math.abs(this.endPoint.x - this.startPoint.x) <= 0.5 && this.H < this.h) return this.animationT * this.h / (2 * this.absZ)
      if (this.prompt && Math.abs(this.endPoint.y - this.startPoint.y) <= 0.5 && this.W < this.w) return this.animationT * this.w / (2 * this.absZ)
      if (this.prompt && Math.abs(this.endPoint.x - this.startPoint.x) > 0.5 && Math.abs(this.endPoint.y - this.startPoint.y) > 0.5 && ((this.H < this.h) || (this.W < this.w))) return this.animationT * this.absZ / (2 * this.absZ)
      return 0
    },
    transform() {
      if (this.prompt && Math.abs(this.endPoint.x - this.startPoint.x) <= 0.5) return `translate(${this.endPoint.x}px,0px)`
      if (this.prompt && Math.abs(this.endPoint.y - this.startPoint.y) <= 0.5) return `translate(0px,${this.endPoint.y}px)`
      if (this.prompt && Math.abs(this.endPoint.x - this.startPoint.x) > 0.5 && Math.abs(this.endPoint.y - this.startPoint.y) > 0.5) return `translate(${(this.endPoint.x - this.startPoint.x) / 2},${(this.endPoint.y - this.startPoint.y) / 2}px)`

      return `translate(${this.endPoint.x}px,${this.endPoint.y}px)`
    },
    transitionDuration() {
      return this.transitionT + 's'
    },
    animationPlayS() {
      return (this.prompt && !this.transitionT)
    },
    animationPlayState() {
      return this.animationPlayS ? 'paused' : 'running'
    },
    promptD1() {
      if (this.prompt && Math.abs(this.endPoint.x - this.startPoint.x) <= 0.5 && this.H < this.h) return this.animationT * (this.h - this.H) / (2 * this.absZ)
      if (this.prompt && Math.abs(this.endPoint.y - this.startPoint.y) <= 0.5 && this.W < this.w) return this.animationT * (this.w - this.W) / (2 * this.absZ)
      if (this.prompt && Math.abs(this.endPoint.y - this.startPoint.y) <= 0.5 && this.W < this.w) return this.animationT * (this.w - this.W) / (2 * this.absZ)
      return 0
    },
    promptD2() {
      if ((this.prompt && Math.abs(this.endPoint.x - this.startPoint.x) <= 0.5 && this.H < this.h) || (this.prompt && Math.abs(this.endPoint.y - this.startPoint.y) <= 0.5 && this.W < this.w)) return this.animationT * (this.promptGap) / (2 * this.absZ)
      return 0
    },
    promptDelay() {
      return this.promptD1 + this.promptD2
    }
  },
  watch: {
    localDirection(val) {
      this.init(val)
    },
    transform() {
      if (this.transitionT) {
        setTimeout(() => {
          const el = this.$refs['rolling-marquee-content']
          el.style.transitionDuration = this.transitionDuration
          el.style.transform = `translate(${this.endPoint.x}px,${this.endPoint.y}px)`
        })
      }
    }
  },
  activated() {
    if (!this.listener) window.addEventListener('resize', this.resize)
  },
  deactivated() {
    this.listener = null
    window.removeEventListener('resize', this.resize)
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    regVal(usefulUnit = '', uselessUnit = '') {
      return new RegExp(`(?<=^\\s*)[+-]?\\d*\\.?\\d+${usefulUnit}(?=${uselessUnit}\\s*)`)
    },
    init(localDirection = this.localDirection) {
      this.listener = true
      this.W = undefined
      this.w = undefined
      this.H = undefined
      this.h = undefined
      this.absX = undefined
      this.absY = undefined
      this.absZ = undefined
      this.$nextTick(() => {
        const container = this.$refs['rolling-marquee-container']
        const content = this.$refs['rolling-marquee-content']
        const W = this.W = container.clientWidth
        const H = this.H = container.clientHeight
        const w = this.w = content.clientWidth
        const h = this.h = content.clientHeight
        const angle = localDirection.angle
        const radian = Math.atan(H / W)
        if ((angle >= radian && angle <= Math.PI - radian) || (angle >= Math.PI + radian && angle <= 2 * Math.PI - radian)) {
          this.absY = (H + h) / 2
          this.absX = Math.abs(this.absY / Math.tan(angle))
        } else {
          this.absX = (W + w) / 2
          this.absY = Math.abs(this.absX * Math.tan(angle))
        }
        this.absZ = Math.pow(this.absX ** 2 + this.absY ** 2, 0.5)
        this.registAnimation()
      })
    },
    resize() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.inited = false
      }
      this.timer = setTimeout(() => {
        this.inited = true
        this.init()
      }, 500)
    },
    registAnimation() {
      if (this.style) this.style.remove()
      const style = (this.style = document.createElement('style'))
      style.innerHTML = `
					@keyframes vue-rolling-marquee${this.rid} {
						0% {
							transform: translate(${this.startPoint.x}px,${this.startPoint.y}px)
						}
						${this.shadow ? `${50 * this.animationT / this.delayT}% {
							transform: translate(${this.endPoint.x}px,${this.endPoint.y}px)
						}` : ''}
						100% {
							transform: translate(${this.endPoint.x}px,${this.endPoint.y}px)
						}
					}
				`
      document.body.appendChild(style)
    }
  }
}
</script>

<style lang="sass" scoped>
	#vue-rolling-marquee
		position: relative
		overflow: hidden
		.rolling-content
			width: fit-content
			transform: translate(0, 0)
			animation-timing-function: linear
			animation-iteration-count: infinite
			transition-timing-function: linear
			transition-property: transform
			&.shadow
				position: absolute
				top: 0
				left: -100%
</style>
Footer
