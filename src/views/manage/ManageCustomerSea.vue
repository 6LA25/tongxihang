<template>
  <div class="manage-customer-sea-page">
    <div class="content-title">意向客户列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" v-permission="'新增意向客户'" @click="handleAddCustomer('add')">新增意向客户</el-button>
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input style="width: 250px;" v-model="search.keyword" placeholder="请输入UID、手机或姓名搜索" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">身份：</div>
        <div class="ilb-top">
          <el-select v-model="search.type" placeholder="请选择" size="mini">
            <el-option
              v-for="item in identities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box" v-if="false">
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
        <div class="ilb-top search-item-label">发布日期：</div>
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
      <el-table-column prop="realname" label="客户姓名" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="genderName" label="性别" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="houseName" label="推荐楼盘" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="intro" label="备注" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendName" label="推荐人" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendTime" label="推荐时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="followRealname" label="跟进人" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="followStatusName" label="跟进状态" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.followStatus === 1" size="mini" @click.stop="handleDispatchCase(scope.row, 1)">派单</el-button>
          <el-button type="warning" v-if="scope.row.followStatus === 0" size="mini" @click.stop="handleDispatchCase(scope.row, 0)">重新派单</el-button>
          <el-button type="danger" v-if="scope.row.followStatus === 1 || scope.row.followStatus === 2 || scope.row.followStatus === 3 || scope.row.followStatus === 4 || scope.row.followStatus === 5" size="mini" @click.stop="handleCloseCase(scope.row)">关单</el-button>
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
      title="关单"
      :visible.sync="closeDialogVisible"
      width="50%">
      <el-form v-if="closeDialogVisible" :model="closeForm" ref="closeForm" label-width="100px">
        <el-form-item
          label="理由"
          prop="intro"
          :rules="[
            { required: true, message: '理由不能为空'},
          ]"
        >
          <el-input style="width: 400px;" type="text" size="mini" v-model="closeForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('closeForm')">提交</el-button>
          <el-button size="mini" type="primary" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="派单"
      :visible.sync="sendDialogVisible"
      width="50%">
      <el-form v-if="sendDialogVisible" :model="sendForm" ref="sendForm" label-width="100px">
        <el-form-item
          label="理由"
          prop="intro"
          :rules="[
            { required: true, message: '理由不能为空'},
          ]"
        >
          <el-input style="width: 400px;" type="text" size="mini" v-model="sendForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="跟进人"
          prop="followUser"
          :rules="[
            { required: true, message: '跟进人不能为空'},
          ]"
        >
          <el-select
            style="width: 400px"
            size="mini"
            v-model="sendForm.followUser"
            filterable
            remote
            reserve-keyword
            placeholder="请输入需要指派的用户名"
            :remote-method="fetchUsers">
            <el-option
              v-for="item in options"
              :key="item.account"
              :label="item.account"
              :value="item.account">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleSendForm('sendForm')">提交</el-button>
          <el-button size="mini" type="primary" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchCustomerSea, closeCustomerCase, fetchAllUsers, sendCustomerCase } from '../../assets/services/manage-service'
export default {
  name: 'manage-customer-sea-page',
  data () {
    return {
      loading: false,
      searching: false,
      total: 0,
      closeDialogVisible: false,
      sendDialogVisible: false,
      options: [],
      search: {
        keyword: '',
        type: -1,
        time: '',
        pageSize: 10,
        pageNo: 1
      },
      closeForm: {
        id: '',
        intro: ''
      },
      sendForm: {
        id: '',
        intro: '',
        followUser: ''
      },
      identities: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '经纪人录入'
        },
        {
          value: 1,
          label: '后台录入'
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
      tableData: []
    }
  },
  mounted () {
    this.fetchList()
    this.fetchUsers()
  },
  watch: {
    closeDialogVisible (nv) {
      if (!nv) {
        this.closeForm.intro = ''
        this.closeForm.id = ''
      }
    },
    sendDialogVisible (nv) {
      if (!nv) {
        this.sendForm.id = ''
        this.sendForm.intro = ''
        this.sendForm.followUser = ''
      }
    }
  },
  methods: {
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确定关单吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            closeCustomerCase(this.closeForm).then(({ data }) => {
              this.$message.success('关单成功')
              this.handleReset()
              this.closeDialogVisible = false
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSendForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sendCustomerCase(this.sendForm).then(({ data }) => {
            this.$message.success('派单成功')
            this.handleReset()
            this.sendDialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchUsers (query) {
      fetchAllUsers({}).then(({ data }) => {
        this.options = data.items
      })
    },
    fetchList () {
      this.loading = true
      let post = {
        keyword: this.search.keyword,
        type: this.search.type,
        startTime: this.search.time ? this.search.time[0] : '',
        endTime: this.search.time ? this.search.time[1] : '',
        pageNo: this.search.pageNo,
        pageSize: this.search.pageSize
      }
      fetchCustomerSea(post).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleAddCustomer () {
      this.$router.push({
        name: 'add-intention-customer'
      })
    },
    handleReset () {
      this.search.pageSize = 10
      this.search.pageNo = 1
      this.search.keyword = ''
      this.search.type = -1
      this.search.time = ''
      this.fetchList()
    },
    handleDispatchCase (row) {
      console.log(row)
      this.sendForm.id = row.id
      this.sendDialogVisible = true
    },
    // 关单
    handleCloseCase (row) {
      console.log(row)
      this.closeDialogVisible = true
      this.closeForm.id = row.id
    },
    handleClose () {
      this.closeDialogVisible = false
      this.sendDialogVisible = false
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
