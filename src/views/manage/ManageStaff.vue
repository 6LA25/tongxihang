<template>
  <div class="manage-staff-page">
    <div class="content-title">员工列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleEdit('add')">新建员工</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column prop="account" label="用户名" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="realname" label="姓名" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mobile" label="手机号码" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="jobnum" label="员工编号" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="statusName" label="状态" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleEdit('edit', scope.row)">编辑</el-button>
          <el-button size="mini" @click.stop="handleEdit('preview', scope.row)">查看</el-button>
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
  </div>
</template>

<script>
import { fetchAlllStaff } from '../../assets/services/manage-service'
export default {
  name: 'manage-staff',
  data () {
    return {
      loading: false,
      tableData: [],
      pageSize: 10,
      pageNo: 1,
      total: 0
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    handleEdit (tag, data) {
      this.$router.push({
        name: 'add-staff',
        query: {
          tag,
          account: data ? data.account : ''
        }
      })
    },
    fetchList () {
      this.loading = true
      fetchAlllStaff({
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.fetchList()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
