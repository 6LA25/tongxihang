<template>
  <div class="add-role-page">
    <el-form :disabled="$route.query.tag === 'preview'" :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input style="width: 400px;" size="mini" v-model="roleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="角色权限设置" prop="permission">
        <el-tree
          style="vertical-align: middle;display: inline-block;margin-top: 6px;min-width: 400px;"
          :data="permissions"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expanded-keys="selectedKeys"
          :default-checked-keys="selectedKeys"
          @check="handleCheckChange"
          highlight-current
          :props="defaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="submitForm('roleForm')">立即创建</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchAllPermissions, addRole, fetchRoleItem } from '../../assets/services/manage-service'
export default {
  name: 'add-role',
  data () {
    return {
      roleForm: {
        id: '',
        name: ''
      },
      selectedKeys: [],
      permissions: [],
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted () {
    if (this.$route.query.tag !== 'add') {
      this.roleForm.id = this.$route.query.id || ''
      fetchRoleItem({
        id: this.$route.query.id
      }).then(({ data }) => {
        this.roleForm.name = data.item.name
        this.selectedKeys = data.item.permissions.split(',')
      })
    }
    this.fetchPermissions()
  },
  methods: {
    handleCheckChange (data, nodes) {
      console.log(nodes)
      this.selectedKeys = nodes.checkedKeys
    },
    fetchPermissions () {
      fetchAllPermissions().then(({ data }) => {
        this.permissions = data.items
      })
    },
    handleCancel () {
      this.$router.go(-1)
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.selectedKeys = this.$refs.tree.getCheckedKeys()
          addRole({
            ...this.roleForm,
            permissions: this.selectedKeys.join(',')
          }).then(({ data }) => {
            this.$message.success('操作成功')
            this.$router.go(-1)
          }).catch(() => {
            this.$message.error('操作失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
