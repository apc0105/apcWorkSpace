import FdFormItem from "@/form-design/form-components/fd-form-item";

const isEmpty = val => val == null || val == undefined
const O_L = '('
const O_R = ')'
const BASIC_OPERATORS = ['+', '-', '*', '÷']
const OPERATORS = [...BASIC_OPERATORS, O_L, O_R]

export default {
  name: 'fd-number-expression',
  mixins: [],
  components: { FdFormItem },
  props: {
    value: Array,
    watchFields: Array,
  },
  data(){
    return {
      inputModel: false,
      inputConst: null,
      inputConstError: false,
      operators: OPERATORS,
      inputJson: null,
    }
  },
  computed: {
    stateValue(){
      return Array.isArray(this.value) ? this.value : []
    },
    lastItem(){
      if (this.stateValue.length > 0) {
        return this.stateValue[this.stateValue.length - 1]
      }
      return null
    },
    lastIsOperator(){
      return this.isOperatorItem(this.lastItem)
    },
    lastIsField(){
      return this.isFieldItem(this.lastItem)
    },
    lastIsConst(){
      return this.isConstItem(this.lastItem)
    },
    disabledField(){
      if (this.lastItem == O_R) {
        return true
      }
      if (this.lastIsField) {
        return true
      }
      if (this.lastIsConst) {
        return true
      }
      return false
    },
    disabledConst(){
      return this.disabledField
    },
  },
  created(){

  },
  methods: {
    handleInputJson(){
      if (this.inputModel) {
        try {
          const val = JSON.parse(this.inputJson)
          this.input(val)
          this.inputModel = false
        } catch (e) {
          console.warn(e)
          this.$notify({
            title: '提示',
            message: '非法的计算表达式请检查',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        this.inputModel = true
        this.inputJson = JSON.stringify(this.stateValue)
      }
    },
    expressText(){
      if (this.stateValue.length == 0) {
        return null
      }
      const texts = []
      const fieldNameMap = {}
      if (this.watchFields) {
        this.watchFields.forEach(item => fieldNameMap[item.id] = item.name)
      }
      this.stateValue.forEach(item => {
        if (this.isFieldItem(item)) {
          texts.push(fieldNameMap[item.id])
        } else {
          texts.push(item)
        }
      })
      return texts.join('')
    },
    isConstItem(item){
      return !Number.isNaN(Number.parseFloat(item))
    },
    isOperatorItem(item){
      if (!item) {
        return false
      }
      return OPERATORS.indexOf(item) >= 0
    },
    isFieldItem(item){
      if (!item) {
        return false
      }
      return typeof item == 'object' && item.id
    },
    disabledOperator(item){
      if (item == O_L) {
        //(
        if (isEmpty(this.lastItem) || this.lastIsOperator) {
          return false
        }
        return true
      }
      if (item == O_R) {
        //)
        if (this.lastIsField || this.lastIsConst || this.lastItem == O_R) {

          let count = 0;
          this.stateValue.forEach(item => {
            if (item == O_L) {
              count += 1
            } else if (item == O_R) {
              count -= 1
            }
          })
          if (count <= 0) {
            return true
          }
          return false
        }
        return true
      }
      //+, -, *, ÷
      if (isEmpty(this.lastItem) || this.lastItem == O_L || BASIC_OPERATORS.indexOf(this.lastItem) >= 0) {
        return true
      }
      return false
    },
    addConst(){
      if (this.disabledConst) {
        return
      }
      const c = Number.parseFloat(this.inputConst);
      if (Number.isNaN(c)) {
        this.inputConstError = true
        return;
      }
      this.addItem(this.inputConst)
      this.inputConstError = false;
      this.inputConst = null
    },
    addField(field){
      if (this.disabledField) {
        return
      }
      this.addItem({ id: field.id, key: field.key, name: field.name })
    },
    addOperator(operator){
      if (this.disabledOperator(operator)) {
        return
      }
      this.addItem(operator)
    },
    addItem(item){
      this.stateValue.push(item)
      this.input(this.stateValue)
    },
    popItem(){
      this.stateValue.pop()
      this.input(this.stateValue)
    },
    clearItem(){
      this.input([])
    },
    input(val){
      this.$emit('input', val)
    }
  }
}
