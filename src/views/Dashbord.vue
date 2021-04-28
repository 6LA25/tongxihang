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
                <el-menu-item index="6-4" v-permission="'活动信息管理'"
                  >文章管理</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
              <template slot="title">
                <span>营销活动管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="8-1">报名活动</el-menu-item>
                <el-menu-item index="8-2">楼盘活动</el-menu-item>
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
    <el-dialog
      :append-to-body="true"
      class="chat-dialog"
      title="客户聊天"
      width="840px"
      top="10vh"
      :visible.sync="chatVisible"
    >
      <div class="global-chatting-box">
        <div class="chat-user-list">1</div>
        <div class="chat-area">
          <div class="chat-messages">2</div>
          <div class="chat-ipt-box">
            <el-input
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="请输入内容"
              v-model="chatContent"
            >
            </el-input>
            <div class="send-btns">
              <el-button size="mini" type="primary">发送</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import chatMixin from '../assets/mixin/chat-mixin.js'
import { logout, fetchTimUserSig } from '../assets/services/login-service'
export default {
  name: 'App',
  data() {
    return {
      chatVisible: true,
      userid: 'TXH1582522953117',
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
        '6-4': 'manage-article',
        '7-1': 'manage-role',
        '7-2': 'manage-permission',
        '7-3': 'manage-staff',
        '7-4': 'user-develop',
        '8-1': 'manage-appply-activity',
        '8-2': 'manage-house-activity',
      },
    }
  },
  mixins: [chatMixin],
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
  mounted() {
    console.log('chatMixin', chatMixin)
    this.initTim()
  },
  methods: {
    async initTim() {
      let { data } = await fetchTimUserSig({
        userid: this.userid,
      })
      let userSig = data.userSig
      sessionStorage.setItem('userSig', userSig)
      // 开始登录
      let timLogin = this.$$tim.login({
        userID: this.userid,
        userSig: data.userSig,
      })
      timLogin
        .then((imResponse) => {
          if (imResponse.data.repeatLogin === true) {
            // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
            console.log('imResponse.data.errorInfo', imResponse.data.errorInfo)
          }
          console.log('imResponse==>', imResponse)
          this.listenTim()
        })
        .catch(function (imError) {
          console.warn('login error:', imError) // 登录失败的相关信息
        })
    },
    listenTim() {
      let tim = this.$$tim
      const TIM = this.TIM
      console.log('TIM.EVENT.SDK_READY', TIM.EVENT.SDK_READY)
      // 监听事件，例如：
      tim.on(TIM.EVENT.SDK_READY, function (event) {
        console.log('eve', event)
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        // event.name - TIM.EVENT.SDK_READY
      })
      tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
        console.log('TIM.EVENT.MESSAGE_RECEIVED', event.data)
        // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
        // event.name - TIM.EVENT.MESSAGE_RECEIVED
        // event.data - 存储 Message 对象的数组 - [Message]
      })
      tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event) {
        // 收到消息被撤回的通知
        // event.name - TIM.EVENT.MESSAGE_REVOKED
        // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
      })
      tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function (event) {
        // SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
        // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
        // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
      })
      tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event) {
        console.log('CONVERSATION_LIST_UPDATED', event.data)
        // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
        // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
        // event.data - 存储 Conversation 对象的数组 - [Conversation]
      })
      tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function (event) {
        // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
        // event.name - TIM.EVENT.GROUP_LIST_UPDATED
        // event.data - 存储 Group 对象的数组 - [Group]
      })
      tim.on(TIM.EVENT.PROFILE_UPDATED, function (event) {
        // 收到自己或好友的资料变更通知
        // event.name - TIM.EVENT.PROFILE_UPDATED
        // event.data - 存储 Profile 对象的数组 - [Profile]
      })
      tim.on(TIM.EVENT.BLACKLIST_UPDATED, function (event) {
        // 收到黑名单列表更新通知
        // event.name - TIM.EVENT.BLACKLIST_UPDATED
        // event.data - 存储 userID 的数组 - [userID]
      })
      tim.on(TIM.EVENT.ERROR, function (event) {
        console.log('TIM.EVENT.ERROR', event)
        // 收到 SDK 发生错误通知，可以获取错误码和错误信息
        // event.name - TIM.EVENT.ERROR
        // event.data.code - 错误码
        // event.data.message - 错误信息
      })
      tim.on(TIM.EVENT.SDK_NOT_READY, function (event) {
        // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
        // event.name - TIM.EVENT.SDK_NOT_READY
      })
      tim.on(TIM.EVENT.KICKED_OUT, function (event) {
        // 收到被踢下线通知
        // event.name - TIM.EVENT.KICKED_OUT
        // event.data.type - 被踢下线的原因，例如:
        //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
        //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
        //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。
      })
      tim.on(TIM.EVENT.NET_STATE_CHANGE, function (event) {
        //  网络状态发生改变（v2.5.0 起支持）。
        // event.name - TIM.EVENT.NET_STATE_CHANGE
        // event.data.state 当前网络状态，枚举值及说明如下：
        //     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
        //     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
        //    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
      })
    },
    handleJumpTim() {
      this.$router.push({
        name: 'manage-tim',
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
            sessionStorage.removeItem('userSig')
            this.$store.commit('UPDATE_USER_INFO', {})
            this.$store.commit('UPDATE_USER_PERMISSIONS', [])
            this.timLogout()
            this.$router.push({
              name: 'login',
            })
          })
        })
        .catch(() => {})
    },
    timLogout() {
      let promise = this.$$tim.logout()
      promise
        .then(function (imResponse) {
          console.log('tim logout', imResponse.data) // 登出成功
        })
        .catch(function (imError) {
          console.warn('logout error:', imError)
        })
    },
  },
}
</script>
<style lang="stylus">
@import '../assets/css/chat.styl'
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
      border-bottom 1px solid #eee
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
