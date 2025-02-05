<template>
  <div class="dashboard-container">
    <div id="video" />
    <div class="dashboard-editor-container">
      课程分类
    </div>
    <div class="course">
      <div v-for="(item, index) in courses" :key="index" class="course-item" @click="play(item.source)">
        {{ item.name }}
        <div class="course-author">上传者：{{ item.authorName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/course'
import Ckplayer from 'ckplayer'
export default {
  name: 'Course',
  data() {
    return {
      videoObject: {
        width: 200, // 宽度，也可以支持百分比(不过父元素宽度要有)
        height: 200, // 高度，也可以支持百分比
        container: '#video', // “#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player', // 该属性必需设置，值等于下面的new chplayer()的对象
        video: '' // 视频地址(必填)
      },
      courses: []
    }
  },
  created() {
    this.getCourse()
  },
  mounted() {
    // this.play()
  },
  methods: {
    play(source) {
      this.videoObject.video = source
      const player = new Ckplayer(this.videoObject)
      console.log(player)
    },
    getCourse() {
      list().then(e => {
        this.courses = e.content
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
  }
  .course {
    .course-item {
      width: 200px;
      height: 200px;
      float: left;
      text-align: center;
      line-height: 200px;
      border: 1px solid;
      margin: 10px;
      .course-author {
        margin: 10px;
        line-height: 10px;
        height: 10px;
      }
    }
  }
</style>
