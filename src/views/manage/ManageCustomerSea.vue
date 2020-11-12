<template>
  <div class="manage-customer-sea-page">
    <div class="content-title">意向客户列表</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        :disabled="sendForm.ids.length === 0"
        @click="handleDispatchCase('')"
      >批量派单</el-button>
      <el-button
        type="primary"
        size="small"
        v-permission="'新增意向客户'"
        @click="handleAddCustomer('add')"
      >新增意向客户</el-button>
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input
            style="width: 250px;"
            v-model="search.keyword"
            placeholder="请输入UID、手机或姓名搜索"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">推荐人搜索：</div>
        <div class="ilb-top">
          <el-input
            style="width: 250px;"
            v-model="search.recommendWord"
            placeholder="请输入推荐人手机号"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">派单人员：</div>
        <div class="ilb-top">
          <el-select :disabled="options.length === 0" v-model="search.followUser" placeholder="请选择" size="mini">
            <el-option label="全部" value="-1"></el-option>
            <el-option
              v-for="item in options"
              :key="item.account"
              :label="item.account"
              :value="item.account"
            ></el-option>
          </el-select>
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
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">跟进状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.followStatus" placeholder="请选择跟进状态" size="mini">
            <el-option
              v-for="item in followingStatus"
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
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
      <el-table-column prop="realname" label="客户姓名" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mobile" label="手机号" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="genderName" label="性别" min-width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="houseName" label="推荐楼盘" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="typeName" label="客户来源" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="intro" label="备注" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendName" label="推荐人" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendMobile" label="推荐人手机号" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendTime" label="推荐时间" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="followRealname" label="跟进人" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="followStatusName" label="跟进状态" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" min-width="350">
        <template slot-scope="scope">
          <el-button
            type="primary"
            v-if="scope.row.followStatus === 1"
            size="mini"
            @click.stop="handleDispatchCase([scope.row.id], 1)"
          >派单</el-button>
          <el-button
            type="warning"
            size="mini"
            v-if="scope.row.followStatus !== 1"
            @click.stop="handleRedispatchCase([scope.row.id], 0)"
          >重新派单</el-button>
          <el-button
            type="danger"
            v-if="scope.row.followStatus === 1 || scope.row.followStatus === 2 || scope.row.followStatus === 3 || scope.row.followStatus === 4 || scope.row.followStatus === 5"
            size="mini"
            @click.stop="handleCloseCase(scope.row)"
          >关单</el-button>
          <el-button type="warning" size="mini" @click="handleJumpDetail(scope.row)">详情</el-button>
          <el-button
            type="primary"
            v-permission="'编辑客户'"
            size="mini"
            @click.stop="handleJumpEditCustomer(scope.row)"
          >编辑客户</el-button>
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
    <el-dialog title="关单" :visible.sync="closeDialogVisible" width="50%">
      <el-form v-if="closeDialogVisible" :model="closeForm" ref="closeForm" label-width="100px">
        <el-form-item
          label="理由"
          prop="intro"
          :rules="[
            { required: true, message: '理由不能为空'},
          ]"
        >
          <el-input
            style="width: 400px;"
            type="text"
            size="mini"
            v-model="closeForm.intro"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('closeForm')">提交</el-button>
          <el-button size="mini" type="primary" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="sendStatus === 1 ? '派单' : '重新派单'"
      :visible.sync="sendDialogVisible"
      width="50%"
    >
      <el-form v-if="sendDialogVisible" :model="sendForm" ref="sendForm" label-width="100px">
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
            :remote-method="fetchUsers"
          >
            <el-option
              v-for="item in options"
              :key="item.account"
              :label="item.account"
              :value="item.account"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="理由" prop="intro">
          <el-input
            style="width: 400px;"
            type="text"
            size="mini"
            v-model="sendForm.intro"
            autocomplete="off"
          ></el-input>
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
import {
  fetchCustomerSea,
  closeCustomerCase,
  fetchAllUsers,
  sendCustomerCase,
  redistributionCase
} from '../../assets/services/manage-service'
export default {
  name: 'manage-customer-sea-page',
  data () {
    return {
      multipleSelection: [],
      loading: false,
      searching: false,
      total: 0,
      closeDialogVisible: false,
      sendDialogVisible: false,
      options: [],
      search: {
        keyword: '',
        recommendWord: '',
        followUser: '',
        followStatus: '',
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
        ids: '',
        intro: '',
        followUser: ''
      },
      followUsers: [],
      identities: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '经纪人推荐'
        },
        {
          value: 1,
          label: '后台录入'
        },
        {
          value: 2,
          label: '开盘通知'
        },
        {
          value: 3,
          label: '变价通知'
        },
        {
          value: 4,
          label: '预约看房'
        },
        {
          value: 5,
          label: '实时动态'
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
      followingStatus: [
        { value: -1, label: '全部' },
        { value: 0, label: '关单' },
        { value: 2, label: '联系中' },
        { value: 3, label: '已到访' },
        { value: 4, label: '已认筹' },
        { value: 5, label: '已认购' },
        { value: 6, label: '已签约' }
        // { status: 7, text: '已回款' }
      ],
      tableData: [],
      sendStatus: ''
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
        this.sendForm.ids = []
        this.sendForm.intro = ''
        this.sendForm.followUser = ''
        this.sendStatus = ''
      }
    }
  },
  methods: {
    checkSelectable (item) {
      return item.followStatus === 1 || item.followStatus === 0
    },
    handleSelectionChange (val) {
      let ids = val.map((item) => {
        return item.id
      })
      this.sendForm.ids = ids
    },
    handleJumpEditCustomer (data) {
      this.$router.push({
        name: 'edit-customer',
        query: {
          id: data.id,
          houseName: encodeURIComponent(data.houseName)
        }
      })
    },
    handleJumpDetail (data) {
      console.log(data)
      this.$router.push({
        name: 'add-following-record',
        query: {
          id: data.id,
          flag: 'preview'
        }
      })
    },
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
          let _post = {
            ids: this.sendForm.ids.join(','),
            intro: this.sendForm.intro,
            followUser: this.sendForm.followUser
          }
          let _fn =
            this.sendStatus === 1 ? sendCustomerCase : redistributionCase
          _fn(_post).then(({ data }) => {
            this.$message.success(
              this.sendStatus === 1 ? '派单成功' : '重新派单成功'
            )
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
        pageSize: this.search.pageSize,
        recommendWord: this.search.recommendWord,
        followUser: this.search.followUser,
        followStatus: this.search.followStatus
      }
      fetchCustomerSea(post)
        .then(({ data }) => {
          this.total = data.totalCount
          this.tableData = data.items
          this.loading = false
        })
        .catch(() => {
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
      this.search.recommendWord = ''
      this.search.followStatus = ''
      this.search.followUser = ''
      this.search.type = -1
      this.search.time = ''
      this.fetchList()
    },
    // 重新派单
    handleRedispatchCase (ids) {
      this.sendStatus = 0
      this.sendForm.ids = ids
      this.sendDialogVisible = true
    },
    // 派单
    handleDispatchCase (ids) {
      if (ids) {
        this.sendForm.ids = ids
      }
      this.sendStatus = 1
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
