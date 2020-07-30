<template>
  <div class="perfect-customer-info-page">
    <div class="content-title">意向客户列表</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input
            style="width: 250px;"
            v-model="search.contact"
            placeholder="请输入UID、手机或姓名搜索"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">审核状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.status" placeholder="请选择" size="mini">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="待完善" :value="0"></el-option>
            <el-option label="已完善" :value="1"></el-option>
            <el-option label="已关闭" :value="2"></el-option>
          </el-select>
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
      <el-table-column prop="agentMobile" label="手机号" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="houseName" label="查看楼盘" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendTime" label="联系经纪人时间" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="username" label="联系经纪人" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="statusName" label="跟进状态" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reason" label="关单原因" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 2"
            type="primary"
            size="mini"
            @click.stop="handleRestartOrClose(scope.row, 0)"
          >重新启动</el-button>
          <el-button
            v-if="scope.row.status === 0"
            type="primary"
            size="mini"
            @click.stop="handleOperate(scope.row, 'edit-customer')"
          >完善信息</el-button>
          <el-button
            v-if="scope.row.status === 0"
            type="danger"
            size="mini"
            @click.stop="handleRestartOrClose(scope.row, 2)"
          >关单</el-button>
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
  </div>
</template>

<script>
import {
  fetchDwsList,
  updateCustomerCase
} from '../../assets/services/manage-service'
export default {
  name: 'perfect-customer-info',
  data () {
    return {
      loading: false,
      tableData: [],
      total: 0,
      search: {
        pageSize: 10,
        pageNo: 1,
        contact: '',
        status: -1
      }
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    handleRestartOrClose (item, status) {
      if (status === 0) {
        updateCustomerCase({
          id: item.id,
          status
        }).then(({ data }) => {
          this.$message.success('重启成功')
          this.handleReset()
        })
      } else if (status === 2) {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(({ value }) => {
            updateCustomerCase({
              id: item.id,
              status,
              reason: value
            }).then(({ data }) => {
              this.$message.success('关单成功')
              this.handleReset()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      }
    },
    fetchList () {
      this.loading = true
      fetchDwsList(this.search)
        .then(({ data }) => {
          this.total = data.totalCount
          this.tableData = data.items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleOperate (data, route) {
      this.$router.push({
        name: 'edit-dws-customer',
        query: {
          id: data.id
        }
      })
    },
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleReset () {
      this.search.pageSize = 10
      this.search.pageNo = 1
      this.search.contact = ''
      this.search.status = -1
      this.fetchList()
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.fetchList()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
