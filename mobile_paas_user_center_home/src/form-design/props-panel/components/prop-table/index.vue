<template>
  <div class="form-props-option-table">

    <div @click="open">
      <fd-form-item :data="data" :prop="prop">
        <div class="form-props-option-labels ellipsis1">
          <span v-if="emptyOptions" class="color-click">{{i18n('label.flow.formdesign.optionTable.setup')}}</span>
          <el-input v-else :value="labels" disabled/>
        </div>
      </fd-form-item>
    </div>

    <el-dialog :visible="visible" :title="i18n(data.name)" @close="close">
      <div style="margin-bottom: 16px;" v-if="vo.cascade>1">
        <el-breadcrumb separator="->">
          <el-breadcrumb-item>
            <span @click="gotoCascade(1)" class="color-click font-bold">{{i18n('label.flow.formdesign.optionTable.root')}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentCascade>1">
            <span v-if="currentCascade>2" @click="gotoCascade(2)" class="color-click font-bold">{{cascade1.label}}</span>
            <span v-else>{{cascade1.label}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentCascade>2">{{cascade2.label}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        border
        :data="elements"
        :row-key="row=>row._id">
        <el-table-column
          align="center"
          :label="i18n('label.flow.formdesign.optionTable.value')"
          class-name="form-props-option-table-cell">
          <template slot-scope="scope">
            <el-input v-model="scope.row.key" :placeholder="i18n('message.placeholder')"/>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="i18n('label.flow.formdesign.optionTable.label')"
          class-name="form-props-option-table-cell">
          <template slot-scope="scope">
            <el-input v-model="scope.row.label" :placeholder="i18n('message.placeholder')"/>
          </template>
        </el-table-column>

        <el-table-column
          align="center" :label="i18n('label.operation')"
          class-name="page-table-action" v-if="!data.disabled" :width="vo.cascade>1?220:160">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="nextCascade(scope)" v-if="showNextCascade(scope.row)">
              {{i18n('operation.flow.formdesign.nextCascade')}}
            </el-button>
            <el-button size="mini" type="primary" @click="moveUp(scope)">
              {{i18n('operation.moveUp')}}
            </el-button>
            <el-button size="mini" type="primary" @click="moveDown(scope)">
              {{i18n('operation.moveDown')}}
            </el-button>
            <el-button size="mini" type="danger" @click="del(scope)">
              {{i18n('operation.delete')}}
            </el-button>
          </template>
        </el-table-column>
        <div slot="empty">
          <el-button icon="el-icon-plus" @click="addRow">{{i18n(['label.flow.formdesign.optionTable.addRow'])}}
          </el-button>
        </div>
        <div slot="append" v-if="elements.length > 0" class="form-props-option-table-btns">
          <el-button icon="el-icon-plus" @click="addRow">{{i18n(['label.flow.formdesign.optionTable.addRow'])}}
          </el-button>
        </div>
      </el-table>
      <div slot="footer">
        <el-button @click="close">{{i18n('operation.cancel')}}</el-button>
        <el-button type="primary" @click="confirm">{{i18n('operation.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
