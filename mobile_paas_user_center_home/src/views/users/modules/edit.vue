<template>
  <a-modal :maskClosable="maskClosable"
           :title="title"
           :width="640"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           @cancel="handleCancel"
           destroyOnClose>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="姓名"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-input v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入姓名' }, { validator: this.alidateRequire }] }
            ]"
                   placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="账号"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-input v-decorator="[
              'account',
              { rules: [{ required: true, message: '请输入账号' }, { validator: this.alidateRequire }] }
            ]"
                   placeholder="请输入账号" />
        </a-form-item>
        <a-form-item label="密码"
                     v-if="this.title==='用户管理新增'"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-input-password v-decorator="['password', { rules: [{ required: true, message: '请输入密码',trigger: 'blur' },{ validator: checkUserPassword }] }]"
                            placeholder="请输入密码" />
        </a-form-item>
        <a-form-item label="手机号"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-input v-decorator="['phone', { rules: [{ required: true, message: '请输入手机号',trigger: 'blur' },{ validator: checkUserPhone }] }]"
                   placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item label="email"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-input v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: '请输入email' },
                  { type: 'email', message: 'email格式有误' }
                ]
              }
            ]"
                   placeholder="请输入email" />
        </a-form-item>
        <a-form-item label="状态"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-select placeholder="请选择状态"
                    v-decorator="['state', { rules: [{ required: true, message: '请选择状态' }] }]">
            <a-select-option value="0">禁用</a-select-option>
            <a-select-option value="1">正常</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="部门"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-tree-select :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                         :treeData="treeData"
                         placeholder="请选择部门"
                         treeDefaultExpandAll
                         v-decorator="['depId', { rules: [{ required: true, message: '请选择部门' }] }]"></a-tree-select>
        </a-form-item>
        <a-form-item label="是否隐藏号码"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-radio-group v-model="isHide">
            <a-radio :value="0">否</a-radio>
            <a-radio :value="1">是</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="是否在通讯录显示"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-radio-group v-model="isMail">
            <a-radio :value="0">否</a-radio>
            <a-radio :value="1">是</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="头像上传"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-upload listType="picture-card"
                    class="avatar-uploader"
                    :showUploadList="false"
                    :beforeUpload="beforeUpload"
                    :customRequest="uploadImg"
                    @change="handleChange"
                    v-decorator="['headId', {  rules: [{ required: true, message: '请选择账号类型' }]}]"
                    ,>
            <img v-if="imageUrl"
                 :src="imageUrl"
                 alt="avatar"
                 style="max-width:100px;max-height:100px" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="账号类型"
                     :label-col="{ span: 6 }"
                     :wrapper-col="{ span: 12 }">
          <a-select placeholder="请选择账号类型"
                    v-decorator="['userRole', { rules: [{ required: true, message: '请选择账号类型' }] }]">
            <a-select-option value="1">普通用户</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { isvalidRequire } from '@/utils/validate'
