import pureProp from './pureProp'
import pureDefault from './pureDefault'
import layoutProps from './layout-props';
import nextId from './next-id';

const CASCADE_OPTIONS = [
  { key: 2, label: 'label.flow.formdesign.cascades.2' },
  { key: 3, label: 'label.flow.formdesign.cascades.3' }
]

const name = 'fd-cascade'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.cascade',
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
        cascade: pureProp({
          type: 'fd-radio',
          name: 'label.flow.formdesign.props.cascade',
          options: CASCADE_OPTIONS,
          itemBtnStyle: 1,
          valueProp: 'key',
          labelProp: 'label',
          defaultValue: 'none'
        })
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
        remoteAsync: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.remoteAsync' }),
        remoteUrl: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.props.remoteUrl',
          placeholder: 'placeholder.flow.formdesign.remoteUrl'
        }),
        options: pureProp({
          type: 'prop-table',
          name: 'label.flow.formdesign.props.options'
        }),
        valueProp: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.valueProp' }),
        labelProp: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.labelProp' })
      }
    },
    validate: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.validate',
      visible: false,
      props: {
        required: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.required' })
      }
    },
    ...layoutProps
  },
  defaultValue(config) {
    return pureDefault(config, {
      type: name,
      name: '级联选择',
      cascade: 2,
      readonly: 0,
      required: 0,
      multiple: 0,
      labelProp: 'label',
      valueProp: 'key',
      id: nextId(),
      // remoteUrl: '/demo/cascader',
      options: [
        { key: '1', label: '选项一' },
        { key: '2', label: '选项二' }
      ]
    })
  }
}
