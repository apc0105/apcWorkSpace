<template>
  <fd-form-item v-bind="elFormAttrs">
    <div v-for="item in stateValue" class="fd-form-sign-item">
      <div class="fd-form-sign-comment">{{item.comment}}</div>
      
      <div class="fd-form-sign-box">
        <div v-if="item.signEnable==1" class="fd-form-sign" :style="signImageStyle">
          <img class="fd-form-sign-image" :src="item.sign" :style="signImageStyle"
               :alt="_i18n_('label.flow.formdesign.props.signInput')"/>
        </div>
        <div class="fd-form-sign-datetime">
          {{item.userName}} {{dateFormatter(item.signTime)}}
        </div>
      </div>
    </div>
    <div v-if="showSign" class="fd-form-sign-add">
      <label @click="open()">{{_i18n_('label.flow.formdesign.props.signAdd')}}</label>
    </div>

    <el-dialog
      v-if="showSign && visible"
      :visible="visible"
      :width="dialogWidth"
      :title="_i18n_('label.flow.formdesign.props.signTitle')"
      @close="close"
      :close-on-click-modal="false"
      append-to-body>
      <el-row 
        class="fd-form-sign-comment-input flex-grow-1" style="margin-bottom:6px;">
        <el-col :span="14">请填写审批意见</el-col>
        <el-col :span="10" >
          <el-select style="width:100%" v-model="commonComment" @change="changeCommonComment">
            <el-option value="同意" label="同意"></el-option>
            <el-option value="不同意" label="不同意"></el-option>
            <el-option value="已阅" label="已阅"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 99}"
        v-model="signItem.comment"
        :placeholder="_i18n_('placeholder.flow.formdesign.signInput')"/>
      <div v-show="signEnable" class="fd-form-sign-drawer" :style="drawerStyle">
        <div class="fd-form-sign-drawerbg flex-box">
          <drawer-bg v-for="item in data.signWords" :size="drawerHeight" class="flex-grow-1" :key="item"/>
        </div>
        <drawer
          ref="drawer"
          class="fd-form-sign-canvas"
          :value="signItem.sign"
          :width="drawerWidth"
          :height="drawerHeight"
          :lineWidth="lineWidth"/>
      </div>
      <div slot="footer" v-if="signEnable">
        <!--<el-button @click="clearDrawer">{{_i18n_('operation.flow.formdesign.clearDrawer')}}</el-button>
        <el-button @click="loadSign">{{_i18n_('operation.flow.formdesign.loadSign')}}</el-button> -->
        <el-button type="primary" @click="confirm">{{_i18n_('operation.flow.formdesign.saveSign')}}</el-button>
        <!-- <el-button type="primary" @click="confirmSave">{{_i18n_('operation.flow.formdesign.saveUpdateSign')}} -->
        </el-button>
      </div>
      <div slot="footer" v-else>
        <el-button type="primary" @click="confirmSave">{{_i18n_('operation.flow.formdesign.saveSign')}}</el-button>
      </div>
    </el-dialog>

  </fd-form-item>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
