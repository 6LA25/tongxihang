<template>
  <div class="manage-activity-message">
    <div class="content-title">活动信息列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleAddWord('add')">新建活动通知</el-button>
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
      <el-table-column prop="title" label="通知标题" width="300"></el-table-column>
      <el-table-column prop="created" label="创建时间" width="200"></el-table-column>
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
        :current-page="search.pageNo"
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
      width="60%">
      <div>
        <div style="margin-bottom: 20px;">
          <div class="ilb">通知标题：</div>
          <div class="ilb">
            <el-input style="width: 400px" size="mini" v-model="activityForm.title"></el-input>
          </div>
        </div>
        <div>
          <div class="ilb-top">通知正文：</div>
          <div class="ilb" style="width: 650px">
            <ueditor ref="content" :value="activityForm.content" :config="config" @getContent="getContent"></ueditor>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editNotice, fetchNotice } from '../../assets/services/manage-service'
import ueditor from '../../components/ueditor'
export default {
  name: 'manage-hot-word',
  components: { ueditor },
  data () {
    return {
      dialogVisible: false,
      loading: false,
      total: 0,
      flag: '',
      config: {
        maximumWords: 10000
      },
      multipleSelection: [],
      search: {
        pageSize: 10,
        pageNo: 1,
        state: 1
      },
      activityForm: {
        title: '',
        content: ''
      },
      tableData: [
      ],
      currentEditData: null
    }
  },
  watch: {
    search: {
      handler () {
        this.fetchList()
      },
      deep: true
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    checkSelectable () {
      return true
    },
    fetchList () {
      this.loading = true
      fetchNotice({
        ...this.search
      }).then(({ data }) => {
        this.loading = false
        this.total = data.totalCount
        this.tableData = data.items
      })
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
      if (flag === 'edit') {
        this.currentEditData = data
        this.activityForm.title = data.title
        this.activityForm.content = data.content
      } else {
        this.currentEditData = null
        this.activityForm.title = ''
        this.activityForm.content = ''
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.search.pageSize = val
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
    },
    handleClose () {
      Object.keys(this.activityForm).forEach(item => {
        this.activityForm[item] = ''
      })
      this.dialogVisible = false
    },
    handleConfirm () {
      editNotice({
        id: this.flag === 'add' ? 0 : this.currentEditData.id,
        ...this.activityForm,
        state: 1
      }).then(({ data }) => {
        this.dialogVisible = false
        this.$message.success('操作成功')
        this.search.pageNo = 1
        this.search.pageSize = 10
        this.fetchList()
      })
    },
    getContent (content) {
      console.log(content)
      this.activityForm.content = content
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
