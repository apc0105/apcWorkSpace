<template>
  <el-tabs v-model="activeTab" type="border-card" class="form-design-control">
    <el-tab-pane :label="i18n('label.flow.formdesign.fdgroup.basic')" name="basic">
      <control-widget-panel group="label.flow.formdesign.fdgroup.basic"/>
    </el-tab-pane>
    <el-tab-pane :label="i18n('label.flow.formdesign.fdgroup.layout')" name="layout">
      <control-widget-panel group="label.flow.formdesign.fdgroup.layout"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
