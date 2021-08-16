<template>
  <div class="manage-staff-page">
    <div class="content-title">外部会员列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleEdit('add')"
        >新建外部会员</el-button
      >
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">账号：</div>
        <div class="ilb-top">
          <el-input
            v-model="search.account"
            placeholder="请输入账号"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">姓名：</div>
        <div class="ilb-top">
          <el-input
            v-model="search.realname"
            placeholder="请输入姓名"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">手机号：</div>
        <div class="ilb-top">
          <el-input
            v-model="search.mobile"
            placeholder="请输入手机号"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">公司：</div>
        <div class="ilb-top">
          <el-input
            v-model="search.company"
            placeholder="请输入公司名称"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="primary" size="mini" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="warning" size="mini" @click="handleReset"
          >重置</el-button
        >
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
      <el-table-column
        prop="account"
        label="用户名"
        min-width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="realname"
        label="姓名"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="company"
        label="公司"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        min-width="80"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ getGenderName(scope.row.sex) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click.stop="handleEdit('edit', scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" @click.stop="handleEdit('preview', scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click.stop="handleDelete(scope.row)"
            >删除</el-button
          >
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
import {
  fetchExternalUsers,
  deleteExternalUser,
} from '../../assets/services/manage-service'
export default {
  name: 'manage-staff',
  data() {
    return {
      loading: false,
      dialogVisible: false,
      tableData: [],
      search: {
        account: '',
        realname: '',
        mobile: '',
        company: '',
        pageSize: 10,
        pageNo: 1,
      },
      statusList: [
        {
          value: -1,
          label: '全部',
        },
        {
          value: 1,
          label: '有效',
        },
        {
          value: 2,
          label: '无效',
        },
      ],
      total: 0,
    }
  },
  mounted() {
    this.fetchList()
  },
  watch: {
    dialogVisible(nv) {
      if (!nv) {
      }
    },
  },
  methods: {
    handleDelete({uid}) {
      this.$confirm('是否删除此条数据？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteExternalUser({
            uid,
          }).then(() => {
            this.$message.success('删除成功')
            this.handleSearch()
          })
        })
        .catch(() => {})
    },
    getGenderName(sex) {
      if (sex === 1) {
        return '男'
      } else if (sex === 2) {
        return '女'
      } else {
        return '其他'
      }
    },
    handleSearch() {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleReset() {
      Object.keys(this.search).forEach((item) => {
        this.search[item] = ''
        this.search.pageSize = 10
        this.search.pageNo = 1
      })
      this.fetchList()
    },
    handleEdit(tag, data) {
      this.$router.push({
        name: 'add-external-user',
        query: {
          tag,
          uid: data ? data.uid : '',
        },
      })
    },
    fetchList() {
      this.loading = true
      fetchExternalUsers({
        ...this.search,
      })
        .then(({ data }) => {
          this.total = data.totalCount
          this.tableData = data.items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.search.pageNo = val
      this.fetchList()
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
