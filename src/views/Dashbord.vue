<template>
  <div class="dashboard-page">
    <el-container>
      <el-aside width="200px">
        <div class="logo-box">安选好房</div>
        <div class="menu-container">
          <el-menu
            :default-active="activeRoot"
            class="el-menu-vertical-demo"
            :background-color="'#3e4250'"
            :text-color="'#fff'"
            @select="handleSelectNav"
          >
            <el-menu-item index="1" v-permission="'工作台'">
              <span slot="title">工作台</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <span>房源管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" v-permission="'楼盘管理'"
                  >楼盘管理</el-menu-item
                >
                <!-- <el-menu-item index="2-2">标签管理</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>意向客户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" v-permission="'意向客户公海'"
                  >意向客户公海</el-menu-item
                >
                <el-menu-item index="3-2" v-permission="'意向客户跟进'"
                  >意向客户跟进</el-menu-item
                >
                <el-menu-item index="3-3" v-permission="'待完善客户信息'"
                  >待完善客户信息</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>财务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" v-permission="'分销佣金审核'"
                  >分销佣金审核</el-menu-item
                >
                <el-menu-item index="4-2" v-permission="'财务确认打款'"
                  >财务确认打款</el-menu-item
                >
                <el-menu-item index="4-3" v-permission="'结算单查询'"
                  >结算单查询</el-menu-item
                >
                <!-- <el-menu-item index="4-4" v-permission="'财务统计表'">财务统计表</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" v-permission="'注册用户管理'"
                  >注册用户管理</el-menu-item
                >
                <el-menu-item index="5-2" v-permission="'经纪人信息统计'"
                  >经纪人信息统计</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <span>广告位维护</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1" v-permission="'广告位管理'"
                  >广告位管理</el-menu-item
                >
                <el-menu-item index="6-2" v-permission="'热门搜索词管理'"
                  >热门搜索词管理</el-menu-item
                >
                <el-menu-item index="6-3" v-permission="'活动信息管理'"
                  >活动信息管理</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="7-1" v-permission="'角色管理'"
                  >角色管理</el-menu-item
                >
                <!-- <el-menu-item index="7-2">角色权限管理</el-menu-item> -->
                <el-menu-item index="7-3" v-permission="'员工管理'"
                  >员工管理</el-menu-item
                >
                <el-menu-item index="7-4" v-permission="'员工发展'"
                  >员工发展</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header style="height: 50px">
          <div class="user-info-box">
            <div @click="handleJumpTim">
              <i class="icon-btn el-icon-message text"></i>
            </div>
            <div class="text">{{ $store.state.userInfo.account }}</div>
            <div>
              <i
                @click="handleLogout"
                class="icon-btn el-icon-switch-button"
              ></i>
            </div>
          </div>
        </el-header>
        <el-main
          :style="{
            background:
              $route.name === 'dashboard-work-bench' ? '#f0f2f5' : '#fff',
          }"
        >
          <router-view />
          <!-- #f0f2f5 -->
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { logout } from '../assets/services/login-service'
export default {
  name: 'App',
  data() {
    return {
      rootMap: {
        1: 'dashboard-work-bench',
        '2-1': 'manage-houses',
        '2-2': 'manage-label',
        '3-1': 'manage-customer-sea',
        '3-2': 'manage-customer-following',
        '3-3': 'perfect-customer-info',
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
        '7-3': 'manage-staff',
        '7-4': 'user-develop',
      },
    }
  },
  computed: {
    activeRoot() {
      let val = ''
      Object.keys(this.rootMap).forEach((item) => {
        if (this.rootMap[item] === this.$route.name) {
          val = item
        }
      })
      return val
    },
  },
  methods: {
    handleJumpTim() {
      this.$router.push({
        name: 'manage-tim'
      })
    },
    handleSelectNav(key, keyPath) {
      this.$router.push({
        name: this.rootMap[key],
      })
    },
    handleLogout() {
      this.$confirm('即将退出登录, 是否继续？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          logout().then(({ data }) => {
            this.$message.success('退出登录成功')
            sessionStorage.removeItem('publickey')
            sessionStorage.removeItem('rsakey')
            sessionStorage.removeItem('userInfo')
            sessionStorage.removeItem('ticket')
            this.$store.commit('UPDATE_USER_INFO', {})
            this.$store.commit('UPDATE_USER_PERMISSIONS', [])
            this.$router.push({
              name: 'login',
            })
          })
        })
        .catch(() => {})
    },
  },
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
      display flex
      align-items center
      justify-content flex-end
      padding 0 40px
      .user-info-box {
        display flex
        align-items center
        >div {
          display flex
          align-items center
          height 50px
        }
        .icon-btn {
          font-size 20px
          &:hover {
              cursor pointer
              color #409eff
            }
        }
        .text {
          margin 0 10px
          font-size 18px
        }
      }
      .logout-box {
      }
    }

    .el-aside {
      background: #3e4250;
      color: #fff;
      overflow-x hidden
      .logo-box {
        display flex
        justify-content center;
        align-items center;
        color #fff
        letter-spacing 2px
        height 40px
        font-size 18px
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
      .el-tabs__header {
        margin-bottom 0
      }
    }
  }
}
</style>
