<template>
  <div class="table-page-search-wrapper">
    <!-- <a-form layout="inline" @keyup.enter.native="searchQuery"> -->
    <a-form :form="form" class="seacrh">
      <a-row :gutter="12">
        <a-col
          v-for="item in fieldAdd"
          :key="item.label"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          :xxl="8"
        >
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
            v-else-if="item.type==='textarea'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-input
              type="textarea"
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
              v-decorator="item.decorator"
              :placeholder="`请选择${item.label}`"
            >
              <a-select-option v-for="ele in item.selectList" :key="ele.label" :value="ele.value">
                {{ ele.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-else-if="item.type==='cascader'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-cascader
              v-decorator="item.decorator"
              :placeholder="`请选择${item.label}`"
              :options="item.selectList"/>
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
            v-else-if="item.type==='treeSelect'"
            :label-col="item.formItemLayout.labelCol"
            :wrapper-col="item.formItemLayout.wrapperCol"
            :label="item.label"
          >
            <a-tree-select
              v-decorator="item.decorator"
              style="width: 100%"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="item.selectList"
              :placeholder="`请选择${item.label}`"
              treeDefaultExpandAll
            >
              <!-- <span style="color: #08c" slot="title" slot-scope="{key, value}" v-if="key='0-0-1'">
                Child Node1 {{ value }}
              </span> -->
            </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :md="6" :sm="8">
          <span style="float: left;overflow: hidden;margin-left: 40px" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" size="large" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" size="large" icon="reload" style="margin-left: 8px">重置</a-button>
            <a @click="handleToggleSearch" style="margin-left: 8px" v-if="addField.length>2">
              {{ toggleSearchStatus ? '收起' : '展开' }}
              <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
            </a>
          </span>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
// import JInput from '@/components/jeecg/JInput'
// import {ListMixin} from '@/mixins/ListMixin'
// import { ListMixin } from '@/mixins/ListMixin'
export default {
  name: 'Search',
  // mixins: [ListMixin],
  data () {
    return {
      toggleSearchStatus:false,
      form: this.$form.createForm(this, { name: 'validate_other' })

    }
  },
  props: {
    addField: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.fieldAdd = this.addField.slice(0, 2)
  },
  methods: {
    searchQuery () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('search', values)
        }
      })
      // this.loadData(1);
    },
    searchReset () {
      if (this.form) {
        this.form.resetFields()
        this.$emit('resetList')
      }
    },
    handleToggleSearch(){
      // debugger
      console.log(this.addField)

      
      this.toggleSearchStatus = !this.toggleSearchStatus;
      if(this.toggleSearchStatus) this.fieldAdd = this.addField
      else this.fieldAdd = this.addField.slice(0, 2)
    },
  }
}
</script>

<style lang="scss" >
.seacrh{
  .ant-input{
    height: 40px !important;
  }
  .ant-select-selection--single{
    height: 40px !important;
  }
  .ant-select-selection__rendered{
    line-height: 38px !important;
  }
}
</style>
