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

      <el-table-column align="center" :label="i18n('label.system.user.avatar')" width="64">
        <template slot-scope="scope">
          <img v-if="scope.row.avatar" :src="`${scope.row.avatar}?${userAvatarFilterMini}`"/>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.user.name')"
                       :width="tableColumnWidth(0.15,120)" sortable column-key="name">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.user.sex')" width="80" sortable column-key="sex">
        <template slot-scope="scope">
          <span v-if="scope.row.sex===1">{{i18n('label.system.user.sexs.man')}}</span>
          <span v-else-if="scope.row.sex===2">{{i18n('label.system.user.sexs.woman')}}</span>
          <span v-else>{{i18n('label.system.user.sexs.secret')}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.user.phone')" :width="tableColumnWidth(0.15,120)"
                       sortable column-key="phone">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="i18n('label.system.user.email')" sortable column-key="email">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.system.user.status')" width="100" sortable
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
