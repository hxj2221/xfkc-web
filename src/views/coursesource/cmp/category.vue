<template>
  <div class="category-select">
    <div class="onecategory">
      <span v-for="item in oneCategoryList" :key="item.id" :class="item.id === oneCategory ? 'active':''" @click="changeCategory('one', item.id)"><el-image
        fit="fill"
        :src="$comm.url(item.imgUrl)"
        style="width: 32px; height: 32px; display: inline-block; margin-right: 8px; overflow: hidden; vertical-align: top;"
      />{{ item.name }}</span>
    </div>
    <div class="twocategory">
      分类
      <span v-for="item in twoCategoryList" :key="item.id" :class="item.id === twoCategory ? 'active':''" @click="changeCategory('two', item.id)">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getSourceCategory } from '@/api/coursesource/index'
export default {
  name: '',
  components: {
  },
  props: {
    fromType: {
      default: '',
      type: String
    },
    twoId: {
      default: null,
      type: Number
    },
    isHasId: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      oneCategory: this.$router?.query?.oneLevelId || 0,
      twoCategory: this.$router?.query?.twoLevelId || null,
      twoCategoryId: null,
      oneCategoryList: [],
      twoCategoryList: []
    }
  },
  computed: {
    // ...mapGetters(['baseApi', 'fileUploadApi'])
  },
  created() {
    this.getCategoryList(0)
  },
  methods: {
    getCategoryList(level) {
      getSourceCategory({ id: level }).then(res => {
        if (level === 0 && res) {
          this.oneCategoryList = res || []
          this.oneCategory = this.$router?.query?.oneLevelId ? this.$router?.query?.oneLevelId : res[0]?.id
          if (!this.isHasId) {
            this.getCategoryList(this.oneCategory)
          }
        } else {
          this.twoCategoryList = res || []
          this.twoCategory = res[0]?.id
          this.$emit('changeShowType', 'list', this.twoCategory)
        }
      })
        .catch((error) => {
          console.log(error)
        })
    },
    changeCategory(type, val) {
      if (type === 'one') {
        this.oneCategory = val
        this.getCategoryList(val)
      } else {
        this.twoCategory = val
        this.$emit('changeShowType', 'list', this.twoCategory)
      }
    },
    changeTab(info) {
      this.oneCategory = info.sourceCategoryId1
      getSourceCategory({ id: info.sourceCategoryId1 }).then(res => {
        this.twoCategory = info.sourceCategoryId2
      })
    },
    changeTab2(info) {
      this.oneCategory = info.sourceCategoryId1
      this.twoCategory = info.sourceCategoryId2
      getSourceCategory({ id: info.sourceCategoryId1 }).then(res => {
        this.twoCategoryList = res || []
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .category-select {
    .onecategory{
      background: #f5f7fa;
      line-height: 32px;
      height: 60px;
      font-size: 16px;
      span{
        display: inline-block;
        padding: 14px 20px;
      }
      .active{
        border-radius: 6px 6px 0 0;
        background: #ffffff;
        color: #0084D2;
      }
    }
    .twocategory{
      padding: 32px 32px 0;
      line-height: 32px;
      font-size: 14px;
      span{
        display: inline-block;
        border-radius: 20px;
        padding: 0 20px;
      }
      .active{
        color: #0084D2;
        background: #f3f7ff;
      }
    }
  }
</style>
