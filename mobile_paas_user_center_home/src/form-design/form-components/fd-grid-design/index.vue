<template>
  <fd-form-item class="fd-form-grid" v-bind="elFormAttrs" :key="controlKey">
    <div class="fd-form-grid-inner" v-el-selection="selectionData">
      <table
        ref="gridTable"
        class="fd-form-grid-table"
        :border="_dv_(data.controlBorderWidth,1)"
        :bordercolor="_dv_(data.controlBorderColor)"
        :style="gridStyle()">
        <tr v-for="rindex in data.rows">
          <FdGridCell
            v-for="cindex in data.cells"
            v-if="gridCellConfig(rindex,cindex).render==1"
            :key="gridCellKey(rindex,cindex)"
            :index="gridCellIndex(rindex,cindex)"
            :rindex="rindex-1"
            :cindex="cindex-1"
            :gridWidth="gridWidth()"
            :gridData="data"
            :vo="vo"
            :config="config"
            :design="design"
            :mobile="mobile"
            :weightTotal="weightTotal()"
            :cellHeight="cellHeight"
            :cellConfig="gridCellConfig(rindex,cindex)"
            :columnConfig="gridColumnConfig(cindex)"
            :data="gridCellData(rindex,cindex)"
            :selectionMoveFlag="selectionMoveFlag"
            :selectionRange="selectionRange"
            @click="activeElement"
            @selectionStartCell="selectionStartCell"
            @selectionMoveCell="selectionMoveCell"
            @selectionEndCell="selectionEndCell"
            @selectionOverCell="selectionOverCell"
          />
        </tr>
      </table>
    </div>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
