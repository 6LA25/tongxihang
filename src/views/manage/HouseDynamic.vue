<template>
  <div class="house-dynamic-page">
    <div class="content-title">楼盘动态</div>
    <div class="operate-btn-box">
      <el-button
        type="primary"
        size="small"
        v-permission="'新建楼盘'"
        @click="handleAddDynamic('add')"
      >新建动态</el-button>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      v-loading="loading"
    >
      <el-table-column prop="updated" label="发布时间" min-width="200" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.publishTime | YMDHMS_date}}</template>
      </el-table-column>
      <el-table-column prop="type" label="动态类型" min-width="100" show-overflow-tooltip>
        <template slot-scope="scope">{{getTypeText(scope.row.type)}}</template>
      </el-table-column>
      <el-table-column prop="title" label="动态标题" min-width="250" show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="动态正文" min-width="250" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.stop="handleAddDynamic('edit', scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click.stop="handleDeleteynamic(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="tag === 'add' ? '新增动态' : '编辑动态'" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="动态类型：" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择" size="mini">
            <el-option label="动态" :value="1"></el-option>
            <el-option label="开盘" :value="2"></el-option>
            <el-option label="交房" :value="3"></el-option>
            <el-option label="证件" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动态标题：" prop="title">
          <el-input v-model="ruleForm.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="发布时间：">
          <el-date-picker
            v-model="ruleForm.publishTime"
            size="mini"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="动态正文：" prop="content">
          <el-input type="textarea" size="mini" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="submitting"
            size="mini"
            @click="submitForm('ruleForm')"
          >确定</el-button>
          <el-button size="mini" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import {
  editHouseDynamic,
  houseDynamicList,
  delDynamicList
} from '../../assets/services/manage-service'
export default {
  name: 'house-dynamic',
  watch: {
    dialogVisible (nv) {
      if (!nv) {
        this.$nextTick(() => {
          this.tag = ''
          this.ruleForm.type = ''
          this.ruleForm.title = ''
          this.ruleForm.content = ''
          this.ruleForm.publishTime = ''
          this.currentEditData = null
        })
      }
    }
  },
  data () {
    return {
      total: 0,
      tag: '',
      dialogVisible: false,
      loading: false,
      submitting: false,
      rules: {
        type: [{ required: true, message: '请选择动态类型', trigger: 'blur' }],
        title: [{ required: true, message: '请选择动态类型', trigger: 'blur' }]
      },
      ruleForm: {
        type: '',
        title: '',
        publishTime: '',
        content: ''
      },
      tableData: [
      ],
      search: {
        pageNo: 1,
        pageSize: 10
      },
      currentEditData: null
    }
  },
  mounted () {
    this.fetchList()
  },
  methods: {
    getTypeText (val) {
      let texts = ['动态', '开盘', '交房', '证件']
      return texts[val - 1]
    },
    handleDeleteynamic (index, row) {
      this.$confirm('确定删除该动态信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDynamicList({
          id: row.id
        }).then(({ data }) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.search.pageNo = 1
          this.search.pageSize = 10
          this.fetchList()
        })
      }).catch(() => {
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitting = true
          let _ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
          if (_ruleForm.publishTime) {
            _ruleForm.publishTime = moment(_ruleForm.publishTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
          }
          editHouseDynamic({
            ..._ruleForm,
            houseId: this.$route.query.id,
            id: this.tag === 'edit' ? this.currentEditData.id : ''
          })
            .then(() => {
              this.$message.success('操作成功')
              this.dialogVisible = false
              this.submitting = false
              this.search.pageSize = 10
              this.search.pageNo = 1
              this.fetchList()
            })
            .catch(() => {
              this.$message.error('操作失败')
              this.submitting = false
            })
        } else {
          return false
        }
      })
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.search.pageNo = val
      this.fetchList()
    },
    fetchList () {
      this.loading = true
      houseDynamicList({
        ...this.postData,
        ...this.search,
        houseId: this.$route.query.id
      }).then(({ data }) => {
        this.tableData = data.items
        this.total = data.totalCount
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleAddDynamic (tag, row) {
      this.tag = tag
      if (tag === 'edit') {
        this.currentEditData = row
        this.ruleForm.type = row.type
        this.ruleForm.title = row.title
        this.ruleForm.content = row.content
      }
      this.ruleForm.publishTime = moment((row && row.publishTime) ? row.publishTime : moment().valueOf()).format('YYYY-MM-DD HH:MM:SS')
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
