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
      <el-table-column prop="area" label="建面（平）" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="inArea" label="套内（平）" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleEdit(scope.$index, scope.row, 'edit')">编辑</el-button>
          <el-button type="danger" size="mini" @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      title="编辑户型"
      :visible.sync="editDialogVisible"
      width="50%">
      <el-form ref="editForm" :model="editForm" label-width="100px">
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
              <el-input type="number" style="width: 100px" size="mini" v-model="editForm.area"></el-input>
              <span class="ml-10 form-item-hint-text">m2</span>
            </el-form-item>
          </div>
          <div class="ilb-top">
            <el-form-item label="套内：" prop="inArea">
              <el-input type="number" style="width: 100px" size="mini" v-model="editForm.inArea"></el-input>
              <span class="ml-10 form-item-hint-text">m2</span>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="标签：" prop="tags">
          <el-input type="textarea" style="width: 400px" size="mini" resize="none" v-model="editForm.tags"></el-input>
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
export default {
  name: 'add-house-type',
  data () {
    return {
      loading: false,
      editDialogVisible: false,
      editForm: {
        name: '',
        price: '',
        type: '',
        area: '',
        inArea: '',
        tags: '',
        houseImgs: []
      },
      tableData: [
        {
          id: 1,
          name: 'A户型',
          price: 10000,
          area: 100,
          inArea: 200
        },
        {
          id: 2,
          name: 'B户型',
          price: 10000,
          area: 100,
          inArea: 200
        }
      ],
      search: {
        pageNum: 1,
        pageSize: 10
      },
      total: 10,
      houseTypes: [
        {
          value: '1',
          label: '一'
        },
        {
          value: '2',
          label: '二'
        },
        {
          value: '3',
          label: '三'
        },
        {
          value: '4',
          label: '四'
        },
        {
          value: '5',
          label: '五'
        }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('initUpload')
  },
  methods: {
    handleEdit (index, row) {
      this.editDialogVisible = true
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
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
    },
    uploadRealImgSuccess (res, file, fileList) {
      console.log(fileList)
      this.editForm.houseImgs = fileList
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
      this.editForm.houseImgs = fileList
    },
    handleCancel () {
      this.editDialogVisible = false
    },
    handleConfirm () {
      this.editDialogVisible = false
    },
    handleAddHouses () {
      this.editDialogVisible = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-house-type-page {
}
</style>
