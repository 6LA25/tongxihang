<template>
  <div class="add-advertisement-position-page">
    <div class="content-title">{{$route.query.flag === 'add' ? '新建' : '编辑'}}广告</div>
    <el-form :disabled="$route.query.flag === 'preview'" :rules="rules" ref="advForm" :model="advForm" label-width="130px">
      <div class="form-divide-title">广告位管理：</div>
      <el-form-item label="广告位名称：" prop="title">
        <el-input style="width: 400px" size="mini" v-model="advForm.title"></el-input>
      </el-form-item>
      <el-form-item label="广告位置：" prop="postion">
        <el-select size="mini" v-model="advForm.postion">
          <el-option
            v-for="item in positions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告图：" prop="image">
        <el-upload
          v-if="$store.state.uploadUrl"
          :headers="$store.state.uploadHeaders"
          :data="$store.state.uploadData"
          :name="'Filedata'"
          style="display: inline-block;"
          class="avatar-uploader"
          :action="$store.state.uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="advForm.image" :src="advForm.image.path" class="cover-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      <el-form-item label="广告内容：" prop="link_type">
        <el-radio-group v-model="advForm.link_type" @change="handleSelectLink">
          <div style="margin-bottom: 10px;">
            <el-radio :label="0">外部链接</el-radio>
            <el-input :disabled="advForm.link_type !== 0" style="width: 400px" size="mini" v-model="advForm.outLink"></el-input>
          </div>
          <div>
            <el-radio :label="1">楼盘详情</el-radio>
            <!-- <el-input :disabled="advForm.link_type !== 1" style="width: 400px" size="mini" v-model="advForm.inLink"></el-input> -->
            <el-select
              style="width: 400px"
              size="mini"
              v-model="advForm.inLink"
              filterable
              remote
              reserve-keyword
              placeholder="请输入完整楼盘名称"
              :remote-method="fetchHouses"
              :loading="searching">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          </div>
        </el-radio-group>
      </el-form-item>
      <div class="form-divide-title">广告状态：</div>
      <el-form-item label="上下架：" prop="status">
        <el-radio-group v-model="advForm.status">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input type="number" style="width: 200px" size="mini" v-model="advForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editAdvertise, fetchAdverItem, fetchHouseList } from '../../assets/services/manage-service'
export default {
  name: 'add-advertisement-position',
  data () {
    return {
      submitting: false,
      positions: [
        {
          value: 1,
          label: '首页banner'
        },
        {
          value: 2,
          label: '开屏广告'
        }
      ],
      rules: {
        postion: [{ required: true, message: '请选择广告位置', trigger: 'change' }],
        link_type: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请选择广告内容'))
              } else if (value === 0 && !this.advForm.outLink) {
                callback(new Error('请填写外部链接'))
              } else if (value === 1 && !this.advForm.inLink) {
                callback(new Error('请填写楼盘详情'))
              } else {
                callback()
              }
            },
            message: ''
          }
        ],
        image: [{ required: true, message: '请上传广告图' }],
        status: [{ required: true, message: '请选择广告状态' }],
        title: [{ required: true, message: '请输入广告位名称' }]
      },
      searching: false,
      options: [],
      advForm: {
        title: '',
        postion: '',
        image: null,
        link_type: '',
        outLink: '',
        inLink: '',
        status: '',
        sort: ''
      }
    }
  },
  mounted () {
    this.$store.dispatch('initUpload')
    if (this.$route.query.flag === 'edit' || this.$route.query.flag === 'preview') {
      fetchAdverItem({
        id: this.$route.query.id
      }).then(({ data }) => {
        this.advForm.title = data.title
        this.advForm.postion = data.postion
        this.advForm.image = {
          filename: '',
          path: data.imageLink
        }
        this.advForm.link_type = data.link_type
        this.advForm.status = data.status
        this.advForm.sort = data.sort
        if (data.link_type === 0) {
          this.advForm.outLink = data.link
        } else {
          this.advForm.inLink = data.link / 1
        }
        this.fetchHouses(data.houseName || '')
      })
    }
  },
  methods: {
    fetchHouses (query) {
      console.log(query)
      this.searching = true
      fetchHouseList({
        keyword: query,
        pageSize: 20,
        pageNo: 1
      }).then(({ data }) => {
        this.options = data.items
        this.searching = false
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      this.$refs['advForm'].clearValidate('image')
      // this.advForm.image = res.filename
      this.advForm.image = {
        path: res.http_path,
        filename: res.filename
      }
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error('上传封面只能是 JPG/PNG/JPEG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传封面大小不能超过 2M!')
        return false
      }
      return (isJPG || isPNG || isJPEG) && isLt2M
    },
    handleSubmit () {
      if (this.submitting) {
        return
      }
      this.submitting = true
      this.$refs['advForm'].validate((valid) => {
        if (valid) {
          editAdvertise({
            id: this.$route.query.id || 0,
            title: this.advForm.title,
            postion: this.advForm.postion,
            image: this.advForm.image ? this.advForm.image.filename : '',
            link_type: this.advForm.link_type,
            status: this.advForm.status,
            link: this.advForm.link_type === 0 ? this.advForm.outLink : this.advForm.inLink,
            sort: this.advForm.sort
          }).then(({ data }) => {
            this.$message.success('操作成功')
            this.handleCancel()
          }).catch(() => {
            this.$message.error('操作失败')
            this.submitting = false
          })
        } else {
          console.log('error submit!!')
          this.submitting = false
          return false
        }
      })
    },
    handleCancel () {
      this.$router.go(-1)
    },
    handleSelectLink () {
      console.log(this.advForm.link_type)
      if (this.advForm.link_type === 0) {
        this.advForm.inLink = ''
      } else {
        this.advForm.outLink = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
