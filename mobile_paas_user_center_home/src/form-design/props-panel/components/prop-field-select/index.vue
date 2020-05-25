<template>
  <div class="form-props-option-table">

    <div @click="open">
      <fd-form-item :data="data" :prop="prop">
        <div class="form-props-option-labels ellipsis1">
          <el-input :value="stateValue" @input="input"/>
          <!--<span v-if="emptyOptions">{{i18n('label.flow.formdesign.itemKeys.setup')}}</span>-->
          <!--<el-input v-else :value="stateValue" @input="input"/>-->
        </div>
      </fd-form-item>
    </div>

    <el-dialog :visible="visible" :title="i18n('label.flow.formdesign.itemKeys.title')" @close="close">
      <el-table
        border
        :data="elements"
        style="margin-top:-16px;"
        :row-key="row=>row.key">
        <el-table-column
          align="center"
          :label="i18n('label.flow.formdesign.itemKeys.key')">
          <template slot-scope="scope">
            <span>{{scope.row.key}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="i18n('label.flow.formdesign.itemKeys.name')">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="i18n('label.flow.formdesign.itemKeys.status')">
          <template slot-scope="scope">
            <div v-if="getBindRow(scope.row)">
              <el-tag type="success">{{statusText(scope.row)}}</el-tag>
            </div>
            <div v-else>
              <el-tag class="bind-tag" @click="bindRow(scope.row)">{{statusText(scope.row)}}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="refresh">{{i18n('operation.refresh')}}</el-button>
        <el-button @click="close">{{i18n('operation.cancel')}}</el-button>
        <el-button type="primary" @click="confirm">{{i18n('operation.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
