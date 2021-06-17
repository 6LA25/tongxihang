<template>
  <div class="add-role-page">
    <div class="content-title">{{ title }}</div>
    <el-form :model="actForm" :rules="rules" ref="actForm" label-width="100px">
      <div class="form-title-box">基础信息</div>
      <el-form-item label="活动名称" prop="name">
        <el-input
          style="width: 400px"
          size="mini"
          v-model="actForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动期限" prop="limit">
        <el-radio-group v-model="actForm.longtype" @change="handleChangeLimit">
          <el-radio :label="1">长期活动</el-radio>
          <el-radio :label="0">截止时间</el-radio>
          <el-date-picker
            :disabled="actForm.longtype === 1"
            value-format="yyyy-MM-dd HH:mm"
            size="mini"
            v-model="actForm.limitTime"
            range-separator="至"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否开启活动" prop="racktype">
        <el-radio-group v-model="actForm.racktype">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <div>
        <span class="form-title-box" style="margin-right: 10px">报名内容</span>
        <el-button type="primary" size="mini" @click="handleAddField"
          >新增字段</el-button
        >
      </div>
      <div class="apply-content-box">
        <el-table
          :data="contentMap"
          tooltip-effect="dark"
          style="width: 100%"
          size="mini"
        >
          <el-table-column
            prop="fieldname"
            label="报名字段"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="required" label="字段设置" min-width="200">
            <template slot-scope="scope">
              <el-checkbox
                :true-label="'1'"
                :false-label="'0'"
                v-model="scope.row.required"
                >必填</el-checkbox
              >
              <el-checkbox
                :true-label="'1'"
                :false-label="'0'"
                @change="handleChangeRequired"
                v-if="scope.row.fieldname === '选购房源'"
                style="margin-right: 10px"
                v-model="scope.row.house"
                >默认房源</el-checkbox
              >
              <el-select
                v-if="scope.row.fieldname === '选购房源'"
                size="mini"
                :disabled="!scope.row.house"
                v-model="scope.row.houseresouce"
                filterable
                remote
                reserve-keyword
                placeholder="请输入完整楼盘名称"
                :remote-method="fetchHouses"
                :loading="searching"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="排序" min-width="100">
            <template slot-scope="scope" v-if="contentMap.length > 1">
              <el-button
                v-if="scope.$index > 0"
                type="primary"
                size="mini"
                @click="handleMoveItem(-1, scope.$index)"
                >上移</el-button
              >
              <el-button
                v-if="scope.$index < contentMap.length - 1"
                type="primary"
                size="mini"
                @click="handleMoveItem(1, scope.$index)"
                >下移</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleDeleteItem(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="template-config-box">
        <div class="form-title-box">模版配置</div>
        <el-form-item label="布局选择" prop="templatekind">
          <el-radio-group v-model="actForm.template.templatekind">
            <el-radio :label="1">上下布局</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="template-select-box">
          <div class="mobile-box">
            <img v-if="actForm.coverImg && actForm.coverImg.filepath" class="bg-img" :src="actForm.coverImg.filepath" alt="">
            <div class="btn-box">
              <div v-if="actForm.template.button.includes('0')" class="btn-item">
                <div>分享好友</div>
              </div>
              <div v-if="actForm.template.button.includes('2')" class="btn-item">
                <div>活动报名</div>
              </div>
              <div v-if="actForm.template.button.includes('1')" class="btn-item">
                <div>联系销售</div>
              </div>
            </div>
          </div>
          <div class="select-box">
            <el-form-item label="上传背景图" prop="coverImg">
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
                  v-if="actForm.coverImg"
                  :src="actForm.coverImg.filepath"
                  class="cover-img"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="form-item-hint-text">
                <span v-if="$route.query.tag === 'edit'"
                  >点击图片修改封面，</span
                >支持jpg/jpeg/png格式图片，大小不超过1M，建议尺寸：336 * 256
              </div>
            </el-form-item>
            <el-form-item label="底部按钮">
              <el-checkbox-group
                v-model="actForm.template.button"
                @change="handleChangebtns"
              >
                <el-checkbox label="0">分享好友</el-checkbox>
                <el-checkbox label="2">活动报名</el-checkbox>
                <el-checkbox label="1">
                  联系销售
                  <el-input
                    :disabled="!actForm.template.button.includes('1')"
                    v-model="actForm.template.salescalls"
                    placeholder="请输入销售电话号码"
                    size="small"
                  ></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
      </div>
      <el-form-item style="margin-top: 20px; text-align: center">
        <el-button
          :disabled="submitting"
          size="normal"
          type="primary"
          @click="handleSubmit"
          >确定</el-button
        >
        <el-button size="normal" @click="handleCancel">取消</el-button>
      </el-form-item>
      <el-dialog
        title="新增报名内容字段"
        width="500px"
        :visible.sync="addDialogVisible"
      >
        <div>
          字段名称<el-input
            size="mini"
            v-model="addContentName"
            style="width: 300px; margin-left: 10px"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirmAdd" size="mini"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import {
  fetchHouseList,
  editMarketRegister,
  fetchMarketRegisterItem,
} from '../../assets/services/manage-service'
export default {
  name: 'add-apply-act',
  data() {
    return {
      submitting: false,
      searching: false,
      options: [],
      addDialogVisible: false,
      addContentName: '',
      contentMap: [],
      actForm: {
        name: '',
        longtype: '',
        limitTime: [],
        racktype: '',
        coverImg: null,
        template: {
          templatekind: 1,
          background: '',
          button: [],
          share: '',
          salescalls: '',
        },
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        coverImg: [{ required: true, message: '请上传背景面' }],
      },
    }
  },
  computed: {
    title() {
      let titleObj = {
        add: '新增',
        edit: '编辑',
      }
      return `${titleObj[this.$route.query.flag]}报名活动`
    },
  },
  watch: {
    addDialogVisible(nv) {
      if (!nv) {
        this.addContentName = ''
      }
    },
  },
  mounted() {
    this.$store.dispatch('initUpload')
    if (this.$route.query.flag === 'edit') {
      fetchMarketRegisterItem({
        id: this.$route.query.id,
      }).then(({ data }) => {
        this.contentMap = this._lodash.sortBy(data.contentMap.list, (item) => {
          return item.sort
        })
        // this.contentMap = data.contentMap.list
        this.actForm.name = data.name
        this.actForm.longtype = data.longtype
        this.actForm.racktype = data.racktype
        if (data.longtype / 1 === 0) {
          this.$set(
            this.actForm.limitTime,
            0,
            moment(data.starttime).format('YYYY-MM-DD HH:mm')
          )
          this.$set(
            this.actForm.limitTime,
            1,
            moment(data.endtime).format('YYYY-MM-DD HH:mm')
          )
        }
        this.actForm.coverImg = {
          filepath: data.template.background,
        }
        this.actForm.template.background = data.template.background
        this.actForm.template.button = data.template.button.split(',')
        this.actForm.template.salescalls = data.template.salescalls
        this.actForm.template.share = data.template.share
      })
    } else {
      this.contentMap = [
        {
          fieldname: '姓名',
          required: '0',
          sort: 1,
        },
        {
          fieldname: '手机号',
          required: '0',
          sort: 2,
        },
        {
          fieldname: '选购房源',
          required: '0',
          houseresouce: '',
          house: '0',
          sort: 3,
        },
      ]
    }
  },
  methods: {
    handleAddField() {
      this.addDialogVisible = true
    },
    handleConfirmAdd() {
      if (this.addContentName) {
        this.contentMap.push({
          fieldname: this.addContentName,
          required: '0',
        })
      }
      this.addDialogVisible = false
    },
    handleMoveItem(tag, index) {
      let arr = this.contentMap
      arr[index] = arr.splice(index + tag, 1, arr[index])[0]
      this.contentMap.forEach((item, index) => {
        item.sort = index + 1
      })
    },
    handleDeleteItem(item) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let contentMap = JSON.parse(JSON.stringify(this.contentMap))
          this._lodash.remove(contentMap, (n) => {
            return n.id === item.id
          })
          this.contentMap = contentMap
        })
        .catch(() => {})
    },
    handleChangeRequired(val) {
      console.log(val)
      if (!val) {
        this.options = []
        this.contentMap.forEach((item) => {
          if (item.fieldname === '选购房源') {
            item.houseresouce = ''
          }
        })
      }
    },
    fetchHouses(query) {
      console.log(query)
      this.searching = true
      fetchHouseList({
        keyword: query,
        pageSize: 20,
        pageNo: 1,
      }).then(({ data }) => {
        this.options = data.items
        this.searching = false
      })
    },
    handleSubmit() {
      if (this.submitting) {
        return
      }
      this.submitting = true
      this.$refs['actForm'].validate((valid) => {
        if (valid) {
          editMarketRegister({
            id: this.$route.query.id || '',
            name: this.actForm.name,
            longtype: this.actForm.longtype,
            starttime: this.actForm.limitTime[0] || '',
            endtime: this.actForm.limitTime[1] || '',
            racktype: this.actForm.racktype,
            contentMap: {
              list: [...this.contentMap],
            },
            template: {
              templatekind: this.actForm.template.templatekind,
              background: this.actForm.coverImg.filepath,
              button: this.actForm.template.button.join(','),
              share: '',
              salescalls: this.actForm.template.salescalls,
            },
          })
            .then(({ data }) => {
              this.$message.success('操作成功')
              this.handleCancel()
              this.submitting = false
            })
            .catch((err) => {
              this.$message.error(err.result_msg || '操作失败')
              this.submitting = false
            })
        } else {
          console.log('error submit!!')
          this.submitting = false
          return false
        }
      })
    },
    handleCancel() {
      this.$router.go(-1)
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      this.$refs['actForm'].clearValidate('coverImg')
      // this.housesForm.coverImg = res.http_path
      this.actForm.coverImg = {
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
    handleChangebtns(val) {
      console.log(val)
      if (!val.includes('1')) {
        this.actForm.template.salescalls = ''
      }
    },
    handleChangeLimit(val) {
      console.log(val)
      if (val === 1) {
        this.actForm.limitTime = []
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.form-title-box {
  font-size 18px
  font-weight 400
}
.template-config-box {
  margin-top 30px
  .template-select-box {
    display flex
    padding-left 120px
    .mobile-box {
      position relative
      width 375px;
      height 667px;
      border 1px solid #eee
      .bg-img {
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      }
      .btn-box {
        position absolute
        bottom 0
        left 0
        width 100%
        display flex
        align-items center
        justify-content space-around
        height 50px
        z-index 11
        .btn-item {
          display flex
          align-items center
          justify-content center
          flex 1
          padding 0 10px
          div {
            display flex
            align-items center
            justify-content center
            width 100%
            height 42px
            background #fff
            color #E32835
            border-radius 4px
          }
        }
      }
    }
    .select-box {
      flex 1
      min-width 0
    }
  }
}
</style>
