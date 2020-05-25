<template>
  <fd-form-item :data="data" :prop="prop">
    <el-table border :data="elements"
              :row-key="row=>row._id">
      <el-table-column type="index" width="40"/>

      <el-table-column align="center" :label="i18n('label.flow.formdesign.props.labelAlign')" width="130">
        <template slot-scope="scope">
          <el-select v-model="scope.row.align">
            <el-option
              v-for="item in alignOptions"
              :key="item.key"
              :label="i18n(item.label)"
              :value="item.key">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.flow.formdesign.cells.fixed')" width="130">
        <template slot-scope="scope">
          <el-select v-model="scope.row.fixed" clearable>
            <el-option
              v-for="item in fixOptions"
              :key="item.key"
              :label="i18n(item.label)"
              :value="item.key">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.flow.formdesign.cells.sum')" width="60">
        <template slot-scope="scope">
          <byte-switch v-model="scope.row.sum"/>
        </template>
      </el-table-column>


      <el-table-column align="center" :label="i18n('label.flow.formdesign.cells.sumCny')" width="100">
        <template slot-scope="scope">
          <byte-switch v-model="scope.row.sumCny"/>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="i18n('label.flow.formdesign.cells.width')" width="200">
        <template slot-scope="scope">
          <el-input :placeholder="i18n('placeholder.flow.formdesign.cellwidth')" v-model="scope.row.width" :min="1"
                    :max="500" :step="1" @input="inputWeight"/>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" :label="i18n('label.flow.formdesign.cells.avg')" width="60">-->
      <!--<template slot-scope="scope">-->
      <!--<byte-switch v-model="scope.row.avg"/>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
