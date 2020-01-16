<template>
  <div class="add-houses-page">
    <div class="content-title">{{titleText}}</div>
    <el-form :rules="rules" ref="housesForm" :model="housesForm" label-width="130px">
      <div class="form-divide-title">楼盘信息</div>
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
          <img v-if="housesForm.coverImg" :src="housesForm.coverImg" class="cover-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      <el-form-item label="实景图：" prop="realImg">
        <el-upload
          v-if="$store.state.uploadUrl"
          :headers="$store.state.uploadHeaders"
          :data="$store.state.uploadData"
          list-type="picture-card"
          :name="'Filedata'"
          style="display: inline-block;"
          class="avatar-uploader"
          :limit="6"
          :on-success="uploadRealImgSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="removeRealImg"
          :action="$store.state.uploadUrl">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">最多上传6张图片，支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      <el-form-item label="效果图：" prop="renderImg">
        <el-upload
          v-if="$store.state.uploadUrl"
          :headers="$store.state.uploadHeaders"
          :data="$store.state.uploadData"
          list-type="picture-card"
          :name="'Filedata'"
          style="display: inline-block;"
          class="avatar-uploader"
          :limit="6"
          :on-success="uploadRenderImgSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="removeRenderImg"
          :action="$store.state.uploadUrl">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">最多上传6张图片，支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      <el-form-item label="分享封面图：" prop="shareImg">
        <el-upload
          v-if="$store.state.uploadUrl"
          :headers="$store.state.uploadHeaders"
          :data="$store.state.uploadData"
          :name="'Filedata'"
          style="display: inline-block;"
          class="avatar-uploader"
          :action="$store.state.uploadUrl"
          :show-file-list="false"
          :on-success="uploadShareImgSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="housesForm.shareImg" :src="housesForm.shareImg" class="cover-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      <div class="form-divide-title">楼盘位置</div>
      <el-form-item label="楼盘所属区域：" prop="houseLocation">
        <el-cascader @change="handleChangeArea" :props="location" size="mini" v-model="housesForm.houseLocation"></el-cascader>
      </el-form-item>
      <el-form-item label="楼盘详细地址：" prop="houseAddress">
        <el-input type="textarea" style="width: 400px;" size="mini" placeholder="请在此填写详细地址" resize="none" v-model="housesForm.houseAddress"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="form-item-hint-text">
          经纬度查询：
          <el-button type="primary" size="mini" @click="handleCheckInMap">地图查询</el-button>
        </div>
        <div id="mapContainer" style="margin-top: 10px;width: 800px;height: 400px;"></div>
        <div style="margin-top: 10px;">
          <div style="margin-right: 20px;" class="ilb-top">经度：<el-input disabled style="width: 100px" size="mini" v-model="housesForm.lng"></el-input></div>
          <div class="ilb-top">纬度：<el-input disabled style="width: 100px" size="mini" v-model="housesForm.lat"></el-input></div>
        </div>
      </el-form-item>
      <div class="form-divide-title">营收设置：</div>
      <div>
        <div class="ilb-top">
          <el-form-item label="营收佣金类型：" prop="commissionType">
            <el-radio-group v-model="housesForm.commissionType">
              <el-radio label="百分比金额"></el-radio>
              <el-radio label="固定金额"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="佣金设置：" prop="commissionValue">
            <el-input style="width: 100px" size="mini" v-model="housesForm.commissionValue"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-divide-title">分销设置：</div>
      <el-form-item label="是否支持分销：" prop="isDistribution">
        <el-radio-group v-model="housesForm.isDistribution">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分销佣金类别：" prop="distributionType">
        <el-radio-group v-model="housesForm.distributionType">
          <el-radio :label="true">百分比金额</el-radio>
          <el-radio :label="false">固定金额</el-radio>
        </el-radio-group>
      </el-form-item>
      <div>
        <div class="ilb-top">
          <el-form-item label="1级佣金比例：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.onePer"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="2级佣金比例：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.twoPer"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="3级佣金比例：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.threePer"></el-input>
          </el-form-item>
        </div>
        <div class="warn" style="padding-left: 20px;">合计：计算3级佣金或佣金比例总和，注意，佣金比例是根据实际放款计算</div>
      </div>
      <el-form-item label="置业顾问：" prop="counselor">
        <el-select size="mini" v-model="housesForm.counselor" placeholder="请选择置业顾问">
          <el-option label="张三" value="shanghai"></el-option>
          <el-option label="李四" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <div class="form-divide-title">楼盘状态：</div>
      <el-form-item label="上下架：" prop="distributionType">
        <el-radio-group v-model="housesForm.isPutaway">
          <el-radio :label="true">上架</el-radio>
          <el-radio :label="false">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input style="width: 100px" size="mini" v-model="housesForm.sort"></el-input>
        <span class="form-item-hint-text" style="margin-left: 10px;">数字越大，优先级越高；如优先级相同，则根据创建时间排序</span>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchArea } from '../../../src/assets/services/manage-service'
