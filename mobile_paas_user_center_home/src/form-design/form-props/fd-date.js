import pureProp from './pureProp'
import pureDefault from './pureDefault'
import layoutProps from "./layout-props";
import nextId from "./next-id";

const DATE_FORMAT_OPTIONS = [
  'yyyy-MM', 'yyyy-MM-dd', 'yyyy-MM-dd HH:mm', 'yyyy-MM-dd HH:mm:ss'
]

const TYPE_FORMAT_MAP = {
  'date': 'yyyy-MM-dd',
  'daterange': 'yyyy-MM-dd',
  'datetime': 'yyyy-MM-dd HH:mm:ss',
  'datetimerange': 'yyyy-MM-dd HH:mm:ss',
  'datetimerange': 'yyyy-MM-dd HH:mm:ss',
  'week': null,
  'month': null,
  'year': null,
}

const DATE_TYPE_OPTIONS = [
  { key: 'date', label: 'label.flow.formdesign.dateTypes.date', },
  { key: 'daterange', label: 'label.flow.formdesign.dateTypes.daterange', },
  { key: 'datetime', label: 'label.flow.formdesign.dateTypes.datetime', },
  { key: 'datetimerange', label: 'label.flow.formdesign.dateTypes.datetimerange', },
  { key: 'week', label: 'label.flow.formdesign.dateTypes.week', },
  { key: 'month', label: 'label.flow.formdesign.dateTypes.month', },
  { key: 'year', label: 'label.flow.formdesign.dateTypes.year', },
]

const name = 'fd-date'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.date',
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
        defaultValue: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.defaultValue' }),
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
        shown: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.shown' }),
        format: pureProp({
          type: 'fd-select', name: 'label.flow.formdesign.props.format',
          valueProp: 'key',
          labelProp: 'label', options: DATE_FORMAT_OPTIONS
        }),
        dateType: pureProp({
          type: 'fd-select',
          name: 'label.flow.formdesign.props.dateType',
          valueProp: 'key',
          labelProp: 'label',
          i18nLabel: 1,
          options: DATE_TYPE_OPTIONS,
          onChange: (val, vo) => {
            vo.format = TYPE_FORMAT_MAP[val]
          }
        }),
      }
    },
    validate: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.validate',
      visible: false,
      props: {
        required: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.required' }),
        minValue: pureProp({
          type: 'fd-date',
          name: 'label.flow.formdesign.props.minValue',
          dateType: 'date',
          format: 'yyyy-MM-dd HH:mm:ss'
        }),
        maxValue: pureProp({
          type: 'fd-date',
          name: 'label.flow.formdesign.props.maxValue',
          dateType: 'date',
          format: 'yyyy-MM-dd HH:mm:ss'
        }),
      }
    },
    ...layoutProps,
  },
  defaultValue(config){
    return pureDefault(config, {
      type: name,
      name: '日期',
      readonly: 0,
      autofill: 0,
      required: 0,
      format: 'yyyy-MM-dd',
      dateType: 'date',
      id: nextId(),
    })
  }
}
