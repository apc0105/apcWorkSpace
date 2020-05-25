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

      <el-table-column
        align="center"
        :label="i18n('label.flow.defobject.key')"
        sortable
        column-key="key"
        fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.key}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="i18n('label.flow.defobject.name')"
        sortable
        column-key="name"
        fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="i18n('label.flow.defobject.version')"
        sortable
        column-key="version">
        <template slot-scope="scope">
          <span>{{scope.row.version}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.flow.defobject.status')" width="100" sortable
                       column-key="status">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===1" class="page-table-btn" type="success">
            {{i18n('operation.enable')}}
          </el-button>
          <el-button v-else class="page-table-btn" type="warning">
            {{i18n('operation.disable')}}
          </el-button>
        </template>
      </el-table-column>

      <ApiComponent slot="empty" :data="pagesData()" :showLoading="false" @reload="reloadPage"/>
    </el-table>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
