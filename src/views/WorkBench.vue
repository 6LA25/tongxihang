<template>
  <div class="work-bench-page">
    <div class="container">
      <div class="top-box" v-if="baseIntr">
        <div class="inner-item">
          <div class="title">本月销售额</div>
          <div class="num">¥{{baseIntr.month.amount}}</div>
          <div class="text">
            昨日销售额
            <span>¥{{baseIntr.day.amount}}</span>
          </div>
        </div>
        <div class="inner-item">
          <div class="title">本月新增意向客户</div>
          <div class="num">{{baseIntr.month.customer}}</div>
          <div class="text">
            昨日新增意向客户
            <span>{{baseIntr.day.customer}}</span>
          </div>
        </div>
        <div class="inner-item">
          <div class="title">本月收入佣金</div>
          <div class="num">¥{{baseIntr.month.commission}}</div>
          <div class="text">
            昨日收入佣金
            <span>¥{{baseIntr.day.commission}}</span>
          </div>
        </div>
        <div class="inner-item">
          <div class="title">本月成单量</div>
          <div class="num">{{baseIntr.month.validCount}}</div>
          <div class="text">
            昨日成单量
            <span>{{baseIntr.day.validCount}}</span>
          </div>
        </div>
      </div>
      <div class="sale-box">
        <div class="filter-box">
          <el-tabs v-model="activeName" size="mini" type="card" @tab-click="handleClick">
            <el-tab-pane label="销售额" name="1"></el-tab-pane>
            <el-tab-pane label="收入佣金" name="2"></el-tab-pane>
          </el-tabs>
          <div class="time-filter-box">
            <el-radio-group size="mini" v-model="time" style="margin-right: 10px;">
              <el-radio-button label="week">本周</el-radio-button>
              <el-radio-button label="month">本月</el-radio-button>
              <el-radio-button label="year">本年</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="content-box">
          <div class="charts-box" v-loading="loading">
            <v-chart style="width: 800px;" :options="orgOptions" />
          </div>
          <div class="list-box">
            <div class="title">经纪人销售排行榜</div>
            <div style="font-size: 14px;color: #aaa;text-align: center;" v-if="saleList.length === 0">暂无数据</div>
            <div class="list-item" v-for="(item, index) in saleList" :key="item.realname">
              <span class="index" :class="{'active': index < 3}">{{index + 1}}</span>
              <span class="name">{{item.realname}}</span>
              <span class="num">¥{{item.amount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-box">
        <div class="lf-box" v-if="viewData">
          <div class="title">线上热门楼盘</div>
          <div class="intr-box">
            <div>
              <div>楼盘浏览量（月）</div>
              <div class="num">{{viewData.views}}</div>
            </div>
            <div>
              <div>意向客户数（月）</div>
              <div class="num">{{viewData.customer}}</div>
            </div>
          </div>
          <div class="rank-list">
            <div class="rank-item">
              <span>排名</span>
              <span>热门楼盘</span>
              <span>浏览量</span>
              <span>本月意向客户数</span>
            </div>
            <div style="font-size: 14px;color: #aaa;text-align: center;margin-top: 20px;" v-if="viewData.items.length === 0">暂无数据</div>
            <div class="rank-item" v-for="(item, index) in viewData.items" :key="item.house_id">
              <span>{{index + 1}}</span>
              <span class="house">{{item.houseName}}</span>
              <span>{{item.views}}</span>
              <span>{{item.customer}}</span>
            </div>
          </div>
        </div>
        <div class="rg-box" v-if="pieData">
          <div class="title">楼盘销售额占比</div>
          <div class="pie-chart-box" v-if="pieData && pieData.items && pieData.items.length > 0">
            <div class="totle-amount">销售额：¥{{pieData.totalAmount}}</div>
            <v-chart style="width: 560px" :options="saleOptions" />
          </div>
          <div style="font-size: 14px;color: #aaa;text-align: center;" v-else>暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import { baseSheet, agentRank, hotView, salesRatio, chart } from '../assets/services/manage-service'

export default {
  name: 'work-bench',
  data () {
    return {
      loading: false,
      baseIntr: null,
      saleList: [],
      viewData: null,
      pieData: null,
      time: 'week',
      activeName: '1',
      orgOptions: {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar',
            smooth: true,
            barMaxWidth: 25,
            itemStyle: {
              color: 'rgba(64, 158, 255, 1)'
            }
          }
        ]
      },
      saleOptions: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true,
              length: 40,
              length2: 30
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    time () {
      this.fetchChart()
    }
  },
  mounted () {
    this.fetchBaseSheet()
    this.fetchAgentRank()
    this.fetchHotView()
    this.fetchSalesRatio()
    this.fetchChart()
  },
  methods: {
    handleClick (tab, event) {
      this.fetchChart()
    },
    fetchBaseSheet () {
      baseSheet().then(({ data }) => {
        this.baseIntr = data
      })
    },
    fetchAgentRank () {
      agentRank().then(({ data }) => {
        this.saleList = data.items
      })
    },
    fetchHotView () {
      hotView().then(({ data }) => {
        this.viewData = data
      })
    },
    fetchSalesRatio () {
      salesRatio().then(({ data }) => {
        this.pieData = data
        data.items.forEach(item => {
          this.saleOptions.series[0].data.push({
            value: item.amount,
            name: item.houseName
          })
          this.saleOptions.legend.data.push(item.houseName)
        })
      })
    },
    fetchChart () {
      this.loading = true
      chart({
        type: this.activeName,
        timeType: this.time
      }).then(({ data }) => {
        this.loading = false
        this.orgOptions.xAxis.data = []
        this.orgOptions.series[0].data = []
        data.items.forEach((item) => {
          if (this.time === 'week') {
            this.orgOptions.xAxis.data.push(item.day)
          } else if (this.time === 'month') {
            this.orgOptions.xAxis.data.push(item.day)
          } else if (this.time === 'year') {
            this.orgOptions.xAxis.data.push(item.month)
          }
          this.orgOptions.series[0].data.push(item.amount)
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/preset';
.work-bench-page {
  .container {
    width 1200px
    margin 0 auto
    .top-box {
      display flex
      justify-content space-between
      margin-bottom 20px
    }
    .inner-item {
      display inline-block
      vertical-align top
      background #fff
      color #333
      padding 20px
      width 280px
      border-radius 4px
      .title {
        margin-bottom 5px
      }
      .num {
        font-weight 400
        font-size 24px
        margin-bottom 10px
      }
      .text {
        span {
          margin-left 5px
        }
      }
    }
    .sale-box {
      background #fff
      padding 20px
      margin-bottom 20px
      .filter-box {
        position relative
        overflow hidden
        .time-filter-box {
          position absolute
          right 0
          top 0
          height 40px
          line-height 40px
        }
      }
      .content-box {
        overflow hidden
        padding 20px 0
        .charts-box {
          width 860px
          float left
        }
        .list-box {
          width 300px
          float left
          padding 10px
          .title {
            margin-bottom 20px
            font-size 18px
          }
          .list-item {
            margin-bottom 20px
            span {
              display inline-block
              vertical-align middle
              &.index {
                width 24px
                height 24px
                line-height 24px
                text-align center
                border-radius 50%
                background #eee
                font-size 14px
                &.active {
                  background #409eff
                  color #fff
                }
              }
              &.name {
                width 100px
                padding-left 10px
              }
              &.num {
                width 140px
                text-align right
                padding-left 10px
              }
            }
          }
        }
      }
    }
    .bottom-box {
      overflow hidden
      background #fff
      padding 20px
      .title {
        font-size 18px
        padding-bottom 10px
        border-bottom 1px solid #eee
        margin-bottom 20px
      }
      .lf-box {
        width 50%
        float left
        padding-right 20px
        .intr-box {
          overflow hidden
          margin-bottom 20px
          > div {
            float left
            width 50%
            > div {
              margin-bottom 10px
              &.num {
                font-size 18px
              }
            }
          }
        }
        .rank-list {
          .rank-item {
            overflow hidden
            border-bottom 1px solid #eee
            > span {
              float left
              width 25%
              padding 10px 5px
              font-size 15px
              text-overflow ellipsis
              white-space nowrap
              overflow hidden
              &.house {
                color #409eff
              }
            }
          }
        }
      }
      .rg-box {
        width 50%
        float left
        padding-left 20px
        .pie-chart-box {
          position relative
          .totle-amount {
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
          }
        }
      }
    }
  }
}
</style>
