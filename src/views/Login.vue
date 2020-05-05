<template>
  <div class="login-page">
    <div class="login-box">
      <div class="title">安选好房后台管理系统</div>
      <el-form :rules="rules" ref="loginForm" :model="loginForm" label-width="100px" @submit.native.prevent>
        <el-form-item label="用户名：" prop="account">
          <el-input style="width: 300px" size="mini" v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input style="width: 300px" size="mini" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchKey, login, fetchStaffPermissions } from '../assets/services/login-service'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      loginForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    // 回车登录
    document.onkeydown = (e) => {
      if (e.keyCode === 13 && this.$route.name === 'login') {
        this.handleLogin()
      }
    }
  },
  methods: {
    async handleLogin () {
      if (!this.loginForm.account || !this.loginForm.password || this.logining) {
        return
      }
      this.logining = true
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        body: true,
        spinner: 'el-icon-loading'
      })
      let keys = {}
      try {
        keys = await fetchKey()
      } catch {
        this.$message.error('获取publicKey失败！')
      }
      console.log(keys)
      sessionStorage.setItem('publickey', keys.data.publickey)
      sessionStorage.setItem('rsakey', keys.data.rsakey)
      let encrypt = new JSEncrypt()
      encrypt.setPublicKey(keys.data.publickey)
      login({
        account: this.loginForm.account,
        password: encrypt.encrypt(this.loginForm.password),
        rsakey: keys.data.rsakey
      }).then(({ data }) => {
        console.log(data)
        this.$store.commit('UPDATE_USER_INFO', data.item)
        sessionStorage.setItem('userInfo', JSON.stringify(data.item))
        sessionStorage.setItem('ticket', data.item.ticket)
        fetchStaffPermissions().then(({ data }) => {
          console.log(data)
          sessionStorage.setItem('permissions', JSON.stringify(data.permissions))
          this.$store.commit('UPDATE_USER_PERMISSIONS', data.permissions)
          this.logining = false
          loading.close()
          this.$router.push({
            name: 'dashboard-work-bench'
          })
        })
      }).catch(error => {
        this.$message.error(`登陆失败：${error.result_msg || '系统错误'}`)
        this.logining = false
        loading.close()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-page {
  width 100%
  height 100%
  background url(../assets/imgs/login-bg.png) 0 0 no-repeat
  background-size cover
  .login-box {
    position fixed
    top 50%
    transform translate(0, -50%)
    right 200px
    border-radius 6px
    padding 30px
    background #fff
    .title {
      font-size 20px
      padding 10px
      text-align center
    }
  }
}
</style>
