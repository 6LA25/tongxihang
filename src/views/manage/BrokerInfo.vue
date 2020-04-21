<template>
  <div class="broker-info-page">
    <div class="content-title">用户管理</div>
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
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
      <el-table-column prop="realname" label="姓名" width="150"></el-table-column>
      <el-table-column prop="superiorOne.username" label="二级分销人" width="100"></el-table-column>
      <el-table-column prop="superiorTow.username" label="三级分销人" width="150"></el-table-column>
      <el-table-column prop="customerCount" label="推荐客户数" width="150"></el-table-column>
      <el-table-column prop="successfulTradeCount" width="150" label="成单量"></el-table-column>
      <el-table-column prop="totalCommission" width="150" label="佣金总额"></el-table-column>
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
import { fetchAllAgents } from '../../assets/services/manage-service'

export default {
  name: 'broker-info',
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
        keyword: '',
        pageSize: 10,
        pageNo: 1
      },
      tableData: [
        {
          uid: 1,
          mobile: 11111,
          name: 'xxx',
          two: 111111,
          three: 222222,
          recommend: 3,
          num: 3,
          all: 4000
        }
      ],
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
      this.search.keyword = ''
      this.search.pageSize = 10
      this.search.pageNo = 1
      this.handleSearch()
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      fetchAllAgents({
        pageSize: this.search.pageSize,
        pageNo: this.search.pageNo,
        keyword: this.search.keyword
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
