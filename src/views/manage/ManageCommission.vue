<template>
  <div class="manage-commission-page">
    <div class="content-title">分销佣金审核</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input v-model="search.name" placeholder="请输入内容" size="mini"></el-input>
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
      <el-table-column prop="contractNum" label="合同号" width="100"></el-table-column>
      <el-table-column prop="customer" label="客户姓名" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="100"></el-table-column>
      <el-table-column prop="buyHouse" label="购买楼盘" width="100"></el-table-column>
      <el-table-column prop="contractPrice" label="合同总价" width="80"></el-table-column>
      <el-table-column prop="signTime" label="签约时间" width="100"></el-table-column>
      <el-table-column prop="aDevide" label="一级分成" width="80"></el-table-column>
      <el-table-column prop="bDevide" label="二级分成" width="80"></el-table-column>
      <el-table-column prop="cDevide" label="三级分成" width="80"></el-table-column>
      <el-table-column prop="total" label="总计" width="80"></el-table-column>
      <el-table-column prop="status" label="财务状态" width="80"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleCheck(scope.row)">审核通过</el-button>
          <el-button type="danger" size="mini" @click="handleCheck(scope.row)">审核驳回</el-button>
          <el-button type="primary" size="mini" @click="handleCheck(scope.row)">重启审核</el-button>
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
  name: 'manage-commission',
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
        name: '',
        identity: '',
        bought: '',
        pageSize: 10,
        time: '',
        pageNum: 1
      },
      tableData: [
        {
          contractNum: 1,
          customer: 11111,
          phone: 11111,
          buyHouse: 'wang',
          contractPrice: 100,
          signTime: '2010-1-1',
          aDevide: 100,
          bDevide: 100,
          cDevide: 100,
          total: 300,
          status: '待审核'
        }
      ],
      total: 0
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
    handleCheck () {}
  }
}
</script>

<style lang="stylus" scoped>

</style>
