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
                         sortable column-key="code">
          <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="i18n('label.system.area.name')" :width="tableColumnWidth(0.2,200)"
                         sortable column-key="name">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="i18n('label.system.area.fullname')" sortable column-key="fullname">
          <template slot-scope="scope">
            <span>{{scope.row.fullname}}</span>
          </template>
        </el-table-column>

      </el-table>
    </ApiComponent>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
