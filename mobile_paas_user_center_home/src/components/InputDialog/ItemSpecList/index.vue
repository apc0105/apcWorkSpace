<template>
  <div ref="pageBody">
    <el-table ref="table"
              :data="tableData()"
              @selection-change="handleSelectionChange"
              @sort-change="handlerChangeSort"
              @row-click="handleClickRow"
              row-key="id" v-loading="pageLoading()" size="small"
              border fit highlight-current-row stripe>
      <el-table-column type="selection" width="40" reserve-selection v-if="multiple" :selectable="selectable"/>

      <el-table-column align="center" :label="i18n('label.name')" :width="tableColumnWidth(0.15,150)">
        <template slot-scope="scope">
          <span>{{scope.row.name}}({{scope.row.code}})</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.category')" :width="tableColumnWidth(0.1,100)">
        <template slot-scope="scope">
          <span>{{scope.row.categoryName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.item.spec.options')">
        <template slot-scope="scope">
          <span>{{array2string(scope.row.options)}}</span>
        </template>
      </el-table-column>
      <ApiComponent slot="empty" :data="pagesData()" :showLoading="false" @reload="reloadPage"/>
    </el-table>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
