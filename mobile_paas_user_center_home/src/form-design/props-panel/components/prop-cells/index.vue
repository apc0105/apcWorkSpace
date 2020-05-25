<template>
  <fd-form-item :data="data" :prop="prop">
    <el-table border :data="elements"
              :row-key="row=>row._id">
      <el-table-column type="index" width="40"/>
      <el-table-column align="center" :label="i18n('label.flow.formdesign.cells.weight')">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.weight" :min="1" :max="24" :step="1" @input="inputWeight"/>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" :label="i18n('label.flow.formdesign.cells.element')">-->
        <!--<template slot-scope="scope">-->
          <!--<el-input v-model="scope.row.elementId" disabled=""/>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
