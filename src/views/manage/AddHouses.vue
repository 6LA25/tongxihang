<template>
  <div class="add-houses-page">
    <div class="content-title">{{titleText}}</div>
    <el-form ref="housesForm" :model="housesForm" label-width="100px">
      <el-form-item label="楼盘名称：" prop="name">
        <el-input style="width: 400px" size="mini" v-model="housesForm.name"></el-input>
      </el-form-item>
      <el-form-item label="定价：" prop="price">
        <el-input style="width: 400px" size="mini" v-model="housesForm.price"></el-input>
        <span class="form-label">元/m2</span>
      </el-form-item>
      <el-form-item label="楼盘类型：" prop="type">
        <el-select size="mini" v-model="housesForm.type" placeholder="请选择楼盘类型">
          <el-option
            v-for="item in houseTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼盘状态：" prop="status">
        <el-select size="mini" v-model="housesForm.status" placeholder="请选择楼盘状态">
          <el-option
            v-for="item in houseStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼盘简介：" prop="desc">
        <el-input type="textarea" style="width: 400px" size="mini" resize="none" v-model="housesForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="楼盘标签：" prop="tags">
        <el-input type="textarea" style="width: 400px" size="mini" resize="none" v-model="housesForm.tags"></el-input>
      </el-form-item>
      <el-form-item label="楼盘特色：" prop="feature">
        <el-input style="width: 400px" size="mini" v-model="housesForm.feature"></el-input>
      </el-form-item>
      <el-form-item label="建筑类型：" prop="buildingType">
        <el-input style="width: 400px" size="mini" v-model="housesForm.buildingType"></el-input>
      </el-form-item>
      <div>
        <div class="ilb-top">
          <el-form-item label="装修标准：" prop="standard">
            <el-input style="width: 150px" size="mini" v-model="housesForm.standard"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="产权年限：" prop="limit">
            <el-input style="width: 150px" size="mini" v-model="housesForm.limit"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="开发商：" prop="developer">
        <el-input style="width: 400px" size="mini" v-model="housesForm.developer"></el-input>
      </el-form-item>
      <div>
        <div class="ilb-top">
          <el-form-item label="主力户型：" prop="mainType">
            <el-input style="width: 150px" size="mini" v-model="housesForm.mainType"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="建筑面积：" prop="acreage">
            <el-input style="width: 150px" size="mini" v-model="housesForm.acreage"></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="ilb-top">
          <el-form-item label="装修：" prop="fitment">
            <el-select size="mini" v-model="housesForm.fitment" placeholder="请选择">
              <el-option
                v-for="item in fitments"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="楼型：" prop="floorType">
            <el-select size="mini" v-model="housesForm.floorType" placeholder="请选择">
              <el-option
                v-for="item in floorTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="ilb-top">
          <el-form-item label="开盘时间：" prop="openTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              size="mini"
              v-model="housesForm.openTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="交房时间：" prop="finishTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              size="mini"
              v-model="housesForm.finishTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="ilb-top">
          <el-form-item label="占地面积：" prop="floorSpace">
            <el-input style="width: 150px" size="mini" v-model="housesForm.floorSpace"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="规划户数：" prop="planNum">
            <el-input style="width: 150px" size="mini" v-model="housesForm.planNum"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="容积率：" prop="plotRatio">
            <el-input style="width: 150px" size="mini" v-model="housesForm.plotRatio"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="绿化率：" prop="greetingRate">
            <el-input style="width: 150px" size="mini" v-model="housesForm.greetingRate"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="车位占比：" prop="carport">
            <el-input style="width: 150px" size="mini" v-model="housesForm.carport"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="物业公司：" prop="management">
            <el-input style="width: 200px" size="mini" v-model="housesForm.managementCompany"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="物业费用：" prop="management">
            <el-input style="width: 150px" size="mini" v-model="housesForm.managementPrice"></el-input>
            <span class="form-label">元/月*m2</span>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="楼盘亮点：" prop="lightspot">
        <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.lightspot"></el-input>
      </el-form-item>
      <el-form-item label="周边介绍：" prop="rim">
        <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.rim"></el-input>
      </el-form-item>
      <el-form-item label="楼盘封面：" prop="coverImg">
        <el-upload
          :headers="headers"
          :data="uploadData"
          style="display: inline-block;"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="housesForm.imageUrl" :src="housesForm.coverImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">支持jpg/jpeg/png格式图片，大小不超过2M，建议图片比例为5:3</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { initUpload } from '../../../src/assets/services/manage-service'
