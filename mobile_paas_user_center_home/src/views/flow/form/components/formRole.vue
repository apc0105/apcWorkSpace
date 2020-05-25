<template>
  <div>
    <el-row style="padding-top:5px;">
      <el-col :span="6">
        <div class="flow-form-label">表单权限</div>
      </el-col>
      <el-col :span="18">
        <el-button type="primary" size="mini" @click="showDialogChange">点击设置</el-button>
      </el-col>
    </el-row>
    <el-dialog
      :visible="showDialog"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      class="cus-dialog-container"
      @close="dialogColse"
    >
      <div slot="title" class="dialog-title">表单权限</div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogOk">确定</el-button>
      </div>
      <el-table :data="formDataList" border size="mini" style="margin: -20px 0;">
        <el-table-column align="center" prop="name" label="表单元素" width="180" />
        <el-table-column>
          <template slot="header">
            <el-button-group size="mini">
              <el-button type="primary" round size="mini" @click="changeRoles('edit')">编辑</el-button>
              <el-button type="primary" round size="mini" @click="changeRoles('hide')">隐藏</el-button>
              <el-button type="primary" round size="mini" @click="changeRoles('readonly')">只读</el-button>
            </el-button-group>
          </template>
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.value" size="mini">
              <el-radio label="edit" size="mini">编辑</el-radio>
              <el-radio label="hide" size="mini">隐藏</el-radio>
              <el-radio label="readonly" size="mini">只读</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {elMixin} from '../../el-mixin'
export default {
  mixins:[elMixin],
  props: {
    formDataList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    showDialogChange() {
      this.showDialog = true
    },
    dialogColse() {
      this.showDialog = false
    },
    dialogOk() {
      this.showDialog = false
      this.$emit('changeFormRole', this.formDataList)
    },
    changeRoles(val) {
      this.formDataList.forEach(item => {
        item.value = val
      })
    }
  }
}
</script>
<style  scoped>
.flow-form-label {
  line-height: 30px;
  font-size: 14px;
}
</style>
