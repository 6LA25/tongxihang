import Vue from 'vue'
import Vuex from 'vuex'
import { initUpload } from '../assets/services/manage-service'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
    uploadUrl: '',
    uploadData: {},
    uploadHeaders: {},
    userPermissions: JSON.parse(sessionStorage.getItem('permissions')) || [],
    currentChatTarget: null
  },
  mutations: {
    UPDATE_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    UPDATE_USER_PERMISSIONS(state, payload) {
      state.userPermissions = payload
    },
    UPDATE_CURRENT_CHAT_USER(state, payload) {
      state.currentChatTarget = payload
    },
    UPDATE_CURRENT_CHAT_USER_MESSAGEDATA(state, payload) {
      let showMsgs = [...payload.messageList, ...(state.currentChatTarget.messageData.messageList || [])]
      payload.messageList = showMsgs
      state.currentChatTarget.messageData = payload
    },
    UPDATE_UPDATE_CURRENT_CHAT_USER_MESSAGES({ currentChatTarget }, payload) {
      currentChatTarget.messageData.messageList.push(payload)
    },
    TOGGLE_MESSAGES_VOICE_PLAYING(state, payload) {
      let voiceMsg = payload
      let messageList = JSON.parse(JSON.stringify(state.currentChatTarget.messageData.messageList))
      const audio = document.getElementById('voice-audio')
      audio.src = voiceMsg.payload.url
      if (!voiceMsg.playing) {
        messageList.forEach(item => {
          item.playing = item.ID === voiceMsg.ID
        })
        audio.play()
      } else {
        messageList.forEach(item => {
          if (item.ID === voiceMsg.ID) {
            item.playing = false
          }
        })
        audio.pause()
      }
      state.currentChatTarget.messageData.messageList = messageList
    },
    UPDATE_SINGLE_MESSAGE(state, payload) {
      let messageList = JSON.parse(JSON.stringify(state.currentChatTarget.messageData.messageList))
      messageList.forEach(item => {
        if (item.ID === payload.ID) {
          item = payload
        }
      })
      state.currentChatTarget.messageData.messageList = messageList
    }
  },
  actions: {
    async initUpload({ state, commit }, payload) {
      let { data } = await initUpload()
      // state.uploadUrl = data.file_server
      state.uploadUrl = 'http://anxuanhouse.com/filesubmit/open/upload/?file_charset=UTF-8'
      state.uploadData.file_init = data.file_init
      state.uploadData.file_token = data.file_token
      state.uploadHeaders.AdminAuthorization = sessionStorage.getItem('ticket')
    }
  },
  modules: {
  }
})
