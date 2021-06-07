<template>
  <div class="manage-staff-page">
    <div class="content-title">员工列表</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        v-permission="'新建员工'"
        @click="handleEdit('add')"
        >新建员工</el-button
      >
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column
        prop="account"
        label="用户名"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="realname"
        label="姓名"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="jobnum"
        label="员工编号"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="statusName"
        label="状态"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click.stop="handleEdit('edit', scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" @click.stop="handleEdit('preview', scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click.stop="handleConnect(scope.row)"
            >交接</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      title="离职交接"
      :visible.sync="dialogVisible"
    >
      <div
        class="title"
        style="display: flex; align-items: center; margin-bottom: 10px"
      >
        <div style="width: 100px; text-align: right">离职员工：</div>
        <div>admin</div>
      </div>
      <div style="display: flex; align-items: center">
        <div style="width: 100px; text-align: right">置业顾问交接人：</div>
        <div>
          <el-select
            size="mini"
            v-model="adviser"
            filterable
            remote
            reserve-keyword
            placeholder="请选择置业顾问"
            :remote-method="fetchUsers"
          >
            <el-option
              v-for="item in options"
              :key="item.uid"
              :label="item.account"
              :value="item.uid"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="display: flex;justify-content: flex-end;margin-top: 10px;">
        <el-button size="mini" type="primary" @click="handleConfirmConnect">确认交接，并将交接人设为离职</el-button>
        <el-button size="mini" @click="outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchAlllStaff,
  fetchAllUsers,
} from '../../assets/services/manage-service'
export default {
  name: 'manage-staff',
  data() {
    return {
      loading: false,
      dialogVisible: true,
      tableData: [],
      pageSize: 10,
      pageNo: 1,
      total: 0,
      options: [],
      adviser: '',
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchUsers(query) {
      fetchAllUsers({}).then(({ data }) => {
        this.options = data.items
      })
    },
    handleConfirmConnect() {
      this.$confirm('确定设置离职并交接吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
        })
        .catch(() => {})
    },
    handleConnect() {
      this.dialogVisible = true
    },
    handleEdit(tag, data) {
      this.$router.push({
        name: 'add-staff',
        query: {
          tag,
          account: data ? data.account : '',
        },
      })
    },
    fetchList() {
      this.loading = true
      fetchAlllStaff({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      })
        .then(({ data }) => {
          this.total = data.totalCount
          this.tableData = data.items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.fetchList()
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
