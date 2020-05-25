import ElDnd from '@/directive/el-dnd'
import DragDropMixins from '@/form-design/mixins/drag-drop-mixins'
import FdFormItemMixins from '@/form-design/mixins/fd-form-item-mixins'
import eventbus from "@/form-design/utils/eventbus";
import { isLayout, isGridLayout } from "@/form-design/form-props";

export default{
  name: 'form-design-el',
  mixins: [DragDropMixins, FdFormItemMixins],
  directives: { ElDnd },
  props: {
    data: {
      type: Object,
      default: {}
    },
    config: Object,
    mobile: Boolean,
    active: Boolean,
    index: Number,
  },
  data(){
    return {
      mergeFlag: false,
    }
  },
  watch: {
    data(val){
    }
  },
  computed: {
    classObject(){
      return {
        ...this.dropClass,
        'form-el-active': this.active
      }
    },
    dndDropData (){
      return {
        group: this.dndGroupName,
        dndAdd: false,
        dragEnable: this.mergeFlag ? false : true,
        dropEnable: true,
        elementId: this.data.id,
        element: this.data,
        elType: this.data.type,
        index: this.index,
        dragSource: this.isLayout ? 'form-el-drag' : null,
      }
    },
    isLayout(){
      return isLayout(this.data.type)
    },
    isGridLayout(){
      return isGridLayout(this.data.type)
    },
    isConfig(){
      return this.data.id == this.config.id
    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
    },
    activeElement(){
      if (this.isConfig) {
        eventbus.$emit('activeFormConfig')
      } else {
        eventbus.$emit('activeFormElement', this.data)
      }
    },
    deleteElement(){
      eventbus.$emit('deleteFormElement', this.data)
    },
    getPrevIndex(){
      return this.index
    },
    getPrevId(){
      return this.data.id
    },
    dragDropByChild(){
      this.closeClassStyle()
    },
    mergeGrid(){
      this.mergeFlag = !this.mergeFlag
      const component = this.$slots.default[0]
      component.context.$refs[this.data.id][0].toggleMergeModel(this.mergeFlag)
    },
  }
}
