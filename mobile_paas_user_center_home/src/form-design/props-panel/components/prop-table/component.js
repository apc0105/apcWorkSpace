import PropsMixin from "../props-mixin";
import FdFormItem from "@/form-design/form-components/fd-form-item";

export default {
  name: 'prop-table',
  mixins: [PropsMixin],
  components: { FdFormItem },
  data(){
    return {
      visible: false,
      currentCascade: 1,
      cascade1: null,
      cascade2: null,
      options: [],
    }
  },
  computed: {
    elements(){
      let key = new Date().getTime()
      const renderItem = item => {
        item._id = item._id || key++
        item.childrens = item.childrens || []
      }
      if (this.currentCascade == 1) {
        this.options.forEach(item => renderItem(item))
        return this.options
      } else if (this.currentCascade == 2) {
        this.cascade1.childrens.forEach(item => renderItem(item))
        return this.cascade1.childrens
      } else if (this.currentCascade == 3) {
        this.cascade2.childrens.forEach(item => renderItem(item))
        return this.cascade2.childrens
      }
      return []
    },
    emptyOptions(){
      return !this.value || this.value.length == 0
    },
    labels(){
      const labels = []
      if (!this.emptyOptions) {
        this.value.forEach(row => {
          row.label && labels.push(row.label)
        })
      }
      if (labels.length == 0) {
        labels.push('点击设置')
      }
      return labels.join('、')
    },
  },
  created(){
    this.initValue()
    this.init()
  },
  methods: {
    initValue(){
      if (Array.isArray(this.value)) {
        const str = JSON.stringify(this.value)
        this.options = JSON.parse(str)
      } else {
        this.options = []
      }
    },
    init(){
      this.currentCascade = 1
    },
    gotoCascade(cascade){
      this.currentCascade = cascade
    },
    nextCascade(scope){
      this.currentCascade += 1
      if (this.currentCascade == 2) {
        this.cascade1 = scope.row
        if (!this.cascade1.childrens || this.cascade1.childrens.length == 0) {
          this.cascade1.childrens = [this.getNewItem()]
        }
      } else {
        this.cascade2 = scope.row
        if (!this.cascade2.childrens || this.cascade2.childrens.length == 0) {
          this.cascade2.childrens = [this.getNewItem()]
        }
      }
    },
    addRow(){
      this.elements.push(this.getNewItem())
    },
    getNewItem(){
      const item = {
        key: null,
        label: null,
        _id: new Date().getTime(),
        childrens: [],
      }
      return item
    },
    moveDown(scope){
      const index = scope.$index
      if (index >= this.elements.length - 1) {
        return
      }
      this.switchIndex(index, index + 1)
    },
    moveUp(scope){
      const index = scope.$index
      if (index === 0) {
        return
      }
      this.switchIndex(index, index - 1)
    },
    switchIndex (a, b) {
      const temp = { ...this.elements[a] };
      this.elements[a] = { ...this.elements[b] }
      this.elements[b] = temp
      this.elements.map((item, index) => item.index = index + 1)
    },
    del(scope){
      const index = scope.$index
      this.elements.splice(index, 1)
    },
    open(){
      this.visible = true
      this.initValue()
      this.init()
    },
    close(){
      this.visible = false
    },
    confirm(){
      if (!this.options || this.options.length == 0) {
        return this.close()
      }
      let valid = this.checkInput([], this.options)
      if (valid) {
        this.input([...this.options])
        this.close()
      }
    },
    checkInput(roots, items){
      let flag = true
      if (!items || items.length == 0) {
        return flag
      }
      items.forEach(row => {
        if (!row.key || !row.label) {
          flag = false
          this.$notify({
            title: '提示',
            message: roots.length > 0 ? '【' + roots.join('->') + '】的子选项输入不正确' : '选项输入不正确',
            type: 'warning',
            duration: 2000
          })
        }
        const childFlag = this.checkInput([...roots, row.label || '-'], row.childrens)
        if (!childFlag) {
          flag = false
        }
      })
      return flag;
    },
    findOne(items, id){
      if (!items) return null
      const results = items.filter(item => item._id == id)
      return results.length > 0 ? results[0] : null
    },
    showNextCascade(row){
      return this.currentCascade < this.vo.cascade && row.key && row.label
    },
  }
}
