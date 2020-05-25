import { isGridLayout } from '@/form-design/form-props'

export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    mobile: Boolean,
    active: Boolean,
    index: Number
  },
  computed: {
    displayStyle() {
      return this.displayStyles()
    },
    marginStyle() {
      return this.marginStyles()
    },
    paddingStyle() {
      return this.paddingStyles()
    },
    bgBorderStyle() {
      return this.bgBorderStyles()
    },
    formItemStyle() {
      return this.formItemStyles()
    },
    formInnerStyle() {
      return this.formInnerStyles()
    }
  },
  methods: {
    displayStyles() {
      const styles = []
      if (this.mobile) {
        styles.push('display:block')
        if (this.data.display == 'block') {
          styles.push('width:' + this.data.width)
        } else {
          styles.push('width:100%')
        }
      } else {
        styles.push('width:' + this.data.width)
        styles.push('display:' + this.data.display)
      }
      return styles
    },
    marginStyles() {
      const styles = []
      if (this.data.marginTop) {
        styles.push(`margin-top:${this.data.marginTop}`)
      }
      if (this.data.marginBottom) {
        styles.push(`margin-bottom:${this.data.marginBottom}`)
      }
      if (this.mobile) {
        // 判断是负数 不为空 不为 负数 margin
        const isMargin = str => str && typeof str === 'string' && str.indexOf('-') < 0 && str != '0px'
        const margin = null
        if (isMargin(this.data.marginLeft)) {
          styles.push(`margin-left:${this.data.marginLeft}`)
          if (isMargin(this.data.marginRight)) {
            styles.push(`margin-right:${this.data.marginRight}`)
          } else {
            styles.push(`margin-right:${this.data.marginLeft}`)
          }
        } else if (isMargin(this.data.marginRight)) {
          styles.push(`margin-right:${this.data.marginRight}`)
          styles.push(`margin-left:${this.data.marginRight}`)
        }
      } else {
        if (this.data.marginLeft) {
          styles.push(`margin-left:${this.data.marginLeft}`)
        }
        if (this.data.marginRight) {
          styles.push(`margin-right:${this.data.marginRight}`)
        }
      }
      return styles
    },
    paddingStyles() {
      const styles = []
      if (this.data.paddingTop) {
        styles.push(`padding-top:${this.data.paddingTop}`)
      }
      if (this.data.paddingBottom) {
        styles.push(`padding-bottom:${this.data.paddingBottom}`)
      }
      if (this.data.paddingLeft) {
        styles.push(`padding-left:${this.data.paddingLeft}`)
      }
      if (this.data.paddingRight) {
        styles.push(`padding-right:${this.data.paddingRight}`)
      }
      return styles
    },
    bgBorderStyles() {
      const styles = []
      if (this.data.controlBgColor) {
        styles.push('background-color:' + this.data.controlBgColor)
      }
      if (this.data.controlBorderStyle && this.data.controlBorderWidth && !isGridLayout(this.data.type)) {
        styles.push(`border:${this.data.controlBorderWidth} ${this.data.controlBorderStyle} ${this.data.controlBorderColor}`)
      }
      if (this.data.controlBorderRadius) {
        styles.push(`border-radius:${this.data.controlBorderRadius}`)
      }
      return styles
    },
    formItemStyles() {
      const styles = [...this.displayStyles()]
      return styles.join(';')
    },
    formInnerStyles() {
      const styles = [...this.marginStyles(), ...this.paddingStyles(), ...this.bgBorderStyles()]
      return styles.join(';')
    }
  }
}
