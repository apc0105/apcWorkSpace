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

      <el-table-column align="center" :label="i18n('label.cover')" :width="80" fixed="left">
        <template slot-scope="scope">
          <img v-if="scope.row.cover" :src="scope.row.cover" width="48" height="48"
               @click="showImage(scope.row.cover)"/>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.name')" width="300"
                       fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.name}}({{scope.row.code}})</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.category')"
                       fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.categoryName}}</span>
        </template>
      </el-table-column>

      <ApiComponent slot="empty" :data="pagesData()" :showLoading="false" @reload="reloadPage"/>
    </el-table>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
