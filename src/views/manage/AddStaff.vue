<template>
  <div class="add-staff-page">
    <el-form
      :disabled="$route.query.tag === 'preview'"
      :model="userForm"
      :rules="rules"
      ref="userForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="account">
        <el-input maxlength="100" style="width: 400px;" size="mini" autocomplete="off" v-model="userForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          maxlength="100"
          auto-complete="new-password"
          type="password"
          style="width: 400px;"
          size="mini"
          v-model="userForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realname">
        <el-input maxlength="100" style="width: 400px;" size="mini" v-model="userForm.realname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input maxlength="100" style="width: 400px;" size="mini" v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input maxlength="100" style="width: 400px;" size="mini" v-model="userForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="员工编号" prop="jobnum">
        <el-input maxlength="100" style="width: 400px;" size="mini" v-model="userForm.jobnum"></el-input>
      </el-form-item>
      <el-form-item label="设置角色" prop="role">
        <el-input
          readonly
          maxlength="100"
          style="width: 200px;margin-right: 20px;"
          size="mini"
          v-model="roleName"
        ></el-input>
        <el-button size="mini" type="primary" @click="handleShowDialog">选择角色</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="submitForm('userForm')">立即创建</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog class="select-role-dialog" title="选择角色" :visible.sync="dialogVisible" :before-close="handleClose" width="50%">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
        v-loading="loading"
      >
        <el-table-column prop="" label="选择" width="50">
          <template scope="scope">
            <el-radio v-model="selectRole.id" :label="scope.row.id" @change.native="handleSelectRole(scope.$index,scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" width="500"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="handleEdit('edit', scope.row)">编辑</el-button>
            <el-button size="mini" @click.stop="handleEdit('preview', scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div style="text-align: center;">
        <el-button size="mini" type="primary" @click="handleConfirm">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addStaff, fetchAllRoles } from '../../assets/services/manage-service'
export default {
  name: 'add-staff',
  data () {
    return {
      dialogVisible: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      loading: false,
      userForm: {
        account: '',
        password: '',
        realname: '',
        email: '',
        mobile: '',
        jobnum: '',
        role: ''
      },
      roleName: '',
      selectRole: {
        id: '',
        name: ''
      },
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请设置密码', trigger: 'blur' }],
        realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        role: [{ required: true, message: '请设置角色', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialogVisible (nv) {
      if (!nv) {
        this.pageNo = 1
        this.pageSize = 10
        this.tableData = []
        this.selectRole.id = ''
        this.selectRole.name = ''
      }
    }
  },
  mounted () {},
  methods: {
    handleSelectRole (index, row) {
      console.log(row)
      this.selectRole.id = row.id
      this.selectRole.name = row.name
    },
    handleShowDialog () {
      this.dialogVisible = true
      this.selectRole.id = this.userForm.role
      this.selectRole.name = this.roleName
      this.fetchList()
    },
    handleCancel () {
      this.$router.go(-1)
    },
    handleConfirm () {
      this.userForm.role = this.selectRole.id
      this.roleName = this.selectRole.name
      if (this.selectRole.id) {
        this.$refs['userForm'].clearValidate('role')
      }
      this.dialogVisible = false
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addStaff({
            ...this.userForm
          })
            .then(({ data }) => {
              this.$message.success('操作成功')
              this.$router.go(-1)
            })
            .catch(() => {
              this.$message.error('操作失败')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchList () {
      this.loading = true
      fetchAllRoles({
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.fetchList()
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="stylus">
.select-role-dialog {
  .el-radio__label {
    display none
  }
}
</style>
