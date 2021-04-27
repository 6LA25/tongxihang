<template>
  <div class="manage-activity-message">
    <div class="content-title">活动信息列表</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        v-permission="'新建活动通知'"
        @click="handleAddWord('add')"
        >新建活动通知</el-button
      >
      <el-button
        type="danger"
        v-permission="'删除活动通知'"
        :disabled="multipleSelection.length === 0"
        size="small"
        @click="handleDelete(multipleSelection)"
        >批量删除</el-button
      >
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
      @row-click="handleClickCell"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        :selectable="checkSelectable"
      ></el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column
        prop="title"
        label="通知标题"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="created"
        label="创建时间"
        width="200"
      ></el-table-column>
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
            v-permission="'删除活动通知'"
            size="mini"
            @click.stop="handleDelete([scope.row], '下架')"
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
      :title="flag === 'add' ? '新增活动通知' : '编辑活动通知'"
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
          :model="activityForm"
        >
          <el-form-item label="查看角色：" prop="title">
            <el-select size="mini" v-model="activityForm.type">
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通知标题：" prop="title">
            <el-input
              size="mini"
              type="text"
              v-model="activityForm.title"
            ></el-input>
          </el-form-item>
          <el-form-item label="跳转地址：" prop="link_type">
            <el-radio-group
              v-model="activityForm.link_type"
              @change="handleSelectLink"
            >
              <div style="margin-bottom: 10px">
                <el-radio style="width: 100px;" :label="0">楼盘</el-radio>
                <el-select
                  :disabled="activityForm.link_type !== 0"
                  style="width: 400px"
                  size="mini"
                  v-model="activityForm.link_id"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入完整楼盘名称"
                  :remote-method="fetchHouses"
                  :loading="houseSearching"
                >
                  <el-option
                    v-for="item in houseOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div style="margin-bottom: 10px">
                <el-radio style="width: 100px;" :label="1">报名活动</el-radio>
                <el-select
                  :disabled="activityForm.link_type !== 0"
                  style="width: 400px"
                  size="mini"
                  v-model="activityForm.link_id"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入完整报名活动名称"
                  :remote-method="fetchHouses"
                  :loading="houseSearching"
                >
                  <el-option
                    v-for="item in houseOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div style="margin-bottom: 10px">
                <el-radio style="width: 100px;" :label="2">从文章选择</el-radio>
                <el-select
                  :disabled="activityForm.link_type !== 0"
                  style="width: 400px"
                  size="mini"
                  v-model="activityForm.link_id"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入完整文章名称"
                  :remote-method="fetchHouses"
                  :loading="houseSearching"
                >
                  <el-option
                    v-for="item in houseOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="通知正文：" prop="content">
            <el-input
              size="mini"
              type="textarea"
              resize="none"
              v-model="activityForm.content"
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
  deleteNotice,
  editNotice,
  fetchNotice,
  fetchNoticeItem,
  fetchHouseList
} from '../../assets/services/manage-service'
export default {
  name: 'manage-hot-word',
  data() {
    return {
      houseSearching: false,
      houseOptions: [],
      dialogVisible: true,
      loading: false,
      total: 0,
      flag: '',
      config: {
        maximumWords: 10000,
      },
      multipleSelection: [],
      search: {
        pageSize: 10,
        pageNo: 1,
        state: 1,
      },
      roles: [
        {
          name: '全部',
          value: 0,
        },
        {
          name: '游客',
          value: 1,
        },
        {
          name: '经纪人',
          value: 2,
        },
      ],
      activityForm: {
        id: '',
        title: '',
        content: '',
        type: '',
        link_type: '',
        link_id: '',
      },
      tableData: [],
      currentEditData: null,
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入正文', trigger: 'blur' }],
      },
      submitting: false,
    }
  },
  watch: {
    dialogVisible(nv) {
      if (!nv) {
        Object.keys(this.activityForm).forEach((item) => {
          this.activityForm[item] = ''
        })
      }
    },
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchHouses(query) {
      console.log(query)
      this.houseSearching = true
      fetchHouseList({
        keyword: query,
        pageSize: 20,
        pageNo: 1,
      }).then(({ data }) => {
        this.houseOptions = data.items
        this.houseSearching = false
      })
    },
    handleSelectLink() {},
    fetchItem(id) {
      fetchNoticeItem({
        id,
      }).then(({ data }) => {
        console.log(data)
        this.activityForm.id = data.id
        this.activityForm.title = data.title
        this.activityForm.content = data.content
        this.activityForm.type = data.type
      })
    },
    checkSelectable() {
      return true
    },
    handleClickCell(row, column, cell, event) {
      console.log(row)
      this.flag = 'preview'
      this.dialogVisible = true
      this.fetchItem(row.id)
    },
    fetchList() {
      this.loading = true
      fetchNotice({
        ...this.search,
      }).then(({ data }) => {
        this.loading = false
        this.total = data.totalCount
        this.tableData = data.items
      })
    },
    handleDelete(rows) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let ids = []
          rows.forEach((row) => {
            ids.push(row.id)
          })
          deleteNotice({
            ids: ids.join(','),
            state: 2,
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
        this.fetchItem(data.id)
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
          editNotice({
            ...this.activityForm,
            state: 1,
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
