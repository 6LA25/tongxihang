<template>
  <div class="manage-financial-statistics-page">
    <div class="content-title">财务统计表</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input style="width: 250px;" v-model="search.name" placeholder="请输入结算人姓名、身份证或手机号" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">结算状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.status" placeholder="请选择" size="mini">
            <el-option
              v-for="item in commissions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
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
      <el-table-column prop="time" label="统计时间"></el-table-column>
      <el-table-column prop="sales" label="销售额"></el-table-column>
      <el-table-column prop="income" label="收入佣金"></el-table-column>
      <el-table-column prop="incentivePayments" label="奖励金支出"></el-table-column>
      <el-table-column prop="brokerPayments" label="经纪人佣金支出"></el-table-column>
      <el-table-column prop="profits" label="利润"></el-table-column>
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
export default {
  name: 'manage-financial-statistics',
  data () {
    return {
      loading: false,
      total: 0,
      commissions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '待结算'
        },
        {
          value: '2',
          label: '已结算'
        }
      ],
      search: {
        name: '',
        status: '',
        pageSize: 10,
        pageNum: 1
      },
      tableData: [
        {
          time: '2010.10',
          sales: 100000,
          income: 100000,
          incentivePayments: 1000000,
          brokerPayments: 200000,
          profits: 100000
        }
      ]
    }
  },
  methods: {
    handleReset () {},
    handleSizeChange (val) {
      this.search.pageSize = val
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
