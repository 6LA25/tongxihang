<template>
  <div class="manage-hot-word-page">
    <div class="content-title">搜索词列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" v-permission="'新建搜索词'" @click="handleAddWord('add')">新建搜索词</el-button>
      <el-button type="danger" size="small" v-permission="'删除搜索词'" @click="handleDelete(multipleSelection)">批量删除</el-button>
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">搜索词名称：</div>
        <div class="ilb-top">
          <el-input v-model="keyword" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
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
      <el-table-column prop="word" label="搜索词名称" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleAddWord('edit', scope.row)">编辑</el-button>
          <el-button type="danger" v-permission="'删除搜索词'" size="mini" @click.stop="handleDelete([scope.row])">删除</el-button>
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
      :title="flag === 'add' ? '新增搜索词': '编辑搜索词'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
      <el-form v-if="dialogVisible" :rules="rules" ref="wordForm" :model="wordForm" label-width="130px">
        <el-form-item label="搜索词名称：" prop="word">
          <el-input style="width: 400px" size="mini" v-model="wordForm.word"></el-input>
        </el-form-item>
        <el-form-item label="指向楼盘：" prop="houseId" v-if="false">
          <el-select
            style="width: 400px"
            size="mini"
            v-model="wordForm.houseId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入完整楼盘名称"
            :remote-method="fetchHouses"
            :loading="searching">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

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
import { fetchSearchWord, editSearchWord, deleteSearchWord, fetchHouseList, fetchHotWordItem } from '../../assets/services/manage-service'
export default {
  name: 'manage-hot-word',
  data () {
    return {
      submitting: false,
      options: [], // 楼盘选择
      searching: false,
      dialogVisible: false,
      loading: false,
      total: 0,
      flag: '',
      multipleSelection: [],
      wordForm: {
        id: '',
        word: '',
        // houseId: '',
        // houseName: '',
        sort: ''
      },
      rules: {
        word: [{ required: true, message: '请输入搜索词' }]
        // houseId: [{ required: true, message: '请输入楼盘名称' }]
      },
      keyword: '',
      search: {
        pageSize: 10,
        pageNo: 1
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
  watch: {
    dialogVisible (nv) {
      if (!nv) {
        Object.keys(this.wordForm).forEach(item => {
          this.wordForm[item] = ''
        })
        this.options = []
      }
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    fetchHouses (query) {
      console.log(query)
      this.searching = true
      fetchHouseList({
        keyword: query,
        pageSize: 20,
        pageNo: 1
      }).then(({ data }) => {
        this.options = data.items
        this.searching = false
      })
    },
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    fetchList () {
      this.loading = true
      fetchSearchWord({
        ...this.search,
        keyword: this.keyword
      }).then(({ data }) => {
        console.log(data)
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    checkSelectable () {
      return true
    },
    handleDelete (rows) {
      let ids = []
      rows.map(row => {
        ids.push(row.id)
      })
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSearchWord({
          ids
        }).then(({ data }) => {
          this.$message.success('删除成功')
          this.search.pageNo = 1
          this.fetchList()
        }).catch(() => {})
      }).catch(() => {
      })
    },
    handleReset () {
      this.search.pageNo = 1
      this.keyword = ''
      this.search.pageSize = 10
      this.fetchList()
    },
    handleAddWord (flag, data) {
      this.flag = flag
      this.dialogVisible = true
      if (flag === 'edit') {
        fetchHotWordItem({
          id: data.id
        }).then(({ data }) => {
          this.wordForm.id = data.id
          this.wordForm.word = data.word
          this.wordForm.houseId = data.houseId
          this.wordForm.houseName = data.houseName
          this.wordForm.sort = data.sort
          this.fetchHouses(data.houseName)
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.fetchList()
    },
    handleSubmit () {
      if (this.submitting) {
        return
      }
      this.submitting = true
      this.$refs['wordForm'].validate((valid) => {
        if (valid) {
          editSearchWord(this.wordForm).then(({ data }) => {
            this.$message.success('操作成功')
            this.handleClose()
            if (this.search.pageNo > 1) {
              this.search.pageNo = 1
            } else {
              this.fetchList()
            }
            this.submitting = false
          }).catch(() => {
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
    handleCancel () {
      this.dialogVisible = false
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
