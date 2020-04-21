<template>
  <div class="manage-register-user-page">
    <div class="content-title">用户管理</div>
    <div class="search-head-box">
      <!-- <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input v-model="search.keyword" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div> -->
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
      <div class="ilb-top search-item-box">
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
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
        <el-button type="warning" size="mini" @click="handleReset">重置</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column prop="uid" label="UID" width="80"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
      <el-table-column prop="userTypeName" label="身份" width="80"></el-table-column>
      <el-table-column prop="salesman" label="所属经纪人" width="100"></el-table-column>
      <el-table-column prop="superior" label="所属员工" width="100"></el-table-column>
      <el-table-column prop="username" label="姓名" width="150"></el-table-column>
      <el-table-column prop="lastLoginTime" label="最近登录时间" width="150"></el-table-column>
      <el-table-column prop="lastViewHouse" label="最近查看楼盘" width="150"></el-table-column>
      <el-table-column prop="buyCount" label="已购房数">
        <template slot-scope="scope">
          <span class="pointer table-cell-click-span" @click="handleCellClick(scope.row)">{{scope.row.buyCount}}</span>
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
import { fetchAllRegisters } from '../../assets/services/manage-service'

export default {
  name: 'manage-register-user',
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
      search: {
        time: '',
        pageSize: 10,
        pageNo: 1
      },
      tableData: [],
      total: 0
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleSearch () {
      this.fetchData()
    },
    handleReset () {
      this.search.time = ''
      this.search.pageSize = 10
      this.search.pageNo = 1
      this.handleSearch()
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.handleSearch()
    },
    handleCellClick (row) {
      console.log(row)
      this.$router.push({
        name: 'manage-customer-sea'
      })
    },
    fetchData () {
      this.loading = true
      fetchAllRegisters({
        pageSize: this.search.pageSize,
        pageNo: this.search.pageNo,
        start_time: this.search.time ? this.search.time[0] : '',
        end_time: this.search.time ? this.search.time[1] : ''
      }).then(({ data }) => {
        this.loading = false
        this.tableData = data.items || []
        this.total = data.totalCount || 0
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
