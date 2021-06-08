<template>
  <div class="manage-overtime-page">
    <div class="content-title">超时用户统计</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">超时时间：</div>
        <div class="ilb-top">
          <el-select
            v-model="search.timeoutstatus"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in overtimeStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
        <el-button type="warning" size="mini" @click="handleReset">重置</el-button>
        <el-button type="primary" size="mini" :disabled="exporting" @click="handleExportExcel">导出excel</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column prop="followRealname" label="员工" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="realname" label="客户姓名" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mobile" label="客户联系方式" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="timeoutstatus" label="超时区间" min-width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          {{getOvertimeText(scope.row.timeoutstatus)}}
        </template>
      </el-table-column>
      <el-table-column prop="unprocessedday" label="间隔时长（小时）" min-width="100" show-overflow-tooltip></el-table-column>
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
  </div>
</template>

<script>
import { fetchOvertimeCustomer, exportOvertimeExcel } from '../../assets/services/manage-service'

export default {
  name: 'manage-overtime',
  data() {
    return {
      tableData: [],
      overtimeStatus: [
        { value: -1, label: '全部' },
        { value: 0, label: '未超时' },
        { value: 1, label: '超时3天' },
        { value: 2, label: '超时7天' },
        { value: 3, label: '超时15天' },
        { value: 4, label: '超时30天' },
      ],
      total: 0,
      search: {
        timeoutstatus: '',
        pageSize: 10,
        pageNo: 1,
      },
      loading: false,
      exporting: false
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    getOvertimeText(state) {
      return this.overtimeStatus.find(item => {
        return item.value === state
      }).label
    },
    handleReset () {
      Object.keys(this.search).forEach(item => {
        this.search[item] = ''
        this.search.pageSize = 10
        this.search.pageNo = 1
      })
      this.fetchList()
    },
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    fetchList() {
      this.loading = true
      fetchOvertimeCustomer(this.search).then(({data}) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      })
    },
    handleExportExcel() {
      this.exporting = true
      let name = this.getOvertimeText(this.search.timeoutstatus === '' ? -1 : this.search.timeoutstatus)
      exportOvertimeExcel({
        timeoutstatus: this.search.timeoutstatus
      }, `超时名单-${name}.xls`).then(({data}) => {
        this.exporting = false
      }).catch(err => {
        this.exporting = false
      })
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.fetchList()
    },
  }
}
</script>a

<style>
</style>