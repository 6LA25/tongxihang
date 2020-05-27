<template>
  <div class="add-following-record-pag1e">
    <template v-if="$route.query.flag !== 'preview'">
      <div class="content-title">添加跟进记录</div>
      <el-form :rules="rules" ref="followingForm" :model="followingForm" label-width="130px">
        <el-form-item label="跟进状态：" prop="followStatus">
          <el-select size="mini" v-model="followingForm.followStatus" placeholder="请选择跟进状态">
            <el-option
              v-for="item in followingStatus"
              :key="item.status"
              :label="item.text"
              :value="item.status"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进时间：" prop="followTime">
          <el-date-picker
            value-format="yyyy-MM-dd"
            size="mini"
            v-model="followingForm.followTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          v-if="followingForm.followStatus === 2 || followingForm.followStatus === 3 || followingForm.followStatus === 4 || followingForm.followStatus === 5 || followingForm.followStatus === 6"
          label="下次跟进时间："
          prop="nextFollowTime"
        >
          <el-date-picker
            value-format="yyyy-MM-dd"
            size="mini"
            v-model="followingForm.nextFollowTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" prop="intro">
          <el-input
            type="textarea"
            style="width: 400px"
            size="mini"
            resize="none"
            v-model="followingForm.intro"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="followingForm.followStatus === 2 || followingForm.followStatus === 3 || followingForm.followStatus === 4 || followingForm.followStatus === 5"
          label="发放奖励金："
          prop="reward"
        >
          <el-input style="width: 300px" type="number" size="mini" v-model="followingForm.reward"></el-input>
          <span class="form-label">元</span>
        </el-form-item>
        <el-form-item label="购买楼盘：" prop="houseId">
            <el-select
              style="width: 400px"
              size="mini"
              v-model="followingForm.houseId"
              filterable
              @change="handleChangeHouse"
              remote
              reserve-keyword
              placeholder="请输入完整楼盘名称"
              :remote-method="fetchHouses"
              :loading="searching"
            >
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <template v-if="followingForm.followStatus === 6">
          <el-form-item label="合同编号：" prop="contractNum">
            <el-input style="width: 400px" size="mini" v-model="followingForm.contractNum"></el-input>
          </el-form-item>
          <el-form-item label="合同金额：" prop="contractAmount">
            <el-input
              style="width: 400px"
              type="number"
              size="mini"
              v-model="followingForm.contractAmount"
            ></el-input>
          </el-form-item>
          <el-form-item label="合同照片：" prop="contractImgs">
            <el-upload
              v-if="$store.state.uploadUrl"
              :headers="$store.state.uploadHeaders"
              :data="$store.state.uploadData"
              list-type="picture-card"
              :name="'Filedata'"
              style="display: inline-block;"
              class="avatar-uploader"
              :on-success="uploadRealImgSuccess"
              :before-upload="beforeAvatarUpload"
              :on-remove="removeRealImg"
              :action="$store.state.uploadUrl"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="form-item-hint-text">支持jpg/jpeg/png格式图片，大小不超过2M</div>
          </el-form-item>
        </template>
        <el-form-item v-if="followingForm.followStatus === 7" label="回款金额：" prop="amount">
          <el-input type="text" style="width: 400px" size="mini" v-model="followingForm.amount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
          <el-button size="mini" @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
    <div class="following-list-box">
      <div class="title">跟进日志：</div>
      <ul v-loading="loading">
        <li v-for="(log, index) in logList" :key="index">
          <div>2019.09.08 12:31:23 操作人：{{log.operator}}</div>
          <div>跟进状态"{{log.followStatusName}}"，跟进时间“{{log.followTime}}”，下次跟进时间为“{{log.nextFollowTime}}”，备注“{{log.intro}}”</div>
        </li>
      </ul>
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
    </div>
  </div>
</template>

