<template>
  <div class="manage-settled-page">
    <div class="content-title">待结算佣金</div>
    <div class="settled-detail-box">
      <div><span>结算人：{{userInfo.realname}}</span><span>手机号：{{userInfo.mobile}}</span></div>
      <div class="money-box"><span>佣金总额：{{userInfo.totalAmount}}</span><span>待结算金额：{{userInfo.stayAmount}}</span></div>
    </div>
    <!-- <div class="operate-btn-box" v-if="$route.query.flag !== 'preview'">
      <el-button type="primary" size="small" @click="handleConfirmPay">批量确认打款</el-button>
    </div> -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      v-loading="loading"
      style="width: 100%"
      size="mini"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="contractNum" label="合同号" width="150"></el-table-column>
      <el-table-column prop="customerName" label="客户姓名" width="100"></el-table-column>
      <el-table-column prop="customerMobile" label="手机号" width="120"></el-table-column>
      <el-table-column prop="houseName" label="购买楼盘" width="150"></el-table-column>
      <el-table-column prop="contractAmount" label="合同总价" width="100"></el-table-column>
      <el-table-column prop="contractTime" label="签约合同时间" width="200"></el-table-column>
      <el-table-column prop="commissionRate" label="佣金比例" width="70"></el-table-column>
      <el-table-column prop="commission" label="佣金费用" width="100"></el-table-column>
      <!-- <el-table-column prop="shyj" label="税后佣金" width="70"></el-table-column> -->
      <el-table-column prop="statusName" label="结算状态" width="100"></el-table-column>
      <!-- <el-table-column prop="code" label="结算单号"></el-table-column> -->
      <el-table-column label="操作" width="200" v-if="$route.query.flag !== 'preview'">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status === 0" size="mini" @click="handleConfirmPay(scope.row)">确认打款</el-button>
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
    <el-dialog
      title="确认打款"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="50%">
      <div class="settled-dialog-box">
        <div class="title">请确认以下结算信息：</div>
        <div class="settled-detail-box">
          <div><span>结算人：{{currentItem.realname}}</span><span>手机号：13011111111</span></div>
          <div><span>结算方式：{{currentItem.payTypeName}}</span><span>结算账号：{{currentItem.aliAccount}}</span></div>
          <div>已选中订单佣金金额：{{currentItem.commission}}</div>
        </div>
        <div>
          <div style="margin-bottom: 20px;">
            <div class="ilb">实际打款金额：</div>
            <div class="ilb"><el-input type="number" size="mini" style="width: 200px;" v-model="settled.finalAmount"></el-input></div>
          </div>
          <div style="margin-bottom: 20px;">
            <div class="ilb">打款时间：</div>
            <el-date-picker
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="settled.time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div>
            <div class="ilb-top">备注：</div>
            <div class="ilb-top"><el-input resize="none" size="mini" type="textarea" style="width: 400px;" v-model="settled.remark" placeholder="请输入内容"></el-input></div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
        <el-button size="mini" :disabled="submitting" type="primary" @click="handleConform">确认无误，已打款</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCommissionUser, fetchCommissionItem, fetchCommissionSingle, commissionPay } from '../../assets/services/manage-service'
import moment from 'moment'
export default {
  name: 'manage-settled',
  data () {
    return {
      dialogVisible: false,
      multipleSelection: [],
      tableData: [],
      loading: false,
      total: 0,
      search: {
        pageSize: 10,
        pageNo: 1
      },
      settled: {
        finalAmount: '',
        time: null,
        remark: ''
      },
      userInfo: {},
      currentItem: {},
      submitting: false
    }
  },
  mounted () {
    this.fetchUser()
    this.fetchItems()
  },
  watch: {
    dialogVisible (nv) {
      if (!nv) {
        this.currentItem = {}
      }
    }
  },
  methods: {
    fetchUser () {
      fetchCommissionItem({
        username: this.$route.query.username
      }).then(({ data }) => {
        this.userInfo = data.item
      })
    },
    // 获取列表
    fetchItems () {
      this.loading = true
      fetchCommissionUser({
        username: this.$route.query.username,
        pageNo: this.search.pageNo,
        pageSize: this.search.pageSize
      }).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    checkSelectable (row) {
      return row.status === '待结算'
    },
    handleConfirmPay (row) {
      console.log(row)
      fetchCommissionSingle({
        id: row.id
      }).then(({ data }) => {
        console.log(data)
        this.currentItem = data.item
        this.currentItem.commissionId = row.id
      })
      this.dialogVisible = true
      this.settled.time = moment().format('YYYY-MM-DD')
    },
    handleCloseCheck () {},
    handleConform () {
      this.submitting = true
      commissionPay({
        commissionId: this.currentItem.commissionId,
        finalAmount: this.settled.finalAmount,
        payTime: this.settled.time,
        intro: this.settled.remark
      }).then(({ data }) => {
        this.dialogVisible = false
        this.$message.success('操作成功')
        this.$nextTick(() => {
          this.submitting = false
          this.search.pageNo = 1
          this.fetchItems()
        })
      }).catch(() => {
        this.submitting = false
        this.$message.error('操作失败')
      })
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchItems()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.fetchItems()
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
.manage-settled-page {
}
</style>
