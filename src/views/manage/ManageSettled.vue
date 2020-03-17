<template>
  <div class="manage-settled-page">
    <div class="content-title">待结算佣金</div>
    <div class="settled-detail-box">
      <div><span>结算人：{{userInfo.realname}}</span><span>身份证号：--</span><span>手机号：{{userInfo.mobile}}</span></div>
      <div><span>结算方式：--</span><span>结算账号：--</span></div>
      <div class="money-box"><span>佣金总额：{{userInfo.totalAmount}}</span><span>待结算金额：{{userInfo.stayAmount}}</span></div>
    </div>
    <div class="operate-btn-box" v-if="$route.query.flag !== 'preview'">
      <el-button type="primary" size="small" @click="handleConfirmPay">批量确认打款</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="$route.query.flag !== 'preview'" type="selection" width="55" :selectable="checkSelectable"></el-table-column>
      <el-table-column prop="contractNum" label="合同号" width="100"></el-table-column>
      <el-table-column prop="customer" label="客户姓名" width="100"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="100"></el-table-column>
      <el-table-column prop="buyHouse" label="购买楼盘" width="100"></el-table-column>
      <el-table-column prop="contractMoney" label="合同总价" width="70"></el-table-column>
      <el-table-column prop="payTime" label="客户付款时间" width="100"></el-table-column>
      <el-table-column prop="commissionPer" label="佣金比例" width="70"></el-table-column>
      <el-table-column prop="yjfy" label="佣金费用" width="70"></el-table-column>
      <el-table-column prop="shyj" label="税后佣金" width="70"></el-table-column>
      <el-table-column prop="status" label="结算状态" width="70"></el-table-column>
      <el-table-column prop="code" label="结算单号"></el-table-column>
      <el-table-column label="操作" width="200" v-if="$route.query.flag !== 'preview'">
        <template slot-scope="scope">
          <template v-if="scope.row.status === '待结算'">
            <el-button type="success" size="mini" @click="handleConfirmPay(scope.row)">确认打款</el-button>
            <el-button type="danger" size="mini" @click="handleCloseCheck(scope.row)">关单</el-button>
          </template>
          <el-button v-if="scope.row.status === '已关单'" type="primary" size="mini" @click="handleCloseCheck(scope.row)">关单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="确认打款"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="50%">
      <div class="settled-dialog-box">
        <div class="title">请确认以下结算信息：</div>
        <div class="settled-detail-box">
          <div><span>结算人：老王</span><span>身份证号：320405111111111111</span><span>手机号：13011111111</span></div>
          <div><span>结算方式：支付宝</span><span>结算账号：zengcheng@126.com</span></div>
          <div>已选中订单佣金金额：12000</div>
          <div>税后佣金金额：10920</div>
        </div>
        <div>
          <div style="margin-bottom: 20px;">
            <div class="ilb">实际打款金额：</div>
            <div class="ilb"><el-input size="mini" style="width: 200px;" v-model="settled.realMoney"></el-input></div>
          </div>
          <div style="margin-bottom: 20px;">
            <div class="ilb">打款时间：</div>
            <el-date-picker
              size="mini"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
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
        <el-button size="mini" type="primary" @click="handleConform">确认无误，已打款</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCommissionUser, fetchCommissionItem } from '../../assets/services/manage-service'
import moment from 'moment'
export default {
  name: 'manage-settled',
  data () {
    return {
      dialogVisible: false,
      multipleSelection: [],
      tableData: [
        {
          id: 1,
          contractNum: 1111111111,
          customer: 'tom',
          mobile: 15111111111,
          buyHouse: '万科翡翠东方',
          contractMoney: 100000,
          payTime: '2019-10-10 10:00',
          commissionPer: '0.3%',
          yjfy: 3000,
          shyj: 3000,
          status: '待结算',
          code: 'YGas12121221'
        },
        {
          id: 2,
          contractNum: 1111111111,
          customer: 'tom',
          mobile: 15111111111,
          buyHouse: '万科翡翠东方',
          contractMoney: 100000,
          payTime: '2019-10-10 10:00',
          commissionPer: '0.3%',
          yjfy: 3000,
          shyj: 3000,
          status: '待结算',
          code: 'YGas12121221'
        },
        {
          id: 3,
          contractNum: 1111111111,
          customer: 'tom',
          mobile: 15111111111,
          buyHouse: '万科翡翠东方',
          contractMoney: 100000,
          payTime: '2019-10-10 10:00',
          commissionPer: '0.3%',
          yjfy: 3000,
          shyj: 3000,
          status: '已结算',
          code: 'YGas12121221'
        },
        {
          id: 4,
          contractNum: 1111111111,
          customer: 'tom',
          mobile: 15111111111,
          buyHouse: '万科翡翠东方',
          contractMoney: 100000,
          payTime: '2019-10-10 10:00',
          commissionPer: '0.3%',
          yjfy: 3000,
          shyj: 3000,
          status: '已关单',
          code: 'YGas12121221'
        }
      ],
      settled: {
        realMoney: '',
        time: null,
        remark: ''
      },
      userInfo: {}
    }
  },
  mounted () {
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      fetchCommissionUser({
        username: this.$route.query.username
      }).then(({ data }) => {
        this.userInfo = data.item
        this.fetchItem(data.item.id)
      })
    },
    fetchItem () {
      fetchCommissionItem({
        id: 1
      }).then(({ data }) => {
        this.userInfo = data.item
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
      this.dialogVisible = true
      this.settled.time = moment().format('YYYY-MM-DD HH:mm')
    },
    handleCloseCheck () {},
    handleConform () {
      this.dialogVisible = false
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
