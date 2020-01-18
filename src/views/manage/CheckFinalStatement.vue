<template>
  <div class="check-final-statement-page">
    <div class="content-title">结算单查询</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">结算单号：</div>
        <div class="ilb-top">
          <el-input style="width: 250px;" v-model="search.code" placeholder="结算单号" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
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
      <el-table-column prop="code" label="结算单号" width="200"></el-table-column>
      <el-table-column prop="money" label="结算金额" width="200"></el-table-column>
      <el-table-column prop="time" label="结算时间" width="200"></el-table-column>
      <el-table-column prop="person" label="结算人" width="200"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCheckDetail(scope.row)">结算详情</el-button>
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
export default {
  name: 'check-final-statement',
  data () {
    return {
      loading: false,
      total: 0,
      search: {
        code: '',
        pageSize: 10,
        pageNum: 1
      },
      tableData: [
        {
          id: 1,
          code: 20111111111,
          money: 10000,
          time: '2010-10-10 10:10',
          person: '财务a'
        }
      ]
    }
  },
  methods: {
    handleReset () {},
    handleSizeChange (val) {
      this.search.pageSize = val
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
    },
    handleCheckDetail () {
      this.$router.push({
        name: 'manage-settled',
        query: {
          flag: 'preview'
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
