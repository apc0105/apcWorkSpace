<template>
  <el-row>
    <i title="撤销" data-command="copy" class="iconfont" @click.stop.prevent="command('undo')">
      <svg-icon icon-class="flow-undo" />
      <!-- 撤销 -->
    </i>
    <i title="重做" class="iconfont" @click.stop.prevent="command('redo')">
      <svg-icon icon-class="flow-redo" />
      <!-- 重做 -->
    </i>
    <i title="复制" class="iconfont" @click.stop.prevent="command('copy')">
      <svg-icon icon-class="flow-copy" />
      <!-- 复制 -->
    </i>
    <i title="粘贴" class="iconfont" @click.stop.prevent="command('paste')">
      <svg-icon icon-class="flow-paste" />
      <!-- 粘贴 -->
    </i>
    <i title="删除" class="iconfont" @click.stop.prevent="command('delete')">
      <svg-icon icon-class="flow-remove" />
      <!-- 删除 -->
    </i>
    <i title="放大" class="iconfont" @click.stop.prevent="command('zoomIn')">
      <svg-icon icon-class="flow-zoomin" />
      <!-- 放大 -->
    </i>
    <i title="缩小" class="iconfont" @click.stop.prevent="command('zoomOut')">
      <svg-icon icon-class="flow-zoomout" />
      <!-- 缩小 -->
    </i>
    <i title="自适应尺寸" class="iconfont" @click.stop.prevent="command('autoZoom')">
      <svg-icon icon-class="flow-fit" />
      <!-- 自适应尺寸 -->
    </i>
    <i title="实际尺寸" class="iconfont" @click.stop.prevent="command('resetZoom')">
      <svg-icon icon-class="flow-actual" />
      <!-- 实际尺寸 -->
    </i>
    <i title="清空画布" class="iconfont" @click.stop.prevent="command('clear')">
      <svg-icon icon-class="flow-clear" />
      <!-- 清空画布 -->
    </i>

    <span class="save">
      <el-button type="success" round size="mini" @click.stop.prevent="save()">保存</el-button>
    </span>
  </el-row>
</template>

<script>
import {elMixin} from '../el-mixin'
export default {
  name: 'Toolbar',
  mixins:[elMixin],
  props: {
    editor: {
      type: Object,
      required: true
    },
    flow: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    command(cmd) {
      this.editor.executeCommand(cmd)
      if (cmd === 'clear') {
        this.$emit('deleteItem')
      }
      if (cmd === 'delete') {
        this.$emit('deleteItem')
      }
    },
    save() {
      this.$emit('save')
    }
  }
}
</script>
<style>
.iconfont {
  width: 27px;
  height: 27px;
  color: #888;
  padding: 0 10px;
}
.commands {
  width: 27px;
  height: 27px;
  margin: 0px 6px;
  border-radius: 2px;
  padding-left: 4px;
  display: inline-block;
  border: 1px solid rgba(2, 2, 2, 0);
}
.commands:hover {
  cursor: pointer;
  border: 1px solid #e9e9e9;
}
</style>
