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
        <el-radio-group v-model="actForm.limitType">
          <el-radio :label="1">长期活动</el-radio>
          <el-radio :label="0">截止时间</el-radio>
          <el-date-picker
            :disabled="actForm.limitType === 1"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            v-model="actForm.limitTime"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否开启活动" prop="open">
        <el-radio-group v-model="actForm.open">
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
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          size="mini"
        >
          <el-table-column
            prop="name"
            label="报名字段"
            min-width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="required" label="字段设置" min-width="200">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.required">必填</el-checkbox>
              <el-checkbox
                @change="handleChangeRequired"
                v-if="scope.row.name === '选购房源'"
                style="margin-right: 10px"
                v-model="scope.row.house"
                >默认房源</el-checkbox
              >
              <el-select
                v-if="scope.row.name === '选购房源'"
                size="mini"
                :disabled="!scope.row.house"
                v-model="scope.row.houseId"
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
            <template slot-scope="scope" v-if="tableData.length > 1">
              <el-button
                v-if="scope.$index > 0"
                type="primary"
                size="mini"
                @click="handleMoveItem(-1, scope.$index)"
                >上移</el-button
              >
              <el-button
                v-if="scope.$index < tableData.length - 1"
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
import { fetchHouseList } from '../../assets/services/manage-service'
export default {
  name: 'add-apply-act',
  data() {
    return {
      searching: false,
      options: [],
      addDialogVisible: false,
      addContentName: '',
      tableData: [
        {
          id: 1,
          name: '姓名',
          required: false,
        },
        {
          id: 2,
          name: '手机号',
          required: false,
        },
        {
          id: 3,
          name: '选购房源',
          required: false,
          houseId: '',
          house: false,
        },
      ],
      actForm: {
        name: '',
        limitType: '',
        limitTime: '',
        open: '',
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
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
  mounted() {},
  methods: {
    handleAddField() {
      this.addDialogVisible = true
    },
    handleConfirmAdd() {
      if (this.addContentName) {
        this.tableData.push({
          name: this.addContentName,
          required: false,
        })
      }
      this.addDialogVisible = false
    },
    handleMoveItem(tag, index) {
      let arr = this.tableData
      arr[index] = arr.splice(index + tag, 1, arr[index])[0]
    },
    handleDeleteItem(item) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let tableData = JSON.parse(JSON.stringify(this.tableData))
          this._lodash.remove(tableData, (n) => {
            return n.id === item.id
          })
          this.tableData = tableData
        })
        .catch(() => {})
    },
    handleChangeRequired(val) {
      console.log(val)
      if (!val) {
        this.options = []
        this.tableData.forEach((item) => {
          if (item.name === '选购房源') {
            item.houseId = ''
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
  },
}
</script>

<style lang="stylus" scoped>
.form-title-box {
  font-size 18px
  font-weight 400
}
</style>
