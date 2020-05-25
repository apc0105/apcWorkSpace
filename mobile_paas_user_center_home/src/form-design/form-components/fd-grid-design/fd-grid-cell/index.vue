<template>
  <td class="fd-form-grid-cell" :style="gridCellStyle"
      :colSpan="cellConfig.colSpan" :rowSpan="cellConfig.rowSpan"
      @mousedown="selectionStart" @mouseup="selectionEnd" @mousemove="selectionMove"
      v-el-rightmenu="menudata"
      v-el-dnd="dndDropData" :class="classObject" v-on="dndAttr">
    <div v-if="showEmptyTip" :style="gridCellStyle">
      <div class="fd-form-grid-cell-empty" unselectable="no">
        <!--{{cellConfig.index}}={{cellConfig.colSpan}}={{cellConfig.rowSpan}}-->
        {{_i18n_('message.flow.formdesign.emptycell')}}
      </div>
    </div>
    <div v-if="showElement" class="fd-form-grid-cell-inner" @click.stop="activeElement" :style="formInnerStyle">
      <component :is="el.type" :data="el" v-model="vo[el.key]" :prop="el.key" :mobile="mobile"
                 :design="design"/>
    </div>
    <div v-if="!showEmptyTip && !showElement" :style="gridCellStyle">
    </div>

    <div v-if="showElement && design" class="fd-form-grid-cell-tool" @click="deleteCellElement">
      <i class="el-icon-delete"/>
    </div>


    <el-dialog
      v-if="design"
      :visible.sync="cellVisible"
      :title="_i18n_('label.flow.formdesign.grids.celltitle')"
      width="400px"
      append-to-body>

      <el-form-item :label="_i18n_('label.flow.formdesign.grids.colspan')">
        <el-input-number
          v-model="cellForm.colSpan"
          :placeholder="i18n('message.placeholder')"
          :min="1"
          :step="1"
          :max="gridData.cells-cindex"/>
      </el-form-item>
      <br/>
      <el-form-item :label="_i18n_('label.flow.formdesign.grids.rowspan')">
        <el-input-number
          v-model="cellForm.rowSpan"
          :placeholder="i18n('message.placeholder')"
          :min="1"
          :step="1"
          :max="gridData.rows-rindex"/>
      </el-form-item>

      <div slot="footer">
        <el-button @click="closeMergeTableCell">{{_i18n_('operation.cancel')}}</el-button>
        <el-button type="primary" @click="doMergeTableCell">{{_i18n_('operation.ok')}}</el-button>
      </div>

    </el-dialog>

  </td>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
