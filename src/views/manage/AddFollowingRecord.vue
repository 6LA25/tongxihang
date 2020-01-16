<template>
  <div class="add-following-record-page">
    <div class="content-title">添加跟进记录</div>
    <el-form :rules="rules" ref="followingForm" :model="followingForm" label-width="130px">
      <el-form-item label="客户姓名：" prop="name">
        <el-select size="mini" v-model="followingForm.status" placeholder="请选择跟进状态">
          <el-option
            v-for="item in followingStatus"
            :key="item.status"
            :label="item.text"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="跟进时间：" prop="time">
         <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            v-model="followingForm.time"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="操作人：">
        <el-input style="width: 400px" size="mini" disabled v-model="followingForm.operator"></el-input>
      </el-form-item>
      <el-form-item label="下次跟进时间：" prop="time">
         <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            v-model="followingForm.nextTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'add-following-record',
  data () {
    return {
      rules: {},
      followingStatus: [
        { status: 1, text: '联系中' },
        { status: 2, text: '已到访' },
        { status: 3, text: '已认筹' },
        { status: 4, text: '已认购' },
        { status: 5, text: '已签约' },
        { status: 6, text: '已回款' },
        { status: 7, text: '关单' }
      ],
      followingForm: {
        status: '',
        time: '',
        nextTime: '',
        operator: '张三'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-following-record-page {
}
</style>
