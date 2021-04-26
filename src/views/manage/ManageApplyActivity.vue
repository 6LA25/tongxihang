<template>
  <div class="manage-appply-activity-page">
    <div class="content-title">报名活动管理</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        v-permission="'新建楼盘'"
        @click="handleAddAct('add')"
        >新建活动</el-button
      >
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">活动名称：</div>
        <div class="ilb-top">
          <el-input
            v-model="search.keyword"
            placeholder="请输入内容"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">活动状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.state" placeholder="请选择" size="mini">
            <el-option
              v-for="item in putawayStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="活动ID"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="name"
        label="活动名称"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="time"
        label="截止时间"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="num"
        label="报名人数"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="statusName"
        label="活动状态"
        min-width="100"
      ></el-table-column>
      <el-table-column prop="realname" label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            v-permission="'新建楼盘'"
            @click.stop="handleToggleAct(scope.row)"
            >开启活动</el-button
          >
          <el-button
            v-permission="'新建楼盘'"
            type="primary"
            size="mini"
            @click.stop="handleJumpEditAct(scope.row)"
            >编辑活动</el-button
          >
          <el-button
            type="primary"
            size="mini"
            v-permission="'新建楼盘'"
            @click="handleShowNames"
            >报名名单</el-button
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
    <el-dialog title="报名名单" :visible.sync="nameDialogVisible" width="70%">
      <div class="name-title-box">
        <span class="title">xxxx</span>
        <span class="num">已有2人报名</span>
        <el-button type="primary" size="mini">导出EXCEL</el-button>
      </div>
      <el-table
        :data="nameData"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
      >
        <el-table-column
          prop="time"
          label="报名时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div class="pager-box">
        <el-pagination
          @size-change="handleNameSizeChange"
          @current-change="handleNameCurrentChange"
          :current-page="nameSearch.pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="nameSearch.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'manage-appply-activity',
  data() {
    return {
      loading: false,
      nameDialogVisible: false,
      total: 0,
      nameSearch: {
        pageNo: 1,
        pageSize: 10,
      },
      nameData: [
        {
          time: '2010-1-1',
          name: 'xxx',
          mobile: 1234,
        },
      ],
      tableData: [
        {
          id: 'xxx',
          name: '1111',
          time: '2020-10-10',
          num: 234,
          statusName: 'xxxx',
        },
      ],
      putawayStatus: [
        {
          value: -1,
          label: '全部',
        },
        {
          value: 1,
          label: '开启中',
        },
        {
          value: 0,
          label: '已关闭',
        },
      ],
      search: {
        keyword: '',
        pageSize: 10,
        pageNo: 1,
      },
      nameData: [
        {
          time: 'xx',
          name: 'xx',
          mobile: 'xxx'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    handleShowNames() {
      this.nameDialogVisible = true
    },
    handleAddAct() {
      this.$router.push({
        name: 'add-appply-activity',
        query: {
          flag: 'add'
        }
      })
    },
    fetchList() {},
    fetchNameList() {},
    handleDelete() {
      this.$confirm('确定删除该活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {})
        .catch(() => {})
    },
    handleToggleAct() {},
    handleJumpEditAct() {},
    handleReset() {
      Object.keys(this.search).forEach((item) => {
        this.search[item] = ''
        this.search.pageSize = 10
        this.search.pageNo = 1
      })
      this.fetchList()
    },
    handleSearch() {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.search.pageNo = val
      this.fetchList()
    },
    handleNameSizeChange() {
      this.nameSearch.pageSize = val
      this.fetchNameList()
    },
    handleNameCurrentChange() {
      this.nameSearch.pageNo = val
      this.fetchNameList()
    },
  },
}
</script>

<style lang="stylus" scoped>
.name-title-box {
  display flex
  align-items center
  margin-bottom 10px
  .title, .num {
    margin-right 10px
  }
}
</style>
