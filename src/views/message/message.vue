<template>
  <div class="message">
    <crumbs />
    <div class="box">
      <!-- <div class="top">
        <div class="one">
          <div class="name_1">检索类型</div>
          <div>
            <el-radio-group v-model="radio3">
              <el-radio-button label="全部" class="tag" />
              <el-radio-button label="平台" class="tag" />
              <el-radio-button label="学校" class="tag" />
            </el-radio-group>
          </div>
        </div>
      </div>-->
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="messageList" stripe style="width: 100%">
        <el-table-column prop="title" label="消息名称" width="480" />
        <el-table-column prop="messageContent" label="消息内容" width="420" />
        <!-- <el-table-column prop="createBy" label="查看状态" /> -->
        <el-table-column prop="updateTime" label="时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, messageList)">
              <img class="see" src="../../assets/message/del.png" alt>
              <span>删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="height:90px;" />
    <div class="myTwo">
      <div class="block">
        <el-pagination
          :slot="33"
          :current-page.sync="currentPage3"
          :page-size="size"
          :prev-text="'上一页'"
          :next-text="'下一页'"
          layout="slot,prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div style="height:63px;" />
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/crumbs.vue'
// import Pagination from '@/components/Pagination/Pagination.vue'
import { getMessage, delMessage } from '@/api/message/message'
export default {
  components: {
    crumbs
  },
  data() {
    return {
      id: '',
      currentPage3: 1,
      messageName: '',
      messageList: [],
      radio3: '全部',
      total: 0,
      size: 8
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    timeFormat(timestamp) {
      function add0(m) {
        return m < 10 ? '0' + m : m
      }
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var date = time.getDate()
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return (
        year +
        '-' +
        add0(month) +
        '-' +
        add0(date) +
        ' ' +
        add0(hours) +
        ':' +
        add0(minutes) +
        ':' +
        add0(seconds)
      )
    },
    handleDelete(index, row) {
      this.id = row[index].id
      console.log(this.id)
      const data = []
      data.push(this.id)
      delMessage(data).then((res) => {
        this.getMessage()
      })
      // row.splice(index, 1)
      console.log(row[index].id)
    },
    getMessage() {
      console.log(1)
      const params = {
        page: this.currentPage3 - 1,
        size: this.size
      }
      getMessage(params).then(res => {
        this.total = res.totalElements
        console.log(res)
        this.messageList = res.content
        res.content.forEach(i => {
          i.updateTime = this.timeFormat(i.updateTime)
        })
      })
    },
    handleSizeChange() {
      this.getMessage()
    },
    handleCurrentChange() {
      this.getMessage()
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: 1366px;
  margin: 0 auto;
  overflow: hidden;
}
.box {
  margin-top: 20px;
}
.top {
  width: 1366px;
  height: 72px;
  background-image: url("../../assets/message/messagebg.png");
}
.one {
  display: flex;
  align-items: center;
  position: relative;
  top: 25px;
  left: 22px;
}

.name_1 {
  font-size: 16px;
}
.name_2 {
  font-size: 16px;
}
.zhanwei {
  margin-left: 28px;
}
/deep/ .el-radio-button__inner {
  color: #358de4;
  border: 1px solid #358de4;
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border: 1px solid #358de4;
  background-color: #358de4;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border: 1px solid #358de4;
  border-radius: 10px;
  width: 65px;
  padding: 9px 16px;
  text-align: center;
  margin-left: 17px;
}
/deep/ .el-radio-button:last-child .el-radio-button__inner {
  border: 1px solid #358de4;
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 16px;
  text-align: center;
  margin-left: 10px;
}
/deep/ .el-button--mini {
  width: 83px;
  height: 34px;
  font-size: 16px;
  color: #358de4;
  background-color: rgba(255, 255, 255, 0);
  border: 1px #358de4 solid;
  border-radius: 10px;
}
/deep/ .el-table .cell {
  height: 114px;
  line-height: 114px;
  font-size: 18px;
}
.see {
  width: 16px;
  height: 16px;
  line-height: 34px;
  position: relative;
  top: 3px;
  margin-right: 3px;
}
</style>
