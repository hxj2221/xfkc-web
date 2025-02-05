<template>
  <div class="myTwo2">
    <div class="block">
      <el-pagination
        :slot="33"
        :current-page.sync="currentPage3"
        :page-size="100"
        :prev-text="'上一页'"
        :next-text="'下一页'"
        layout="slot,prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage3: 5
    }
  },
  methods: {
    // jumpFirstPage() {
    //   this.$refs.pagination.handleCurrentChange(1)
    //   this.$emit('handleCurrentChange', 1)
    // }
  }
}
</script>

<style>

.el-pager li.active {
  color: rgb(72, 116, 41);
}
.el-pager li:hover {
  color: rgb(72, 116, 41);
}
.el-pager li {
  color: rgba(128, 188, 86, 1);
}
.el-pager li.btn-quicknext,
.el-pager li.btn-quickprev {
  color: rgba(128, 188, 86, 1);
}
.el-pagination span:not([class*="suffix"]),
.el-pagination button {
  color: rgba(128, 188, 86, 1);
}
.el-pagination__editor.el-input .el-input__inner {
  border-color: rgba(128, 188, 86, 1);
  color: rgba(128, 188, 86, 1);
}
.el-pagination .btn-prev,
.el-pagination .btn-next {
  border: solid 1px rgba(128, 188, 86, 1);
  text-align: center;
  border-radius: 4px;
  height: 28px;
  padding: 0 8px;
  background-color: rgb(210, 238, 190);
}
.myTwo2 {
  text-align: center;
  width: 1366px;
  height: 73px;
}
.block {
  margin: 0 auto;
  width: 720px;
  height: 73px;
  background-color: rgb(210, 238, 190);
  border-radius: 20px;
  padding: 20px 0;
}
.el-pager li {
  background-color: rgb(210, 238, 190);
}
.el-pagination__editor.el-input .el-input__inner {
  background-color: rgb(210, 238, 190);
}

</style>
