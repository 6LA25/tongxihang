<template>
  <div class="add-houses-page">
    <div class="content-title">{{titleText}}</div>
    <el-form :disabled="$route.query.tag === 'preview'" :rules="rules" ref="housesForm" :model="housesForm" label-width="130px">
      <div class="form-divide-title">楼盘信息</div>
      <el-form-item label="楼盘名称：" prop="name">
        <el-input style="width: 400px" size="mini" v-model="housesForm.name"></el-input>
      </el-form-item>
      <el-form-item label="定价：" prop="price">
        <el-input style="width: 400px" size="mini" type="number" v-model="housesForm.price"></el-input>
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
      <el-form-item label="楼盘简介：" prop="intro">
        <el-input type="textarea" style="width: 400px" size="mini" resize="none" v-model="housesForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="楼盘标签：" prop="tags">
        <el-input type="textarea" placeholder="多个标签请以英文逗号“,”分开，最多填写3个标签，每个标签不超过5个汉字" style="width: 400px" size="mini" resize="none" v-model="housesForm.tags"></el-input>
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
            <el-input style="width: 150px" size="mini" type="number" v-model="housesForm.standard"></el-input>
            <span class="form-label">元/m2</span>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="产权年限：" prop="propertyYears">
            <el-input style="width: 150px" type="number" size="mini" v-model="housesForm.propertyYears"></el-input>
            <span class="form-label">年</span>
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
            <el-input style="width: 150px" type="number" size="mini" v-model="housesForm.floorSpace"></el-input>
             <span class="form-label">m2</span>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="规划户数：" prop="planNum">
            <el-input style="width: 150px" size="mini" type="number" v-model="housesForm.planNum"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="容积率：" prop="plotRatio">
            <el-input style="width: 150px" size="mini" type="number" v-model="housesForm.plotRatio"></el-input>
            <span class="form-label">%</span>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="绿化率：" prop="greetingRate">
            <el-input style="width: 150px" type="number" size="mini" v-model="housesForm.greetingRate"></el-input>
            <span class="form-label">%</span>
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
            <el-input style="width: 150px" type="number" size="mini" v-model="housesForm.managementPrice"></el-input>
            <span class="form-label">元/月*m2</span>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="楼盘亮点：" prop="lightspot">
        <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.lightspot"></el-input>
      </el-form-item>
      <el-form-item label="周边介绍：" prop="rim">
        <el-input style="width: 400px" placeholder="请用英文逗号','分隔周边信息" type="textarea" resize="none" size="mini" v-model="housesForm.rim"></el-input>
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
          <img v-if="housesForm.coverImg" :src="housesForm.coverImg.filepath" class="cover-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      <el-form-item label="实景图：" prop="addRealImgs">
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
          :file-list="housesForm.addRealImgs"
          :action="$store.state.uploadUrl">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">最多上传6张图片，支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      <el-form-item label="效果图：" prop="addRenderImgs">
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
          :file-list="housesForm.addRenderImgs"
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
          <img v-if="housesForm.shareImg" :src="housesForm.shareImg.filepath" class="cover-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      <div class="form-divide-title">楼盘位置</div>
      <el-form-item label="楼盘所属区域：" prop="region">
        <el-select @change="handleSelectProvince" style="margin-right: 20px;" size="mini" v-model="housesForm.province" placeholder="请选择省（市）">
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select @change="handleSelectCity" style="margin-right: 20px;" size="mini" v-model="housesForm.city" placeholder="请选择市">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select style="margin-right: 20px;" size="mini" v-model="housesForm.region" placeholder="请选择区（市）">
          <el-option
            v-for="item in regionList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="楼盘详细地址：" prop="address">
        <el-input type="textarea" style="width: 400px;" size="mini" placeholder="请在此填写详细地址" resize="none" v-model="housesForm.address"></el-input>
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
          <el-form-item label="营收佣金类型：" prop="revenueCommissionType">
            <el-radio-group v-model="housesForm.revenueCommissionType">
              <el-radio :label="0">百分比金额</el-radio>
              <el-radio :label="1">固定金额</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="佣金设置：" prop="revenueCommission">
            <el-input style="width: 100px" type="number" size="mini" v-model="housesForm.revenueCommission"></el-input>
            <span class="form-label">{{housesForm.revenueCommissionType ? '元' : '%'}}</span>
          </el-form-item>
        </div>
      </div>
      <div class="form-divide-title">分销设置：</div>
      <el-form-item label="是否支持分销：" prop="distribution">
        <el-radio-group v-model="housesForm.distribution">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分销佣金类别：" prop="distributionType">
        <el-radio-group v-model="housesForm.distributionType">
          <el-radio :label="0">百分比金额</el-radio>
          <el-radio :label="1">固定金额</el-radio>
        </el-radio-group>
      </el-form-item>
      <div>
        <div class="ilb-top">
          <el-form-item label="1级佣金比例：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.level1"></el-input>
            <span class="form-label">{{housesForm.distributionType ? '元' : '%'}}</span>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="2级佣金比例：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.level2"></el-input>
            <span class="form-label">{{housesForm.distributionType ? '元' : '%'}}</span>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="3级佣金比例：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.level3"></el-input>
            <span class="form-label">{{housesForm.distributionType ? '元' : '%'}}</span>
          </el-form-item>
        </div>
        <div class="warn" style="padding-left: 20px;">合计：计算3级佣金或佣金比例总和，注意，佣金比例是根据实际放款计算</div>
      </div>
      <el-form-item label="置业顾问：" prop="adviser">
        <el-select size="mini" v-model="housesForm.adviser" placeholder="请选择置业顾问">
          <el-option label="张三" :value="1"></el-option>
          <el-option label="李四" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class="form-divide-title">楼盘状态：</div>
      <el-form-item label="上下架：" prop="distributionType">
        <el-radio-group v-model="housesForm.state">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
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
import { fetchArea, editHouse, fetchHouseItem } from '../../../src/assets/services/manage-service'
export default {
  name: 'add-houses',
  data () {
    return {
      submitting: false,
      rules: {
        name: [{ required: true, message: '请输入楼盘名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入楼盘定价', trigger: 'blur' }],
        type: [{ required: true, message: '请选择楼盘类型', trigger: 'change' }],
        status: [{ required: true, message: '请选择楼盘状态', trigger: 'change' }],
        region: [{ required: true, message: '请选择楼盘所属区域', trigger: 'change' }],
        adviser: [{ required: true, message: '请选择置业顾问', trigger: 'change' }],
        intro: [{ required: true, message: '请输入楼盘简介', trigger: 'blur' }],
        address: [{ required: true, message: '请输入楼盘详细地址', trigger: 'blur' }],
        coverImg: [{ required: true, message: '请上传楼盘封面' }],
        revenueCommission: [{ required: true, message: '请输入佣金设置', trigger: 'blur' }],
        tags: [
          {
            validator: (rule, value, callback) => {
              let _err = false
              let tags = value.split(',')
              if (tags.length > 3) { _err = true }
              tags.forEach(tag => {
                if (tag.length > 5) {
                  _err = true
                }
              })
              if (_err) {
                callback(new Error('请输入正确格式的标签'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      provinceList: [], // 省
      cityList: [],
      regionList: [],
      // 装修类型
      fitments: [
        {
          value: 1,
          label: '毛坯房'
        },
        {
          value: 2,
          label: '精装修'
        }
      ],
      // 楼型
      floorTypes: [
        {
          value: 1,
          label: '高层'
        },
        {
          value: 2,
          label: '小高层'
        },
        {
          value: 3,
          label: '洋房'
        },
        {
          value: 4,
          label: '别墅'
        },
        {
          value: 5,
          label: '写字楼'
        },
        {
          value: 6,
          label: '商铺'
        }
      ],
      houseTypes: [
        {
          value: 1,
          label: '新房'
        },
        {
          value: 2,
          label: '二手房'
        }
      ],
      houseStatus: [
        {
          value: 1,
          label: '热销中'
        },
        {
          value: 2,
          label: '即将开盘'
        },
        {
          value: 3,
          label: '已售罄'
        }
      ],
      housesForm: {
        name: '协信未来城', // 楼盘名称
        price: 22000, // 定价
        status: 1, // 楼盘状态
        type: 1, // 楼盘类型
        intro: '相当不错的房子', // 简介
        tags: '很好,大方,美丽', // 楼盘标签
        feature: '这是特色文字', // 楼盘特色
        buildingType: '混凝土', // 建筑类型
        standard: 2000, // 装修标准
        propertyYears: 70, // 产权年限
        developer: '启迪', // 开发商
        mainType: '80平小户型', // 主力户型
        acreage: '70', // 建筑面积
        fitment: 2, // 装修
        floorType: 1, // 楼型
        openTime: '2020-03-03', // 开盘时间
        finishTime: '2020-04-03', // 交房时间
        floorSpace: 200000, // 占地面积
        planNum: 1000, // 规划户数
        plotRatio: 2.1, // 容积率
        greetingRate: 2.1, // 绿化率
        carport: '1:2', // 车位占比
        managementCompany: '好的公司', // 物业公司
        managementPrice: 2.32, // 物业费用
        lightspot: '亮点非常大', // 楼盘亮点
        rim: '好的，不错，东西多', // 周边介绍
        coverImg: null, // 封面
        shareImg: null, // 分享封面图
        province: '', // 省id
        city: '', // 市id
        region: '', // 区id
        address: '', // 楼盘具体地址
        lng: '', // 经度
        lat: '', // 纬度
        revenueCommissionType: 0, // 营收佣金类别
        revenueCommission: 1, // 佣金设置
        adviser: 1, // 置业顾问id
        sort: '', // 排序
        state: '', // 上下架
        hot: '',
        addRealImgs: [], // 实景图
        delRealImgs: [],
        addRenderImgs: [], // 效果图
        delRenderImgs: [],
        distribution: 1, // 是否支持分销
        distributionType: 0, // 分销佣金类别
        level1: 1.1, // 一级佣金比例
        level2: 2.1, // 二级佣金比例
        level3: 3.1, // 三级佣金比例
        houseLocation: []
        // houseLocation: [
        //   { id: 10, initials: 'J', name: '江苏', parent: 0 },
        //   { id: 109, initials: 'W', name: '无锡', parent: 10 },
        //   { id: 1135, initials: 'B', name: '滨湖区', parent: 109 }
        // ] // 楼盘位置
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
  created () {
  },
  mounted () {
    this.map = new qq.maps.Map(document.getElementById('mapContainer'), {
      // center: new qq.maps.LatLng(4.397, 150.644),
      zoom: 13
    })
    fetchArea({ parent: '' }).then(({ data }) => {
      this.provinceList = data.items
    })
    if (this.$route.query.tag === 'edit' || this.$route.query.tag === 'preview') {
      this.getHouseaItem()
    }
    this.$store.dispatch('initUpload')
  },
  methods: {
    handleSelectProvince (val) {
      console.log(val)
      this.housesForm.city = ''
      this.housesForm.region = ''
      fetchArea({ parent: val }).then(({ data }) => {
        this.cityList = data.items
      })
    },
    handleSelectCity (val) {
      this.housesForm.region = ''
      fetchArea({ parent: val }).then(({ data }) => {
        this.regionList = data.items
      })
    },
    getHouseaItem () {
      fetchHouseItem({ id: this.$route.query.id }).then(({ data }) => {
        Object.keys(this.housesForm).forEach(item => {
          if (item === 'coverImg') {
            this.housesForm.coverImg = {
              filename: data.coverImg,
              filepath: data.coverImageLink
            }
          } else if (item === 'shareImg') {
            this.housesForm.shareImg = {
              filename: data.shareImg,
              filepath: data.shareImageLink
            }
          } else if (item === 'addRealImgs') {
            data.realImgList.forEach(img => {
              this.housesForm.addRealImgs.push({
                name: img.filename,
                url: img.filepath
              })
            })
          } else if (item === 'addRenderImgs') {
            data.renderImgList.forEach(img => {
              this.housesForm.addRenderImgs.push({
                name: img.filename,
                url: img.filepath
              })
            })
          } else if (item !== 'houseLocation') {
            this.housesForm[item] = data[item]
          }
          this.housesForm.delRealImgs = []
          this.housesForm.delRenderImgs = []
        })
        fetchArea({ parent: this.housesForm.province }).then(({ data }) => {
          this.cityList = data.items
          fetchArea({ parent: this.housesForm.city }).then(({ data }) => {
            this.regionList = data.items
            this.$nextTick(() => {
              this.handleCheckInMap()
            })
          })
        })
      }).catch(error => {
        console.log(error)
      })
    },
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
      let province = this.provinceList.find(item => {
        return item.id === this.housesForm.province
      })
      let city = this.cityList.find(item => {
        return item.id === this.housesForm.city
      })
      let region = this.regionList.find(item => {
        return item.id === this.housesForm.region
      })
      // let address = `${areas.join(',')},${this.housesForm.address}`
      let address = `${province.name},${city.name},${region.name},${this.housesForm.address}`
      geocoder.getLocation(address)
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      this.$refs['housesForm'].clearValidate('coverImg')
      // this.housesForm.coverImg = res.http_path
      this.housesForm.coverImg = {
        filename: res.filename,
        filepath: res.http_path
      }
    },
    uploadShareImgSuccess (res, file) {
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      // this.housesForm.shareImg = res.http_path
      this.housesForm.shareImg = {
        filename: res.filename,
        filepath: res.http_path
      }
    },
    uploadRealImgSuccess (res, file, fileList) {
      console.log(fileList)
      this.housesForm.addRealImgs = fileList
    },
    removeRealImg (file, fileList) {
      console.log(file, fileList)
      if (!this.$route.query.tag) {
        this.housesForm.addRealImgs = fileList
      } else {
        if (!file.response && !this.housesForm.delRealImgs.includes(file.name)) {
          this.housesForm.delRealImgs.push(file.name)
        }
      }
    },
    uploadRenderImgSuccess (res, file, fileList) {
      console.log(fileList)
      this.housesForm.addRenderImgs = fileList
    },
    removeRenderImg (file, fileList) {
      console.log(file, fileList)
      if (!this.$route.query.tag) {
        this.housesForm.addRenderImgs = fileList
      } else {
        if (!file.response && !this.housesForm.delRenderImgs.includes(file.name)) {
          this.housesForm.delRenderImgs.push(file.name)
        }
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
      this.$refs['housesForm'].validate((valid) => {
        if (valid) {
          let housesForm = JSON.parse(JSON.stringify(this.housesForm))
          // 编辑背景图
          housesForm.coverImg = housesForm.coverImg.filename
          // 编辑分享图片
          if (housesForm.shareImg) {
            housesForm.shareImg = housesForm.shareImg.filename
          }
          // 编辑新增实景图
          let addRealImgs = []
          housesForm.addRealImgs.forEach(item => {
            if (item.response) {
              addRealImgs.push(item.response.filename)
            }
          })
          housesForm.addRealImgs = addRealImgs
          // 编辑新增效果图
          let addRenderImgs = []
          housesForm.addRenderImgs.forEach(item => {
            if (item.response) {
              addRenderImgs.push(item.response.filename)
            }
          })
          housesForm.addRenderImgs = addRenderImgs

          editHouse({
            ...housesForm,
            id: this.$route.query.id || ''
          }).then((data) => {
            console.log(data)
            this.$message.success('提交成功')
            this.submitting = false
            this.$router.go(-1)
          }).catch(() => {
            this.submitting = false
            this.$message.error('提交失败')
          })
        } else {
          this.submitting = false
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
