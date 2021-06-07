<template>
  <div class="manage-house-activity-page">
    <div class="content-title">报名活动管理</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        v-permission="'新建楼盘'"
        @click="handleAddAct('add')"
        >新建活动</el-button
      >
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">活动名称：</div>
        <div class="ilb-top">
          <el-input
            v-model="search.name"
            placeholder="请输入内容"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">活动状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.state" placeholder="请选择" size="mini">
            <el-option
              v-for="item in putawayStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="ilb-top search-item-box search-btns-box">
        <el-button type="primary" size="mini" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="warning" size="mini" @click="handleReset"
          >重置</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="活动ID"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="name"
        label="活动名称"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="num"
        label="报名人数"
        min-width="100"
      ></el-table-column>
      <el-table-column prop="statusName" label="活动状态" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.racktype === 1 ? '已上架' : '未上架' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            v-permission="'新建楼盘'"
            @click.stop="handleShowBatch(scope.row)"
            >{{ scope.row.racktype === 1 ? '下架' : '上架' }}</el-button
          >
          <el-button
            v-permission="'新建楼盘'"
            type="primary"
            size="mini"
            @click.stop="handleJumpEditAct(scope.row)"
            >编辑活动</el-button
          >
          <el-button
            type="primary"
            size="mini"
            v-permission="'新建楼盘'"
            @click.stop="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button
            type="primary"
            size="mini"
            v-permission="'新建楼盘'"
            @click="handleShowNames(scope.row)"
            >报名名单</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="报名名单" :visible.sync="nameDialogVisible" width="70%">
      <div class="name-title-box">
        <span class="title">{{currentReg.name}}</span>
        <span class="num">已有{{nameData.length}}人报名</span>
        <el-button type="primary" size="mini" @click="handleExportExcel" :disabled="nameData.length === 0">导出EXCEL</el-button>
      </div>
      <el-table
        :data="nameData"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
      >
        <el-table-column
          prop="signtime"
          label="报名时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          label="报名楼盘"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="编辑活动"
      :visible.sync="editVisible"
      :destroy-on-close="true"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="是否开启活动" prop="racktype">
          <el-radio-group v-model="editForm.racktype">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="活动名称"
          prop="name"
          :rules="[{ required: true, message: '活动名称不能为空' }]"
        >
          <el-input
            style="width: 400px"
            type="text"
            size="mini"
            v-model="editForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="coverImg">
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
              v-if="editForm.coverImg"
              :src="editForm.coverImg.filepath"
              class="cover-img"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="form-item-hint-text">
            <span v-if="$route.query.tag === 'edit'"
              >点击图片修改活动封面，</span
            >支持jpg/jpeg/png格式图片，大小不超过1M，建议尺寸：336 * 256
          </div>
        </el-form-item>
        <el-form-item
          label="提示"
          prop="hint"
          :rules="[{ required: true, message: '提示不能为空' }]"
        >
          <el-input
            type="textarea"
            style="width: 400px"
            size="mini"
            placeholder="请输入温馨提示，建议30字以内"
            resize="none"
            v-model="editForm.hint"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('editForm')"
            >提交</el-button
          >
          <el-button size="mini" type="primary" @click="editVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  editMarkethouse,
  fetchMarkethouse,
  deleteMarkethouse,
  upMarkethouse,
  fetchMarkethouseItem,
  fetchMarkethouseRegistrations,
  exportMarkethouseExcel
} from '../../assets/services/manage-service'

