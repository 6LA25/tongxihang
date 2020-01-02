<template>
  <div class="home-page">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {}
}
</script>
<style lang="stylus">
@import '../assets/css/preset';
.home-page {
  width 100%
  height 100%
  .el-container {
    width 100%
    height 100%
  }
}
</style>
