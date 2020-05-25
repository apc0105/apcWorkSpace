import FdControlMixin from "@/form-design/form-components/fd-control-mixin";
import FdFormItem from "@/form-design/form-components/fd-form-item";
import NumberExpression from "./number-expression";
import { isTableLayout, isNumber } from "@/form-design/form-props";

export default {
  name: 'prop-expression',
  mixins: [FdControlMixin],
  components: { FdFormItem, NumberExpression },
  props: {
    json: Object,
    vo: Object,
  },
  data(){
    return {
      visible: false,
      expressionType: 'number-expression',
      editValue: [],
    }
  },
  computed: {
    watchFields(){
      const fields = []
      if (this.json.elements) {
        this.json.elements.forEach(item => {
          if (item.id == this.vo.id) {
            return
          }
          if ((!item.parentId || !isTableLayout(item.parentType)) && isNumber(item)) {
            fields.push(item)
          }
        })
      }
      return fields
    }
  },
  created(){

  },
  methods: {
    init(){
      if (this.vo.numberType == 'number' || this.vo.numberType == 'amount') {
        this.expressionType = 'number-expression'
      } else {
        this.expressionType = 'date-expression'
      }
      this.editValue = Array.isArray(this.stateValue) ? [...this.stateValue] : []
    },
    open(){
      this.init()
      this.visible = true
    },
    close(){
      this.visible = false
    },
    confirm(){
      //1.check
      if (this.validateExpression()) {
        this.input(this.editValue)
        this.close()
      }
    },
    validateExpression(){
      const temp = []
      this.editValue.forEach(item => {
        if (typeof item == 'string' || typeof item == 'number') {
          temp.push(item)
        } else {
          temp.push(1)
        }
      })
      try {
        eval(temp.join(''));
        return true;
      } catch (e) {
        console.warn(e)
        this.$notify({
          title: '提示',
          message: '非法的计算表达式请检查',
          type: 'warning',
          duration: 2000
        })
        return false
      }
    }
  }
}
