<template>
  <div class="confirm-transfer-account-page">
    <div class="content-title">分销佣金打款</div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">用户搜索：</div>
        <div class="ilb-top">
          <el-input v-model="search.name" placeholder="请输入结算人姓名、身份证或手机号" size="mini"></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">结算状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.status" placeholder="请选择" size="mini">
            <el-option
              v-for="item in commissions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="warning" size="mini" @click="handleReset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirm-transfer-account',
  data () {
    return {
      commissions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '待结算'
        },
        {
          value: '2',
          label: '已结算'
        }
      ],
      search: {
        name: '',
        status: '',
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    handleReset () {}
  }
}
</script>

<style lang="stylus" scoped>

</style>
