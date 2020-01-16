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
  .form-item-hint-text {
    color #606266
  }
  .form-label {
    margin-left 10px
    color #606266
  }
  .ml-10 {
    margin-left 10px
  }
  .table-cell-click-span {
    display inline-block
    width 100%
    color #409eff
  }
  .pointer {
    cursor pointer
  }
}
</style>
