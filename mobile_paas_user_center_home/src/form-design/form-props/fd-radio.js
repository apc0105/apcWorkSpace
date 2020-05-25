import pureProp from './pureProp'
import pureDefault from './pureDefault'
import layoutProps from './layout-props'
import nextId from './next-id'

const name = 'fd-radio'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.radio',
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
        itemBtnStyle: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.itemBtnStyle' }),
        itemBtnRow: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.itemBtnRow' }),
        // enums: pureProp({
        //   type: 'fd-input',
        //   name: 'label.flow.formdesign.props.enums',
        //   placeholder: 'placeholder.flow.formdesign.enums'
        // }),
        remoteUrl: pureProp({
          type: 'fd-input',
          name: 'label.flow.formdesign.props.remoteUrl',
          placeholder: 'placeholder.flow.formdesign.remoteUrl'
        }),
        // dict: pureProp({
        //   type: 'fd-input-dialog',
        //   name: 'label.flow.formdesign.props.dict',
        //   datasource: 'SystemDictList',
        //   datasourceTitle: 'operation.system.dict.choose'
        // }),
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
      name: '单选框',
      readonly: 0,
      required: 0,
      multiple: 0,
      itemBtnStyle: 0,
      valueProp: 'key',
      labelProp: 'label',
      // remoteUrl: '/demo/dropList',
      id: nextId(),
      options: [
        { key: '1', label: '选项一' },
        { key: '2', label: '选项二' }
      ]
    })
  }
}
