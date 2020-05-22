<template>
  <div class="staff-develop-page">
    <div class="content-title">员工发展</div>
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
      <el-table-column prop="jobnum" label="员工编号" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="agentCount" label="经纪人数量" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="revenueTotal" label="收佣统计" width="150" show-overflow-tooltip></el-table-column>
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
import { fetchUserDevelop } from '../../assets/services/manage-service'
export default {
  name: 'user-develop',
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
    fetchList () {
      this.loading = true
      fetchUserDevelop({
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
