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
    UPDATE_UPDATE_CURRENT_CHAT_USER_MESSAGES({currentChatTarget}, payload) {
      currentChatTarget.messageData.messageList.push(payload)
    }
  },
  actions: {
    async initUpload({ state, commit }, payload) {
      let { data } = await initUpload()
      // state.uploadUrl = data.file_server
      state.uploadUrl = 'http://47.103.39.72:8888/filesubmit/open/upload/?file_charset=UTF-8'
      state.uploadData.file_init = data.file_init
      state.uploadData.file_token = data.file_token
      state.uploadHeaders.AdminAuthorization = sessionStorage.getItem('ticket')
    }
  },
  modules: {
  }
})
