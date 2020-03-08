<template>
  <div class="add-house-type-page">
    <div class="content-title">户型列表</div>
    <div class="operate-btn-box">
      <el-button type="primary" size="small" @click="handleAddHouses('add')">新建户型</el-button>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="户型名称" width="300" show-overflow-tooltip></el-table-column>
      <el-table-column prop="price" label="户型定价（元/平）" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="floorage" label="建面（平）" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="actualArea" label="套内（平）" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row, 'edit')">编辑</el-button>
          <el-button type="danger" size="mini" @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog
      :title="dialogStatus === 'add' ? '新增户型' : '编辑户型'"
      :visible.sync="editDialogVisible"
      width="50%">
      <el-form v-if="editDialogVisible" ref="editForm" :rules="rules" :model="editForm" label-width="100px">
        <el-form-item label="户型名称：" prop="name">
          <el-input style="width: 400px" size="mini" v-model="editForm.name"></el-input>
        </el-form-item>
        <div>
          <div class="ilb-top">
            <el-form-item label="户型定价：" prop="price">
              <el-input type="number" style="width: 100px" size="mini" v-model="editForm.price"></el-input>
              <span class="ml-10 form-item-hint-text">元/m2</span>
            </el-form-item>
          </div>
          <div class="ilb-top">
            <el-form-item label="户型：" prop="type">
              <el-select size="mini" v-model="editForm.type" placeholder="请选择楼盘类型">
                <el-option
                  v-for="item in houseTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="ml-10 form-item-hint-text">居室</span>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="ilb-top">
            <el-form-item label="建面：" prop="area">
              <el-input type="number" style="width: 100px" size="mini" v-model="editForm.floorage"></el-input>
              <span class="ml-10 form-item-hint-text">m2</span>
            </el-form-item>
          </div>
          <div class="ilb-top">
            <el-form-item label="套内：" prop="inArea">
              <el-input type="number" style="width: 100px" size="mini" v-model="editForm.actualArea"></el-input>
              <span class="ml-10 form-item-hint-text">m2</span>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="标签：" prop="tags">
          <el-input type="textarea" placeholder="多个标签请以“，”分开，最多填写3个标签，每个标签不超过5个汉字" style="width: 400px" size="mini" resize="none" v-model="editForm.tags"></el-input>
        </el-form-item>
        <el-form-item label="户型图：" prop="editForm">
          <el-upload
            v-if="$store.state.uploadUrl"
            :headers="$store.state.uploadHeaders"
            :data="$store.state.uploadData"
            list-type="picture-card"
            :name="'Filedata'"
            style="display: inline-block;"
            class="avatar-uploader"
            :limit="4"
            :on-success="uploadRealImgSuccess"
            :before-upload="beforeAvatarUpload"
            :on-remove="removeRealImg"
            :file-list="editForm.addImages"
            :action="$store.state.uploadUrl">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        <div class="form-item-hint-text">最多上传4张图片，支持jpg/jpeg/png格式图片，大小不超过2M</div>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchHouseTypes, editHouseTypes, fetchHouseTypeItem } from '../../../src/assets/services/manage-service'
export default {
  name: 'add-house-type',
  data () {
    return {
      loading: false,
      editDialogVisible: false,
      dialogStatus: '',
      editForm: {
        name: '', // 名称
        price: '', // 定价
        type: '',
        floorage: '', // 建筑面积
        actualArea: '', // 套内面积
        tags: '',
        addImages: [],
        delImages: []
      },
      tableData: [],
      search: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      houseTypes: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '一'
        },
        {
          value: 2,
          label: '二'
        },
        {
          value: 3,
          label: '三'
        },
        {
          value: 4,
          label: '四'
        },
        {
          value: 5,
          label: '五及以上'
        }
      ],
      editData: null,
      rules: {
        name: [{ required: true, message: '请输入户型名称', trigger: 'blur' }],
        tags: [
          {
            validator: (rule, value, callback) => {
              let _err = false
              let tags = value.split('，')
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
      }
    }
  },
  watch: {
    editDialogVisible (nv) {
      if (!nv) {
        this.resetEditForm()
      }
    }
  },
  mounted () {
    this.$store.dispatch('initUpload')
    this.fetchTypes()
  },
  methods: {
    fetchTypes () {
      this.loading = true
      fetchHouseTypes({
        ...this.search,
        houseId: this.$route.query.id
      }).then(({ data }) => {
        this.total = data.totalCount
        this.tableData = data.items
        this.loading = false
      })
    },
    handleEdit (row, tag) {
      this.editDialogVisible = true
      this.dialogStatus = tag
      fetchHouseTypeItem({
        id: row.id
      }).then(({ data }) => {
        this.editData = data
        this.editForm.name = data.name
        this.editForm.price = data.price
        this.editForm.type = data.type
        this.editForm.floorage = data.floorage
        this.editForm.actualArea = data.actualArea
        this.editForm.tags = data.tags
        // this.editForm.addImages = data.imageList
        data.imageList.forEach(item => {
          this.editForm.addImages.push({
            name: item.filename,
            url: item.filepath
          })
        })
        this.editForm.delImages = []
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchTypes()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.fetchTypes()
    },
    uploadRealImgSuccess (res, file, fileList) {
      console.log('fileList', fileList)
      this.editForm.addImages = fileList
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
      // 删除原有图片
      if (this.dialogStatus === 'add') {
        this.editForm.addImages = fileList
      } else {
        if (!file.response && !this.editForm.delImages.includes(file.name)) {
          this.editForm.delImages.push(file.name)
        }
      }
    },
    handleCancel () {
      this.editDialogVisible = false
    },
    handleConfirm () {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          let addImages = []
          this.editForm.addImages.forEach(item => {
            if (item.response) {
              addImages.push(item.response.filename)
            }
          })
          editHouseTypes({
            id: this.dialogStatus === 'add' ? 0 : this.editData.id,
            houseId: this.$route.query.id,
            name: this.editForm.name,
            price: this.editForm.price,
            type: this.editForm.type,
            floorage: this.editForm.floorage,
            actualArea: this.editForm.actualArea,
            tags: this.editForm.tags,
            addImages,
            delImages: this.editForm.delImages
          }).then(({ data }) => {
            this.$message.success('操作成功')
            this.editDialogVisible = false
            this.search.pageNo = 1
            this.search.pageSize = 10
            this.fetchTypes()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAddHouses (tag) {
      this.editDialogVisible = true
      this.dialogStatus = tag
    },
    resetEditForm () {
      this.editForm.name = ''
      this.editForm.price = ''
      this.editForm.type = ''
      this.editForm.floorage = ''
      this.editForm.actualArea = ''
      this.editForm.tags = ''
      this.editForm.addImages = []
      this.editForm.delImages = []
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-house-type-page {
}
</style>
