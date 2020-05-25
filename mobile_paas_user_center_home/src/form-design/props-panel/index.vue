<template>
  <div class="form-design-props">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane :label="i18n('label.flow.formdesign.tabs.formprops')" name="form">
        <form-form-props-panel :value="json" @input="emitInput"/>
      </el-tab-pane>
      <el-tab-pane :label="i18n('label.flow.formdesign.tabs.controlprops')" name="control">
        <form-control-props-panel :value="json" @input="emitInput" :formId="formId"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