export default {
  name: 'add-houses',
  data () {
    return {
      headers: {
        AdminAuthorization: sessionStorage.getItem('ticket')
      },
      // 装修类型
      uploadUrl: '',
      uploadData: {},
      fitments: [
        {
          value: '1',
          label: '毛坯房'
        },
        {
          value: '2',
          label: '精装修'
        }
      ],
      // 楼型
      floorTypes: [
        {
          value: '1',
          label: '高层'
        },
        {
          value: '2',
          label: '小高层'
        },
        {
          value: '3',
          label: '洋房'
        },
        {
          value: '4',
          label: '别墅'
        },
        {
          value: '5',
          label: '写字楼'
        },
        {
          value: '6',
          label: '商铺'
        }
      ],
      houseTypes: [
        {
          value: '0',
          label: '新房'
        },
        {
          value: '1',
          label: '二手房'
        }
      ],
      houseStatus: [
        {
          value: '1',
          label: '热销中'
        },
        {
          value: '2',
          label: '即将开盘'
        },
        {
          value: '3',
          label: '已售罄'
        }
      ],
      housesForm: {
        name: '',
        price: '',
        type: '', // 楼盘类型
        status: '', // 楼盘状态
        desc: '', // 简介
        tags: '', // 楼盘标签
        feature: '', // 楼盘特色
        buildingType: '', // 建筑类型
        standard: '', // 装修标准
        limit: '', // 产权年限
        developer: '', // 开发商
        mainType: '', // 主力户型
        acreage: '', // 建筑面积
        fitment: '', // 装修
        floorType: '', // 楼型
        openTime: '', // 开盘时间
        finishTime: '', // 交房时间
        floorSpace: '', // 占地面积
        planNum: '', // 规划户数
        plotRatio: '', // 容积率
        greetingRate: '', // 绿化率
        carport: '', // 车位占比
        managementCompany: '', // 物业公司
        managementPrice: '', // 物业费用
        lightspot: '', // 楼盘亮点
        rim: '', // 周边介绍
        coverImg: '' // 封面
      }
    }
  },
  computed: {
    titleText () {
      const title = {
        add: '新增楼盘',
        edit: '编辑楼盘',
        preview: '预览楼盘'
      }
      return title[this.$route.query.tag || 'add']
    }
  },
  mounted () {},
  methods: {
    handleAvatarSuccess (res, file) {
      console.log(res)
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      // this.courseForm.imageUrl = URL.createObjectURL(file.raw)
      this.housesForm.coverImg = res.data.path
      // this.$refs['housesForm'].clearValidate('imageUrl')
    },
    async beforeAvatarUpload (file) {
      let { data } = await initUpload()
      this.uploadUrl = data.file_server
      this.uploadData.file_init = data.file_init
      this.uploadData.file_token = data.file_token
      this.uploadData.Filedata = file
      console.log(data)
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isLt500K = file.size / 1024 < 500
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error('上传微课封面只能是 JPG/PNG/JPEG 格式!')
        return false
      }
      if (!isLt500K) {
        this.$message.error('上传微课封面大小不能超过 500kb!')
        return false
      }
      return (isJPG || isPNG || isJPEG) && isLt500K
    }
  }
}
</script>

<style lang="stylus">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.form-item-hint-text {
  color #606266
}
.add-houses-page {
  .ilb-top {
    display inline-block
    vertical-align top
  }
  .el-form-item {
    margin-bottom 10px
  }
  .form-label {
    margin-left 10px
    color #606266
  }
}
</style>
