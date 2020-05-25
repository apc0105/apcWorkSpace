<template>
  <el-form :inline="true" :model="formInline" ref="ruleForm" class="demoForm">
    <el-form-item label="名称">
      <el-input v-model="formInline.name"  size="small"  placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="申请人">
      <el-input v-model="formInline.creatorName"  size="small"  placeholder="申请人"></el-input>
    </el-form-item>
    <el-form-item label="申请时间">
      <el-date-picker
        v-model="formInline.createTime"
        type="daterange"
        align="right"
         size="small" 
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  size="small"  @click="onSubmit">查询</el-button>
      <el-button type="primary"  size="small"  @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      formInline: {
        name: '',
        creatorName: '',
        createTime: []
      }
    }
  },
  methods: {
    onSubmit() {
      const parameters = []
      if (this.formInline.createTime.length) {
        const startTime = moment(this.formInline.createTime[0]).startOf('day').format('x')
        const endTime = moment(this.formInline.createTime[1]).endOf('day').format('x')
        parameters.push({ name: 'a.createTime', op: 'greaterorequal', value: startTime }, { name: 'a.createTime', op: 'lessorequal', value: endTime })
      }

      if (this.formInline.name !== '') {
        parameters.push({ name: 'a.name', op: 'like', value: this.formInline.name })
      }
      if (this.formInline.creatorName !== '') {
        parameters.push({ name: 'a.creatorName', op: 'like', value: this.formInline.creatorName })
      }
      this.$emit('onSubmit', { parameters: parameters })
    },
    resetForm(formName) {
      this.formInline = {
        name: '',
        creatorName: '',
        createTime: []
      }
      this.$emit('onSubmit', this.formInline)
      // this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" >
  .demoForm{
    margin-top:20px;  
    border-bottom:5px #e9ecf0 solid;
    .el-date-editor{
       .el-range-separator{
        padding: 0 1px;
      }
    }
  }
</style>