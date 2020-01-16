<template>
  <div class="add-following-record-page">
    <div class="content-title">添加跟进记录</div>
    <el-form :rules="rules" ref="followingForm" :model="followingForm" label-width="130px">
      <el-form-item label="客户姓名：" prop="name">
        <el-select size="mini" v-model="followingForm.status" placeholder="请选择跟进状态">
          <el-option
            v-for="item in followingStatus"
            :key="item.status"
            :label="item.text"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="跟进时间：" prop="time">
         <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            v-model="followingForm.time"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="操作人：">
        <el-input style="width: 400px" size="mini" disabled v-model="followingForm.operator"></el-input>
      </el-form-item>
      <el-form-item label="下次跟进时间：" prop="time">
         <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            v-model="followingForm.nextTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input type="textarea" style="width: 400px" size="mini" resize="none" v-model="followingForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="发放奖励金：" prop="money">
        <el-input style="width: 300px" type="number" size="mini" v-model="followingForm.money"></el-input><span class="form-label">元</span>
      </el-form-item>
      <template v-if="followingForm.status === 5">
        <el-form-item label="购买楼盘：" prop="buyHouse">
          <el-input style="width: 400px" size="mini" v-model="followingForm.buyHouse"></el-input>
        </el-form-item>
        <el-form-item label="合同号：" prop="contractNum">
          <el-input style="width: 400px" size="mini" v-model="followingForm.contractNum"></el-input>
        </el-form-item>
        <el-form-item label="合同金额：" prop="contractMoney">
          <el-input style="width: 400px" size="mini" v-model="followingForm.contractMoney"></el-input>
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
            :action="$store.state.uploadUrl">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        <div class="form-item-hint-text">支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      </template>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <div class="following-list-box">
      <div class="title">跟进日志：</div>
      <ul>
        <li>
          <div>2019.09.08 12:31:23   操作人：曾诚</div>
          <div>跟进状态"联系中"，跟进时间“2019.09.08 12:30”，下次跟进时间为“2019.09.18 12:30”，备注“未打通客户电话，下次继续联系”</div>
        </li>
        <li>
          <div>2019.09.08 12:31:23   操作人：曾诚</div>
          <div>跟进状态"联系中"，跟进时间“2019.09.08 12:30”，下次跟进时间为“2019.09.18 12:30”，备注“未打通客户电话，下次继续联系”</div>
        </li>
        <li>
          <div>2019.09.08 12:31:23   操作人：曾诚</div>
          <div>跟进状态"联系中"，跟进时间“2019.09.08 12:30”，下次跟进时间为“2019.09.18 12:30”，备注“未打通客户电话，下次继续联系”</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-following-record',
  data () {
    return {
      rules: {},
      followingStatus: [
        { status: 1, text: '联系中' },
        { status: 2, text: '已到访' },
        { status: 3, text: '已认筹' },
        { status: 4, text: '已认购' },
        { status: 5, text: '已签约' },
        { status: 6, text: '已回款' },
        { status: 7, text: '关单' }
      ],
      followingForm: {
        status: 5,
        time: '',
        nextTime: '',
        operator: '张三',
        remark: '',
        money: '',
        buyHouse: '',
        contractNum: '',
        contractMoney: '',
        contractImgs: []
      }
    }
  },
  mounted () {
    this.$store.dispatch('initUpload')
  },
  methods: {
    handleSubmit () {
      this.$refs['followingForm'].validate(valid => {
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
    uploadRealImgSuccess (res, file, fileList) {
      console.log(fileList)
      this.followingForm.contractImgs = fileList
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
