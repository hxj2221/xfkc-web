<template>
  <div class="game-list">
    <grcrumbs />
    <div class="game-cell" @click="goto('grgame1')">
      <el-image class="game-cell-img" :src="Game1Png" />
      嘉定孔庙行
    </div>
    <div class="game-cell" @click="goto('grgame2')">
      <el-image class="game-cell-img" :src="Game2Png" />
      51号兵站小老大
    </div>
    <div class="game-cell" @click="goto('grgame3')">
      <el-image class="game-cell-img" :src="Game3Png" />
      嘉定第一个女共产党员陈君起
    </div>
  </div>
</template>

<script>
import grcrumbs from '@/components/grcrumbs/grcrumbs.vue'
import Game1Png from '../../assets/game/0.jpg'
import Game2Png from '../../assets/game2/01游戏开始.png'
import Game3Png from '../../assets/game3/01.png'

export default {
  components: {
    grcrumbs
  },
  data() {
    return {
      Game1Png,
      Game2Png,
      Game3Png
    }
  },
  methods: {
    goto(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>

.game-list {
  width: 100%;

  .game-cell {
    margin-left: 20px;
    margin-top: 24px;
    border-bottom: 1px solid lightgray;
    padding-bottom: 24px;

    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 12px;

    &-img {
      width: 160px;
      height: 100px;
    }
  }
}

</style>
