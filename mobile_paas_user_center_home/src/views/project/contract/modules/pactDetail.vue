<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="740"
      :confirmLoading="confirmLoading"
      :visible="visible"
      :footer="null"
      @cancel="handleCancel">
      <a-spin :spinning="confirmLoading">
        <detail-list class="detail-layout">
          <detail-list-item-two term="项目名称">{{ this.proName }}</detail-list-item-two>
          <detail-list-item-two term="分包名称">{{ this.childName }}</detail-list-item-two>
        </detail-list>
        <a-table :columns="columns" :dataSource="data" bordered>
          <template slot="fileKey" slot-scope="text, record">
            <template v-if="record.fileKey !==''">
              <a-upload
                :action="action + 'upload'"
                :multiple="true"
                class="closeDis"
                @preview="handlePreview"
                :fileList="JSON.parse(record.fileKey)"
                @change="handleChange">
              </a-upload>
            </template>
          </template>
        </a-table>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
import { viewByPackageId } from '@/api/project/info/index'
import DetailList from '@/components/tools/DetailList'
import mixins from '@/mixin/index'
const DetailListItemTwo = DetailList.ItemTwo
export default {
  components: {
    DetailList,
    DetailListItemTwo
  },
  props: {
    proName: {
      type: String,
      default: ''
    },
    childName: {
      type: String,
      default: ''
    },
    childIds: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      title: '',
      confirmLoading: false,
      visible: false,
      data: [],
      columns: [
        {
          title: '合同编号',
          dataIndex: 'conCode',
          scopedSlots: { customRender: 'conCode' }
        },
        {
          title: '合同金额（万元）',
          dataIndex: 'comAmount',
          scopedSlots: { customRender: 'comAmount' }
        },
        {
          title: '合同签订时间',
          dataIndex: 'conDate',
          scopedSlots: { customRender: 'conDate' }
        },
        {
          title: '附件',
          dataIndex: 'fileKey',
          scopedSlots: { customRender: 'fileKey' }
        }
      ]
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    open () {
      this.title = '项目合同详细'
      this.visible = true
      this.$nextTick(() => {
        this._viewByPackageId(this.childIds)
      })
    },
    _viewByPackageId (id) {
      viewByPackageId({ packageId: id }).then(res => {
        this.data = res.data
        this.data.forEach(res => {
          if (!res.fileKey) {
            res.fileKey = ''
          }
        })
        this.data = [...this.data]
        console.log(this.data)
      })
    }
  },
  mixins: [mixins.upload]
}
</script>
