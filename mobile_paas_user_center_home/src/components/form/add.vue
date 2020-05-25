<template>
  <a-modal
    :width="modalWidth"
    :title="modalTitle"
    :visible="addVisible"
    @ok="handleAddOk"
    :confirmLoading="modalLoading"
    @cancel="handleAddCancel"
    destroyOnClose
  >
    <a-form :form="form">
      <a-row>
        <a-col
          v-for="item in addField"
          :key="item.label"
          :xs="item.colItemLayout.xs"
          :sm="item.colItemLayout.sm"
          :md="item.colItemLayout.md"
          :lg="item.colItemLayout.lg">

          <a-form-item
            v-if="item.type==='input'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-input
              v-decorator="item.decorator"
              :placeholder="`请输入${item.label}`"
            />
          </a-form-item>
          <a-form-item
            class="formInput"
            v-if="item.type==='inputSuffix'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-input
              :addonAfter="item.suffix"
              type="number"
              v-decorator="item.decorator"
              :placeholder="`请输入${item.label}`"
            />
          </a-form-item>
          <a-form-item
            v-else-if="item.type==='date'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-date-picker
              format="YYYY-MM-DD"
              :getCalendarContainer="getParentContainer"
              v-decorator="item.decorator"
              :placeholder="`请输入${item.label}`"/>

          </a-form-item>
          <a-form-item
            v-else-if="item.type==='textarea'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-textarea
              :rows="3"
              v-decorator="item.decorator"
              :placeholder="`请输入${item.label}`"
            />

          </a-form-item>
          <a-form-item
            v-if="item.type==='radio'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-radio-group v-decorator="item.decorator">
              <a-radio v-for="ele in item.selectList" :key="ele.label" :value="ele.value">
                {{ ele.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-else-if="item.type==='checkbox'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-checkbox-group
              v-decorator="item.decorator"
              style="width: 100%;"
            >
              <a-row>
                <a-col :span="8">
                  <a-checkbox v-for="ele in item.selectList" :key="ele.label" :value="ele.value">
                    {{ ele.label }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item
            v-else-if="item.type==='select'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-select
              style="width: 100%;"
              v-decorator="item.decorator"
              :getPopupContainer="getParentContainer"
              :placeholder="`请选择${item.label}`"
            >
              <a-select-option v-for="ele in item.selectList" :key="ele.label" :value="ele.value">
                {{ ele.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-else-if="item.type==='treeSelect'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-tree-select
              :getPopupContainer="getParentContainer"
              v-decorator="item.decorator"
              style="width: 100%"
              :disabled="item.disabled"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="item.selectList"
              :placeholder="`请选择${item.label}`"
              treeDefaultExpandAll
            >
            </a-tree-select>
          </a-form-item>
          <a-form-item
            v-else-if="item.type==='switch'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <!-- <a-switch v-decorator="item.decorator" /> -->
            <a-switch
              :checkedChildren="item.text[0]"
              :unCheckedChildren="item.text[1]"
              v-decorator="item.decorator" />
          </a-form-item>
          <a-form-item
            v-else-if="item.type==='field'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <uploadField
              ref="uploadRefs"
              :len="item.len"
              v-decorator="item.decorator"
              :fieldName="item.decorator[0]"
              :imgList="item.fileList"
              :multiple="item.multiple"
              @getPath="getPath"
            ></uploadField>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import uploadField from './uploadField'
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'validate_other' })
    }
  },
  beforeCreate () {
    // this.form = this.$form.createForm(this, { name: 'validate_other' });
  },
  components: {
    uploadField
  },
  props: {
    addVisible: {
      type: Boolean,
      default: false
    },
    modalWidth: {
      type: String,
      default: '60%'
    },
    modalTitle: {
      type: String,
      default: '60%'
    },
    modalLoading: {
      type: Boolean,
      default: false
    },
    addField: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleAddOk () {
      // debugger
      this.form.validateFields((err, values) => {
        if (!err) {
          console.info('success')
            // console.log(values)
             
            this.$emit('changeAddFormModal', false, 'add', values)
        }
      })
      },
    handleAddCancel () {
      this.reset()
      this.$emit('changeAddFormModal', false, 'remove')
    },
    getPath (val, fieldName) {
      console.log(val, fieldName)
      this.form.setFieldsValue({
        [fieldName]: val
      })
      // this.$emit('getFileList', val, fieldName)
    },
    reset () {
      if (this.form) {
        this.form.resetFields()
        }
    },
    /** 辅助方法：指定a-select 和 j-data 的父容器 */
    getParentContainer (node) {
      const element = (() => {
        // nodeType 8	: Comment	: 注释
        if (this.$el && this.$el.nodeType !== 8) {
          return this.$el
        }
        const doc = document.getElementById(this.caseId + 'inputTable')
        if (doc != null) {
          return doc
        }
        return node.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      })()

      // 递归判断是否带有 overflow: hidden；的父元素
      const ifParent = (child) => {
        let currentOverflow = null
        if (child['currentStyle']) {
          currentOverflow = child['currentStyle']['overflow']
        } else if (window.getComputedStyle) {
          currentOverflow = window.getComputedStyle(child)['overflow']
        }
        if (currentOverflow != null) {
          if (currentOverflow === 'hidden') {
            // 找到了带有 hidden 的标签，判断它的父级是否还有 hidden，直到遇到完全没有 hidden 或 body 的时候才停止递归
            const temp = ifParent(child.parentNode)
            return temp != null ? temp : child.parentNode
          } else
          // 当前标签没有 hidden ，如果有父级并且父级不是 body 的话就继续递归判断父级
          if (child.parentNode && child.parentNode.tagName.toLocaleLowerCase() !== 'body') {
            return ifParent(child.parentNode)
          } else {
            // 直到 body 都没有遇到有 hidden 的标签
            return null
          }
        } else {
          return child
        }
      }

      const temp = ifParent(element)
      return (temp != null) ? temp : element
    }
  }

}
</script>

<style lang="scss" scoped>
.ant-form-item{
  margin-bottom: 25px;
}
.ant-form{
   label{
     font-size: 13px;
   }
}
</style>
