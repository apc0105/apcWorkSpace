<template>
  <div>
    <el-table
      ref="table"
      :data="tableData()"
      row-key="id"
      @selection-change="handleSelectionChange"
      @row-click="handleClickRow"
      v-loading="pageLoading()" size="small"
      border fit highlight-current-row stripe>
      <el-table-column type="selection" width="40" reserve-selection v-if="multiple" :selectable="selectable"/>

      <el-table-column align="center" :label="i18n('label.system.dict.type')" sortable column-key="type">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>

      <ApiComponent slot="empty" :data="pagesData()" :showLoading="false" @reload="reloadPage"/>
    </el-table>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
