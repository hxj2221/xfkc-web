<template>
  <el-avatar
    class="custom-avatar"
    :size="size"
    shape="circle"
    fit="cover"
    :src="src"
  >
    <i class="el-icon-user-solid" :style="{fontSize: `${size/2}px`, lineHeight: `${size}px`}" />
  </el-avatar>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: ''
    },

    size: {
      type: Number,
      default: 80
    }
  }
}
</script>

<style scoped>
.custom-avatar{
  border-radius: 50%;
}
</style>
