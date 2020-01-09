<template>
  <div class="manage-houses-page">
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">楼盘名称：</div>
        <div class="ilb-top">
          <el-input v-model="search.title" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        楼盘类型：
        <el-select v-model="search.type" placeholder="请选择" size="mini">
          <el-option
            v-for="item in houseTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="ilb-top search-item-box">
        楼盘状态：
        <el-select v-model="search.houseStatus" placeholder="请选择" size="mini">
          <el-option
            v-for="item in houseStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="ilb-top search-item-box">
        上架状态：
        <el-select v-model="search.putawayStatus" placeholder="请选择" size="mini">
          <el-option
            v-for="item in putawayStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="ilb-top search-item-box">
        发布日期：
        <el-date-picker
          v-model="search.time"
          size="mini"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="warning" size="mini">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArea } from '../../assets/services/manage-service'
export default {
  name: 'manage-houses',
  mounted () {
    fetchArea({
      parent: '1'
    }).then(({ data }) => {
      console.log(data)
    })
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
      search: {
        title: '',
        type: '',
        houseStatus: '',
        putawayStatus: '',
        time: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.manage-houses-page {
}
</style>
