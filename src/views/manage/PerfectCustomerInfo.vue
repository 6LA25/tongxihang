<template>
  <div class="perfect-customer-info-page">
    <div class="content-title">意向客户列表</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input style="width: 250px;" v-model="search.keyword" placeholder="请输入UID、手机或姓名搜索" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">审核状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.type" placeholder="请选择" size="mini">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="待跟进" :value="0"></el-option>
            <el-option label="已完善信息" :value="1"></el-option>
            <el-option label="已关单" :value="2"></el-option>
          </el-select>
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
      <el-table-column prop="mobile" label="手机号" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="houseName" label="查看楼盘" min-width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="time" label="联系经纪人时间" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="联系经纪人" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="跟进状态" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="time1" label="跟进时间" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reason" label="关单原因" min-width="100" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleOperate(scope.row)">重新启动</el-button>
          <el-button type="primary" size="mini" @click.stop="handleOperate(scope.row, 'edit-customer')">完善信息</el-button>
          <el-button type="danger" size="mini" @click.stop="handleOperate(scope.row)">关单</el-button>
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
export default {
  name: 'perfect-customer-info',
  data () {
    return {
      loading: false,
      tableData: [
        {
          id: 1,
          mobile: 1111,
          houseName: 'xxxx',
          time: '2020-10-10',
          name: 'xxxxx',
          status: '-1',
          time1: '2020-10-10',
          reason: 'asd'
        }
      ],
      total: 0,
      search: {
        pageSize: 10,
        pageNo: 1,
        keyword: '',
        type: ''
      }
    }
  },
  methods: {
    handleOperate (data, route) {
      this.$router.push({
        name: 'edit-customer',
        query: {
          id: data.id
        }
      })
    },
    handleSearch () {
      this.search.pageNo = 1
      // this.fetchList()
    },
    handleReset () {
      this.search.pageSize = 10
      this.search.pageNo = 1
      // this.fetchList()
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      // this.fetchList()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      // this.fetchList()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
