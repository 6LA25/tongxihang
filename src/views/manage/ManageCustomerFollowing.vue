<template>
  <div class="manage-customer-following-page">
    <div class="content-title">意向客户列表</div>
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
      <el-table-column prop="followStatusName" label="跟进状态" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendTime" label="最近跟进时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="nextFollowTime" label="下次跟进时间" width="100" show-overflow-tooltip></el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleFollowing(scope.row)">跟进</el-button>
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
        type: -1,
        time: '',
        pageSize: 10,
        pageNo: 1
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
      tableData: []
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleReset () {
      this.search.pageSize = 10
      this.search.pageNo = 1
      this.search.keyword = ''
      this.search.type = -1
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
        startTime: this.search.time ? this.search.time[0] : '',
        endTime: this.search.time ? this.search.time[1] : '',
        pageNo: this.search.pageNo,
        pageSize: this.search.pageSize
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
