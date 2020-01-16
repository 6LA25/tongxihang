<template>
  <div class="add-intention-customer-page">
    <div class="content-title">新增意向客户</div>
    <el-form :rules="rules" ref="customerForm" :model="customerForm" label-width="130px">
      <el-form-item label="客户姓名：" prop="name">
        <el-input
          style="width: 400px"
          placeholder="请输入客户姓名"
          size="mini"
          v-model="customerForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="客户性别：" prop="gender">
        <el-radio-group v-model="customerForm.gender" @change="handleChangeGender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码：" prop="name">
        <el-input
          style="width: 400px"
          placeholder="请输入电话号码"
          size="mini"
          v-model="customerForm.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="推荐楼盘：" prop="house">
        <el-select
          size="mini"
          v-model="customerForm.house"
          :multiple-limit="1"
          multiple
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
      <el-form-item label="备注：" prop="desc">
        <el-input type="textarea" style="width: 400px" size="mini" resize="none" v-model="customerForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'add-intention-customer',
  data () {
    return {
      loading: false,
      rules: {
        name: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        house: [{ required: true, message: '请输入推荐楼盘', trigger: 'blur' }]
      },
      customerForm: {
        name: '',
        gender: '',
        phone: '',
        house: [],
        remark: ''
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
          alert('submit!')
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
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            console.log(item)
            return item.name.includes(query)
          })
        }, 200)
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