<script>
import {
  addFollowLog,
  fetchHouseList,
  fetchFollowLogs
} from '../../assets/services/manage-service'
import moment from 'moment'
export default {
  name: 'add-following-record',
  data () {
    return {
      rules: {
        followStatus: [
          { required: true, message: '请选择跟进状态', trigger: 'blur' }
        ],
        followTime: [
          { required: true, message: '请选择跟进时间', trigger: 'blur' }
        ],
        contractNum: [
          { required: true, message: '请填写合同编号', trigger: 'blur' }
        ],
        contractAmount: [
          { required: true, message: '请填写合同金额', trigger: 'blur' }
        ],
        houseId: [
          { required: false, message: '请填写购买楼盘', trigger: 'blur' }
        ],
        contractImgs: [{ required: true, message: '请上传合同照片' }]
      },
      submitting: false,
      logList: [],
      followingStatus: [
        { status: 0, text: '关单' },
        { status: 2, text: '联系中' },
        { status: 3, text: '已到访' },
        { status: 4, text: '已认筹' },
        { status: 5, text: '已认购' },
        { status: 6, text: '已签约' }
        // { status: 7, text: '已回款' }
      ],
      followingForm: {
        customerId: '',
        followStatus: '',
        followTime: '',
        nextFollowTime: '',
        intro: '',
        reward: '',
        amount: '', // 回款金额
        houseId: '',
        contractNum: '',
        contractAmount: '',
        contractImgs: []
      },
      pageSize: 10,
      pageNo: 1,
      searching: false,
      options: [],
      loading: false,
      total: 0
    }
  },
  watch: {
    'followingForm.followStatus' (nv) {
      console.log(nv)
      if (nv === 6) {
        this.rules.houseId[0].required = true
      }
      this.followingForm.nextFollowTime = ''
      this.followingForm.intro = ''
      this.followingForm.reward = ''
      this.followingForm.amount = ''
      this.followingForm.houseId = ''
      this.followingForm.contractNum = ''
      this.followingForm.contractAmount = ''
      this.followingForm.contractImgs = []
      this.options = []
    }
  },
  mounted () {
    this.followingForm.followTime = `${moment().year()}-${moment().month() +
      1}-${moment().date()}`
    this.followingForm.customerId = this.$route.query.id
    this.fetchLogs()
    this.$store.dispatch('initUpload')
  },
  methods: {
    handleChangeHouse () {
      this.$refs['followingForm'].clearValidate('houseId')
    },
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
    handleSubmit () {
      if (this.submitting) {
        return
      }
      this.submitting = true
      this.$refs['followingForm'].validate(valid => {
        if (valid) {
          if (this.followingForm.followStatus === 0) {
            this.$confirm('确定关单吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.submitForm()
              })
              .catch(() => {
                this.submitting = false
              })
          } else {
            this.submitForm()
          }
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
    uploadRealImgSuccess (res, file, fileList) {
      console.log(fileList)
      this.followingForm.contractImgs = fileList
      this.$refs['followingForm'].clearValidate('contractImgs')
    },
    submitForm () {
      let post = {
        customerId: this.followingForm.customerId,
        followStatus: this.followingForm.followStatus,
        followTime: this.followingForm.followTime,
        nextFollowTime: this.followingForm.nextFollowTime,
        intro: this.followingForm.intro,
        reward: this.followingForm.reward,
        amount: this.followingForm.amount, // 回款金额
        houseId: this.followingForm.houseId,
        contractNum: this.followingForm.contractNum,
        contractAmount: this.followingForm.contractAmount
      }
      let fileList = []
      this.followingForm.contractImgs.forEach(item => {
        fileList.push(item.response.filename)
      })
      addFollowLog({
        ...post,
        fileList
      })
        .then(({ data }) => {
          this.submitting = false
          this.$message.success('操作成功')
          this.$router.go(-1)
        })
        .catch(error => {
          this.submitting = false
          this.$message.error(`操作失败：${error.result_msg}`)
        })
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
    removeRealImg (file, fileList) {
      console.log(file, fileList)
      this.followingForm.contractImgs = fileList
    },
    fetchLogs () {
      this.loading = true
      fetchFollowLogs({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        customerId: this.$route.query.id
      })
        .then(({ data }) => {
          this.total = data.totalCount
          this.logList = data.items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchLogs()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.fetchLogs()
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-following-record-page {
  .following-list-box {
    color #606266
    padding-left 20px
    .title {
      margin-bottom 10px
      font-size 16px
    }
    ul>li {
      border-bottom 1px solid #eeeeee
      padding 10px 0
    }
  }
}
</style>
