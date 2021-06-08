<template>
  <div class="manage-appply-activity-page">
    <div class="content-title">报名活动管理</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        v-permission="'新增报名活动'"
        @click="handleAddAct('add')"
        >新建活动</el-button
      >
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">活动名称：</div>
        <div class="ilb-top">
          <el-input
            v-model="search.name"
            placeholder="请输入内容"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">活动状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.racktype" placeholder="请选择" size="mini">
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
        prop="endtime"
        label="截止时间"
        min-width="100"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
          {{scope.row.endtime | YMDHMS_date}}
        </template>
      </el-table-column>
      <el-table-column
        prop="registernum"
        label="报名人数"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="racktype"
        label="活动状态"
        min-width="100"
      >
        <template slot-scope="scope">
          {{scope.row.racktype === 1 ? '已上架' : '未上架'}}
        </template>
      </el-table-column>
      <el-table-column prop="realname" label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            v-permission="'编辑报名活动'"
            @click.stop="handleToggleAct(scope.row)"
            >{{scope.row.racktype === 0 ? '开启活动' : '关闭活动'}}</el-button
          >
          <el-button
            v-permission="'编辑报名活动'"
            type="primary"
            size="mini"
            @click.stop="handleJumpEditAct(scope.row)"
            >编辑活动</el-button
          >
          <el-button
            type="primary"
            size="mini"
            v-permission="'查看报名活动名单'"
            @click="handleShowNames(scope.row.id)"
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
        <span class="title">{{currentReg.name}}</span>
        <span class="num">已有{{nameTable.length}}人报名</span>
        <el-button @click="handleExportExcel" type="primary" size="mini" :disabled="nameTable.length === 0">导出EXCEL</el-button>
      </div>
      <el-table
        :data="nameTable"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
      >
      <el-table-column
      v-for="item in nameTableHeader"
          :prop="item.prop"
          :key="item.prop"
          :label="item.label"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { fetchMarketRegister, fetchRegistrations, batchRegistrationsShelves, exportRegisterExcel } from '../../assets/services/manage-service'

export default {
  name: 'manage-appply-activity',
  data() {
    return {
      loading: false,
      nameDialogVisible: false,
      total: 0,
      tableData: [
      ],
      putawayStatus: [
        {
          value: -1,
          label: '全部',
        },
        {
          value: 1,
          label: '已上架',
        },
        {
          value: 0,
          label: '未上架',
        },
      ],
      search: {
        name: '',
        racktype: '',
        pageSize: 10,
        pageNo: 1,
      },
      nameTableHeader: [],
      nameTable: [],
      currentReg: {}
    }
  },
  mounted() {
    this.fetchList()
  },
  watch: {
    nameDialogVisible(nv) {
      if (!nv) {
        this.nameTableHeader = []
        this.nameTable = []
        this.currentReg = {}
      }
    }
  },
  methods: {
    handleShowNames(id) {
      this.nameDialogVisible = true
      fetchRegistrations({
        id
      }).then(({data}) => {
        this.currentReg = data.item
        this.makeNameList(data)
      })
    },
    handleAddAct() {
      this.$router.push({
        name: 'add-appply-activity',
        query: {
          flag: 'add'
        }
      })
    },
    fetchList() {
      this.loading = true
      let post = {
        name: this.search.name,
        racktype: this.search.racktype,
        pageSize: this.search.pageSize,
        pageNo: this.search.pageNo,
      }
      fetchMarketRegister(post)
        .then(({ data }) => {
          this.total = data.totalCount
          this.tableData = data.items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    makeNameList(data) {
      let contentinfo = data.item.contentinfo
      let registrations = data.registrations
      let arr = []
      let nameTable = []
      contentinfo.split(';').forEach(item => {
        arr.push({
          prop: item.split(':')[0],
          label: item.split(':')[1]
        })
      })
      if (registrations.length > 0) {
        registrations.forEach(item => {
        let {userinfo} = item
        let msg = {}
        userinfo.split(';').forEach(info => {
          msg[info.split(':')[0]] = info.split(':')[1]
        })
        nameTable.push({
          signtime: item.signtime,
          ...msg
        })
      })
      }
      this.nameTableHeader = arr
      this.nameTable = nameTable
    },
    handleDelete() {
      this.$confirm('确定删除该活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {})
        .catch(() => {})
    },
    handleToggleAct(item) {
      this.$confirm(`是否${item.racktype === 0 ? '开启活动' : '关闭活动'}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          batchRegistrationsShelves({
            shelves: !item.racktype / 1,
            ids: [item.id]
          }).then((res) => {
            this.$message.success(res.result_msg)
            this.handleReset()
          })
        })
        .catch(() => {

        })
    },
    handleJumpEditAct({id}) {
      this.$router.push({
        name: 'add-appply-activity',
        query: {
          flag: 'edit',
          id
        }
      })
    },
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
    handleExportExcel() {
      exportRegisterExcel({
        id: this.currentReg.id
      }, this.currentReg.name + '-报名名单.xls').then(({data}) => {
        console.log(data)
      })
    }
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
