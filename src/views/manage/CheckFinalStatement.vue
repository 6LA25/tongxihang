<template>
  <div class="check-final-statement-page">
    <div class="content-title">结算单查询</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">结算单号：</div>
        <div class="ilb-top">
          <el-input style="width: 250px;" v-model="search.keyword" placeholder="结算单号" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
        <el-button type="warning" size="mini" @click="handleReset">重置</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column prop="tradeNo" label="结算单号" width="200"></el-table-column>
      <el-table-column prop="totalAmount" label="结算金额" width="200"></el-table-column>
      <el-table-column prop="created" label="结算时间" width="200"></el-table-column>
      <el-table-column prop="auditorRealname" label="结算人" width="200"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCheckDetail(scope.row)">结算详情</el-button>
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
  </div>
</template>

<script>
import { fetchCommissionItems } from '../../assets/services/manage-service'
export default {
  name: 'check-final-statement',
  data () {
    return {
      loading: false,
      total: 0,
      search: {
        keyword: '',
        pageSize: 10,
        pageNo: 1
      },
      tableData: []
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    handleReset () {
      this.search.pageNo = 1
      this.search.pageSize = 10
      this.search.keyword = ''
      this.fetchList()
    },
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.fetchList()
    },
    fetchList () {
      this.loading = true
      fetchCommissionItems({
        pageSize: this.search.pageSize,
        pageNo: this.search.pageNo,
        keyword: this.search.keyword
      }).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleCheckDetail (row) {
      this.$router.push({
        name: 'manage-settled',
        query: {
          flag: 'preview',
          username: row.username
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
