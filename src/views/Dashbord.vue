<template>
  <div class="dashboard-page">
    <el-container>
      <el-aside width="200px">
        <div class="logo-box"></div>
        <div class="menu-container">
          <el-menu
            :default-active="activeRoot"
            class="el-menu-vertical-demo"
            :background-color="'#3e4250'"
            :text-color="'#fff'"
            @select="handleSelectNav"
          >
            <el-menu-item index="1">
              <span slot="title">工作台</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <span>房源管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">楼盘管理</el-menu-item>
                <el-menu-item index="2-2">标签管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>意向客户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">意向客户公海</el-menu-item>
                <el-menu-item index="3-2">意向客户跟进</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>财务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">分销佣金审核</el-menu-item>
                <el-menu-item index="4-2">财务确认打款</el-menu-item>
                <el-menu-item index="4-3">结算单查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1">注册用户管理</el-menu-item>
                <el-menu-item index="5-2">经纪人信息统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <span>广告位维护</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1">广告位管理</el-menu-item>
                <el-menu-item index="6-2">热门搜索词管理</el-menu-item>
                <el-menu-item index="6-3">活动信息管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="7-1">角色管理</el-menu-item>
                <el-menu-item index="7-2">角色权限管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      rootMap: {
        '1': 'dashboard-work-bench',
        '2-1': 'manage-houses',
        '2-2': 'manage-label',
        '3-1': 'manage-customer-sea',
        '3-2': 'manage-customer-following',
        '4-1': 'manage-commission',
        '4-2': 'confirm-transfer-account',
        '4-3': 'check-final-statement',
        '5-1': 'manage-register-user',
        '5-2': 'broker-info',
        '6-1': 'manage-advertise-place',
        '6-2': 'manage-hot-word',
        '6-3': 'manage-activity-message',
        '7-1': 'manage-role',
        '7-2': 'manage-permission'
      }
    }
  },
  computed: {
    activeRoot () {
      let val = ''
      Object.keys(this.rootMap).forEach(item => {
        if (this.rootMap[item] === this.$route.name) {
          val = item
        }
      })
      return val
    }
  },
  methods: {
    handleSelectNav (key, keyPath) {
      console.log(key, keyPath)
      console.log(this.rootMap[key])
      this.$router.push({
        name: this.rootMap[key]
      })
    }
  }
}
</script>
<style lang="stylus">
.pager-box {
  text-align center
  padding 10px 0
  color #333
}
.search-head-box {
  padding 5px
  background #eee
  margin-bottom 10px
  .search-item-box {
    margin 5px
    &.search-btns-box {
      margin-left 30px
    }
    .search-item-label {
      height 28px
      line-height 28px
    }
  }
}
.dashboard-page {
  width 100%
  height 100%
  .el-container {
    width 100%
    height 100%
    .el-header {

    }

    .el-aside {
      background: #3e4250;
      color: #fff;
      overflow-x hidden
      .logo-box {
        height 40px
        background: #323441;
      }
      .menu-container {
        background: #3e4250
      }
      .el-submenu__title i {
        color #fff
      }
      .el-menu-item, .el-submenu{
        width 200px
      }
    }
    .el-main {
      .operate-btn-box {
        margin-bottom 10px
      }
      .content-title {
        margin-bottom 10px
        font-size 16px
        background: #eee;
        padding: 5px;
      }
    }
  }
}
</style>
