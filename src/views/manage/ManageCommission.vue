<template>
  <div class="manage-commission-page">
    <div class="content-title">分销佣金审核</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input v-model="search.name" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">身份：</div>
        <div class="ilb-top">
          <el-select v-model="search.identity" placeholder="请选择" size="mini">
            <el-option
              v-for="item in identities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">已购房客户：</div>
        <div class="ilb-top">
          <el-select v-model="search.bought" placeholder="请选择" size="mini">
            <el-option
              v-for="item in boughts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">最近登录日期：</div>
        <div class="ilb-top">
          <el-date-picker
            v-model="search.time"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
      <el-table-column prop="contractNum" label="合同号" width="120"></el-table-column>
      <el-table-column prop="customer" label="客户姓名" width="100"></el-table-column>
      <el-table-column prop="customerMobile" label="手机号" width="120"></el-table-column>
      <el-table-column prop="houseName" label="购买楼盘" width="120"></el-table-column>
      <el-table-column prop="contractAmount" label="合同总价" width="100"></el-table-column>
      <el-table-column prop="contractTime" label="签约时间" width="150"></el-table-column>
      <el-table-column prop="leve1Price" label="一级分成" width="80"></el-table-column>
      <el-table-column prop="leve2Price" label="二级分成" width="80"></el-table-column>
      <el-table-column prop="leve3Price" label="三级分成" width="80"></el-table-column>
      <el-table-column prop="totalPrice" label="总计" width="80"></el-table-column>
      <el-table-column prop="statusName" label="财务状态" width="80"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" type="success" size="mini" @click="handlePass(scope.row)">审核通过</el-button>
          <el-button v-if="scope.row.status === 0" type="danger" size="mini" @click="handleReject(scope.row)">审核驳回</el-button>
          <el-button v-if="scope.row.status === 1" type="primary" size="mini" @click="handleResetDis(scope.row)">重启审核</el-button>
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
import { fetchDistributionList, rejectDistribution, passDistribution, resetDistribution } from '../../assets/services/manage-service'
export default {
  name: 'manage-commission',
  data () {
    return {
      loading: false,
      identities: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '游客'
        },
        {
          value: '2',
          label: '经纪人'
        }
      ],
      boughts: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '有'
        },
        {
          value: '2',
          label: '无'
        }
      ],
      search: {
        name: '',
        identity: '',
        bought: '',
        pageSize: 10,
        time: '',
        pageNo: 1
      },
      totalCount: 0,
      tableData: [],
      total: 0
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    handlePass (row) {
      passDistribution({
        id: row.id
      }).then(({ data }) => {
        this.$message.success('操作成功')
        this.handleReset()
      })
    },
    handleReject (row) {
      rejectDistribution({
        id: row.id
      }).then(({ data }) => {
        this.$message.success('操作成功')
        this.handleReset()
      })
    },
    handleResetDis (row) {
      resetDistribution({
        id: row.id
      }).then(({ data }) => {
        this.$message.success('操作成功')
        this.handleReset()
      })
    },
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleReset () {
      this.search.pageNo = 1
      this.search.pageSize = 10
      this.fetchList()
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
      this.fetchList()
    },
    fetchList () {
      this.loading = true
      fetchDistributionList({
        pageSize: this.search.pageSize,
        pageNo: this.search.pageNo
      }).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleCheck () {}
  }
}
</script>

<style lang="stylus" scoped>

</style>
