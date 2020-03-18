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
      <!-- <div class="ilb-top search-item-box">
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
      </div> -->
      <!-- <div class="ilb-top search-item-box">
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
      </div> -->
      <!-- <div class="ilb-top search-item-box">
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
      </div> -->
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
      <el-table-column prop="leve1Price" label="一级分成" width="80"></el-table-column>
      <el-table-column prop="leve2Price" label="二级分成" width="80"></el-table-column>
      <el-table-column prop="leve3Price" label="三级分成" width="80"></el-table-column>
      <el-table-column prop="totalPrice" label="总计" width="80"></el-table-column>
      <el-table-column prop="statusName" label="财务状态" width="80"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <!-- status  0待审核，1通过，2驳回 -->
          <el-button v-if="scope.row.status === 0" type="success" size="mini" @click="handleCheck(scope.row, 'pass')">审核通过</el-button>
          <el-button v-if="scope.row.status === 0" type="danger" size="mini" @click="handleCheck(scope.row, 'reject')">审核驳回</el-button>
          <el-button v-if="scope.row.status === 2" type="primary" size="mini" @click="handleCheck(scope.row, 'reset')">重启审核</el-button>
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
      title="审核理由"
      :visible.sync="intrFormDialogVisiable"
      width="50%">
      <el-form v-if="intrFormDialogVisiable" :model="intrForm" ref="intrForm" label-width="100px">
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
      tag: '',
      search: {
        keyword: '',
        pageSize: 10,
        pageNo: 1
      },
      intrFormDialogVisiable: false,
      intrForm: {
        id: '',
        intro: ''
      },
      totalCount: 0,
      tableData: [],
      total: 0
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
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.tag === 'pass') {
            this.handlePass()
          } else if (this.tag === 'reject') {
            this.handleReject()
          } else if (this.tag === 'reset') {
            this.handleResetDis()
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
    handleCheck (row, tag) {
      this.intrForm.id = row.id
      this.tag = tag
      this.intrFormDialogVisiable = true
    },
    handlePass () {
      passDistribution({
        id: this.intrForm.id,
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
        intro: this.intrForm.intro
      }).then(({ data }) => {
        this.$message.success('操作成功')
        this.handleReset()
        this.handleClose()
      })
    },
    handleResetDis () {
      resetDistribution({
        id: this.intrForm.id,
        intro: this.intrForm.intro
      }).then(({ data }) => {
        this.$message.success('操作成功')
        this.handleReset()
        this.handleClose()
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
