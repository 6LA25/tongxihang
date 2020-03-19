<template>
  <div class="work-bench-page">
    <div class="container">
      <div class="top-box">
        <div class="inner-item">
          <div class="title">本月销售额</div>
          <div class="num">¥12134</div>
          <div class="text">
            昨日销售额
            <span>¥12134</span>
          </div>
        </div>
        <div class="inner-item">
          <div class="title">本月新增意向客户</div>
          <div class="num">8888</div>
          <div class="text">
            昨日新增意向客户
            <span>8888</span>
          </div>
        </div>
        <div class="inner-item">
          <div class="title">本月收入佣金</div>
          <div class="num">¥12134</div>
          <div class="text">
            昨日收入佣金
            <span>¥12134</span>
          </div>
        </div>
        <div class="inner-item">
          <div class="title">本月成单量</div>
          <div class="num">12121</div>
          <div class="text">
            昨日成单量
            <span>12121</span>
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
              <el-radio-button label="1">本周</el-radio-button>
              <el-radio-button label="2">本月</el-radio-button>
              <el-radio-button label="3">本年</el-radio-button>
            </el-radio-group>
            <el-date-picker
              v-model="rangeTime"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="content-box">
          <div class="charts-box">
            <v-chart style="width: 800px;" :options="orgOptions" />
          </div>
          <div class="list-box">
            <div class="title">经纪人销售排行榜</div>
            <div class="list-item" v-for="(item, index) in saleList" :key="item.id">
              <span class="index" :class="{'active': index < 3}">{{index}}</span>
              <span class="name">{{item.name}}</span>
              <span class="num">{{item.money}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-box">
        <div class="lf-box">
          <div class="title">线上热门楼盘</div>
          <div class="intr-box">
            <div>
              <div>楼盘浏览量（月）</div>
              <div class="num">99999</div>
            </div>
            <div>
              <div>意向客户数（月）</div>
              <div class="num">99999</div>
            </div>
          </div>
          <div class="rank-list">
            <div class="rank-item">
              <span>排名</span>
              <span>热门楼盘</span>
              <span>浏览量</span>
              <span>本月意向客户数</span>
            </div>
            <div class="rank-item">
              <span>1</span>
              <span class="house">xxxxx</span>
              <span>2222222222222222222222222222</span>
              <span>2222222</span>
            </div>
            <div class="rank-item">
              <span>1</span>
              <span class="house">xxxxx</span>
              <span>2222222222222222222222222222</span>
              <span>2222222</span>
            </div>
            <div class="rank-item">
              <span>1</span>
              <span class="house">xxxxx</span>
              <span>2222222222222222222222222222</span>
              <span>2222222</span>
            </div>
            <div class="rank-item">
              <span>1</span>
              <span class="house">xxxxx</span>
              <span>2222222222222222222222222222</span>
              <span>2222222</span>
            </div>
          </div>
        </div>
        <div class="rg-box">
          <div class="title">楼盘销售额占比</div>
          <div>
            <v-chart :options="saleOptions" />
          </div>
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

export default {
  name: 'work-bench',
  data () {
    return {
      saleList: [
        { id: 1, name: 'xxxx', money: 20000 },
        { id: 2, name: 'xxxx', money: 20000 },
        { id: 3, name: 'xxxx', money: 20000 },
        { id: 4, name: 'xxxx', money: 20000 },
        { id: 5, name: 'xxxx', money: 20000 },
        { id: 6, name: 'xxxx', money: 20000 },
        { id: 7, name: 'xxxx', money: 20000 }
      ],
      time: '1',
      rangeTime: '',
      activeName: '1',
      orgOptions: {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [
            '1月',
            '1月',
            '1月',
            '1月',
            '1月',
            '1月',
            '1月',
            '1月',
            '1月',
            '1月',
            '1月',
            '1月'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              820,
              932,
              901,
              934,
              3000
            ],
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
          show: true,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
      }
    }
  }
}
</style>
