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
    userPermissions: JSON.parse(sessionStorage.getItem('permissions')) || []
  },
  mutations: {
    UPDATE_USER_INFO (state, payload) {
      state.userInfo = payload
    },
    UPDATE_USER_PERMISSIONS (state, payload) {
      state.userPermissions = payload
    }
  },
  actions: {
    async initUpload ({ state, commit }, payload) {
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
