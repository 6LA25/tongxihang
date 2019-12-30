<template>
  <div class="login-page">login</div>
</template>

<script>
import { fetchKey } from '../assets/services/login-service'
export default {
  name: 'login',
  mounted () {
    fetchKey().then(({ data }) => {
      console.log(data)
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
