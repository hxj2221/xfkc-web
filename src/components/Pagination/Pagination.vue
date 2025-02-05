<template>
  <div class="myTwo">
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
    //       jumpFirstPage () {
    //  this.$refs.pagination.handleCurrentChange(1);
    //  this.$emit('handleCurrentChange', 1);
    //         }
  }
}
</script>

<style>
.el-pager li.active{
color: #0552A0;
}
.el-pager li:hover{
  color: #0552A0;
}
.el-pager li{
  color: #358DE4;
}
.el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
  color: #358DE4;
}
.el-pagination span:not([class*=suffix]), .el-pagination button{
  color: #358DE4;
}
.el-pagination__editor.el-input .el-input__inner{
  border-color:#358DE4 ;
  color:#358DE4 ;
}
.el-pagination .btn-prev, .el-pagination .btn-next{
  border: solid 1px #358DE4;
  text-align: center;
  border-radius: 4px;
  height: 28px;
  padding: 0 8px;
  background-color: #D2E9FF;
}
.myTwo{
  text-align: center;
  width: 1366px;
  height: 73px;
}
.block{
  margin: 0 auto;
  width: 720px;
  height: 73px;
  background-color: #D2E9FF;
  border-radius: 20px;
  padding: 20px 0 ;
}
.el-pager li{
  background-color:#D2E9FF ;
}
.el-pagination__editor.el-input .el-input__inner{
  background-color:#D2E9FF ;
}
.el-pagination span:not([class*=suffix]), .el-pagination button{

}

</style>
