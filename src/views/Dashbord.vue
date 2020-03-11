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
            <el-menu-item index="1" v-permission="'dashboard-work-bench'">
              <span slot="title">工作台</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <span>房源管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" v-permission="'manage-houses'">楼盘管理</el-menu-item>
                <!-- <el-menu-item index="2-2">标签管理</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>意向客户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" v-permission="'manage-customer-sea'">意向客户公海</el-menu-item>
                <el-menu-item index="3-2" v-permission="'manage-customer-following'">意向客户跟进</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>财务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" v-permission="'manage-commission'">分销佣金审核</el-menu-item>
                <el-menu-item index="4-2" v-permission="'confirm-transfer-account'">财务确认打款</el-menu-item>
                <el-menu-item index="4-3" v-permission="'check-final-statement'">结算单查询</el-menu-item>
                <el-menu-item index="4-4" v-permission="'manage-financial-statistics'">财务统计表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" v-permission="'manage-register-user'">注册用户管理</el-menu-item>
                <el-menu-item index="5-2" v-permission="'broker-info'">经纪人信息统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <span>广告位维护</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1" v-permission="'manage-advertise-place'">广告位管理</el-menu-item>
                <el-menu-item index="6-2" v-permission="'manage-hot-word'">热门搜索词管理</el-menu-item>
                <el-menu-item index="6-3" v-permission="'manage-activity-message'">活动信息管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="7-1" v-permission="'manage-role'">角色管理</el-menu-item>
                <!-- <el-menu-item index="7-2">角色权限管理</el-menu-item> -->
                <el-menu-item index="7-3" v-permission="'manage-staff'">员工管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header style="height: 50px;">
          <div class="user-info-box">
            <span class="text">{{$store.state.userInfo.account}}</span>
            <i @click="handleLogout" class="text logout-box el-icon-switch-button"></i>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
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
        '4-4': 'manage-financial-statistics',
        '5-1': 'manage-register-user',
        '5-2': 'broker-info',
        '6-1': 'manage-advertise-place',
        '6-2': 'manage-hot-word',
        '6-3': 'manage-activity-message',
        '7-1': 'manage-role',
        '7-2': 'manage-permission',
        '7-3': 'manage-staff'
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
      this.$router.push({
        name: this.rootMap[key]
      })
    },
    handleLogout () {
      this.$confirm('即将退出登录, 是否继续？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      }).catch(() => {
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
      padding 0 40px
      .user-info-box {
        float right
        .text {
          display inline-block
          vertical-align top
          height 50px
          line-height 50px
          margin-left 20px
          &.logout-box {
            font-size 18px
            &:hover {
              cursor pointer
              color #409eff
            }
          }
        }
      }
      .logout-box {
        float right
        height 50px
        line-height 50px
      }
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
