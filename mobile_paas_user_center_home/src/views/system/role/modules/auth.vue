<template>
  <div>
    <a-modal
      :maskClosable="maskClosable"
      :title="title"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item>
          <a-tree
            checkable
            :treeData="treeData"
            v-model="checkedKeys"
            @select="onSelect"
            @check="changeKeys"

          />
          <input :value="rowss" type="hidden" ref="hiddenInput">
        </a-form-item>
        <a-form-item >
          <a-button
            type="primary"
            @click="handleSubmit"
            style="float:right">
            保存
          </a-button>
          <a-button
            style="float:right;margin-right:10px;"
            @click="close"
          >
            取消
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>

import { reTree, saveReTree } from '@/api/system/role/index'
import { transform } from '@/utils/trans'
export default {
  props: {
    rowss: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      maskClosable: false,
      visible: false,
      confirmLoading: false,
      treeData: [],
      title: '',
      tree: [],
      saveParam: {},
      checkedKeyss: [],
      checkedKeys: [],
      e: {},
      yx: [],
      form: this.$form.createForm(this)
    }
  },
  methods: {
    _findTree (id) {
      return new Promise((resolve, reject) => {
        reTree({ id: id }).then(res => {
          this.treeData = transform(res.data.resourceIds, 'key', 'parId', 'children')
          this.yx = res.data.resourceAuto
          if (res.data.resourceAuto.length) {
            this.checkedKeys = []
            res.data.resourceAuto.forEach(val => {
              this.checkedKeys.push(val.operId)
              // if (val.operId === null) {
              //   this.checkedKeys.push(val.resId)
              // }
            })
          } else {
            this.checkedKeys = []
          }
        })
      })
    },
    close () {
      this.visible = false
    },
    handleSubmit (e) {
      e.preventDefault()
      const auth = []
      if (this.e.halfCheckedKeys === undefined) {
        this.yx.forEach(res => {
          if (res.operId !== null) {
            auth.push({ operId: res.operId, resId: res.resId })
          } else {
            auth.push({ resId: res.resId })
          }
          console.log(auth)
        })
      } else {
        if (this.e.halfCheckedKeys.length !== 0) {
          this.e.halfCheckedKeys.forEach(val => {
            auth.push({ resId: val })
          })
        }
      }
      this.checkedKeyss.forEach(val => {
        this.tree.forEach(ele => {
          if (val === ele.key) {
            if (ele.type === 1) {
              auth.push({ resId: ele.key })
            } else if (ele.type === 2) {
              auth.push({ operId: ele.key, resId: ele.parId })
            }
          }
        })
      })
      const data = {
        roleId: this.$refs.hiddenInput.value,
        ids: JSON.stringify(auth)
      }
      saveReTree(data).then(res => {
        this.visible = false
        if (res.retCode === 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
        this.$emit('getList')
      })
    },
    add () {
      this.visible = true
      this.title = '角色授权'
      this.$nextTick(() => {
        this._findTree(this.$refs.hiddenInput.value)
        reTree({ id: this.$refs.hiddenInput.value }).then(res => {
          this.tree = res.data.resourceIds
        })
      })
    },
    handleCancel () {
      this.visible = false
    },
    changeKeys (checkedKeys, e) {
      this.checkedKeyss = checkedKeys
      this.e = e
    },
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}

</script>

// import { reTree, saveReTree } from '@/api/system/role/index'
// import { transform } from '@/utils/trans'
// export default {
//   props: {
//     rowss: {
//       type: String,
//       default: ''
//     }
//   },
//   data () {
//     return {
//       visible: false,
//       confirmLoading: false,
//       treeData: [],
//       title: '',
//       tree: [],
//       saveParam: {},
//       checkedKeyss: [],
//       checkedKeys: [],
//       e: {},
//       form: this.$form.createForm(this)
//     }
//   },
//   methods: {
//     _findTree (id) {
//       return new Promise((resolve, reject) => {
//         reTree({ id: id }).then(res => {
//           this.treeData = transform(res.data.resourceIds, 'key', 'parId', 'children')
//           if (res.data.resourceAuto.length) {
//             this.checkedKeys = []
//             res.data.resourceAuto.forEach(val => {
//               this.checkedKeys.push(val.operId)
//             })
//           } else {
//             this.checkedKeys = []
//           }
//         })
//       })
//     },
//     close () {
//       this.visible = false
//     },
//     handleSubmit (e) {
//       e.preventDefault()
//       const auth = []
//       if (this.e.halfCheckedKeys.length !== 0) {
//         this.e.halfCheckedKeys.forEach(val => {
//           auth.push({ resId: val })
//         })
//       }
//       this.checkedKeyss.forEach(val => {
//         this.tree.forEach(ele => {
//           if (val === ele.key) {
//             if (ele.type === 1) {
//               auth.push({ resId: ele.key })
//             } else if (ele.type === 2) {
//               auth.push({ operId: ele.key, resId: ele.parId })
//             }
//           }
//         })
//       })
//       const data = {
//         roleId: this.$refs.hiddenInput.value,
//         ids: JSON.stringify(auth)
//       }
//       saveReTree(data).then(res => {
//         this.visible = false
//         if (res.retCode === 200) {
//           this.$message.success(res.message)
//         } else {
//           this.$message.error(res.message)
//         }
//         this.$emit('getList')
//       })
//     },
//     add () {
//       this.visible = true
//       this.title = '角色授权'
//       this.$nextTick(() => {
//         this._findTree(this.$refs.hiddenInput.value)
//         reTree({ id: this.$refs.hiddenInput.value }).then(res => {
//           this.tree = res.data.resourceIds
//         })
//       })
//     },
//     handleCancel () {
//       this.visible = false
//     },
//     changeKeys (checkedKeys, e) {
//       this.checkedKeyss = checkedKeys
//       this.e = e
//     },
//     onSelect (selectedKeys, info) {
//       console.log('selected', selectedKeys, info)
//     }
//   }
// }

// </script>
