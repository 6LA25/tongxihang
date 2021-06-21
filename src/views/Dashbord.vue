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
                <el-menu-item index="3-4" v-permission="'超时客户统计'"
                  >超时客户统计</el-menu-item
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
                <el-menu-item index="6-4" v-permission="'文章管理'"
                  >文章管理</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
              <template slot="title">
                <span>营销活动管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="8-1" v-permission="'报名活动'">报名活动</el-menu-item>
                <el-menu-item index="8-2" v-permission="'楼盘活动'">楼盘活动</el-menu-item>
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
            <div @click="handleJumpTim" style="position: relative">
              <div class="unread-all-num" v-if="allUnreadMsg > 0">
                {{ allUnreadMsg }}
              </div>
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
    <!-- im -->
    <el-dialog
      :append-to-body="true"
      class="chat-dialog"
      title="客户聊天"
      top="10vh"
      :visible.sync="chatVisible"
    >
      <div class="global-chatting-box">
        <div class="chat-user-list">
          <div
            class="chat-item pointer"
            :class="{
              active:
                chatUser &&
                item.userProfile.userID === chatUser.userProfile.userID,
            }"
            v-for="item in contactList"
            :key="item.conversationID"
            @click="handleToggleChatItem(item)"
          >
            <div class="head-box">
              <span
                class="unread-box"
                v-if="
                  item.unreadCount > 0 &&
                  (!chatUser ||
                    (chatUser &&
                      chatUser.conversationID !== item.conversationID))
                "
                >{{ item.unreadCount }}</span
              >
              <img
                v-if="item.conversationID === 'C2Cadministrator'"
                src="../assets/imgs/chatting-head-default.jpg"
                alt=""
              />
              <img
                v-else
                :src="
                  item.userProfile.avatar ||
                  require('../assets/imgs/defaultHeader.jpg')
                "
                alt=""
              />
              
            </div>
            <div class="content-box">
              <div class="title-box">
                <div class="user-name">
                  {{ item.userProfile.nick || item.userProfile.userID }}
                </div>
                <div class="time">
                  {{ item.lastMessage.lastTime | CHAT_DATE }}
                </div>
              </div>
              <div class="recent-msg-box">
                {{ getContactText(item.lastMessage.messageForShow, item.conversationID) }}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-area">
          <audio id="voice-audio"></audio>
          <div class="chat-messages" v-loading="messagesLoading">
            <template v-if="currentChatTarget">
              <div class="user-name">
                {{ chatUser.userProfile.nick || chatUser.userProfile.userID }}
              </div>
              <div class="chat-content" id="chat-content">
                <div class="load-more-btn-box" v-if="!messageData.isCompleted">
                  <el-button
                    :disabled="messagesLoading"
                    @click="handleLoadMoreMsg"
                    size="mini"
                    plain
                    >加载更多</el-button
                  >
                </div>
                <div
                  class="message-root-item"
                  v-for="msg in messageData.messageList"
                  :key="msg.ID"
                >
                  <div class="msg-time">{{ msg.time | CHAT_DATE }}</div>
                  <div v-if="msg.isRevoked" class="msg-revoke">
                    - {{msg.flow === 'out' ? '你' : (msg.from)}}撤回了一条消息 -
                  </div>
                  <div
                    v-if="!msg.isRevoked"
                    :class="['message-item', 'msg-' + msg.flow]"
                    @contextmenu.prevent="handleRevokeMsg(msg)"
                  >
                    <div class="msg-time-read">
                      <span
                        v-if="msg.flow === 'out'"
                        :class="[!msg.isPeerRead ? 'unreaded' : '']"
                        >{{ msg.isPeerRead ? '已读' : '未读' }}</span
                      >
                    </div>
                    <img
                      class="chat-head"
                      :src="
                        msg.avatar ||
                        require('../assets/imgs/defaultHeader.jpg')
                      "
                      alt=""
                    />
                    <!-- <div class="message-detail" v-html="msg.payload.text"></div> -->
                    <div class="message-detail">
                      <div
                        class="msg-type-text"
                        v-if="msg.type === 'TIMTextElem'"
                      >
                        {{ getContactText(msg.payload.text, msg.conversationID) }}
                      </div>
                      <img
                        class="msg-type-image"
                        v-if="msg.type === 'TIMImageElem'"
                        :src="msg.payload.imageInfoArray[1].imageUrl"
                        alt=""
                      />
                      <div
                        @click="handlePlayVoice(msg)"
                        :class="[
                          'msg-type-voice',
                          'msg-type-voice-' + msg.flow,
                        ]"
                        v-if="msg.type === 'TIMSoundElem'"
                      >
                        <img
                          v-if="!msg.playing"
                          class="sound-img"
                          :src="
                            require('../assets/imgs/sound-' + msg.flow + '.jpg')
                          "
                          alt=""
                        />
                        <img
                          v-if="msg.playing"
                          class="sound-img"
                          :src="
                            require('../assets/imgs/sound-playing-' +
                              msg.flow +
                              '.gif')
                          "
                          alt=""
                        />
                        <div class="voice-duration-text">
                          {{ msg.payload.second }}"
                          <!-- <audio id="voice" style="display:none;"></audio> -->
                        </div>
                      </div>
                      <div
                        class="msg-type-video"
                        v-if="msg.type === 'TIMVideoFileElem'"
                      >
                        <video
                          :src="msg.payload.videoUrl"
                          controls="controls"
                        ></video>
                      </div>
                      <div class="msg-type-custom" v-if="msg.type === 'TIMCustomElem'">
                        <img class="img" :src="JSON.parse(msg.payload.description).coverImg" alt="">
                        <div class="house-container">
              <div class="house-name">{{JSON.parse(msg.payload.description).houseName}}</div>
              <div class="house-address">{{JSON.parse(msg.payload.description).address}}</div>
              <div class="house-detail">
                <div class="house-price">均价{{JSON.parse(msg.payload.description).price}}元/m²</div>
                <div class="house-tag" v-if="JSON.parse(msg.payload.description).tag">
                  {{JSON.parse(msg.payload.description).tag}}</div>
              </div>
            </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="chat-ipt-box">
            <input
              type="file"
              id="imagePicker"
              ref="imagePicker"
              accept=".jpg, .jpeg, .png, .gif, .bmp"
              @change="sendImage"
              style="display: none"
            />
            <input
              type="file"
              id="videoPicker"
              ref="videoPicker"
              @change="sendVideo"
              style="display: none"
              accept=".mp4"
            />
            <el-input
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="请输入内容"
              v-model="chatContent"
              :disabled="!chatUser"
              @keydown.enter.exact.native="handleSendMsg"
              @keyup.ctrl.enter.native="handleLine"
            >
            </el-input>
            <div class="send-btns">
              <div class="send-file-box">
                <div @click="handleSendImage" class="pointer">
                  <i
                    style="font-size: 24px"
                    class="el-icon-picture-outline"
                  ></i>
                </div>
                <div
                  @click="handleSendVideo"
                  style="margin-left: 10px"
                  class="pointer"
                >
                  <i style="font-size: 26px" class="el-icon-video-camera"></i>
                </div>
              </div>
              <el-button
                size="mini"
                type="primary"
                @click="handleSendMsg"
                :disabled="!chatUser || !chatContent"
                >发送</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import chatMixin from '../assets/mixin/chat-mixin.js'
import { logout } from '../assets/services/login-service'
import MessageBubble from '../components/MessageBubble.vue'
export default {
  name: 'App',
  components: { MessageBubble },
  data() {
    return {
      chatVisible: false,
      rootMap: {
        1: 'dashboard-work-bench',
        '2-1': 'manage-houses',
        '2-2': 'manage-label',
        '3-1': 'manage-customer-sea',
        '3-2': 'manage-customer-following',
        '3-3': 'perfect-customer-info',
        '3-4': 'manage-overtime',
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
    this.initTim()
  },
  methods: {
    handleJumpTim() {
      this.chatVisible = true
      this.$nextTick(() => {
        if (this.currentChatTarget) {
          document.getElementById(
            'chat-content'
          ).scrollTop = document.getElementById('chat-content').scrollHeight
        }
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
.unread-all-num {
  position: absolute;
  top: 10px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  padding: 0 2px;
  height: 16px;
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  background: #F56C6C;
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
