<template>
  <div class="confirm-transfer-account-page">
    <div class="content-title">分销佣金打款</div>
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
      <el-table-column prop="person" label="结算人" width="100"></el-table-column>
      <el-table-column prop="idCode" label="身份证号码" width="150"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="100"></el-table-column>
      <el-table-column prop="commission" label="获取佣金总额" width="100"></el-table-column>
      <el-table-column prop="settled" label="已结算金额" width="100"></el-table-column>
      <el-table-column prop="money" label="待结算金额" width="100"></el-table-column>
      <el-table-column prop="status" label="结算状态" width="100"></el-table-column>
      <el-table-column prop="way" label="打款方式" width="100"></el-table-column>
      <el-table-column prop="account" label="打款帐号" width="150"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleCheck(scope.row)">结算</el-button>
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
export default {
  name: 'confirm-transfer-account',
  data () {
    return {
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
      loading: false,
      total: 10,
      tableData: [
        {
          person: '老王',
          idCode: 320202222222222222,
          mobile: 15111111111,
          commission: 10000,
          settled: 8000,
          money: 2000,
          status: 1,
          way: 'alipay',
          account: 'zengcheng@126.com'
        }
      ]
    }
  },
  methods: {
    handleReset () {},
    handleCheck () {
      this.$router.push({
        name: 'manage-settled'
      })
    },
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
