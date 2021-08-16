<template>
  <div class="add-staff-page">
    <el-form
      :disabled="$route.query.tag === 'preview'"
      :model="userForm"
      :rules="rules"
      ref="userForm"
      label-width="100px"
    >
    <el-form-item label="账号" prop="account">
        <el-input
          maxlength="100"
          :readonly="$route.query.tag === 'preview'"
          style="width: 400px"
          size="mini"
          autocomplete="off"
          v-model.trim="userForm.account"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realname">
        <el-input
          maxlength="100"
          :readonly="$route.query.tag === 'preview'"
          style="width: 400px"
          size="mini"
          v-model.trim="userForm.realname"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          maxlength="100"
          auto-complete="new-password"
          style="width: 400px"
          size="mini"
          v-model.trim="userForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="company">
        <el-input
          maxlength="100"
          :readonly="$route.query.tag === 'preview'"
          style="width: 400px"
          size="mini"
          v-model.trim="userForm.company"
        ></el-input>
      </el-form-item>
      <el-form-item label="展示公司名">
        <el-switch v-model="userForm.companystatus"></el-switch>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input
          maxlength="100"
          style="width: 400px"
          size="mini"
          v-model.trim="userForm.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="员工性别" prop="sex">
        <el-radio-group v-model="userForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="0">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工头像" prop="coverImg">
        <el-upload
          v-if="$store.state.uploadUrl"
          :headers="$store.state.uploadHeaders"
          :data="$store.state.uploadData"
          :name="'Filedata'"
          style="display: inline-block"
          class="avatar-uploader"
          :action="$store.state.uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="userForm.coverImg.filepath"
            :src="userForm.coverImg.filepath"
            class="cover-img"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">
          <span v-if="$route.query.tag === 'edit'">点击图片修改头像，</span
          >支持jpg/jpeg/png格式图片，大小不超过1M，建议尺寸：336 * 256
        </div>
      </el-form-item>
      <el-form-item label="员工描述" prop="desc">
        <el-input
          :readonly="$route.query.tag === 'preview'"
          style="width: 400px"
          size="mini"
          autocomplete="off"
          placeholder="不得超过12字"
          maxlength="12"
          v-model.trim="userForm.desc"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="submitForm('userForm')"
          >立即创建</el-button
        >
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editExternalUser, fetchExternalUser } from '../../assets/services/manage-service'
export default {
  name: 'add-staff',
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      loading: false,
      userForm: {
        account: '',
        password: '',
        company: '',
        companystatus: true,
        realname: '',
        mobile: '',
        sex: '',
        desc: '',
        coverImg: {},
      },
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请设置密码', trigger: 'blur' }],
        realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        role: [{ required: true, message: '请设置角色', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.$store.dispatch('initUpload')
    if (this.$route.query.tag !== 'add') {
      this.rules.password[0].required = false
      fetchExternalUser({
        uid: this.$route.query.uid,
      }).then(({ data }) => {
        this.userForm.account = data.account
        this.userForm.password = data.password
        this.userForm.realname = data.realname
        this.userForm.company = data.company
        this.userForm.companystatus = !!data.companystatus
        this.userForm.mobile = data.mobile
        this.userForm.sex = data.sex
        this.userForm.desc = data.desc
        this.userForm.coverImg.filepath = data.avatar
      })
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      this.$refs['userForm'].clearValidate('coverImg')
      this.userForm.coverImg = {
        filename: res.filename,
        filepath: res.http_path,
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error('上传封面只能是 JPG/PNG/JPEG 格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传封面大小不能超过 1M!')
        return false
      }
      return (isJPG || isPNG || isJPEG) && isLt1M
    },
    handleCancel() {
      this.$router.go(-1)
    },
    handleConfirm() {
      this.userForm.role = this.selectRole.id
      this.roleName = this.selectRole.name
      if (this.selectRole.id) {
        this.$refs['userForm'].clearValidate('role')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let userForm = this.userForm
        if (valid) {
          editExternalUser({
            uid: this.$route.query.uid || '',
            account: userForm.account,
            password: userForm.password,
            realname: userForm.realname,
            company: userForm.company,
            companystatus: userForm.companystatus / 1,
            mobile: userForm.mobile,
            sex: userForm.sex,
            desc: userForm.desc,
            avatar: userForm.coverImg.filepath,
          })
            .then(data => {
              this.$message.success(data.result_msg)
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
  },
}
</script>

<style lang="stylus">
.select-role-dialog {
  .el-radio__label {
    display none
  }
}
</style>
