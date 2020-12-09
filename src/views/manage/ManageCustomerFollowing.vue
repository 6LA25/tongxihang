<template>
  <div class="manage-customer-following-page">
    <div class="content-title">意向客户列表</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">客户搜索：</div>
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
        <div class="ilb-top search-item-label">推荐楼盘：</div>
        <div class="ilb-top">
          <el-input
            style="width: 150px;"
            v-model="search.houseName"
            placeholder="请输入楼盘名称"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">客户来源：</div>
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
          <el-select v-model="search.followStatus" placeholder="请选择" size="mini">
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
      v-loading="loading"
    >
      <el-table-column prop="realname" label="客户姓名" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mobile" label="手机号" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="genderName" label="性别" min-width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="typeName" label="客户来源" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="houseName" label="推荐楼盘" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="intro" label="备注" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="followStatusName" label="跟进状态" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendTime" label="最近跟进时间" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="nextFollowTime" label="下次跟进时间" min-width="100" show-overflow-tooltip></el-table-column>

      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleFollowing(scope.row)">跟进</el-button>
          <el-button
            v-permission="'编辑客户'"
            type="primary"
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
  </div>
</template>

<script>
import { fetchMyCustomer } from '../../assets/services/manage-service'
export default {
  name: 'manage-customer-following',
  data () {
    return {
      loading: false,
      total: 0,
      search: {
        keyword: '',
        followStatus: -1,
        type: -1,
        time: '',
        houseName: '',
        pageSize: 10,
        pageNo: 1
      },
      options: [],
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
      tableData: []
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    handleJumpEditCustomer (data) {
      this.$router.push({
        name: 'edit-customer',
        query: {
          id: data.id,
          houseName: encodeURIComponent(data.houseName)
        }
      })
    },
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleReset () {
      this.search.pageSize = 10
      this.search.pageNo = 1
      this.search.keyword = ''
      this.search.houseName = ''
      this.search.type = -1
      this.search.followStatus = -1
      this.search.time = ''
      this.fetchList()
    },
    handleFollowing (row) {
      console.log(row)
      this.$router.push({
        name: 'add-following-record',
        query: {
          id: row.id
        }
      })
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
      let post = {
        keyword: this.search.keyword,
        type: this.search.type,
        houseName: this.search.houseName,
        startTime: this.search.time ? this.search.time[0] : '',
        endTime: this.search.time ? this.search.time[1] : '',
        pageNo: this.search.pageNo,
        pageSize: this.search.pageSize,
        followStatus: this.search.followStatus
      }
      fetchMyCustomer(post).then(({ data }) => {
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
