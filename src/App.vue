<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    console.log('init app')
  }
}
</script>
<style lang="stylus">
@import './assets/css/preset'
#app {
  width 100%
  height 100%
}
</style>
