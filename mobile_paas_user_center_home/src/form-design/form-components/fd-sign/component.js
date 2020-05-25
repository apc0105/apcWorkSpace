import FdControlMixins from '../fd-control-mixin'
import Drawer from './drawer'
import DrawerBg from './drawer-bg'
import request from '@/utils/flowrRequest'
import { mapGetters } from 'vuex'
import { fetchSign } from '@/api/homePage'

export default {
  name: 'fd-sign',
  mixins: [FdControlMixins],
  components: { Drawer, DrawerBg },
  props: {
    value: Array
  },
  data() {
    return {
      visible: false,
      signItem: {
        id: new Date().getTime()
      },
      zoom: 5,
      commonComment: ''
    }
  },
  created() {
    this.init()
  },
  computed: {
    // 获取当前用户名作为签名者
    ...mapGetters([
      'userInfo'
    ]),
    stateValue() {
      return this.value || []
    },
    showSign() {
      return this.data.readonly === 0
    },
    signEnable() {
      return this.data.signEnable === 1
    },
    signImageStyle() {
      const styles = []
      styles.push(`width:${this.data.signWidth}`)
      styles.push(`height:${this.data.signHeight}`)
      styles.push(`line-height:${this.data.signHeight}`)
      return styles.join(';')
    },
    dialogWidth() {
      return (this.getNumber(this.data.signWidth) * this.zoom + 40) + 'px'
    },
    drawerStyle() {
      const styles = []
      styles.push(`width:${this.getNumber(this.data.signWidth) * this.zoom}px`)
      styles.push(`height:${this.getNumber(this.data.signHeight) * this.zoom}px`)
      styles.push(`margin-top:8px`)
      return styles.join(';')
    },
    drawerWidth() {
      return this.getNumber(this.data.signWidth) * this.zoom
    },
    drawerHeight() {
      return this.getNumber(this.data.signHeight) * this.zoom
    },
    lineWidth() {
      return this.data.signLineWidth || 6
    }
  },
  methods: {
    init() {
      // if (!this.readonly) {
      //
      // }
    },
    autoLoadSign(auto, callback) {
      this.loadSign(callback)
      // if (auto === 1 && !this.sign) {
      //   this.loadSign()
      // }
    },
    open() {
      const [tempItem] = this.stateValue.filter(item => item.userCode === this.userInfo.code && item.isNew)
      this.signItem = tempItem
      if (!this.signItem) {
        this.signItem = {
          id: new Date().getTime(),
          signEnable: 0
        }
      }
      this.data.signEnable = 0
      this.visible = true
      this.autoLoadSign(this.data.signAutoLoad, res => {
        this.signItem.signEnable = res
        this.data.signEnable = res
      })
    },
    close() {
      this.visible = false
    },
    confirm() {
      this.getDrawerSign(data => {
        this.close()
        this._inputSign(data)
        this._input()
      })
    },
    confirmSave() {
      this.getDrawerSign(data => {
        this.close()
        this._inputSign(data)
        this._input()
        // this.saveSign(data)
      })
    },
    getDrawerSign(callback) {
      if (!this.signItem.comment) {
        return this.$notify({
          title: '提示',
          message: '请输入签批意见',
          type: 'warning',
          duration: 2000
        })
      }
      if (!this.signEnable) {
        return callback && callback()
      }
      const data = this.$refs['drawer'].getSign()
      callback && callback(data)
      // if (data) {
      //   callback && callback(data)
      // } else {
      //   this.$notify({
      //     title: '提示',
      //     message: '请签名',
      //     type: 'warning',
      //     duration: 2000
      //   })
      // }
    },
    loadSign(callback) {
      // console.log(this.userInfo)
      fetchSign().then(res => {
        if (res.code === 200 && res.data) {
          this.$refs['drawer'].showSign(res.data.signImage)
          this._inputSign(res.data.signImage)
          if (callback) callback(1)
          return
        }
        if (callback) callback(0)
        //   this.$notify({
        //     title: '提示',
        //     message: '暂无签名',
        //     type: 'warning',
        //     duration: 2000
        //   })
        // }
        // this.clearDrawer()
      })
      // request({
      //   url: '/demo/users/sign',
      //   method: 'get'
      // }).then(data => {
      //   const src = data.data.src
      //   this._inputSign(src)
      //   // this.clearDrawer()
      // })
    },
    saveSign(src) {
      request({
        url: '/demo/users/sign',
        method: 'post',
        data: { src: src }
      }).then(data => {
        this.$notify({
          title: '提示',
          message: '签名已更新',
          type: 'success',
          duration: 2000
        })
      })
    },
    clearDrawer() {
      // this.$refs['drawer'].clear()
      this.signItem = {
        ...this.signItem,
        sign: null
      }
    },
    _inputSign(sign) {
      if (this.signItem.userCode === this.userInfo.code && this.signItem.isNew) {
        this.signItem.sign = sign
        this.signItem.signEnable = (this.data.signEnable === 1 && sign) ? 1 : 0
      } else {
        this.signItem = {
          ...this.signItem,
          sign: sign,
          signEnable: (this.data.signEnable === 1 && sign) ? 1 : 0,
          signTime: new Date().getTime(),
          userName: this.userInfo.name, // '测试用户'，
          userCode: this.userInfo.code,
          isNew: true
        }
      }
    },
    _input() {
      const index = this.stateValue.findIndex(item => item.userCode === this.userInfo.code && item.isNew)
      if (index > -1) {
        this.stateValue.splice(index, 1)
      }
      this.stateValue.push(this.signItem)
      this.input([...this.stateValue])
    },
    changeCommonComment(val) {
      this.signItem.comment = val
    }
  }
}
