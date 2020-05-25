import pureProp from './pureProp';
import pureDefault from './pureDefault'
import layoutProps from './layout-props';
import nextId from './next-id';

const AUTO_PROP_OPTIONS = [
  { key: 'userId', label: 'label.flow.formdesign.autoPropOptions.userId' },
  { key: 'userName', label: 'label.flow.formdesign.autoPropOptions.userName' },
  { key: 'orgId', label: 'label.flow.formdesign.autoPropOptions.orgId' },
  { key: 'orgName', label: 'label.flow.formdesign.autoPropOptions.orgName' },
  { key: 'systemTime', label: 'label.flow.formdesign.autoPropOptions.systemTime' }
]
const name = 'fd-input'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.input',
  group: 'label.flow.formdesign.fdgroup.basic',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        key: pureProp({ type: 'prop-field-select', name: 'label.flow.formdesign.props.key', required: 1 }),
        name: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.name' }),
        placeholder: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.placeholder' })
      }
    },
    input: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.input',
      visible: false,
      props: {
        defaultValue: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.defaultValue' }),
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
        shown: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.shown' }),
        prefixFormat: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.prefixFormat' }),
        suffixFormat: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.suffixFormat' }),
        prefix: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.prefix' }),
        suffix: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.suffix' })
      }
    },
    validate: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.validate',
      visible: false,
      props: {
        required: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.required' }),
        // number: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.number' }),
        email: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.email' }),
        tel: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.tel' }),
        phone: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.phone' }),
        regx: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.regx' }),
        digit: pureProp({ type: 'fd-counter', name: 'label.flow.formdesign.props.digit', min: 0, max: 9 }),
        minLength: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.minLength',
          min: 0,
          max: 999
        }),
        maxLength: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.maxLength',
          min: 0,
          max: 999
        }),
        minValue: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.minValue',
          min: 0,
          max: 999999999
        }),
        maxValue: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.maxLength',
          min: 0,
          max: 999999999
        })
      }
    },
    ...layoutProps
  },
  defaultValue(config) {
    return pureDefault(config, {
      type: name,
      name: '文本',
      readonly: 0,
      autofill: 0,
      required: 0,
      digit: 0,
      number: 0,
      email: 0,
      tel: 0,
      phone: 0,
      id: nextId()
    })
  }
}
