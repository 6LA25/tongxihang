<template>
  <div class="edit-customer-page">
    <div class="content-title">编辑推荐客户信息</div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="客户姓名：" prop="name">
        <el-input style="width: 400px" size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="客户性别：">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="客户手机号：" prop="contact">
        <el-input style="width: 400px" size="mini" v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="推荐楼盘：" prop="houseId">
        <el-select
          size="mini"
          v-model="form.houseId"
          :multiple-limit="1"
          filterable
          remote
          reserve-keyword
          placeholder="请输入推荐楼盘关键词"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="handleChangeHouse"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchHouseList, editCustomer } from '../../assets/services/manage-service'
export default {
  name: 'edit-customer',
  data () {
    return {
      loading: false,
      form: {
        realname: '',
        gender: '',
        contact: '',
        houseId: ''
      },
      options: []
    }
  },
  methods: {
    handleCancel () {
      this.$router.go(-1)
    },
    handleSubmit () {
      editCustomer({
        id: this.$route.query.id,
        ...this.form
      }).then(() => {
        this.$message.success('操作成功')
        this.handleCancel()
      })
    },
    remoteMethod (query) {
      console.log(query)
      if (query !== '') {
        this.loading = true
        fetchHouseList({
          keyword: query,
          pageSize: 20,
          pageNo: 1
        }).then(({ data }) => {
          this.options = data.items
          this.loading = false
        })
      } else {
        this.options = []
      }
    },
    handleChangeHouse () {
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
