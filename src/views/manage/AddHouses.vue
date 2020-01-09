<template>
  <div class="add-houses">
    <div class="content-title">{{titleText}}</div>

  </div>
</template>

<script>
export default {
  name: 'add-houses',
  data () {
    return {}
  },
  computed: {
    titleText () {
      const title = {
        add: '新增楼盘',
        edit: '编辑楼盘',
        preview: '预览楼盘'
      }
      return title[this.$route.query.tag || 'add']
    }
  },
  mounted () {

  }
}
</script>

<style lang="stylus" scoped>

</style>
