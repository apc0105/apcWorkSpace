<template>
  <div class="input-dialog">
    <div v-if="showSlot" @click="openDialog">
      <slot/>
    </div>
    <el-button v-else-if="button" @click="openDialog" :icon="buttonIcon" :type="buttonType" :size="buttonSize">
      {{buttonText}}
    </el-button>
    <div class="input-dialog-multiple el-input el-input--medium" @click="openDialog" v-else-if="multiple">
      <div class="el-input__inner el-select" v-if="multipleItems.length>0">
          <span v-for="item in multipleItems" class="el-tag el-tag--info el-tag--small">
            <span class="el-select__tags-text">{{item[name]}}</span>
            <i class="el-tag__close el-icon-close" @click.stop="removeItem(item)"></i>
          </span>
      </div>
      <div v-else class="el-input__inner el-select">
          <span class="input-dialog-multiple-placeholder">
           {{i18n('message.placeholder')}}
          </span>
      </div>
      <span v-if="!disabled" class="el-input__suffix">
          <span class="el-input__suffix-inner">
             <div slot="suffix" class="input-dialog-suffix"
                  :class="{'input-dialog-suffix-multiple':multipleItems.length>0}">
              <i class="el-icon-zoom-in"/>
            </div>
          </span>
        </span>
    </div>
    <div class="input-dialog-single" @click="openDialog" v-else>
      <el-input :value="singleText" :placeholder="i18n('message.placeholder')" readonly :disabled="disabled">
        <div slot="suffix" class="input-dialog-suffix" v-if="!disabled">
          <i class="el-icon-zoom-in"/>
        </div>
      </el-input>
    </div>

    <el-dialog :visible.sync="showDialog" append-to-body :width="width" v-if="renderDialog" class="input-dialog">
      <div class="flex-box input-dialog-title" slot="title">
        <div class="flex-grow-1 input-dialog-title-text">{{title}}</div>
        <el-input v-if="search" v-model="keyword" :placeholder="i18n('message.placeholder')"
                  class="input-dialog-keyword"/>
        <el-button v-if="search" icon="el-icon-search" @click="loadPage">{{i18n('operation.search')}}</el-button>

        <el-button v-if="!search" icon="el-icon-refresh" @click="loadPage">{{i18n('operation.refresh')}}</el-button>
      </div>
      <div class="input-dialog-body">
        <component :is="tableComponent" ref="table" @change="changeSelection" :multiple="multiple"
                   :selection="selection" :param="param" @changePage="onChangePage"/>

      </div>
      <div slot="footer" class="page-container-footer flex-box">
        <div class="page-selection-info">
          <SelectedInfo :size="selection.length"/>
          <span v-if="selection.length>0">
            <a @click="handleClearSelection">{{i18n('operation.clearSelected')}}</a>
          </span>
        </div>
        <div class="flex-grow-11">
          <el-pagination
            background
            @size-change="handlerChangeSize"
            @current-change="handlerChangePage"
            @prev-click="handlerChangePage"
            @next-click="handlerChangePage"
            layout="prev,next,jumper"
            :current-page="pager.current"
            :page-size="pageSize()"
            :total="pageTotal()">
          </el-pagination>
        </div>
        <div class="flex-grow-1">
          <el-button type="danger" @click="clearInput">清空</el-button>
          <el-button type="primary" @click="doOk">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SelectedInfo from '@/components/SelectedInfo'
  import Components from './tables'

  export default {
    name: 'item-category-select',
    components: {
      SelectedInfo,
      ...Components,
    },
    props: {
      button: {
        type: Boolean,
        default: false
      },
      buttonText: String,
      buttonIcon: String,
      buttonType: String,
      buttonSize: String,
      multiple: {
        type: Boolean,
        default: false
      },
      search: {
        type: Boolean,
        default: false
      },
      value: {
        type: [Object, Array]
      },
      emptyText: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: 'name'
      },
      pk: {
        type: String,
        default: 'id'
      },
      title: {
        type: String,
      },
      tableComponent: {
        type: String,
      },
      filterId: {
        type: [String, Number],
      },
      param: {
        type: Object,
        default: () => {
        }
      },
      width: {
        type: String,
        default: '80%',
      }
    },
    data(){
      return {
        showDialog: false,
        renderDialog: false,
        selection: [],
        keyword: null,
        pager: { current: 1 },
      }
    },
    watch: {
      value(val){
        this.init(val);
      }
    },
    computed: {
      singleText(){
        if (this.value) {
          return this.value.name || this.emptyText
        }
        return this.emptyText
      },
      multipleItems(){
        return this.value || []
      },
      showSlot() {
        return Object.keys(this.$slots).length > 0
      }
    },
    mounted() {
      this.init(this.value);
    },
    methods: {
      init(value){
        if (this.multiple) {
          this.selection = value || []
        } else {
          this.selection = value ? [value] : []
        }
      },
      openDialog(){
        if (this.disabled) {
          return
        }
        this.renderDialog = true
        this.showDialog = true
      },
      closeDialog(){
        this.showDialog = false
      },
      clearInput(){
        this.closeDialog()
        this.handleClearSelection()
        this.$emit('input')
        this.$emit('change')
      },
      doOk() {
        if (!this.selection || this.selection.length == 0) {
          return this.$notify({
            title: '提示',
            message: '请选择数据',
            type: 'warning',
            duration: 2000
          })
        }
        this.closeDialog()
        if (this.multiple) {
          this.$emit('input', this.selection)
        } else {
          this.$emit('input', this.selection[0])
        }
      },
      loadPage(){
        if (this.search) {
          this.$refs['table'].searchPage(this.keyword)
        } else {
          this.$refs['table'].loadPage()
        }
      },
      changeSelection(val){
        this.selection = val || []
      },
      onChangePage(pager){
        this.pager = pager || {}
      },
      handleClearSelection(){
        this.selection = []
        this.$refs['table'].clearSelection()
      },
      removeItem(a) {
        const value = this.selection.filter(item => a[pk] != item[pk])
        this.selection = value
        this.$emit('input', this.selection)
      },
      pageCurrent(){
        return this.pager.current
      },
      pageSize(){
        return this.pager.pageSize
      },
      pageTotal(){
        return this.pager.total
      },
      handlerChangePage(current) {
        this.$refs['table'].handlerChangePage(current)
      },
      handlerChangeSize(pageSize) {
        this.$refs['table'].handlerChangeSize(pageSize)
      },
    }
  }
</script>

