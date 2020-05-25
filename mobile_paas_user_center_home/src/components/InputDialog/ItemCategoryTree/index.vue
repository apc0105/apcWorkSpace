<template>
  <div>
    <ApiComponent :data="pagesData()" :showLoading="false" @reload="reloadPage">
      <tree-table ref="table"
                  :data="tableData()"
                  row-key="id"
                  :columns="columns"
                  @selection-change="handleSelectionChange"
                  @row-click="handleClickRow"
                  :showSelection="multiple"
                  :selectable="selectable"
                  v-loading="pageLoading()" size="small"
                  :row-class-name="rowClassName"
                  border fit highlight-current-row stripe>

        <el-table-column align="center" :label="i18n('label.icon')" :width="110" class-name="item-category-expand">
          <template slot-scope="scope">
            <img v-if="scope.row.icon" :src="scope.row.icon" width="64" height="64"/>
          </template>
        </el-table-column>

      </tree-table>
    </ApiComponent>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
