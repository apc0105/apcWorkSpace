import eventbus from '@/form-design/utils/eventbus'

export default {
  props: {},
  data() {
    return {
      dndGroupName: 'form-design',
      dropClass: {
        'form-dnd-enter': false,
        'form-dnd-over': false,
        'form-dnd-drag': false
      }
    }
  },
  computed: {
    dndAttr() {
      return {
        'dragStart': this.dragStart,
        'dragOver': this.dragOver,
        'dragLeave': this.dragLeave,
        'dragEnd': this.dragEnd,
        'dragDrop': this.dragDrop,
        'dragMove': this.dragMove,
        'dropEnd': this.dropEnd
      }
    }
  },
  methods: {
    dragStart(e) {
      this.dropClass['form-dnd-drag'] = true
    },
    dragEnter(e) {
      const detail = e.detail || {}
      const source = detail.source || {}
      if (this.getDropDisable(source)) {
        this.closeClassStyle()
      } else {
        this.dropClass['form-dnd-enter'] = true
      }
    },
    dragOver(e) {
      const detail = e.detail || {}
      const source = detail.source || {}
      if (this.getDropDisable(source)) {
        this.closeClassStyle()
      } else {
        this.dropClass['form-dnd-over'] = true
      }
    },
    dragLeave(e) {
      this.dropClass['form-dnd-over'] = false
      this.dropClass['form-dnd-enter'] = false
    },
    dragMove(e) {
      // console.log('dragMove:', e.type)
    },
    dragEnd(e) {
      this.closeClassStyle()
    },
    dropEnd(e) {
      this.closeClassStyle()
    },
    dragDrop(e) {
      this.closeClassStyle()
      const detail = e.detail || {}
      const source = detail.source || {}
      if (this.getDropDisable(source)) {
        return
      }
      if (source.dndAdd) {
        // 拖放新增
        const data = source.data || {}
        if (data.name) {
          const index = this.getPrevIndex()
          const params = this.getDropParam()
          eventbus.$emit('addFormElement', data.name, index, params)
        }
      } else {
        // 拖放排序
        const element = source.element
        const beforeId = this.getPrevId()
        eventbus.$emit('moveFormElement', {
          element, beforeId
        })
      }
    },
    getDropParam() {
      return {}
    },
    getDropDisable(source) {
      return false
    },
    getPrevIndex() {
    },
    getPrevId() {
    },
    closeClassStyle() {
      this.dropClass = {
        'form-dnd-enter': false,
        'form-dnd-over': false,
        'form-dnd-drag': false
      }
    }
  }
}
