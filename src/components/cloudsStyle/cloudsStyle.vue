<template>
  <div class="clouds-style-box">
    <!-- 封面图 -->
    <div class="thumb-container">
      <el-image :src="$comm.url(item.coverImage)" class="cloudsvg thumb-img" fit="cover" />
      <img v-if="item.status === 3" class="elite" :src="require('@/assets/lesson/peoplle.png')">
    </div>
    <!-- 内容 -->
    <div class="course-info">
      <div class="course-name">{{ item.name }}</div>
      <div class="course-flex">
        <div class="course-shcool-name" :title="item.schoolName">{{ item.schoolName }}</div>
        <div class="course-author-name" :title="item.authorName">{{ item.authorName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.clouds-style-box{
  width: 290px;
  height: 310px;
  background: url('~@/assets/lesson/grone-box.png') no-repeat;
  cursor: pointer;
}

.thumb-container{
  text-align: center;
  position: relative;
  width: 290px;
  height: 197px;

  .elite{
    position: absolute;
    height: 40px;
    right: 20px;
    bottom: 0;
  }
}

.thumb-img{
  width: 256px;
  height: 165px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 13px;
}

.cloudsvg{
  clip-path: path('M28.056,35.480 C39.630,11.323 72.844,-3.271 111.594,21.389 C132.730,-10.820 203.688,-6.291 222.308,32.460 C264.077,36.486 265.083,92.852 241.431,110.969 C247.470,122.544 244.954,137.138 225.327,138.145 C216.772,161.798 177.519,165.321 155.880,145.191 C108.575,182.935 71.335,155.759 64.289,134.119 C14.971,156.766 -19.249,100.904 11.952,69.702 C0.881,51.081 16.984,32.460 28.056,35.480 Z');
}

.course-info{
  padding: 0 25px;
}

.course-name{
  height: 70px;
  font-size: 20px;
  padding: 10px 0;
  font-weight: 600;
}

.course-flex{
  display: flex;
  justify-content: space-between;
}

.course-shcool-name{
  padding-left: 25px;
  background: url('~@/assets/lesson/icon.png') no-repeat;
  background-size: auto 20px;
  white-space: nowrap;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  line-height: 20px;
}

.course-author-name{
  white-space: nowrap;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  line-height: 20px;
}
</style>
