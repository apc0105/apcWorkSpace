<template>
  <fd-form-item class="fd-form-table" v-bind="elFormAttrs" :key="controlKey">
    <el-table
      :data="designData"
      row-key="id" border fit highlight-current-row stripe :size="size"
      :show-summary="showSummary"
      :summary-method="summaryTable">

      <el-table-column v-if="data.showIndex == 1" type="index" width="36" fixed="left"/>

      <el-table-column
        v-for="(item,index) in data.cellElement"
        :key="item.id||index"
        :align="item.align"
        :fixed="item.fixed"
        :prop="tableCellData(item).key"
        :width="cellWidth(item)"
        class-name="fd-form-table-cell">
        <template slot="header" slot-scope="scope">
          <FdTableHeader
            slot="header"
            :index="index"
            :tableData="data"
            :design="design"
            :mobile="mobile"
            :vo="vo"
            @click="activeElement"
            :data="tableCellData(item)">
            {{cellLabel(item)}}
          </FdTableHeader>
        </template>

        <template slot-scope="scope">
          <FdTableCell
            :index="index"
            :row="scope.$index"
            :tableData="data"
            :vo="scope.row"
            @input="inputTableCell"
            :config="config"
            :design="design"
            :mobile="mobile"
            :cellHeight="cellHeight"
            :cellConfig="item"
            :weightTotal="weightTotal()"
            @click="activeElement"
            :data="tableCellData(item)"/>

        </template>
      </el-table-column>

      <el-table-column
        v-if="operatorSize > 0 && data.readonly ==0" align="center"
        :label="_i18n_('label.flow.formdesign.operation')"
        :width="operationWidth" fixed="right"
        class-name="fd-form-table-cell">
        <template slot-scope="scope">
          <el-dropdown v-if="mobile" trigger="click">
            <div class="fd-form-table-operator">
              <i class="el-icon-more"/>
            </div>
            <el-dropdown-menu slot="dropdown" style="margin-top: -8px;">
              <el-dropdown-item>
                <div v-if="showOperatorAdd" class="fd-form-table-operator">
                  <i class="el-icon-circle-plus"/>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div v-if="showOperatorRemove" class="fd-form-table-operator">
                  <i class="el-icon-remove"/>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="fd-form-table-operators" v-else>
            <div v-if="showOperatorAdd" class="fd-form-table-operator">
              <i class="el-icon-circle-plus"/>
            </div>
            <div v-if="showOperatorRemove" class="fd-form-table-operator">
              <i class="el-icon-remove"/>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
