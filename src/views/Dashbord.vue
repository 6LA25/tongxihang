<template>
  <div class="dashboard-page">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activeRoot"
          class="el-menu-vertical-demo"
          @select="handleSelectNav"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      rootMap: {
        '1': 'dashboard-work-bench',
        '2-1': 'manage-houses'
      }
    }
  },
  computed: {
    activeRoot () {
      let val = ''
      Object.keys(this.rootMap).forEach(item => {
        if (this.rootMap[item] === this.$route.name) {
          val = item
        }
      })
      return val
    }
  },
  methods: {
    handleSelectNav (key, keyPath) {
      console.log(key, keyPath)
      console.log(this.rootMap[key])
      this.$router.push({
        name: this.rootMap[key]
      })
    }
  }
}
</script>
<style lang="stylus">
.search-head-box {
  padding 5px
  background #eee
  .search-item-box {
    margin 5px
    &.search-btns-box {
      margin-left 30px
    }
    .search-item-label {
      height 28px
      line-height 28px
    }
  }
}
.dashboard-page {
  width 100%
  height 100%
  .el-container {
    width 100%
    height 100%
    .el-main {
    }
  }
}
</style>
