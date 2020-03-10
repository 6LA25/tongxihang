<template>
  <div class="add-intention-customer-page">
    <div class="content-title">新增意向客户</div>
    <el-form :rules="rules" ref="customerForm" :model="customerForm" label-width="130px">
      <el-form-item label="客户姓名：" prop="realname">
        <el-input
          style="width: 400px"
          placeholder="请输入客户姓名"
          size="mini"
          v-model="customerForm.realname"
        ></el-input>
      </el-form-item>
      <el-form-item label="客户性别：" prop="gender">
        <el-radio-group v-model="customerForm.gender" @change="handleChangeGender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码：" prop="mobile">
        <el-input
          style="width: 400px"
          placeholder="请输入电话号码"
          size="mini"
          v-model="customerForm.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="推荐楼盘：" prop="houseId">
        <el-select
          size="mini"
          v-model="customerForm.houseId"
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
      <el-form-item label="备注：" prop="intro">
        <el-input type="textarea" style="width: 400px" size="mini" resize="none" v-model="customerForm.intro"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCustomerSea, fetchHouseList } from '../../assets/services/manage-service'
export default {
  name: 'add-intention-customer',
  data () {
    return {
      loading: false,
      rules: {
        realname: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        houseId: [{ required: true, message: '请输入推荐楼盘', trigger: 'blur' }]
      },
      customerForm: {
        realname: '',
        gender: '',
        mobile: '',
        houseId: '',
        intro: ''
      },
      options: [],
      list: [
        { id: 1, name: 'aaaa' },
        { id: 2, name: 'bbb' },
        { id: 3, name: 'ccc' },
        { id: 4, name: 'ccc1' }
      ]
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['customerForm'].validate(valid => {
        if (valid) {
          addCustomerSea(this.customerForm).then(({ data }) => {
            this.$message.success('操作成功')
            this.$router.go(-1)
          }).catch(error => {
            console.log(error)
            this.$message.error(`操作失败：${error.result_msg}`)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel () {
      this.$router.go(-1)
    },
    handleChangeGender () {
      this.$refs['customerForm'].clearValidate('gender')
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
