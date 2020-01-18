<template>
  <div class="manage-activity-message">
    <div class="content-title">活动信息列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleAddWord('add')">新建搜索词</el-button>
      <el-button type="danger" size="small" @click="handleDelete">批量删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="name" label="通知标题" width="200"></el-table-column>
      <el-table-column prop="time" label="创建时间" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleAddWord('edit', scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click.stop="handleDelete(scope.row, '下架')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="flag === 'add' ? '新增活动通知': '编辑活动通知'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'manage-hot-word',
  data () {
    return {
      dialogVisible: false,
      loading: false,
      total: 0,
      flag: '',
      multipleSelection: [],
      search: {
        pageSize: 10,
        pageNum: 1
      },
      tableData: [
        {
          id: 1,
          name: '融创西羲里新年期间降价通知',
          time: '2010-10-10'
        }
      ]
    }
  },
  methods: {
    checkSelectable () {
      return true
    },
    handleDelete () {
      this.$confirm('收否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
      })
    },
    handleReset () {},
    handleAddWord (flag, data) {
      this.flag = flag
      this.dialogVisible = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.search.pageSize = val
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
