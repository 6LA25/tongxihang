<template>
  <div class="manage-hot-word-page">
    <div class="content-title">搜索词列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleAddWord('add')">新建搜索词</el-button>
      <el-button type="danger" size="small" @click="handleDelete">批量删除</el-button>
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">搜索词名称：</div>
        <div class="ilb-top">
          <el-input v-model="search.name" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="warning" size="mini" @click="handleReset">重置</el-button>
      </div>
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
      <el-table-column prop="name" label="搜索词名称" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="100"></el-table-column>
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
      :title="flag === 'add' ? '新增搜索词': '编辑搜索词'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
      <el-form ref="wordForm" :model="wordForm" label-width="130px">
        <el-form-item label="搜索词名称：">
          <el-input style="width: 400px" size="mini" v-model="wordForm.name"></el-input>
        </el-form-item>
        <el-form-item label="指向楼盘：">
          <el-input style="width: 400px" size="mini" v-model="wordForm.house"></el-input>
        </el-form-item>
        <el-form-item label="优先级排序：">
          <el-input style="width: 400px" type="number" size="mini" v-model="wordForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
      </el-form>
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
      wordForm: {
        name: '',
        house: '',
        sort: ''
      },
      search: {
        name: '',
        pageSize: 10,
        pageNum: 1
      },
      tableData: [
        {
          id: 1,
          name: '万科翡翠东方',
          sort: 1
        }
      ]
    }
  },
  methods: {
    checkSelectable () {
      return true
    },
    handleDelete () {
      this.$confirm('是否确认删除？', '提示', {
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
        this.wordForm.name = data.name
        this.wordForm.sort = data.sort
      }
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
    handleSubmit () {
      this.$refs['wordForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel () {
      this.dialogVisible = false
    },
    handleClose () {
      Object.keys(this.wordForm).forEach(item => {
        this.wordForm[item] = ''
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
