<template>
  <div class="login-page">
    <div @click="handleLogin">login</div>
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
    // fetchKey().then(({ data }) => {
    //   console.log(data)
    // })
  },
  methods: {
    async handleLogin () {
      let keys = {}
      try {
        keys = await fetchKey()
      } catch {}
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
      }).catch(error => {
        this.$message.error(`登陆失败：${error.result_msg || '系统错误'}`)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