export default {
  name: 'manage-house-activity',
  data() {
    return {
      editForm: {
        id: '',
        racktype: '',
        name: '',
        coverImg: null,
        hint: '',
      },
      currentReg: {},
      rules: {
        coverImg: [{ required: true, message: '请上传楼盘活动封面' }],
      },
      loading: false,
      nameDialogVisible: false,
      editVisible: false,
      total: 0,
      nameSearch: {
        pageNo: 1,
        pageSize: 10,
      },
      nameData: [,
      ],
      tableData: [],
      putawayStatus: [
        {
          value: -1,
          label: '全部',
        },
        {
          value: 1,
          label: '开启中',
        },
        {
          value: 0,
          label: '已关闭',
        },
      ],
      search: {
        name: '',
        state: '',
        pageSize: 10,
        pageNo: 1,
      },
      currentReg: {}
    }
  },
  watch: {
    nameDialogVisible(nv) {
      if (!nv) {
        this.currentReg = {}
      }
    },
    editVisible(nv) {
      if (!nv) {
        this.editForm.name = ''
        this.editForm.id = ''
        this.editForm.hint = ''
        this.editForm.racktype = ''
        this.editForm.coverImg = null
      }
    },
  },
  mounted() {
    this.fetchList()
    this.$store.dispatch('initUpload')
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.result_code === 10001) {
        this.$message.error(`上传错误：${res.result_msg}`)
        return
      }
      this.$refs['editForm'].clearValidate('coverImg')
      this.editForm.coverImg = {
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
    handleShowNames(item) {
      this.nameDialogVisible = true
      fetchMarkethouseRegistrations({
        id: item.id
      }).then(({data}) => {
        this.currentReg = item
        this.nameData = data || []
      })
    },
    handleAddAct() {
      this.editVisible = true
    },
    fetchList() {
      this.loading = true
      let post = {
        name: this.search.name,
        racktype: this.search.state === '' ? -1 : this.search.state,
        pageSize: this.search.pageSize,
        pageNo: this.search.pageNo,
      }
      fetchMarkethouse(post)
        .then(({ data }) => {
          this.total = data.totalCount
          this.tableData = data.items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    fetchNameList() {},
    handleDelete(item) {
      this.$confirm('确定删除该活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteMarkethouse({
            id: item.id,
          }).then(({ data }) => {
            this.$message.success('操作成功')
            this.handleReset()
          })
        })
        .catch(() => {})
    },
    handleShowBatch(item) {
      this.$confirm(
        `是否确定要${item.racktype / 1 === 0 ? '上架' : '下架'}`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          upMarkethouse({
            shelves: item.racktype / 1 === 0 ? 1 : 0,
            ids: [item.id],
          }).then((data) => {
            this.handleReset()
            this.$message.success('操作成功')
          })
        })
        .catch(() => {})
    },
    handleJumpEditAct(item) {
      this.editVisible = true
      fetchMarkethouseItem({id: item.id}).then(({data}) => {
        this.editForm.id = data.id
        this.editForm.racktype = data.racktype
        this.editForm.name = data.name
        this.editForm.hint = data.tips
        this.editForm.coverImg = {
          filepath: data.image
        }
      })
    },
    handleReset() {
      Object.keys(this.search).forEach((item) => {
        this.search[item] = ''
        this.search.pageSize = 10
        this.search.pageNo = 1
      })
      this.fetchList()
    },
    handleSearch() {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.search.pageNo = val
      this.fetchList()
    },
    handleNameSizeChange() {
      this.nameSearch.pageSize = val
      this.fetchNameList()
    },
    handleNameCurrentChange() {
      this.nameSearch.pageNo = val
      this.fetchNameList()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editMarkethouse({
            name: this.editForm.name,
            image: this.editForm.coverImg.filepath,
            tips: this.editForm.hint,
            racktype: this.editForm.racktype,
          })
            .then(({ data }) => {
              this.$message.success('操作成功')
              this.editVisible = false
              this.handleReset()
            })
            .catch((err) => {
              this.$message.error(err.result_msg || '操作失败')
              this.editVisible = false
              this.handleReset()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleExportExcel() {
      exportMarkethouseExcel({
        id: this.currentReg.id
      }, this.currentReg.name + '-报名名单.xls').then(({data}) => {
        console.log(data)
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.name-title-box {
  display flex
  align-items center
  margin-bottom 10px
  .title, .num {
    margin-right 10px
  }
}
</style>
