<template>
  <div class="manage-role-page">
    <div class="content-title">角色列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" v-permission="'新建角色'" size="small" @click="handleEdit('add')">新建角色</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column prop="name" label="角色名称" width="500"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleEdit('edit', scope.row)">编辑</el-button>
          <el-button size="mini" @click.stop="handleEdit('preview', scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchAllRoles } from '../../assets/services/manage-service'
export default {
  name: 'manage-role',
  data () {
    return {
      loading: false,
      tableData: [],
      pageSize: 10,
      pageNo: 1,
      total: 0
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    handleEdit (tag, data) {
      this.$router.push({
        name: 'add-role',
        query: {
          tag,
          id: data ? data.id : ''
        }
      })
    },
    fetchList () {
      this.loading = true
      fetchAllRoles({
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.fetchList()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
