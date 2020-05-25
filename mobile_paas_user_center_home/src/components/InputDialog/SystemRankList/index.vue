<template>
  <div>
    <el-table ref="table"
              :data="tableData()"
              row-key="id"
              @selection-change="handleSelectionChange"
              @row-click="handleClickRow"
              v-loading="pageLoading()" size="small"
              border fit highlight-current-row stripe>
      <el-table-column type="selection" width="40" reserve-selection v-if="multiple" :selectable="selectable"/>

      <el-table-column align="center" :label="i18n('label.system.rank.type')" :width="tableColumnWidth(0.2,150)">
        <template slot-scope="scope">
          <span>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.rank.name')" :width="tableColumnWidth(0.3,200)">
        <template slot-scope="scope">
          <span>{{scope.row.name}}({{scope.row.code}})</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.rank.level')" :width="tableColumnWidth(0.2,150)">
        <template slot-scope="scope">
          <span>{{scope.row.level}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.rank.desc')">
        <template slot-scope="scope">
          <span>{{scope.row.desc}}</span>
        </template>
      </el-table-column>
      <ApiComponent slot="empty" :data="pagesData()" :showLoading="false" @reload="reloadPage"/>
    </el-table>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
