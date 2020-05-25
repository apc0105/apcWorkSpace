<template>
  <div>
    <a-card>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item
                label="年份"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 14 }"
              >
                <a-input
                  v-decorator="[
                    'year',
                    {rules: [
                      { required: true, message: '请输入年份' },
                      { validator: validYear}
                    ]}
                  ]"
                  placeholder="请输入年份"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col>
              <a-form-item>
                <a-button type="primary" @click="getList" v-if="$permissionHandle('whole:getList')">查询</a-button>
                <!-- <a-button @click="refresh" v-if="$permissionHandle('whole:refresh')">重置</a-button> -->
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="集中采购项目" key="1">
          <a-table :columns="columns" :dataSource="data" :pagination="false" size="middle" :scroll="{x:1800}">
            <template
              v-for="col in title"
              :slot="col"
              slot-scope="text, record"
            >
              <div :key="col">
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.ID, col)"
                />
                <template v-else>{{ text }}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a @click="() => save(record.ID,record)" style="margin-right:10px">保存</a>
                  <a-popconfirm title="是否取消修改?" @confirm="() => cancel(record.ID)">
                    <a>取消</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="() => edit(record.ID)">修改</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="自行采购项目" key="2">
          <a-table :columns="columns" :dataSource="data" :pagination="false" size="middle" :scroll="{x:2000}">
            <template
              v-for="col in title"
              :slot="col"
              slot-scope="text, record"
            >
              <div :key="col">
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.ID, col)"
                />
                <template v-else>{{ text }}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a @click="() => save(record.ID,record)" style="margin-right:10px">保存</a>
                  <a-popconfirm title="是否取消修改?" @confirm="() => cancel(record.ID)">
                    <a>取消</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="() => edit(record.ID)">修改</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import { getList, savePro } from '@/api/statistical/whole/index'
const data = []
export default {

  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      form: this.$form.createForm(this),
      queryParam: {},
      title: [],
      columns: [],
      data: []
    }
  },
  mounted () {
    var nowDate = new Date()
    this.form.setFieldsValue({
      year: nowDate.getFullYear()
    })
    this.queryParam.proType = '1'
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          return new Promise((resolve, reject) => {
            this.queryParam.year = values.year
            getList(this.queryParam).then(res => {
              this.columns = res.data
              this.columns.forEach((res, index) => {
                if (index <= 2) {
                  delete res.scopedSlots
                }
              })
              this.columns = [...this.columns]
              this.columns.push({ title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' }, fixed: 'right', width: 100 })
              this.title = res.param.title
              this.data = res.param.list
              this.loading = false
            })
          })
        } else {
        }
      })
    },
    callback (key) {
      this.queryParam.proType = key
      this.getList()
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.ID)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      console.log(key)
      const newData = [...this.data]
      const target = newData.filter(item => key === item.ID)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key, record) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.ID)[0]
      if (target) {
        delete target.editable
        this.queryParam.id = key
        delete record.ID
        if ((Object.keys(record).filter(v => !record[v])).length > 0) {
          for (const k in record) {
            Object.keys(record).filter(v => !record[v]).forEach(res => {
              if (k === res) {
                record[k] = '　'
              }
            })
          }
        }
        this.queryParam.data = JSON.stringify(record)
        this.loading = true
        console.log(this.queryParam)
        return new Promise((resolve, reject) => {
          savePro(this.queryParam).then(res => {
            this.getList()
            this.loading = false
          })
        })
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.ID)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.ID)[0])
        delete target.editable
        this.data = newData
      }
    },
    // 验证年份
    validYear (rule, value, callback) {
      var reg = /^\d{4}$/
      if (!reg.test(value) && value !== undefined && value !== '') {
        callback(new Error('请输入正确的年份,如"2018"'))
      } else {
        callback()
      }
    },
    refresh () {
      this.queryParam.year = ''
      this.queryParam.data = ''
      this.form.setFieldsValue({
        year: ''
      })
      this.getList()
    }
  }
}
</script>
