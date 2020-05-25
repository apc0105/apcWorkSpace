import pureProp from './pureProp'
import pureDefault from './pureDefault'
import layoutProps from "./layout-props";
import nextId from "./next-id";

const name = 'fd-rich'
export default {
  name: name,
  text: 'label.flow.formdesign.fd.rich',
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
        readonly: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.readonly' }),
        shown: pureProp({ type: 'fd-switch', name: 'label.flow.formdesign.props.shown' }),
        height: pureProp({
          type: 'fd-counter',
          name: 'label.flow.formdesign.props.height',
          min: 0,
          max: 9999,
          step: 1
        }),
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
    return pureDefault(config, {
      type: name,
      name: '富文本',
      readonly: 0,
      required: 0,
      height: 200,
      id: nextId(),
    })
  }
}
