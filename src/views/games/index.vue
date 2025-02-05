<template>
  <div class="game-list">
    <crumbs />
    <div class="game-list-content">
      <div class="game-cell" @click="goto('game1')">
        <el-image class="game-cell-img" :src="Game1Png" />
        嘉定孔庙行
      </div>
      <div class="game-cell" @click="goto('game2')">
        <el-image class="game-cell-img" :src="Game2Png" />
        51号兵站小老大
      </div>
      <div class="game-cell" @click="goto('game3')">
        <el-image class="game-cell-img" :src="Game3Png" />
        嘉定第一个女共产党员陈君起
      </div>
      <div class="game-cell" @click="goto('game4')">
        <el-image class="game-cell-img" :src="Game4Png" />
        竹刻小学徒
      </div>
      <div class="game-cell" @click="goto('game5')">
        <el-image class="game-cell-img" :src="Game5Png" />
        嘉定博物馆云游记
      </div>
    </div>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/crumbs.vue'
import Game1Png from '../../assets/game/0.jpg'
import Game2Png from '../../assets/game2/01游戏开始.png'
import Game3Png from '../../assets/game3/01.png'
import Game4Png from '../../assets/game4/game4.jpg'
import Game5Png from '../../assets/game5/game5.jpg'

export default {
  components: {
    crumbs
  },
  data() {
    return {
      Game1Png,
      Game2Png,
      Game3Png,
      Game4Png,
      Game5Png
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
  .game-list-content{
    display: flex;
    gap: 12px;
  }
  .game-cell {
    flex: 1;
    margin-top: 30px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    &-img {
      width: 100%;
      border: 1px solid lightgray;
      border-radius: 4px;
      margin-bottom: 10px;
    }
  }
}

</style>
