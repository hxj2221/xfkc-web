<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <div class="error-content">
          <div class="error-title">访问受限</div>
          <div class="error-subtitle">抱歉，您暂时没有权限访问该页面</div>
          <div class="error-buttons">
            <el-button type="primary" size="medium" @click="back">返回首页</el-button>
            <el-button size="medium" @click="goBack">返回上一页</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="error-image">
          <img :src="require('@/assets/home/child.png')" alt="403 error">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Page403',
  methods: {
    back() {
      if (this.$route.query.from) {
        this.$router.push(this.$route.query.from)
      } else if (this.$store.getters.theme === 'young') {
        this.$router.push({ path: '/grhome' })
      } else {
        this.$router.push({ path: '/' })
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 1200px;
  max-width: 100%;
  margin: 100px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  padding: 40px;
  
  .error-content {
    animation: slideIn 0.5s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    
    .error-title {
      font-size: 24px;
      color: #303133;
      margin-bottom: 10px;
    }
    
    .error-subtitle {
      font-size: 16px;
      color: #606266;
      margin-bottom: 20px;
    }
    
    .error-buttons {
      margin-top: 20px;
    }
  }
  
  .error-image {
    animation: fadeIn 1s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
      max-width: 300px;
      height: auto;
    }
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 