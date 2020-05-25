import JsonPanel from '@/form-design/json-panel';
import DesignFormPanel from '@/form-design/design-form-panel';
import DesignMobilePanel from '@/form-design/design-mobile-panel';
import ToolPanel from '@/form-design/tool-panel';
import eventbus from '@/form-design/utils/eventbus';
import FormElement from '../form-props';
import { isLayoutLayout, isGridLayout } from '@/form-design/form-props';

export default {
  name: 'form-design-panel',
  components: { JsonPanel, DesignFormPanel, DesignMobilePanel, ToolPanel },
  props: {
    value: Object
  },
  data() {
    return {
      activeTab: 'pc',
      activeEl: null,
      formData: {}
    }
  },
  computed: {
    json() {
      return this.value
    },
    screenScroll() {
      if (!this.json || !this.json.config) {
        return false
      }
      return this.json.config.pageScroll == 1
    },
    pageFixed() {
      if (!this.json || !this.json.config) {
        return false
      }
      return this.json.config.fixed == 1
    },
    pageStyle() {
      const styles = []
      styles.push('background-color:' + this.json.config.bgColor)
      styles.push('width:' + this.json.config.formWidth)
      return styles.join(';')
    },
    pcStyle() {
      const styles = []
      styles.push('width:' + (Number.parseFloat(this.json.config.formWidth) + 32) + 'px')
      return styles.join(';')
    },
    formTitle() {
      return {}
    }
  },
  mounted() {
    eventbus.$on('addFormElement', this.addElement)

    eventbus.$on('deleteFormElement', this.deleteElement)

    eventbus.$on('moveFormElement', this.moveElement)

    eventbus.$on('activeFormElement', this.activeElement)
  },
  destroyed() {
    eventbus.$off('addFormElement')
    eventbus.$off('deleteFormElement')
    eventbus.$off('moveFormElement')
    eventbus.$off('activeFormElement')
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.formData = {}
    },
    moveElement({ element, beforeId }) {
      const elements = []
      if (beforeId == this.json.config.id) {
        elements.push(element)
        this.json.elements.forEach(item => {
          if (item.id != element.id) {
            elements.push(item)
          }
        })
      } else if (beforeId) {
        this.json.elements.forEach(item => {
          if (item.id != element.id) {
            elements.push(item)
            if (item.id == beforeId) {
              elements.push(element)
            }
          }
        })
        if (this.json.elements.length > elements.length) {
          elements.push(element)
        }
      } else {
        this.json.elements.forEach(item => {
          if (item.id != element.id) {
            elements.push(item)
          }
        })
        elements.push(element)
      }
      this.json.elements = elements
      this.emitInput({ ...this.json })
      this.emitActiveElement(element)
    },
    addElement(type, index, params = {}) {
      const el = FormElement[type].defaultValue(this.json.config)
      if (!el) return
      this.setLayoutElementAttr(el, params)
      if (index == null || index == undefined) {
        this.json.elements.push(el)
      } else {
        this.json.elements.splice(index + 1, 0, el)
      }
      this.emitInput({ ...this.json })
      this.emitActiveElement(el)
    },
    setLayoutElementAttr(el, params) {
      const { parentIndex, parentId, parentType } = params
      if (!parentId) {
        return
      }
      el.parentId = parentId
      el.parentType = parentType
      const parent = this.getElementById(parentId)
      if (!parent) {
        return
      }
      el.size = parent.size
      if (isGridLayout(parent.type)) {
        el.paddingLeft = '8px'
        el.paddingTop = '4px'
        el.paddingBottom = '4px'
        el.paddingRight = '8px'
        el.marginRight = '0px'
        el.marginLeft = '0px'
        el.marginTop = '0px'
        el.marginBottom = '0px'
        const row = Number.parseInt(parentIndex / parent.cells)
        const cell = Number.parseInt(parentIndex % parent.cells)
        parent.gridElement[row][cell].elementId = el.id
      } else {
        el.paddingRight = '4px'
        el.paddingLeft = '4px'
        el.paddingTop = '4px'
        el.paddingBottom = '4px'
        el.marginRight = '0px'
        el.marginLeft = '0px'
        el.marginTop = '0px'
        el.marginBottom = '0px'
        parent.cellElement[parentIndex].elementId = el.id
      }
      parent.cellElement = [...parent.cellElement]
    },
    deleteElement(el) {
      if (!el) return
      // 过滤元素自身及其子元素
      this.json.elements = this.json.elements.filter(item => item.id != el.id && item.parentId != el.id)
      this.deleteElementCell(el)
      this.emitInput({ ...this.json })
      this.emitActiveElement(null)
    },
    deleteElementCell(el) {
      const { parentId } = el
      if (!parentId) {
        return
      }
      const parent = this.getElementById(parentId)
      if (parent && parent.cellElement) {
        parent.cellElement = parent.cellElement.map(item => {
          if (item.elementId == el.id) {
            return { weight: item.weight }
          } else {
            return item
          }
        })
      }
    },
    emitActiveElement(el) {
      eventbus.$emit('activeFormElement', el)
    },
    isEqualEl(a, b) {
      if (!a || !b) {
        return false
      }
      return a.id == b.id
    },
    activeElement(el) {
      this.activeEl = el
    },
    handleClick(tab, event) {
      this.activeTab = tab.name
    },
    emitInput(e) {
      this.$emit('input', e)
    },
    getElementById(id) {
      const elements = this.json.elements.filter(item => item.id == id)
      return elements && elements.length > 0 ? elements[0] : null
    }
  }
}
