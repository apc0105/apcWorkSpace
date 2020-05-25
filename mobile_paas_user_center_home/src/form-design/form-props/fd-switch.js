import pureProp from './pureProp'
import pureDefault from './pureDefault'
import layoutProps from "./layout-props";
import nextId from "./next-id";

const name = 'fd-switch'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.switch',
  group: 'label.flow.formdesign.fdgroup.basic',
  props: {
    basic: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.basic',
      visible: true,
      props: {
        key: pureProp({ type: 'prop-field-select', name: 'label.flow.formdesign.props.key' ,required:1}),
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
        activeValue: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.activeValue' }),
        inactiveValue: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.inactiveValue' }),
        activeText: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.activeText' }),
        inactiveText: pureProp({ type: 'fd-input', name: 'label.flow.formdesign.props.inactiveText' }),
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
        shown: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.shown' }),
      }
    },
    validate: {
      type: 'prop-object',
      name: 'label.flow.formdesign.props.validate',
      visible: false,
      props: {
        required: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.required' }),
      }
    },
    ...layoutProps,
  },
  defaultValue(config){
    return pureDefault(config,{
      type: name,
      name: '开关',
      readonly: 0,
      required: 0,
      activeValue: 1,
      inactiveValue: 0,
      id: nextId(),
    })
  }
}
