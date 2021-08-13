<template>
  <div class="manage-activity-message">
    <div class="content-title">部门信息列表</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        @click="handleAddWord('add')"
        >新建部门</el-button
      >
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column
        prop="name"
        label="部门名称"
        min-width="400"
      ></el-table-column>
      <el-table-column
        prop="createtime"
        label="创建时间"
        width="200"
      >
      <template slot-scope="scope">
        {{scope.row.createtime | YMDHMS_date}}
      </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click.stop="handleAddWord('edit', scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click.stop="handleDelete(scope.row, '下架')"
            >删除</el-button
          >
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
      :title="flag === 'add' ? '新增部门' : '编辑部门'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :destroy-on-close="true"
      width="60%"
    >
      <div>
        <el-form
          :disabled="flag === 'preview'"
          label-width="100px"
          :rules="rules"
          ref="ruleForm"
          :model="form"
        >
          <el-form-item label="部门名称：" prop="name">
            <el-input
              size="mini"
              type="text"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="handleConfirm"
              >提交</el-button
            >
            <el-button size="mini" @click="handleClose">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchAllDepartments,
  editDepartment,
  deleteDepartment
} from '../../assets/services/manage-service'
export default {
  name: 'manage-departments',
  data() {
    return {
      dialogVisible: false,
      loading: false,
      total: 0,
      search: {
        pageSize: 10,
        pageNo: 1,
      },
      form: {
        name: '',
      },
      flag: '',
      tableData: [],
      currentData: {},
      submitting: false,
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
      },
    }
  },
  watch: {
    dialogVisible(nv) {
      if (!nv) {
        Object.keys(this.form).forEach((item) => {
          this.form[item] = ''
        })
        this.currentData = {}
      }
    },
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.loading = true
      fetchAllDepartments({
        ...this.search,
      }).then(({ data }) => {
        this.loading = false
        this.total = data.totalCount
        this.tableData = data.items
      })
    },
    handleDelete(row) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteDepartment({
            id: row.id
          }).then(({ data }) => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.search.pageNo = 1
            this.fetchList()
          })
        })
        .catch(() => {})
    },
    handleReset() {},
    handleAddWord(flag, data) {
      this.flag = flag
      this.dialogVisible = true
      if (flag === 'edit') {
        this.currentData = data
        this.form.name = data.name
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.search.pageNo = val
      this.fetchList()
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleConfirm() {
      if (this.submitting) {
        return
      }
      this.submitting = true
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let options = {
            name: this.form.name
          }
          if (this.currentData.id) {
            options.id = this.currentData.id
          }
          editDepartment({
            ...options
          })
            .then(({ data }) => {
              this.dialogVisible = false
              this.$message.success('操作成功')
              this.search.pageNo = 1
              this.search.pageSize = 10
              this.fetchList()
              this.submitting = false
            })
            .catch(() => {
              this.submitting = false
              this.$message.error('操作失败')
            })
        } else {
          console.log('error submit!!')
          this.submitting = false
          return false
        }
      })
    },
  },
}
</script>

<style lang="stylus">
.manage-activity-message {
  .el-textarea__inner {
    min-height: 80px!important;
  }
}
</style>