export default {
  name: 'add-houses',
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入楼盘名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入楼盘定价', trigger: 'blur' }],
        type: [{ required: true, message: '请选择楼盘类型', trigger: 'change' }],
        status: [{ required: true, message: '请选择楼盘状态', trigger: 'change' }],
        houseLocation: [{ required: true, message: '请选择楼盘所属区域', trigger: 'change' }],
        counselor: [{ required: true, message: '请选择置业顾问', trigger: 'change' }],
        desc: [{ required: true, message: '请输入楼盘简介', trigger: 'blur' }],
        houseAddress: [{ required: true, message: '请输入楼盘详细地址', trigger: 'blur' }],
        coverImg: [{ required: true, message: '请上传楼盘封面' }],
        commissionValue: [{ required: true, message: '请输入佣金设置', trigger: 'blur' }]
      },
      // 装修类型
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
        coverImg: '', // 封面
        realImg: [], // 实景图
        renderImg: [], // 效果图
        shareImg: '',
        houseLocation: [], // 楼盘位置
        houseAddress: '', // 楼盘具体地址
        lng: '', // 经度
        lat: '', // 纬度
        commissionType: '', // 营收佣金类别
        isDistribution: '', // 是否支持分销
        distributionType: '', // 分销佣金类别
        onePer: '', // 一级佣金比例
        twoPer: '', // 二级佣金比例
        threePer: '', // 三级佣金比例
        counselor: '', // 置业顾问
        isPutaway: '', // 上下架
        sort: '' // 排序
      },
      location: {
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level } = node
          console.log(level)
          let nodes = []
          let areas = []
          try {
            let { data } = await fetchArea({ parent: level === 0 ? '' : node.value.id })
            areas = data.items
          } catch {}
          areas.forEach(item => {
            nodes.push({
              value: item,
              label: item.name,
              leaf: level >= 2
            })
          })
          resolve(nodes)
        }
      },
      map: null
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
  mounted () {
    this.map = new qq.maps.Map(document.getElementById('mapContainer'), {
      // center: new qq.maps.LatLng(4.397, 150.644),
      zoom: 13
    })
    this.$store.dispatch('initUpload')
  },
  methods: {
    handleCheckInMap () {
      let callbacks = {
        complete: (results) => {
          console.log('res', results)
          this.map.setCenter(results.detail.location)
          this.housesForm.lng = results.detail.location.lng
          this.housesForm.lat = results.detail.location.lat
          // eslint-disable-next-line no-unused-vars
          let marker = new qq.maps.Marker({
            map: this.map,
            position: results.detail.location
          })
        }
      }
      let geocoder = new qq.maps.Geocoder(callbacks)
      let areas = []
      this.housesForm.houseLocation.forEach(item => {
        areas.push(item.name)
      })
      let address = `${areas.join(',')},${this.housesForm.houseAddress}`
      geocoder.getLocation(address)
    },
    handleChangeArea (val) {
      console.log(val)
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      this.$refs['housesForm'].clearValidate('coverImg')
      this.housesForm.coverImg = res.http_path
    },
    uploadShareImgSuccess (res, file) {
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      this.housesForm.shareImg = res.http_path
    },
    uploadRealImgSuccess (res, file, fileList) {
      console.log(fileList)
      this.housesForm.realImg = fileList
    },
    removeRealImg (file, fileList) {
      console.log(file, fileList)
      this.housesForm.realImg = fileList
    },
    uploadRenderImgSuccess (res, file, fileList) {
      console.log(fileList)
      this.housesForm.renderImg = fileList
    },
    removeRenderImg (file, fileList) {
      console.log(file, fileList)
      this.housesForm.renderImg = fileList
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
      this.$refs['housesForm'].validate((valid) => {
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
    }
  }
}
</script>

<style lang="stylus">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  width: 146px;
  height: 146px;
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
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
}
.el-upload-list--picture-card {
  height 146px
}
.add-houses-page {
  .warn {
    color #f56c6c
  }
  .ilb-top {
    display inline-block
    vertical-align top
  }
  .el-form-item {
    margin-bottom 20px
  }
  .form-divide-title {
    padding 10px
  }
  .cover-img {
    width 100%
  }
}
</style>
