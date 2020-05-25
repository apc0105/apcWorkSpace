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

      <el-table-column align="center" :label="i18n('label.system.menu.name')" :width="tableColumnWidth(0.2,200)"
                       sortable column-key="name">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.menu.path')" :width="tableColumnWidth(0.2,200)"
                       sortable column-key="path">
        <template slot-scope="scope">
          <span>{{scope.row.path}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.menu.url')" sortable column-key="url">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="i18n('label.status')" width="120" sortable column-key="hotFlag">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status" class="page-table-btn" type="success">
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
