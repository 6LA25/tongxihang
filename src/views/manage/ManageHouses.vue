<template>
  <div class="manage-houses-page">
    <div class="content-title">楼盘列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleAddHouses('add')">新建楼盘</el-button>
      <el-button type="danger" size="small" >批量下架</el-button>
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">楼盘名称：</div>
        <div class="ilb-top">
          <el-input v-model="search.title" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">楼盘类型：</div>
        <div class="ilb-top">
          <el-select v-model="search.type" placeholder="请选择" size="mini">
            <el-option
              v-for="item in houseTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">楼盘状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.houseStatus" placeholder="请选择" size="mini">
            <el-option
              v-for="item in houseStatus"
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
          <el-select v-model="search.putawayStatus" placeholder="请选择" size="mini">
            <el-option
              v-for="item in putawayStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">所在地：</div>
        <div class="ilb-top">
          <el-cascader :props="props" size="mini" v-model="search.area"></el-cascader>
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
      <el-table-column prop="id" label="楼盘ID" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="楼盘名称" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="price" label="定价（元/平）" width="100"></el-table-column>
      <el-table-column prop="location" label="所在地" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="houseType" label="楼盘类型" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="houseStatus" label="楼盘状态" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="putawayStatus" label="楼盘状态" width="80"></el-table-column>
      <el-table-column label="操作" width="340">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleEditHouses(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click.stop="handlePutaway(scope.row)">下架</el-button>
          <el-button type="primary" size="mini" @click.stop="handleAddHouseType(scope.$index, scope.row)">新增户型</el-button>
          <el-button type="warning" size="mini" @click.stop="handleSetHot(scope.$index, scope.row)">设为热门</el-button>
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
import { fetchArea } from '../../assets/services/manage-service'
export default {
  name: 'manage-houses',
  mounted () {
  },
  data () {
    return {
      houseTypes: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '新房'
        },
        {
          value: '1',
          label: '二手房'
        }
      ],
      houseStatus: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '热销中'
        },
        {
          value: '2',
          label: '即将开盘'
        },
        {
          value: '3',
          label: '售罄'
        }
      ],
      putawayStatus: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '上架中'
        },
        {
          value: '2',
          label: '已下架'
        }
      ],
      props: {
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level } = node
          let nodes = []
          let areas = []
          try {
            let { data } = await fetchArea({ parent: node.value || '' })
            areas = data.items
          } catch {}
          areas.forEach(item => {
            nodes.push({
              value: item.id,
              label: item.name,
              leaf: level >= 2
            })
          })
          resolve(nodes)
        }
      },
      search: {
        title: '',
        type: '',
        houseStatus: '',
        putawayStatus: '',
        time: '',
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      loading: false,
      tableData: [
        {
          id: 1,
          name: '大唐芋圆',
          price: 12000,
          location: '江苏省无锡滨湖区',
          houseType: '新房',
          houseStatus: '热销中',
          putawayStatus: '上架'
        },
        {
          id: 2,
          name: '大唐芋圆',
          price: 12000,
          location: '江苏省无锡滨湖区',
          houseType: '新房',
          houseStatus: '热销中',
          putawayStatus: '上架'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleReset () {
      Object.keys(this.search).forEach(item => {
        this.search[item] = ''
      })
    },
    checkSelectable (row) {
      return true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.search.pageSize = val
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
    },
    handleClickCell (row, column, cell, event) {
      this.$router.push({
        name: 'add-houses',
        query: {
          id: row.id,
          tag: 'preview'
        }
      })
    },
    handleEditHouses (index, row) {
      this.$router.push({
        name: 'add-houses',
        query: {
          tag: 'edit',
          id: row.id
        }
      })
    },
    handleAddHouses (index, row, tag) {
      this.$router.push({
        name: 'add-houses'
      })
    },
    handlePutaway (row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSetHot (index, row) {
      console.log(index, row)
    },
    handleAddHouseType (index, row) {
      this.$router.push({
        name: 'add-house-type',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.manage-houses-page {
}
</style>
