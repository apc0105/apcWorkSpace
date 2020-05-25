<template>
  <div>
    <div @click="open">
      <fd-form-item :data="data" :prop="prop">
        <div class="color-click" @click="open">{{i18n('label.flow.formdesign.props.expressionInput')}}</div>
      </fd-form-item>
    </div>

    <el-dialog :visible="visible" :title="i18n(data.name)" @close="close">
      <component :is="expressionType" :watchFields="watchFields" v-model="editValue"/>
      <div slot="footer">
        <el-button @click="close">{{i18n('operation.cancel')}}</el-button>
        <el-button type="primary" @click="confirm">{{i18n('operation.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