import { userModify, getTreeList } from '@/api/classify' // addResClassification,
import { uploadFile } from '@/api/file'
import { transform } from '@/utils/trans'
import pick from 'lodash.pick'
import { getToken } from '@/utils/auth'
// import { requiredRule } from '@/utils/rule'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  mounted () {
    console.log(this.record)
  },
  props: {
    record: {//接受index传递过来的行信息
      type: Object,
      default: () => { }
    },
    orgId: {//接受index传递过来的行信息
      type: String,
    }
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.form.resetFields()
      }
    }
  },
  data () {
    return {
      headers: {
        'Access-Token': getToken()
      },
      loading: false,
      imageUrl: '',
      isMail: 0,
      isHide: 0,
      maskClosable: false,
      title: '',
      treeData: [],
      visible: false,
      popover: false,
      treeParams: {
        sessionOrgId: 1,
        sessionUserId: 1,
        pageSize: 100,
        pageNum: 0
      },
      params: {
      },
      confirmLoading: false,
      value: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // created(){
    //   this.params.orgId = window.localStorage.message.id
    // },

    handleChange (info) {
      console.log('打印返回值', info)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.imageUrl = this.$DOWNLOAD_URL.DOWNLOAD_URL + this.params.headId;
        this.loading = false;
      }
    },
    beforeUpload (file) {

      const isJPG = file.type === 'image/jpeg' || 'image/png'
      if (!isJPG) {
        this.$message.error('您只能上传JPG或PNG文件!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图像必须小于2MB!')
      }
      return isJPG && isLt2M
    },
    // // 验证不能输入特殊字符
    alidateRequire (rule, value, callback) {
      if (!isvalidRequire(value) && value !== undefined) {
        callback(new Error('数据不能包含特殊字符'))
      } else {
        callback()
      }
    },
    checkUserPhone (rule, value, callback) {
      const form = this.form
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
        callback('手机号格式错误')
      } else {
        callback()
      }
    },
    checkUserPassword (rule, value, callback) {
      const form = this.form
      if (!value && value.length < 6) {
        callback(new Error('密码长度不能小于6'))
      } else {
        callback()
      }
    },
    add () {
      this.visible = true
      this.$nextTick(() => {
        this.title = '用户管理新增'
        this.params.orgId = parseInt(JSON.parse(window.localStorage.message).orgId)
        this._findTree()
      })

    },
    update () {//执行更新 visible:对话框是否可见
      this.visible = true
      this.$nextTick(() => {//在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。
        this._findTree()
        this.title = '用户管理修改'
        this.params.orgId = this.record.orgId
        this.fileLists = this.recor
        this.isMail = parseInt(this.record.isHide)
        this.isHide = parseInt(this.record.isMail)
        this.form.setFieldsValue({
          headId: this.record.headId
        })
        this.form.setFieldsValue(//设置一组输入控件的值
          pick(this.record, 'name', 'account', 'phone', 'state', 'depId', 'email', 'userRole', 'isHide', 'isMail', 'password', 'headId')
        )
        this.imageUrl = this.$DOWNLOAD_URL.DOWNLOAD_URL + this.record.headId;
        console.log('this.imageurl', this.imageUrl)
      })
    },
    _findTree () {
      return new Promise((resolve, reject) => {
        getTreeList(this.orgId).then(res => {//通过id查找本行所有数据
          res.data.forEach(res => {
            res.title = res.depName
            res.key = res.id
            res.value = res.id
          })
          this.treeData = transform(res.data, 'id', 'parId', 'children')//将数据变成树的形式
        })
      })
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('打印!!!values', values)
          return new Promise((resolve, reject) => {
            this.params.account = values.account
            this.params.name = values.name
            // this.params.password = values.password

            this.params.password = this.record.password

            this.params.phone = values.phone
            this.params.email = values.email
            this.params.state = values.state
            this.params.isHide = this.isHide
            this.params.isMail = this.isMail
            this.params.id = this.record.id
            this.params.userRole = values.userRole
            this.params.depId = values.depId
            console.log('打印params', this.params)
            userModify(this.params).then(res => {
              setTimeout(() => {
                this.visible = false
                this.confirmLoading = false
              }, 200)
              if (res.retCode === 200) {
                this.$message.success(res.message)
              } else {
                this.$message.error(res.message)
              }
              this.params.id = ''
              this.$emit('getList')
            })
            this.form.resetFields()
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    submitAdd (values) {
      this.params.name = values.name
      this.params.subName = values.subName
      this.params.parentId = values.parentId
      addResClassification(this.params).then(res => {
        this.success(res)
      })
    },
    submitUpdate (values) {
      this.params.name = values.name
      this.params.subName = values.subName
      this.params.parentId = values.parentId
      if (this.params.parentId === '无') {
        this.params.parentId = 0
        modify(this.params).then(res => {
          this.success(res)
          this.params.id = ''
        })
      }
    },
    success (res) {
      setTimeout(() => {
        this.visible = false
        this.imageUrl = ''
        this.confirmLoading = false
      }, 200)
      if (res.retCode === 200) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
      this.$emit('getList')
    },
    handleCancel () {
      this.imageUrl = ''
      this.visible = false
    },
    uploadImg (data) {
      const formData = new FormData()
      formData.append('file', data.file)

      uploadFile(this.$UPLOAD_URL.UPLOAD_URL, formData).then(res => {
        if (res.retCode === 200) {
          this.params.headId = res.data[0].fileId;
          this.$message.success(res.message)
          data.onSuccess();
          this.loading = false;
        } else {
          this.$message.error(res.message)
          data.onError()
          this.loading = false;
        }
      })

    }
  }
}
</script>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
