<template>
  <div class="add-houses-page">
    <div class="content-title">{{titleText}}</div>
    <el-form :disabled="$route.query.tag === 'preview'" :rules="rules" ref="housesForm" :model="housesForm" label-width="130px">
      <div class="form-divide-title">楼盘信息</div>
      <el-form-item label="楼盘推广名称：" prop="name">
        <el-input style="width: 400px" size="mini" v-model="housesForm.name"></el-input>
      </el-form-item>
      <el-form-item label="楼盘注册名称：" prop="zhuceming">
        <el-input style="width: 400px" size="mini" v-model="housesForm.zhuceming"></el-input>
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
            <el-input style="width: 150px" size="mini" v-model="housesForm.standard"></el-input>
            <!-- <span class="form-label">元/m2</span> -->
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
            <el-input style="width: 300px" placeholder="多个建筑面积请以英文逗号“,”分开" size="mini" v-model="housesForm.acreage"></el-input>
            <span class="form-label">m2</span>
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
            <el-select style="width: 400px;" size="mini" multiple v-model="housesForm.floorType" placeholder="请选择">
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
          <el-form-item label="最新开盘时间：" prop="openTime">
            <el-input style="width: 150px" size="mini" v-model="housesForm.openTime"></el-input>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="最近交房时间：" prop="finishTime">
            <el-input style="width: 150px" size="mini" v-model="housesForm.finishTime"></el-input>
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
          <el-form-item label="总建面积：" prop="zongjianmianji">
            <el-input style="width: 150px" type="number" size="mini" v-model="housesForm.zongjianmianji"></el-input>
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
            <el-input style="width: 150px" size="mini" v-model="housesForm.managementPrice"></el-input>
            <span class="form-label">元/月*m2</span>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="ilb-top">
          <el-form-item label="土拍时间：" prop="tupaishijian">
            <el-date-picker
              value-format="yyyy-MM-dd"
              size="mini"
              v-model="housesForm.tupaishijian"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="土拍价格：" prop="tupaijiage">
            <el-input style="width: 150px" type="number" size="mini" v-model="housesForm.tupaijiage"></el-input>
            <span class="form-label">亿</span>
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="楼面地价：" prop="loumiandijia">
            <el-input style="width: 150px" type="number" size="mini" v-model="housesForm.loumiandijia"></el-input>
            <span class="form-label">元/m2</span>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="楼盘亮点：" prop="lightspot">
        <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.lightspot"></el-input>
      </el-form-item>

      <el-form-item label="楼盘活动：" prop="marketHouseList">
        <el-select
          style="width: 400px;"
          size="mini"
          v-model="housesForm.marketHouseList"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入楼盘活动关键词"
          :remote-method="remoteMethod"
          :loading="haLoading"
        >
          <el-option
            v-for="item in houseActivity"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      
      <!-- <el-form-item label="周边介绍：" prop="rim">
        <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.rim"></el-input>
      </el-form-item> -->
      <div class="ilb-top">
        <el-form-item label="市政基建：" prop="municipalInfrastructure">
          <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.municipalInfrastructure"></el-input>
        </el-form-item>
      </div>
      <div class="ilb-top">
        <el-form-item label="商圈消费：" prop="businessCircle">
          <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.businessCircle"></el-input>
        </el-form-item>
      </div>
      <div class="ilb-top">
        <el-form-item label="交通配套：" prop="transportFacilities">
          <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.transportFacilities"></el-input>
        </el-form-item>
      </div>
      <div class="ilb-top">
        <el-form-item label="周边学校：" prop="aroundSchools">
          <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.aroundSchools"></el-input>
        </el-form-item>
      </div>
      <div class="ilb-top">
        <el-form-item label="医疗健康：" prop="healthCare">
          <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.healthCare"></el-input>
        </el-form-item>
      </div>
      <div class="ilb-top">
        <el-form-item label="其他：" prop="other">
          <el-input style="width: 400px" type="textarea" resize="none" size="mini" v-model="housesForm.other"></el-input>
        </el-form-item>
      </div>
      
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
        <div class="form-item-hint-text"><span v-if="$route.query.tag === 'edit'">点击图片修改封面，</span>支持jpg/jpeg/png格式图片，大小不超过1M，建议尺寸：336 * 256 </div>
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
        <div class="form-item-hint-text">最多上传6张图片，支持jpg/jpeg/png格式图片，大小不超过1M，建议尺寸：336 * 256</div>
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
        <div class="form-item-hint-text">最多上传6张图片，支持jpg/jpeg/png格式图片，大小不超过1M，建议尺寸：336 * 256</div>
      </el-form-item>

      <el-form-item label="周边配套图：" prop="addAmbitusImgs">
        <el-upload
          v-if="$store.state.uploadUrl"
          :headers="$store.state.uploadHeaders"
          :data="$store.state.uploadData"
          list-type="picture-card"
          :name="'Filedata'"
          style="display: inline-block;"
          class="avatar-uploader"
          :limit="6"
          :on-success="uploadAmbitusImgSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="removeAmbitusImg"
          :file-list="housesForm.addAmbitusImgs"
          :action="$store.state.uploadUrl">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="form-item-hint-text">最多上传6张图片，支持jpg/jpeg/png格式图片，大小不超过1M，建议尺寸：336 * 256</div>
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
        <div class="form-item-hint-text"><span v-if="$route.query.tag === 'edit'">点击图片修改封面，</span>支持jpg/jpeg/png格式图片，大小不超过1M，建议尺寸：260 * 350</div>
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
            <span class="form-label" v-if="housesForm.revenueCommissionType !== ''">{{housesForm.revenueCommissionType ? '元' : '%'}}</span>
          </el-form-item>
        </div>
      </div>
      <div class="form-divide-title">分销设置：</div>
      <el-form-item label="是否支持分销：" prop="distribution">
        <el-radio-group v-model="housesForm.distribution" @change="handleChangeDistribution">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="分销佣金类别：" prop="distributionType" v-if="housesForm.distribution !== 0">
        <el-radio-group v-model="housesForm.distributionType">
          <el-radio :label="0">百分比金额</el-radio>
          <el-radio :label="1">固定金额</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <div v-if="housesForm.distribution !== 0">
        <div class="ilb-top">
          <el-form-item label="1级佣金：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.level1"></el-input>
            <!-- <span class="form-label" v-if="housesForm.distributionType !== ''">{{housesForm.distributionType ? '元' : '%'}}</span> -->
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="2级佣金：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.level2"></el-input>
            <!-- <span class="form-label" v-if="housesForm.distributionType !== ''">{{housesForm.distributionType ? '元' : '%'}}</span> -->
          </el-form-item>
        </div>
        <div class="ilb-top">
          <el-form-item label="3级佣金：" prop="">
            <el-input style="width: 100px" size="mini" v-model="housesForm.level3"></el-input>
            <!-- <span class="form-label" v-if="housesForm.distributionType !== ''">{{housesForm.distributionType ? '元' : '%'}}</span> -->
          </el-form-item>
        </div>
        <div class="warn" style="padding-left: 20px;">合计：计算3级佣金或佣金比例总和，注意，佣金比例是根据实际放款计算</div>
      </div>
      <el-form-item label="置业顾问：" prop="editadviseridList">
        <el-select
          style="width: 400px;"
          size="mini"
          v-model="housesForm.editadviseridList"
          filterable
          remote
          multiple
          reserve-keyword
          placeholder="请选择置业顾问"
          :remote-method="fetchUsers">
          <el-option
            v-for="item in options"
            :key="item.uid"
            :label="item.account"
            :value="item.uid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="楼盘驻守：" prop="hotline">
        <el-input style="width: 400px" size="mini" v-model="housesForm.hotline"></el-input>
      </el-form-item>

      <div class="form-divide-title">楼盘状态：</div>
      <el-form-item label="上下架：" prop="distributionType">
        <el-radio-group v-model="housesForm.state">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input style="width: 100px" size="mini" type="number" v-model="housesForm.sort"></el-input>
        <span class="form-item-hint-text" style="margin-left: 10px;">数字越大，优先级越高；如优先级相同，则根据创建时间排序</span>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="submitting" size="mini" type="primary" @click="handleSubmit">确定</el-button>
        <el-button size="mini" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchArea, editHouse, fetchHouseItem, fetchAllUsers,fetchAlllStaff, fetchMarkethouse } from '../../../src/assets/services/manage-service'
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
        editadviseridList: [{ required: true, message: '请选择置业顾问', trigger: 'change' }],
        intro: [{ required: true, message: '请输入楼盘简介', trigger: 'blur' }],
        address: [{ required: true, message: '请输入楼盘详细地址', trigger: 'blur' }],
        coverImg: [{ required: true, message: '请上传楼盘封面' }],
        revenueCommission: [{ required: true, message: '请输入佣金设置', trigger: 'blur' }],
        tags: [
          {
            validator: (rule, value, callback) => {
              console.log(value)
              value = value.replace(/，/g, ',')
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
      options: [],
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
        },
        {
          value: 7,
          label: '公寓'
        },
        {
          value: 8,
          label: '厂房'
        },
        {
          value: 10,
          label: '车位'
        },
        {
          value: 9,
          label: '其他'
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
          value: 4,
          label: '在售｜即将加推'
        },
        {
          value: 5,
          label: '即将首开'
        },
        {
          value: 2,
          label: '即将开盘'
        },
        {
          value: 6,
          label: '即将售罄'
        },
        {
          value: 3,
          label: '售罄'
        }
      ],
      housesForm: {
        zhuceming: '', // 注册名
        tupaishijian: '', // 土拍时间
        tupaijiage: '',
        loumiandijia: '',
        name: '', // 楼盘名称
        price: '', // 定价
        status: '', // 楼盘状态
        type: '', // 楼盘类型
        intro: '', // 简介
        tags: '', // 楼盘标签
        feature: '', // 楼盘特色
        buildingType: '', // 建筑类型
        standard: '', // 装修标准
        propertyYears: '', // 产权年限
        developer: '', // 开发商
        mainType: '', // 主力户型
        acreage: '', // 建筑面积
        fitment: '', // 装修
        floorType: [], // 楼型
        openTime: '', // 开盘时间
        finishTime: '', // 交房时间
        floorSpace: '', // 占地面积
        zongjianmianji: '', // 总建面积
        planNum: '', // 规划户数
        plotRatio: '', // 容积率
        greetingRate: '', // 绿化率
        carport: '', // 车位占比
        managementCompany: '', // 物业公司
        managementPrice: '', // 物业费用
        lightspot: '', // 楼盘亮点
        rim: '', // 周边介绍
        coverImg: null, // 封面
        shareImg: null, // 分享封面图
        province: '', // 省id
        city: '', // 市id
        region: '', // 区id
        address: '', // 楼盘具体地址
        lng: '', // 经度
        lat: '', // 纬度
        revenueCommissionType: '', // 营收佣金类别
        revenueCommission: '', // 佣金设置
        editadviseridList: [], // 置业顾问id
        sort: '', // 排序
        state: '', // 上下架
        hot: '',
        addRealImgs: [], // 实景图
        delRealImgs: [],
        addRenderImgs: [], // 效果图
        delRenderImgs: [],
        addAmbitusImgs: [], // 周边配套图
        delAmbitusImgs: [],
        distribution: '', // 是否支持分销
        // distributionType: '', // 分销佣金类别
        level1: '', // 一级佣金比例
        level2: '', // 二级佣金比例
        level3: '', // 三级佣金比例
        houseLocation: [],
        municipalInfrastructure: '', // 市政基建（新增字段）
        businessCircle: '', // 商圈消费（新增字段）
        transportFacilities: '', // 交通配套（新增字段）
        aroundSchools: '', // 周边学校（新增字段）
        healthCare: '', // 医疗健康（新增字段）
        other: '', // 其他
        marketHouseList: [],
        hotline: '' // 楼盘驻守
      },
      map: null,
      houseActivity: [],
      haLoading: false
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
  watch: {
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
      // this.fetchUsers()
    }
    this.$store.dispatch('initUpload')
  },
  methods: {
    fetchUsers (query) {
      fetchAlllStaff({
        account: query
      }).then(({ data }) => {
        this.options = data.items
      })
    },
    handleChangeDistribution (val) {
      console.log(val)
      if (!val) {
        this.housesForm.distributionType = ''
        this.housesForm.level1 = ''
        this.housesForm.level2 = ''
        this.housesForm.level3 = ''
      }
    },
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
          // console.log(item)
          if (item === 'floorType') {
            let arr = data.floorType.split(',')
            arr.forEach(val => {
              if (val) {
                this.housesForm.floorType.push(val / 1)
              }
            })
          } else if (item === 'coverImg') {
            this.housesForm.coverImg = {
              filename: data.coverImg,
              filepath: data.coverImageLink
            }
          } else if (item === 'shareImg' && data.shareImg) {
            this.housesForm.shareImg = {
              filename: data.shareImg || '',
              filepath: data.shareImageLink || ''
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
          } else if (item === 'addAmbitusImgs') {
            data.ambitusImgList.forEach(img => {
              this.housesForm.addAmbitusImgs.push({
                name: img.filename,
                url: img.filepath
              })
            })
          } else if (item === 'marketHouseList') {
            data.marketHouseList.forEach(item => {
              this.houseActivity.push({
                id: item.markethouseid,
                name: item.name
              })
              this.housesForm.marketHouseList.push(item.markethouseid)
            })
          } else if (item === 'editadviseridList') {
            console.log(1111)
            data.adviseridList.forEach(item => {
              this.options.push(item)
              this.housesForm.editadviseridList.push(item.uid)
            })
          } else if (item !== 'houseLocation') {
            this.housesForm[item] = data[item]
          }
          this.housesForm.delRealImgs = []
          this.housesForm.delRenderImgs = []
          this.housesForm.delAmbitusImgs = []
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
    uploadAmbitusImgSuccess (res, file, fileList) {
      this.housesForm.addAmbitusImgs = fileList
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
    removeAmbitusImg (file, fileList) {
      console.log(file, fileList)
      if (!this.$route.query.tag) {
        this.housesForm.addAmbitusImgs = fileList
      } else {
        if (!file.response && !this.housesForm.delAmbitusImgs.includes(file.name)) {
          this.housesForm.delAmbitusImgs.push(file.name)
        }
      }
    },
    beforeAvatarUpload (file) {
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
    handleSubmit () {
      if (this.submitting) {
        return
      }
      this.submitting = true
      this.$refs['housesForm'].validate((valid) => {
        if (valid) {
          let housesForm = JSON.parse(JSON.stringify(this.housesForm))
          let _marketHouseList = []
          housesForm.marketHouseList.forEach(item => {
            _marketHouseList.push({
              markethouseid: item
            })
          })
          housesForm.marketHouseList = _marketHouseList
          housesForm.floorType = housesForm.floorType.join(',')
          // 编辑背景图
          housesForm.coverImg = housesForm.coverImg.filename
          // 编辑分享图片
          if (housesForm.shareImg) {
            housesForm.shareImg = housesForm.shareImg.filename
          } else {
            housesForm.shareImg = ''
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
          // 新增周边配套图
          let addAmbitusImgs = []
          housesForm.addAmbitusImgs.forEach(item => {
            if (item.response) {
              addAmbitusImgs.push(item.response.filename)
            }
          })
          housesForm.addAmbitusImgs = addAmbitusImgs

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
    },
    remoteMethod (query) {
      console.log(query)
      if (query !== '') {
        this.haLoading = true
        fetchMarkethouse({
          name: query,
          pageSize: 20,
          pageNo: 1
        }).then(({ data }) => {
          this.houseActivity = data.items
          this.haLoading = false
        })
      } else {
        this.houseActivity = []
      }
    },
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
    height 100%
  }
}
</style>
