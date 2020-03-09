<template>
  <div class="manage-advertise-place-page">
    <div class="content-title">广告位列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleAddAdvertisement('add')">新建广告</el-button>
      <el-button type="danger" size="small" @click="handleSet(multipleSelection, '下架')">批量下架</el-button>
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">广告位名称：</div>
        <div class="ilb-top">
          <el-input v-model="search.keyword" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">广告位位置：</div>
        <div class="ilb-top">
          <el-select v-model="search.postion" placeholder="请选择" size="mini">
            <el-option
              v-for="item in positions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">上架状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.status" placeholder="请选择" size="mini">
            <el-option
              v-for="item in putways"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
      @row-click="handleClickCell"
      v-loading="loading"
       @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="title" label="广告位名称" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="100"></el-table-column>
      <el-table-column prop="on_time" label="上架时间" width="180"></el-table-column>
      <el-table-column prop="off_time" label="下架时间" width="180"></el-table-column>
      <el-table-column prop="statusName" label="上架状态" width="100"></el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleAddAdvertisement('edit', scope.row)">编辑</el-button>
          <el-button type="danger" v-if="scope.row.status === 1" size="mini" @click.stop="handleSet([scope.row], '下架')">下架</el-button>
          <el-button type="success" v-if="scope.row.status === 0" size="mini" @click.stop="handleSet([scope.row], '上架')">上架</el-button>
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
import { fetchAdver, batchEditAdvertise } from '../../assets/services/manage-service'
export default {
  name: 'manage-advertise-place',
  data () {
    return {
      loading: false,
      total: 0,
      multipleSelection: [],
      tableData: [],
      search: {
        keyword: '',
        postion: -1,
        status: -1,
        pageSize: 10,
        pageNo: 1
      },
      positions: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '首页banner'
        },
        {
          value: 2,
          label: '开屏广告'
        }
      ],
      putways: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '待上架'
        },
        {
          value: 1,
          label: '已上架'
        },
        {
          value: 2,
          label: '已下架'
        }
      ]
    }
  },
  watch: {
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    handleSearch () {
      this.search.pageNo = 1
      this.fetchList()
    },
    fetchList () {
      this.loading = true
      fetchAdver({
        ...this.search
      }).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      })
    },
    checkSelectable (row) {
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleAddAdvertisement (flag, data) {
      this.$router.push({
        name: 'add-advertisement-position',
        query: {
          flag,
          id: data && data.id
        }
      })
    },
    handleClickCell (row, column, cell, event) {
      this.$router.push({
        name: 'add-advertisement-position',
        query: {
          id: row.id,
          flag: 'preview'
        }
      })
    },
    handleReset () {
      this.search.keyword = ''
      this.search.postion = -1
      this.search.status = -1
      this.search.pageSize = 10
      this.search.pageNo = 1
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
    handleSet (data, status) {
      if (data.length === 0) { return }
      let ids = []
      data.forEach(item => {
        ids.push(item.id)
      })
      this.$confirm(`请确定是否要${status}？`, `商品${status}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchEditAdvertise({
          ids: ids.join(','),
          status: status === '上架' ? 1 : 0
        }).then(({ data }) => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.search.pageNo = 1
          this.fetchList()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
