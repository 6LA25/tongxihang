import Vue from 'vue'
import Vuex from 'vuex'
import { initUpload } from '../assets/services/manage-service'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
    uploadUrl: '',
    uploadData: {},
    uploadHeaders: {}
  },
  mutations: {
    UPDATE_USER_INFO (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async initUpload ({ state, commit }, payload) {
      let { data } = await initUpload()
      state.uploadUrl = data.file_server
      state.uploadData.file_init = data.file_init
      state.uploadData.file_token = data.file_token
      state.uploadHeaders.AdminAuthorization = sessionStorage.getItem('ticket')
    }
  },
  modules: {
  }
})
