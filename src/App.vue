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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  width: 146px;
  height: 146px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px!important;
  text-align: center;
}
.el-upload-list--picture-card {
  height 146px
}
.cover-img {
  width 100%
}
#app {
  width 100%
  height 100%
  color #4a4a4a
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
