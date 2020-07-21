<template>
  <div class="house-dynamic-page">
    <div class="content-title">楼盘动态</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" v-permission="'新建楼盘'" @click="handleAddHouses('add')">新建动态</el-button>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'house-dynamic',
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
