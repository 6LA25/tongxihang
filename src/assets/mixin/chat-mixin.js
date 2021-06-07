import { fetchTimUserSig } from '../services/login-service'
import { mapState } from 'vuex'
import { getQueryString } from '@public/deps/utils'
export default {
  data() {
    return {
      userid: getQueryString('userid'),
      chatContent: '',
      contactList: [],
      messagesLoading: false,
      count: 15
    }
  },
  computed: {
    ...mapState({
      currentChatTarget: state => state.currentChatTarget,
      chatUser: state => state.currentChatTarget && state.currentChatTarget.chatUser,
      messageData: state => state.currentChatTarget && state.currentChatTarget.messageData,
    }),
    allUnreadMsg() {
      return this._lodash.sumBy(this.contactList, 'unreadCount')
    }
  },
  watch: {
    chatVisible(nv) {
    }
  },
  mounted() {
  },
  methods: {
    // 从发送消息时间开始算起，两分钟内可以编辑
    handleRevokeMsg(message) {
      let now = new Date()
      if (parseInt(now.getTime() / 1000) - message.time > 2 * 60 || message.flow === 'in') {
        return
      }
      this.$confirm('是否撤回该条消息？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 主动撤回消息
          let promise = this.$$tim.revokeMessage(message);
          promise.then((imResponse) => {
            // 消息撤回成功
            this.$message.success('消息撤回成功')
          }).catch(function (imError) {
            // 消息撤回失败
            console.warn('revokeMessage error:', imError);
          });
        })
        .catch(() => {

        })
    },
    makeChatAreaToBottom() {
      this.$nextTick(() => {
        document.getElementById('chat-content').scrollTop = document.getElementById('chat-content').scrollHeight
      })
    },
    async initTim() {
      // 开始登录
      let {imconfig} = this.$store.state.userInfo
      let timLogin = this.$$tim.login({
        userID: imconfig.userId || this.userid,
        userSig: imconfig.userSig,
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
      tim.on(TIM.EVENT.SDK_READY, (event) => {
        console.log('eve', event)
        this.initRecentContactList()
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        // event.name - TIM.EVENT.SDK_READY
      })
      tim.on(TIM.EVENT.MESSAGE_RECEIVED, (event) => {
        console.log('TIM.EVENT.MESSAGE_RECEIVED==>', event.data)
        let receivedMsgs = event.data
        // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
        // event.name - TIM.EVENT.MESSAGE_RECEIVED
        // event.data - 存储 Message 对象的数组 - [Message]
        // if (this.chatUser && receivedMsg.conversationID === this.chatUser.conversationID) {
        //   this.$store.commit('UPDATE_UPDATE_CURRENT_CHAT_USER_MESSAGES', receivedMsg)
        // }
        if (this.chatUser) {
          let currentChat = receivedMsgs.find(item => {
            return item.conversationID === this.chatUser.conversationID
          })
          if (currentChat) {
            this.$store.commit('UPDATE_UPDATE_CURRENT_CHAT_USER_MESSAGES', currentChat)
            this.makeChatAreaToBottom()
            this.makeMsgReaded(currentChat.conversationID)
          }
        }
      })
      tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event) {
        console.log('TIM.EVENT.MESSAGE_REVOKED=>', event.data)
        this.$store.commit('UPDATE_SINGLE_MESSAGE', )
        let revokeMsgs = event.data
        if (this.chatUser) {
          let currentChat = revokeMsgs.find(item => {
            return item.conversationID === this.chatUser.conversationID
          })
          if (currentChat) {
            this.$store.commit('UPDATE_SINGLE_MESSAGE', currentChat)
          }
        }
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
    initRecentContactList() {
      let promise = this.$$tim.getConversationList()
      promise.then((imResponse) => {
        console.log('会话列表', imResponse)
        const conversationList = imResponse.data.conversationList
        this.contactList = conversationList
      })
    },
    handleSendMsg() {
      let tim = this.$$tim
      const TIM = this.TIM
      // 发送文本消息，Web 端与小程序端相同
      // 1. 创建消息实例，接口返回的实例可以上屏
      let message = tim.createTextMessage({
        to: this.chatUser.userProfile.userID,
        conversationType: TIM.TYPES.CONV_C2C,
        // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
        // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
        // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
        payload: {
          text: this.chatContent
        },
        // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
        // cloudCustomData: 'your cloud custom data'
      });
      // 2. 发送消息
      let promise = tim.sendMessage(message);
      promise.then((imResponse) => {
        // 发送成功
        console.log('发送成功=>', imResponse);
        this.$store.commit('UPDATE_UPDATE_CURRENT_CHAT_USER_MESSAGES', imResponse.data.message)
        this.chatContent = ''
        this.makeChatAreaToBottom()
      }).catch(function (imError) {
        // 发送失败
        console.warn('sendMessage error:', imError);
      });
    },
    handleToggleChatItem(item) {
      this.chatContent = ''
      // 消息全部设为已读
      if (item.unreadCount > 0) {
        this.makeMsgReaded(item.conversationID)
      }
      this.$store.commit('UPDATE_CURRENT_CHAT_USER', {
        chatUser: item,
        messageData: {}
      })
      this.loadMessages({ conversationID: item.conversationID })
      this.makeChatAreaToBottom()
    },
    handlePlayVoice(msg) {
      this.$store.commit('TOGGLE_MESSAGES_VOICE_PLAYING', msg)
      // if (msg.playing) {
      // } else {
      //   const audio = document.createElement('audio')
      //   audio.src = msg.payload.url
      //   const promise = audio.play()
      //   if (promise) {
      //     promise.catch(() => { })
      //   }
      // }

    },
    makeMsgReaded(conversationID) {
      let promise = this.$$tim.setMessageRead({ conversationID });
      promise.then(function (imResponse) {
        // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
      }).catch(function (imError) {
        // 已读上报失败
        console.warn('setMessageRead error:', imError);
      });
    },
    loadMessages(options) {
      this.messagesLoading = true
      let tim = this.$$tim
      // 打开某个会话时，第一次拉取消息列表
      let promise = tim.getMessageList({
        ...options,
        count: this.count
      });
      promise.then((imResponse) => {
        console.log('imResponse', imResponse.data)
        this.$store.commit('UPDATE_CURRENT_CHAT_USER_MESSAGEDATA', imResponse.data)
        this.messagesLoading = false
        if (!options.nextReqMessageID) {
          this.makeChatAreaToBottom()
        }
      });
    },
    handleLoadMoreMsg() {
      this.loadMessages({
        conversationID: this.chatUser.conversationID,
        nextReqMessageID: this.messageData.nextReqMessageID
      })
    },
    handleLine() {
      console.log(111)
      this.chatContent += '\n'
    },
    handleSendImage() {
      if (this.chatUser) {
        this.$refs.imagePicker.click()
      }
    },
    sendImage() {
      let tim = this.$$tim
      const TIM = this.TIM
      const message = tim.createImageMessage({
        to: this.chatUser.userProfile.userID,
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
          file: document.getElementById('imagePicker') // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
        }
      })
      let promise = tim.sendMessage(message);
      promise.then((imResponse) => {
        // 发送成功
        console.log('发送成功=>', imResponse);
        this.$store.commit('UPDATE_UPDATE_CURRENT_CHAT_USER_MESSAGES', imResponse.data.message)
        this.$refs.imagePicker.value = null
        setTimeout(() => {
          this.makeChatAreaToBottom()
        }, 400)
      }).catch(function (imError) {
        // 发送失败
        console.warn('sendMessage error:', imError);
      });
    },
    handleSendVideo() {
      if (this.chatUser) {
        this.$refs.videoPicker.click()
      }
    },
    sendVideo() {
      let tim = this.$$tim
      const TIM = this.TIM
      const message = tim.createVideoMessage({
        to: this.chatUser.userProfile.userID,
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
          file: document.getElementById('videoPicker') // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
        }
      })
      let promise = tim.sendMessage(message);
      promise.then((imResponse) => {
        // 发送成功
        console.log('发送成功=>', imResponse);
        this.$store.commit('UPDATE_UPDATE_CURRENT_CHAT_USER_MESSAGES', imResponse.data.message)
        this.$refs.videoPicker.value = null
        this.$nextTick(() => {
          this.makeChatAreaToBottom()
        })
      }).catch(function (imError) {
        // 发送失败
        console.warn('sendMessage error:', imError);
      });
    },
    handleToggleMsgOperate(e) {
      console.log('e=>', e)
    }
  }
}