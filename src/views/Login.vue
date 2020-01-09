<template>
  <div class="login-page">
    <div @click="handleLogin" style="text-align: center;">
      <el-button type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
import { fetchKey, login } from '../assets/services/login-service'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
export default {
  name: 'login',
  data () {
    return {
      account: 'admin',
      password: 'admin'
    }
  },
  mounted () {
  },
  methods: {
    async handleLogin () {
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
        account: this.account,
        password: encrypt.encrypt(this.password),
        rsakey: keys.data.rsakey
      }).then(({ data }) => {
        console.log(data)
        this.$store.commit('UPDATE_USER_INFO', data.item)
        sessionStorage.setItem('userInfo', JSON.stringify(data.item))
        sessionStorage.setItem('ticket', data.item.ticket)
        this.$router.push({
          name: 'manage-houses'
        })
      }).catch(error => {
        this.$message.error(`登陆失败：${error.result_msg || '系统错误'}`)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
