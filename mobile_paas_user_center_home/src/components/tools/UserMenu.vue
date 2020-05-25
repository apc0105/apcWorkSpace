<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <a href="javascript:;" @click="goHome">
        <span class="action">
          <a-icon type="home" style="margin-top:10px;"/>
        </span>
      </a> -->
      <!-- <notice-icon class="action"/> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar style="backgroundColor:#ccc"
                    icon="user" />
          <span>{{ nickname() }}</span>
        </span>
        <a-menu slot="overlay"
                class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <a @click="updatePwd">
              <a-icon type="user" />
              <span>修改密码</span>
            </a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a href="javascript:;"
               @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <!-- 修改密码 -->
      <a-modal title="修改密码"
               :visible="visible"
               @ok="handleOk"
               :confirmLoading="confirmLoading"
               @cancel="handleCancel"
               destroyOnClose>
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout"
                       label="旧密码">
            <a-input v-decorator="[
                'oldPwd',
                {
                  rules: [{
                    required: true, message: '请输入旧密码!',
                  }, {
                    validator: validateToNextPassword,
                  }],
                }
              ]"
                     type="password" />
          </a-form-item>
          <a-form-item v-bind="formItemLayout"
                       label="新密码">
            <a-input v-decorator="[
                'newPwd',
                {
                  rules: [{
                    required: true, message: '请输入新密码!',
                  }, {
                    validator: validateToNextPassword,
                  }],
                }
              ]"
                     type="password" />
          </a-form-item>
          <a-form-item v-bind="formItemLayout"
                       label="确认新密码">
            <a-input v-decorator="[
                'confirm',
                {
                  rules: [{
                    required: true, message: '请再次输入新密码!',
                  }, {
                    validator: compareToFirstPassword,
                  }],
                }
              ]"
                     type="password"
                     @blur="handleConfirmBlur" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import {  removeToken } from '@/utils/auth'
import { updatePwd } from '@/api/login'
import { FedLogOut } from '@/api/login'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  data () {
    return {
      userParams: {},
      confirmDirty: false,
      visible: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      form: this.$form.createForm(this),
      confirmLoading: false,
      id:''
    }
  },
  methods: {
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('newPwd')) {
        callback('您输入的两个密码不一致!')
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    updatePwd () {
      this.visible = true
    },
    handleOk (e) {
      this.confirmLoading = true
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const userid = JSON.parse(window.localStorage.message).id
          console.log( JSON.parse(window.localStorage.message).id)
          updatePwd({ id: userid, password: values.oldPwd, newPassword: values.newPwd }).then(res => {//
            // alert('我进入了修改密码接口')
            if (res.retCode !== 200) {
              this.$message.error(res.message)
            } else {
              this.$message.success(res.message)
              this.$store.dispatch('FedLogOut').then(() => {
                setTimeout(() => {
                  window.location.reload()
                }, 16)
                // location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }
            this.visible = false
            this.confirmLoading = false
          })
        }
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    goHome () {
      this.$router.push('/home')
    },
    handleLogout () {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          that.$store.dispatch('FedLogOut').then(() => {
            removeToken()
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          // window.localStorage.removeItem('id')
          // location.reload() 
          // this.$router.push({path:'/'})
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
