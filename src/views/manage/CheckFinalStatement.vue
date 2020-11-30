<template>
  <div class="check-final-statement-page">
    <div class="content-title">结算单查询</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">结算单号：</div>
        <div class="ilb-top">
          <el-input
            style="width: 250px"
            v-model="search.keyword"
            placeholder="结算单号"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">被结算人：</div>
        <div class="ilb-top">
          <el-input
            style="width: 250px"
            v-model="search.userkeyword"
            placeholder="请输入姓名或手机号"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="primary" size="mini" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="warning" size="mini" @click="handleReset"
          >重置</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column
        prop="tradeNo"
        label="结算单号"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="totalAmount"
        label="结算金额"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="created"
        label="结算时间"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="auditorRealname"
        label="结算人"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="realname"
        label="被结算人"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="salesmanRealname"
        label="所属员工"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleCheckDetail(scope.row)"
            >结算详情</el-button
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
      title="详情"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="50%"
    >
      <div class="settled-dialog-box" v-loading="itemLoading">
        <div class="title">请确认以下结算信息：</div>
        <div class="settled-detail-box">
          <div>
            <span>结算人：{{ currentItem.realname }}</span
            ><span>手机号：{{ currentItem.mobile }}</span>
          </div>
          <div>
            <span>开户行：{{ currentItem.bankTitle }}</span
            ><span>卡号：{{ currentItem.bankAccount }}</span>
          </div>
          <div>已选中订单佣金金额：{{ currentItem.commission }}元</div>
        </div>
        <div>
          <div style="margin-bottom: 20px">
            <div class="ilb">实际打款金额：</div>
            <div class="ilb">
              <el-input
                disabled
                type="number"
                size="mini"
                style="width: 200px"
                v-model="settled.finalAmount"
              ></el-input>元
            </div>
          </div>
          <div style="margin-bottom: 20px">
            <div class="ilb">打款时间：</div>
            <el-date-picker
              disabled
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="settled.time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchCommissionItems,
  fetchPaymentItem
} from '../../assets/services/manage-service'
import moment from 'moment'
export default {
  name: 'check-final-statement',
  data () {
    return {
      dialogVisible: false,
      loading: false,
      total: 0,
      search: {
        keyword: '',
        userkeyword: '',
        pageSize: 10,
        pageNo: 1
      },
      tableData: [],
      currentItem: {},
      itemLoading: false,
      settled: {
        finalAmount: '',
        time: null
      }
    }
  },
  mounted () {
    this.fetchList()
  },
  watch: {
    dialogVisible (nv) {
      if (!nv) {
        this.currentItem = {}
        this.settled.finalAmount = ''
        this.settled.time = null
        this.itemLoading = false
      }
    }
  },
  methods: {
    handleReset () {
      this.search.pageNo = 1
      this.search.pageSize = 10
      this.search.keyword = ''
      this.search.userkeyword = ''
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
        keyword: this.search.keyword,
        userkeyword: this.search.userkeyword
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
    handleCheckDetail (row) {
      this.itemLoading = true
      fetchPaymentItem({
        tradeNo: row.tradeNo
      }).then(({ data }) => {
        this.itemLoading = false
        this.currentItem = data.item
        this.settled.finalAmount = data.item.usersCommissionPaymentsView.finalAmount
        this.settled.time = data.item.usersCommissionPaymentsView.payTime || moment().format('YYYY-MM-DD')
      }).catch(() => {
        this.itemLoading = false
      })
      this.dialogVisible = true
      this.settled.time = moment().format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="stylus">
.settled-dialog-box {
  .title {
    margin-bottom 10px
    font-size 16px
  }
}
.settled-detail-box {
  margin-bottom 20px
  div {
    margin-bottom 10px
    &.money-box {
      font-weight bold
    }
    span {
      margin-right 40px
    }
  }
}
</style>
