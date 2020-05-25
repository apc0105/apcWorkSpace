<template>
  <div class="form-design-body flex-grow-1">
    <el-tabs :value="activeTab" @tab-click="handleClick" type="border-card">
      <el-tab-pane :label="i18n('label.flow.formdesign.tabs.pc')" name="pc" :style="pcStyle">
        <div class="form-design-pc" :style="pageStyle">
          <design-form-panel :value="value" @input="emitInput" :activeEl="activeEl" :formData="formData"/>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="i18n('label.flow.formdesign.tabs.mobile')" name="mobile">
        <design-mobile-panel :value="value" @input="emitInput" :activeEl="activeEl" :formData="formData"/>
      </el-tab-pane>
      <el-tab-pane :label="i18n('label.flow.formdesign.tabs.json')" name="json" :style="pcStyle">
        <json-panel :value="value" @input="emitInput"/>
      </el-tab-pane>
      <el-tab-pane disabled>
        <ToolPanel slot="label" :value="value" @input="emitInput"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss'></style>
