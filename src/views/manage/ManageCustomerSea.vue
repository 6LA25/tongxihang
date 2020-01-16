<template>
  <div class="manage-customer-sea-page">
    <div class="content-title">意向客户列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleAddCustomer('add')">新增意向客户</el-button>
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input style="width: 250px;" v-model="search.user" placeholder="请输入UID、手机或姓名搜索" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
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
      </div>
      <div class="ilb-top search-item-box">
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
      <el-table-column prop="name" label="客户姓名" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="手机号" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="gender" label="性别" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendHouses" label="推荐楼盘" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="备注" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendUser" label="推荐人" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recommendTime" label="推荐时间" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="followUser" label="跟进人" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="followStatus" label="跟进状态" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleDispatchCase(scope.row)">派单</el-button>
          <el-button type="danger" size="mini" @click.stop="handleCloseCase(scope.row)">关单</el-button>
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
  name: 'manage-customer-sea-page',
  data () {
    return {
      loading: false,
      total: 0,
      search: {
        user: '',
        identity: '',
        bought: '',
        time: '',
        pageSize: 10,
        pageNum: 1
      },
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
      tableData: [
        {
          id: 1,
          name: '张三',
          phone: '15111111111',
          gender: 1,
          recommendHouses: 'xxxx',
          remark: '--xx--xx',
          recommendUser: 'xxxxxx',
          recommendTime: '2020-01-10',
          followUser: 'xxxx',
          followStatus: 'xxxx'
        }
      ]
    }
  },
  methods: {
    handleAddCustomer () {
      this.$router.push({
        name: 'add-intention-customer'
      })
    },
    handleReset () {
      Object.keys(this.search).forEach(item => {
        this.search[item] = ''
      })
    },
    handleDispatchCase (row) {
      console.log(row)
    },
    handleCloseCase (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      this.search.pageSize = val
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
