<template>
  <div class="manage-commission-page">
    <div class="content-title">分销佣金审核</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input v-model="search.keyword" placeholder="请输入内容" size="mini"></el-input>
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
      <el-table-column prop="customerName" label="客户姓名" width="100"></el-table-column>
      <el-table-column prop="customerMobile" label="手机号" width="120"></el-table-column>
      <el-table-column prop="houseName" label="购买楼盘" width="120"></el-table-column>
      <el-table-column prop="contractAmount" label="合同总价" width="100"></el-table-column>
      <el-table-column prop="contractTime" label="签约时间" width="150"></el-table-column>
      <el-table-column prop="leve1Price" label="一级分成" width="80">
        <template slot-scope="scope">
          {{scope.row.level1Agent ? scope.row.leve1Price : '--'}}
        </template>
      </el-table-column>
      <el-table-column prop="leve2Price" label="二级分成" width="80">
        <template slot-scope="scope">
          {{scope.row.level2Agent ? scope.row.leve2Price : '--'}}
        </template>
      </el-table-column>
      <el-table-column prop="leve3Price" label="三级分成" width="80">
        <template slot-scope="scope">
          {{scope.row.level3Agent ? scope.row.leve3Price : '--'}}
        </template>
      </el-table-column>
      <el-table-column prop="salesmanRealname" label="所属员工" width="100"></el-table-column>
      <el-table-column prop="totalPrice" label="总计" width="80"></el-table-column>
      <el-table-column prop="statusName" label="财务状态" width="80"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <!-- status  0待审核，1通过，2驳回 -->
          <!-- <el-button v-if="scope.row.status === 0" type="success" size="mini" @click="handleCheck(scope.row, 'pass')">审核通过</el-button>
          <el-button v-if="scope.row.status === 0" type="danger" size="mini" @click="handleCheck(scope.row, 'reject')">审核驳回</el-button>
          <el-button v-if="scope.row.status === 2" type="primary" size="mini" @click="handleCheck(scope.row, 'reset')">重启审核</el-button> -->
          <div style="margin-bottom: 5px;" v-permission="'一级审核'" v-if="scope.row.status === 0">
            <el-button v-if="scope.row.firstAuditStatus === 0" type="success" size="mini" @click="handleCheck(scope.row, 'pass', 1)">一审通过</el-button>
            <el-button v-if="scope.row.firstAuditStatus === 0" type="danger" size="mini" @click="handleCheck(scope.row, 'reject', 1)">一审拒绝</el-button>
          </div>
          <div style="margin-bottom: 5px;" v-permission="'二级审核'" v-if="scope.row.status === 0">
            <el-button v-if="scope.row.secondAuditStatus === 0 && scope.row.firstAuditStatus === 1" type="success" size="mini" @click="handleCheck(scope.row, 'pass', 2)">二审通过</el-button>
            <el-button v-if="scope.row.secondAuditStatus === 0 && scope.row.firstAuditStatus === 1" type="danger" size="mini" @click="handleCheck(scope.row, 'reject', 2)">二审拒绝</el-button>
          </div>
          <div style="margin-bottom: 5px;" v-permission="'三级审核'" v-if="scope.row.status === 0">
            <el-button v-if="scope.row.thirdAuditStatus === 0 && scope.row.firstAuditStatus === 1 && scope.row.secondAuditStatus === 1" type="success" size="mini" @click="handleCheck(scope.row, 'pass', 3)">三审通过</el-button>
            <el-button v-if="scope.row.thirdAuditStatus === 0 && scope.row.firstAuditStatus === 1 && scope.row.secondAuditStatus === 1" type="danger" size="mini" @click="handleCheck(scope.row, 'reject', 3)">三审拒绝</el-button>
          </div>
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
      title="审核"
      :visible.sync="intrFormDialogVisiable"
      width="50%">
      <el-form v-if="intrFormDialogVisiable" :model="intrForm" ref="intrForm" label-width="100px">
        <template v-if="tag === 'pass'">
          <el-form-item v-if="currentDistribution.level1Agent" :rules="[{ required: true, message: '请输入佣金金额'},]" label="一级佣金：" prop="leve1Price">
            <el-input style="width: 400px" size="mini" v-model="intrForm.leve1Price"></el-input>
            <span style="margin-left: 20px;">系统佣金：{{currentDistribution.defaultLeve1Price || 0}}</span>
          </el-form-item>
          <el-form-item v-if="currentDistribution.level2Agent" :rules="[{ required: true, message: '请输入佣金金额'},]" label="二级佣金：" prop="leve2Price">
            <el-input style="width: 400px" size="mini" v-model="intrForm.leve2Price"></el-input>
          </el-form-item>
          <el-form-item v-if="currentDistribution.level3Agent" :rules="[{ required: true, message: '请输入佣金金额'},]" label="三级佣金：" prop="leve3Price">
            <el-input style="width: 400px" size="mini" v-model="intrForm.leve3Price"></el-input>
          </el-form-item>
        </template>
        <el-form-item
          label="理由"
          prop="intro"
          :rules="[
            { required: true, message: '理由不能为空'},
          ]"
        >
          <el-input style="width: 400px;" type="text" size="mini" v-model="intrForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('intrForm')">提交</el-button>
          <el-button size="mini" type="primary" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDistributionList, rejectDistribution, passDistribution, fetchDistributionItem } from '../../assets/services/manage-service'
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
      tag: '',
      search: {
        keyword: '',
        pageSize: 10,
        pageNo: 1
      },
      intrFormDialogVisiable: false,
      intrForm: {
        id: '',
        intro: '',
        leve1Price: '',
        leve2Price: '',
        leve3Price: ''
      },
      totalCount: 0,
      tableData: [],
      total: 0,
      currentLevel: '',
      currentDistribution: {}
    }
  },
  mounted () {
    this.fetchList()
  },
  watch: {
    intrFormDialogVisiable (nv) {
      if (!nv) {
        this.intrForm.id = ''
        this.intrForm.intro = ''
        this.tag = ''
        this.currentLevel = ''
        this.currentDistribution = {}
      }
    }
  },
  methods: {
    getDistributionItem () {
      fetchDistributionItem({
        id: this.intrForm.id
      }).then(({ data }) => {
        this.intrForm.leve1Price = data.item.leve1Price || ''
        this.intrForm.leve2Price = data.item.leve2Price || ''
        this.intrForm.leve3Price = data.item.leve3Price || ''
        this.currentDistribution = data.item
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.tag === 'pass') {
            this.handlePass()
          } else if (this.tag === 'reject') {
            this.handleReject()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose () {
      this.intrForm.id = ''
      this.intrForm.intro = ''
      this.tag = ''
      this.intrFormDialogVisiable = false
    },
    handleCheck (row, tag, level) {
      this.intrForm.id = row.id
      this.tag = tag
      this.intrFormDialogVisiable = true
      this.currentLevel = level
      if (tag === 'pass') {
        this.getDistributionItem()
      }
    },
    handlePass () {
      passDistribution({
        id: this.intrForm.id,
        level: this.currentLevel,
        leve1Price: this.intrForm.leve1Price,
        leve2Price: this.intrForm.leve2Price,
        leve3Price: this.intrForm.leve3Price,
        intro: this.intrForm.intro
      }).then(({ data }) => {
        this.$message.success('操作成功')
        this.handleReset()
        this.handleClose()
      })
    },
    handleReject () {
      rejectDistribution({
        id: this.intrForm.id,
        level: this.currentLevel,
        intro: this.intrForm.intro
      }).then(({ data }) => {
      }).catch(error => {
        console.log(error)
        if (error.result_code === 10001) {
          this.$message.success('操作成功')
          this.handleReset()
          this.handleClose()
        }
      })
    },
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleReset () {
      this.search.pageNo = 1
      this.search.pageSize = 10
      this.search.keyword = ''
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
      fetchDistributionList({
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
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
