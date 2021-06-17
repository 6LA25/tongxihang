<template>
  <div class="manage-article-page">
    <div class="content-title">文章管理列表</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        v-permission="'编辑文章'"
        @click="handleAddAct('add')"
        >新建文章</el-button
      >
    </div>
    <div class="search-head-box">
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">文章名称：</div>
        <div class="ilb-top">
          <el-input
            v-model="search.title"
            placeholder="请输入内容"
            size="mini"
          ></el-input>
        </div>
      </div>
      <div class="ilb-top search-item-box">
        <div class="ilb-top search-item-label">文章状态：</div>
        <div class="ilb-top">
          <el-select v-model="search.racktype" placeholder="请选择" size="mini">
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
        label="文章ID"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="time"
        label="发布时间"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.updatetime | YMDHMS_date }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="statusName" label="文章状态" min-width="100">
        <template slot-scope="scope">
          <div>
            {{ scope.row.racktype === 0 ? '已关闭' : '上架中' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button
            v-permission="'编辑文章'"
            type="primary"
            size="mini"
            @click.stop="handleJumpEditAct(scope.row)"
            >编辑文章</el-button
          >
          <el-button
            v-permission="'编辑文章'"
            type="primary"
            size="mini"
            @click.stop="handleUp(scope.row)"
            >{{ scope.row.racktype === 0 ? '上架' : '下架' }}</el-button
          >
          <el-button
            v-permission="'编辑文章'"
            type="warning"
            size="mini"
            @click.stop="handleDelete(scope.row)"
            >删除</el-button
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
    <el-dialog
      title="编辑文章"
      append-to-body
      :visible.sync="editVisible"
      :destroy-on-close="true"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item
          label="文章标题"
          prop="name"
          :rules="[{ required: true, message: '文章标题不能为空' }]"
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
        <el-form-item label="正文" prop="content">
          <div id="editor" ref="editor" style="text-align: left"></div>
        </el-form-item>
        <el-form-item label="上架" prop="racktype">
          <el-switch
            active-value="1"
            inactive-value="0"
            v-model="editForm.racktype"
          ></el-switch>
        </el-form-item>
        <el-form-item
          label="初始浏览量"
          prop="initView"
        >
          <el-input
            style="width: 400px"
            type="number"
            size="mini"
            v-model="editForm.initView"
            autocomplete="off"
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
  editArticle,
  fetchAllArticles,
  fetchItemArticle,
  shelvesArticles,
  deleteArticle
} from '@services/manage-service.js'
import E from 'wangeditor'
export default {
  name: 'manage-article',
  data() {
    return {
      editVisible: false,
      putawayStatus: [
        {
          value: -1,
          label: '全部',
        },
        {
          value: 1,
          label: '上架',
        },
        {
          value: 0,
          label: '关闭中',
        },
      ],
      tableData: [],
      search: {
        title: '',
        racktype: -1,
        pageSize: 10,
        pageNo: 1,
      },
      total: 0,
      loading: false,
      editForm: {
        id: '',
        name: '',
        coverImg: null,
        content: '',
        racktype: 0,
        initView: ''
      },
      rules: {
        coverImg: [{ required: true, message: '请上传楼盘活动封面' }],
        content: [
          {
            required: true,
            message: '请输入正文内容',
          },
        ],
      },
      editor: null,
    }
  },
  watch: {
    editVisible(nv) {
      if (!nv) {
        this.editForm.id = ''
        this.editForm.content = ''
        this.editForm.coverImg = null
        this.editor.destroy()
      } else {
        this.$nextTick(() => {
          this.editor = new E('#editor')
          Object.assign(this.editor.config, {
            uploadImgServer: this.$store.state.uploadUrl,
            uploadImgMaxLength: 1,
            uploadImgHeaders: {
              ...this.$store.state.uploadHeaders,
            },
            uploadFileName: 'Filedata',
            uploadImgParams: {
              ...this.$store.state.uploadData,
            },
            showLinkImg: false,
            showFullScreen: false,
            excludeMenus: ['video', 'link'],
            uploadImgHooks: {
              customInsert: (insertImgFn, result) => {
                // result 即服务端返回的接口
                console.log('customInsert', result)
                // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
                insertImgFn(result.http_path)
              },
            },
            onchange: (newHtml) => {
              if (newHtml) {
                this.$refs['editForm'].clearValidate('content')
              }
              this.editForm.content = newHtml
            },
          })
          this.editor.create()
          this.editor.txt.html(this.editForm.content)
        })
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
    fetchList() {
      this.loading = true
      let post = {
        title: this.search.title,
        racktype: this.search.racktype,
        pageSize: this.search.pageSize,
        pageNo: this.search.pageNo,
      }
      fetchAllArticles(post)
        .then(({ data }) => {
          this.total = data.totalCount
          this.tableData = data.items
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleAddAct() {
      this.editVisible = true
    },
    handleJumpEditAct(item) {
      fetchItemArticle({
        id: item.id,
      }).then(({ data }) => {
        console.log(data)
        this.editForm.id = data.id
        this.editForm.name = data.title
        this.editForm.content = data.content
        this.editForm.racktype = data.racktype
        this.editForm.initView = data.initView
        this.editForm.coverImg = {
          filename: '',
          filepath: data.image,
        }
        this.editVisible = true
      })
    },
    handleDelete({id}) {
      this.$confirm(`是否确定要删除该文章`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteArticle({
            id
          }).then(data => {
            this.handleReset()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {})
    },
    handleUp(item) {
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
          shelvesArticles({
            shelves: item.racktype / 1 === 0 ? 1 : 0,
            ids: [item.id],
          }).then((data) => {
            this.handleReset()
            this.$message.success('操作成功')
          })
        })
        .catch(() => {})
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.search.pageNo = val
      this.fetchList()
    },
    handleSearch() {
      this.search.pageNo = 1
      this.fetchList()
    },
    handleReset() {
      Object.keys(this.search).forEach((item) => {
        this.search[item] = ''
        this.search.pageSize = 10
        this.search.pageNo = 1
      })
      this.search.racktype = -1
      this.fetchList()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editArticle({
            id: this.editForm.id,
            title: this.editForm.name,
            image: this.editForm.coverImg.filepath,
            content: this.editForm.content,
            initView: this.editForm.initView / 1,
            racktype: this.editForm.racktype / 1,
          })
            .then((data) => {
              this.$message.success(data.result_msg)
              this.editVisible = false
              this.handleReset()
            })
            .catch((e) => {
              this.$message.error(e.result_msg)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>