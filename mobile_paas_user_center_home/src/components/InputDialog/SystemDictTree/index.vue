<template>
  <div>
    <ApiComponent :data="pagesData()" :showLoading="false" @reload="reloadPage">
      <el-table
        ref="table"
        :data="tableData()"
        row-key="id"
        @selection-change="handleSelectionChange"
        @row-click="handleClickRow"
        v-loading="pageLoading()" size="small"
        :row-class-name="rowClassName"
        border fit highlight-current-row stripe>

        <el-table-column type="selection" width="40" reserve-selection v-if="multiple" :selectable="selectable"/>

        <el-table-column align="center" :label="i18n('label.system.area.code')" :width="tableColumnWidth(0.2,200)"
                         sortable column-key="key">
          <template slot-scope="scope">
            <span>{{scope.row.key}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="i18n('label.system.area.name')" :width="tableColumnWidth(0.2,200)"
                         sortable column-key="label">
          <template slot-scope="scope">
            <span>{{scope.row.label}}</span>
          </template>
        </el-table-column>

      </el-table>
    </ApiComponent>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
