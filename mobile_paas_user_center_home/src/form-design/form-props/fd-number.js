import pureProp from "./pureProp";
import pureDefault from './pureDefault'
import layoutProps from "./layout-props";
import nextId from "./next-id";

const NUMBER_TYPE = [
  { key: 'number', label: 'label.flow.formdesign.numbers.number', },
  { key: 'amount', label: 'label.flow.formdesign.numbers.amount', },
]

const CURRENCY_TYPE = [
  { key: '￥', label: 'label.flow.formdesign.currencys.cny', },
  { key: '$', label: 'label.flow.formdesign.currencys.usd', },
]

const name = 'fd-number'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.number',
  group: 'label.flow.formdesign.fdgroup.basic',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        key: pureProp({ type: 'prop-field-select', name: 'label.flow.formdesign.props.key', required: 1 }),
        name: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.name' }),
        placeholder: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.placeholder' }),
      },
    },
    input: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.input',
      visible: false,
      props: {
        defaultValue: pureProp({ type: 'fd-number', name: 'label.flow.formdesign.props.defaultValue', digit: 9 }),
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
        shown: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.shown' }),
        prefix: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.prefix' }),
        suffix: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.suffix' }),
        numberType: pureProp({
          type: 'fd-radio',
          name: 'label.flow.formdesign.props.numberType',
          itemBtnStyle: 1,
          valueProp: 'key',
          labelProp: 'label',
          options: NUMBER_TYPE,
          onChange: (val, vo) => {
            if (val == NUMBER_TYPE[1].key) {
              vo.digit = 2
            }
          }
        }),
        currency: pureProp({
          type: 'fd-radio',
          name: 'label.flow.formdesign.props.currency',
          itemBtnStyle: 1,
          valueProp: 'key',
          labelProp: 'label',
          options: CURRENCY_TYPE,
          show: {
            logic: 'and',
            rules: [{ prop: 'numberType', operator: '=', condition: 'amount' }]
          },
        }),
        thousandth: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.thousandth' }),
        cnyText: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.cnyText' }),
      }
    },
    validate: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.validate',
      visible: false,
      props: {
        required: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.required' }),
        regx: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.regx', }),
        digit: pureProp({ type: 'fd-counter', name: 'label.flow.formdesign.props.digit', min: 0, max: 9 }),
        minValue: pureProp({
          type: 'fd-number',
          name: 'label.flow.formdesign.props.minValue',
          min: 0,
          digit: 9,
          max: 999999999
        }),
        maxValue: pureProp({
          type: 'fd-number',
          name: 'label.flow.formdesign.props.maxLength',
          min: 0,
          digit: 9,
          max: 999999999
        }),
      }
    },
    ...layoutProps,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      name: '数字金额',
      numberType: 'number',
      currency: '￥',
      readonly: 0,
      required: 0,
      digit: 2,
      number: 1,
      thousandth: 1,
      cnyText: 0,
      id: nextId(),
    })
  }
}
