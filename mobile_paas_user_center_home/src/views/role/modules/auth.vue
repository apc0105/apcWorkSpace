<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-row>
        <a-col :span="20">
          <a-tree
            checkable
            @check="onCheck"
            :checkedKeys="checkedKeys"
            :treeData="treeData"
            @expand="onExpand"
            :expandedKeys="expandedKeysss"
            :checkStrictly="checkStrictly">
          </a-tree>
        </a-col>
        <a-col :span="4">
          <div class="drawer-bootom-button">
            <a-dropdown style="float: left" :trigger="['click']" placement="topCenter">
              <a-menu slot="overlay">
                <!-- <a-menu-item key="1" @click="switchCheckStrictly(1)">父子关联</a-menu-item>
                <a-menu-item key="2" @click="switchCheckStrictly(2)">取消关联</a-menu-item> -->
                <a-menu-item key="3" @click="checkALL">全部勾选</a-menu-item>
                <a-menu-item key="4" @click="cancelCheckALL">取消全选</a-menu-item>
                <a-menu-item key="5" @click="expandAll">展开所有</a-menu-item>
                <a-menu-item key="6" @click="closeAll">合并所有</a-menu-item>
              </a-menu>
              <a-button>
                树操作
                <a-icon type="up"/>
              </a-button>
            </a-dropdown>
          </div>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>
<script>
import { getTree, assignResource, findResourceByRoleId } from '@/api/role'
import { transform } from '@/utils/trans'

export default {
  props: {
    record: {
      type: Object,
      default: () => {
      }
    }
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.form.resetFields()
        this.defaultValues = []
      }
    }
  },
  data () {
    return {
      roleId: '',
      treeData: [],
      defaultCheckedKeys: [],
      checkedKeys: [],
      expandedKeysss: [],
      allTreeKeys: [],
      tree: [],
      autoExpandParent: true,
      checkStrictly: false,
      form: this.$form.createForm(this),
      maskClosable: false,
      title: '',
      visible: false,
      resource: [], // 所有操作
      confirmLoading: false
    }
  },
  methods: {
    add () {
      this.visible = true
      this.title = '角色权限配置'

      this.$nextTick(() => {
        this._getTree()
        this._findResourceByRoleId()
      })
    },
    _getTree () {
      this.confirmLoading = true
      return new Promise((resolve, reject) => {
        this.allTreeKeys = []
        const queryParam = {
          pageSize: 0,
          pageNum: 0,
          param: {
            frontAppCode: this.record.serverId
          }
        }
        getTree(queryParam).then(res => {
          res.data.list.forEach(ress => {
            ress.title = ress.name
            ress.key = ress.id
            this.confirmLoading = false
            this.allTreeKeys.push(ress.id)
          })
          this.treeData = transform(res.data.list, 'id', 'parentId', 'children')
          this.tree = res.data.list
        })
      })
    },
    onCheck (o, info) {
      if (this.checkStrictly) {
        this.checkedKeys = o.checked
      } else {
        this.checkedKeys = o
      }
    },
    close () {
      this.reset()
      this.visible = false
    },
    onExpand (expandedKeys) {
      console.log(expandedKeys)
      this.expandedKeysss = expandedKeys
      this.autoExpandParent = false
    },
    reset () {
      this.expandedKeysss = []
      this.checkedKeys = []
      this.defaultCheckedKeys = []
      this.loading = false
    },
    expandAll () {
      this.expandedKeysss = this.allTreeKeys
    },
    closeAll () {
      this.expandedKeysss = []
    },
    checkALL () {
      this.checkedKeys = this.allTreeKeys
    },
    cancelCheckALL () {
      this.checkedKeys = []
    },
    handleCancel () {
      this.close()
    },
    _findResourceByRoleId () {
      this.confirmLoading = true
      const param = {
        roleId: this.record.id,
        serverId: this.record.serverId
      }
      findResourceByRoleId(param).then(res => {
        this.checkedKeys = []
        res.data.map(item => {
          this.checkedKeys.push(item.id)
        })
        this.confirmLoading = false
      })
    },
    handleSubmit () {
      this.resource = []
      this.tree.forEach(res => {
        this.resource.push(res.id)
      })
      assignResource({
        resourceList: this.resource.filter(item => this.checkedKeys.indexOf(item) !== -1),
        roleId: this.record.id
      }).then((res) => {
        if (res.retCode === 200) {
          this.$message.success(res.message)
          this.loading = false
        } else {
          this.$message.error(res.message)
          this.loading = false
          this.close()
        }
        this.visible = false
      })
    }
  }
}
</script>
