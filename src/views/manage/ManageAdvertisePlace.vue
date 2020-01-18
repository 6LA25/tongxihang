<template>
  <div class="manage-advertise-place-page">
    <div class="content-title">广告位列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleAddAdvertisement('add')">新建广告</el-button>
      <el-button type="danger" size="small" @click="handleSet([], '下架')">批量下架</el-button>
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">广告位名称：</div>
        <div class="ilb-top">
          <el-input v-model="search.name" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">广告位位置：</div>
        <div class="ilb-top">
          <el-select v-model="search.position" placeholder="请选择" size="mini">
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
          <el-select v-model="search.putway" placeholder="请选择" size="mini">
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
       @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="name" label="广告位名称" width="200"></el-table-column>
      <el-table-column prop="sort" label="排序" width="100"></el-table-column>
      <el-table-column prop="upTime" label="上架时间" width="200"></el-table-column>
      <el-table-column prop="downTime" label="下架时间" width="200"></el-table-column>
      <el-table-column prop="status" label="上架状态" width="100"></el-table-column>
      <el-table-column label="操作" width="340">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleAddAdvertisement('edit', scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click.stop="handleSet(scope.row, '下架')">下架</el-button>
          <el-button type="success" size="mini" @click.stop="handleSet(scope.row, '上架')">上架</el-button>
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
  name: 'manage-advertise-place',
  data () {
    return {
      loading: false,
      total: 0,
      multipleSelection: [],
      tableData: [
        {
          id: 1,
          name: '万科翡翠东方头部广告位',
          sort: 1,
          upTime: '2010-10-10 00:00',
          downTime: '2010-10-10 00:00',
          status: '上架'
        },
        {
          id: 2,
          name: '万科翡翠东方头部广告位',
          sort: 1,
          upTime: '2010-10-10 00:00',
          downTime: '2010-10-10 00:00',
          status: '上架'
        },
        {
          id: 3,
          name: '万科翡翠东方头部广告位',
          sort: 1,
          upTime: '2010-10-10 00:00',
          downTime: '2010-10-10 00:00',
          status: '上架'
        },
        {
          id: 4,
          name: '万科翡翠东方头部广告位',
          sort: 1,
          upTime: '2010-10-10 00:00',
          downTime: '2010-10-10 00:00',
          status: '上架'
        }
      ],
      search: {
        name: '',
        position: '',
        putway: '',
        pageSize: 10,
        pageNum: 1
      },
      positions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '首页banner'
        },
        {
          value: '1',
          label: '开屏广告'
        }
      ],
      putways: [
        {
          value: '0',
          label: '待上架'
        },
        {
          value: '1',
          label: '已上架'
        },
        {
          value: '2',
          label: '已下架'
        }
      ]
    }
  },
  methods: {
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
    handleReset () {},
    handleSizeChange (val) {
      this.search.pageSize = val
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
    },
    handleSet (data, status) {
      this.$confirm(`请确定是否要${status}？`, `商品${status}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
